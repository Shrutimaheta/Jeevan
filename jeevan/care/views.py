import io
import zipfile
import os
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, JsonResponse, FileResponse, Http404
from django.core.exceptions import PermissionDenied
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.conf import settings

from jeevan.decorators import log_audit_event
from .models import CustomUser, CareCoordinator, Hospital
from patient.models import Patient, PatientDocument
from records.models import MedicalRecord
from appointments.models import Appointment
from doctor.models import Consent

def check_coordinator_patient_consent(coordinator, patient):
    """
    Check if a patient has active approved consent with any doctor at the coordinator's hospital.
    """
    consents = Consent.objects.filter(
        patient=patient,
        doctor__hospital=coordinator.hospital,
        status='approved'
    )
    for consent in consents:
        if consent.is_approved(): # This checks active status & non-expiry
            return True
    return False

def coordinator_required(view_func):
    """Decorator to ensure user is logged in and is a care coordinator"""
    def _wrapped_view(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('universal_login')
        if request.user.role != 'care_coordinator':
            raise PermissionDenied("Access denied. You must be a Care Coordinator.")
        return view_func(request, *args, **kwargs)
    return _wrapped_view

def get_user_info(request, user_id):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Authentication credentials were not provided.'}, status=401)
    if not request.user.is_staff:
        return JsonResponse({'error': 'You do not have permission to perform this action.'}, status=403)
    try:
        user = CustomUser.objects.get(id=user_id)
        return JsonResponse({
            'full_name': user.full_name,
            'email': user.email,
            'role': user.role,
        })
    except CustomUser.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)

@coordinator_required
def coordinator_dashboard(request):
    """Care coordinator panel view - lists patients registered at coordinator's hospital"""
    coordinator = get_object_or_404(CareCoordinator, user=request.user)
    
    # Get patients who have appointments at the coordinator's hospital
    appointments = Appointment.objects.filter(
        hospital=coordinator.hospital,
        status__in=['pending', 'accepted', 'completed']
    ).select_related('patient').order_by('-appointment_date')
    
    # De-duplicate patients
    seen_patients = set()
    patients = []
    for appt in appointments:
        if appt.patient.id not in seen_patients:
            seen_patients.add(appt.patient.id)
            patients.append(appt.patient)
            
    # For each patient, check if there is an active consent
    patients_data = []
    for patient in patients:
        has_consent = check_coordinator_patient_consent(coordinator, patient)
        patients_data.append({
            'patient': patient,
            'has_consent': has_consent
        })
        
    context = {
        'coordinator': coordinator,
        'patients_data': patients_data,
        'hospital': coordinator.hospital
    }
    return render(request, 'care/coordinator_dashboard.html', context)

@coordinator_required
@require_http_methods(["POST"])
def export_patient_reports_zip(request):
    """
    Exports all reports of checked patients in a single zip file.
    Enforces active consent checks and filters out patients lacking consent.
    """
    coordinator = get_object_or_404(CareCoordinator, user=request.user)
    
    # Extract patient IDs from post data
    patient_ids = request.POST.getlist('patient_ids')
    if not patient_ids:
        messages.error(request, "No patients selected.")
        return redirect('coordinator_dashboard')
        
    buffer = io.BytesIO()
    included_patients = []
    excluded_patients = []
    
    with zipfile.ZipFile(buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
        for p_id in patient_ids:
            try:
                patient = Patient.objects.get(id=p_id)
            except Patient.DoesNotExist:
                continue
                
            # Enforce consent check
            if not check_coordinator_patient_consent(coordinator, patient):
                excluded_patients.append(p_id)
                continue
                
            included_patients.append(p_id)
            
            # 1. Gather MedicalRecord report files
            medical_records = MedicalRecord.objects.filter(patient=patient)
            for mr in medical_records:
                if mr.report_file and os.path.exists(mr.report_file.path):
                    file_name = f"{patient.full_name}_record_{mr.id}_{os.path.basename(mr.report_file.name)}"
                    zip_file.write(mr.report_file.path, file_name)
                    
            # 2. Gather PatientDocument files
            patient_docs = PatientDocument.objects.filter(patient=patient)
            for pd in patient_docs:
                if pd.file and os.path.exists(pd.file.path):
                    file_name = f"{patient.full_name}_doc_{pd.id}_{os.path.basename(pd.file.name)}"
                    zip_file.write(pd.file.path, file_name)

    if not included_patients:
        messages.error(request, "Export failed. None of the selected patients have active consent with your hospital.")
        return redirect('coordinator_dashboard')
        
    # Audit log every zip download action
    log_audit_event(
        user=request.user,
        action="EXPORT_PATIENT_REPORTS_ZIP",
        target_id=coordinator.id,
        details=(
            f"Care coordinator ID: {coordinator.id} exported reports zip. "
            f"Requested IDs: {patient_ids}. "
            f"Exported patient IDs: {included_patients}. "
            f"Excluded patient IDs: {excluded_patients} due to consent restriction."
        )
    )
    
    buffer.seek(0)
    response = FileResponse(buffer, content_type='application/zip')
    response['Content-Disposition'] = f'attachment; filename="patient_reports_{coordinator.hospital.name.replace(" ", "_")}.zip"'
    return response

@login_required
def admin_dashboard(request):
    """
    Admin dashboard view. If ?debug=1 parameter is present, prints safe debug metrics.
    Prevent printing database credentials or SECRET_KEY on screens, regardless of debug parameters.
    """
    if not request.user.is_superuser and request.user.role != 'admin':
        raise PermissionDenied("Only Administrators can access this dashboard.")
        
    debug_mode = request.GET.get('debug') == '1'
    safe_config = {}
    
    if debug_mode:
        # Construct completely safe config mapping without sensitive fields
        safe_config = {
            'DEBUG_MODE': settings.DEBUG,
            'ALLOWED_HOSTS': settings.ALLOWED_HOSTS,
            'TIME_ZONE': settings.TIME_ZONE,
            'INSTALLED_APPS': [app for app in settings.INSTALLED_APPS if not app.startswith('django.')],
            'SECRET_KEY': '************ (REDACTED FOR SECURITY)',
            'DATABASE_CONNECTION': 'SQLITE3 (CREDENTIALS MASKED FOR SECURITY)',
            'SESSION_ENGINE': settings.SESSION_ENGINE,
        }
        
    # Log audit event
    log_audit_event(
        user=request.user,
        action="VIEW_ADMIN_DASHBOARD",
        target_id=request.user.id,
        details=f"Admin viewed admin dashboard. Debug info requested: {debug_mode}"
    )
    
    context = {
        'debug_mode': debug_mode,
        'safe_config': safe_config
    }
    return render(request, 'care/admin_dashboard.html', context)
