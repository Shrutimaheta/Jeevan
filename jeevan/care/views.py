import zipfile
import os
from tempfile import SpooledTemporaryFile
from functools import wraps
from django.utils.text import slugify
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, JsonResponse, FileResponse, Http404
from django.core.exceptions import PermissionDenied
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.conf import settings
from django.core.paginator import Paginator
from django.db.models import Exists, OuterRef, Q
from django.utils import timezone

from jeevan.decorators import log_audit_event
from .models import CustomUser, CareCoordinator, Hospital
from patient.models import Patient, PatientDocument
from records.models import MedicalRecord
from appointments.models import Appointment
from doctor.models import Consent

def active_clinic_consents(coordinator):
    """Query the live clinic/doctor state without changing consent rows on reads."""
    return Consent.objects.filter(
        doctor__hospital=coordinator.hospital,
        doctor__is_active=True,
        doctor__user__is_active=True,
        doctor__user__role='doctor',
        status='approved'
    ).filter(Q(expires_at__isnull=True) | Q(expires_at__gt=timezone.now()))


def check_coordinator_patient_consent(coordinator, patient):
    if (not coordinator.is_active or not coordinator.user.is_active
            or not patient.associated_hospitals.filter(pk=coordinator.hospital_id).exists()):
        return False
    return active_clinic_consents(coordinator).filter(patient=patient).exists()

def coordinator_required(view_func):
    """Decorator to ensure user is logged in and is a care coordinator"""
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('universal_login')
        if not request.user.is_active or request.user.role != 'care_coordinator':
            raise PermissionDenied("Access denied. You must be a Care Coordinator.")
        if not CareCoordinator.objects.filter(user=request.user, is_active=True).exists():
            raise PermissionDenied('Your coordinator profile is inactive or unavailable.')
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
    
    # Display the clinic's registered patients even after a visit ends.
    patients = Patient.objects.filter(associated_hospitals=coordinator.hospital).select_related('user').annotate(
        has_clinic_consent=Exists(active_clinic_consents(coordinator).filter(patient_id=OuterRef('pk')))
    ).order_by('full_name', 'pk')
    page = Paginator(patients, settings.REPORT_EXPORT_PATIENT_LIMIT).get_page(request.GET.get('page'))
    patients_data = [{'patient': patient, 'has_consent': patient.has_clinic_consent} for patient in page]
        
    context = {
        'coordinator': coordinator,
        'patients_data': patients_data,
        'hospital': coordinator.hospital,
        'page_obj': page,
        'export_patient_limit': settings.REPORT_EXPORT_PATIENT_LIMIT,
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
    if len(patient_ids) > settings.REPORT_EXPORT_PATIENT_LIMIT:
        messages.error(request, f'Select at most {settings.REPORT_EXPORT_PATIENT_LIMIT} patients per export.')
        return redirect('coordinator_dashboard')
    if any(not value.isascii() or not value.isdigit() or len(value) > 10 for value in patient_ids):
        return JsonResponse({'error': 'Select valid patient identifiers.'}, status=400)
    patient_ids = list(dict.fromkeys(patient_ids))
        
    # Large archives spill into an owner-only temporary file instead of RAM.
    buffer = SpooledTemporaryFile(max_size=8 * 1024 * 1024, mode='w+b')
    included_patients = []
    excluded_patients = []
    exported_bytes = 0
    exported_files = 0

    def write_file(zip_file, field, archive_name):
        nonlocal exported_bytes, exported_files
        exported_files += 1
        if exported_files > settings.REPORT_EXPORT_FILE_LIMIT:
            raise ValueError('Report export exceeds the file limit.')
        with field.open('rb') as source, zip_file.open(archive_name, 'w') as destination:
            while chunk := source.read(64 * 1024):
                exported_bytes += len(chunk)
                if exported_bytes > settings.REPORT_EXPORT_BYTE_LIMIT:
                    raise ValueError('Report export exceeds the byte limit.')
                destination.write(chunk)
    
    try:
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
                medical_records = MedicalRecord.objects.filter(patient=patient).iterator(chunk_size=100)
                for mr in medical_records:
                    if mr.report_file and mr.report_file.storage.exists(mr.report_file.name):
                        file_name = f"{slugify(patient.full_name) or 'patient'}_record_{mr.id}_{os.path.basename(mr.report_file.name)}"
                        write_file(zip_file, mr.report_file, file_name)
                    
                # 2. Gather PatientDocument files
                patient_docs = PatientDocument.objects.filter(patient=patient).iterator(chunk_size=100)
                for pd in patient_docs:
                    if pd.file and pd.file.storage.exists(pd.file.name):
                        file_name = f"{slugify(patient.full_name) or 'patient'}_doc_{pd.id}_{os.path.basename(pd.file.name)}"
                        write_file(zip_file, pd.file, file_name)
    except (OSError, ValueError):
        buffer.close()
        messages.error(request, 'Unable to prepare this export. Select fewer reports or contact your clinic if a file is unavailable.')
        return redirect('coordinator_dashboard')
    except Exception:
        buffer.close()
        raise

    if not included_patients:
        buffer.close()
        messages.error(request, "Export failed. None of the selected patients have active consent with your hospital.")
        return redirect('coordinator_dashboard')
        
    # Audit log every zip download action
    try:
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
    except Exception:
        buffer.close()
        raise
    
    buffer.seek(0)
    response = FileResponse(buffer, content_type='application/zip')
    response['Content-Disposition'] = f'attachment; filename="patient_reports_{slugify(coordinator.hospital.name) or "clinic"}.zip"'
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
