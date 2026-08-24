import os
import mimetypes
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, JsonResponse, Http404, FileResponse
from django.contrib import messages
from django.core.exceptions import PermissionDenied
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required

from jeevan.decorators import doctor_required, role_required, rate_limit, log_audit_event
from patient.models import Patient
from doctor.models import Doctor
from appointments.models import Appointment
from .models import MedicalRecord
from .services import check_doctor_patient_access, create_medical_record

def verify_record_access(user, patient, record=None):
    """
    Helper to verify if a user has permission to read a patient's medical records.
    Allowed actors:
    - The patient themselves
    - A doctor with active consent or appointment relationship
    """
    if not user.is_authenticated:
        return False
        
    if user.role == 'patient':
        try:
            patient_profile = Patient.objects.get(user=user)
            return patient_profile == patient
        except Patient.DoesNotExist:
            return False
            
    elif user.role == 'doctor':
        try:
            doctor = Doctor.objects.get(user=user)
            # If a specific record is checked, the creator doctor always has access
            if record and record.doctor == doctor:
                return True
            return check_doctor_patient_access(doctor, patient)
        except Doctor.DoesNotExist:
            return False
            
    return False

@login_required
def record_list(request, patient_id):
    """View all medical records for a patient (with access verification)"""
    patient = get_object_or_404(Patient, id=patient_id)
    
    if not verify_record_access(request.user, patient):
        raise PermissionDenied("You do not have permission to view this patient's medical records.")
        
    records = MedicalRecord.objects.filter(patient=patient).order_by('-created_at')
    
    # Audit log
    log_audit_event(request.user, "VIEW_MEDICAL_RECORDS_LIST", patient.id, f"Viewed records list for Patient ID: {patient.id}")
    
    return render(request, 'records/record_list.html', {
        'patient': patient,
        'records': records
    })

@login_required
def record_detail(request, record_id):
    """View details of a specific medical record"""
    record = get_object_or_404(MedicalRecord, id=record_id)
    patient = record.patient
    
    if not verify_record_access(request.user, patient, record):
        raise PermissionDenied("You do not have permission to view this medical record.")
        
    log_audit_event(request.user, "VIEW_MEDICAL_RECORD_DETAIL", record.id, f"Viewed details of Medical Record ID: {record.id}")
    
    import json
    fhir_condition_json = json.dumps(record.fhir_condition, indent=2) if record.fhir_condition else None
    fhir_medication_request_json = json.dumps(record.fhir_medication_request, indent=2) if record.fhir_medication_request else None
    
    return render(request, 'records/record_detail.html', {
        'record': record,
        'patient': patient,
        'fhir_condition_json': fhir_condition_json,
        'fhir_medication_request_json': fhir_medication_request_json
    })

@doctor_required
@rate_limit(key_prefix="create_record", limit=5, period=60, is_api=False)
@require_http_methods(["POST"])
def create_record(request, appointment_id):
    """Create a new medical record for an appointment (doctor-only, rate-limited)"""
    try:
        doctor = Doctor.objects.get(user=request.user)
        appointment = get_object_or_404(Appointment, id=appointment_id)
        
        summary = request.POST.get('summary', '').strip()
        diagnosis = request.POST.get('diagnosis', '').strip()
        prescription = request.POST.get('prescription', '').strip()
        next_dose_date = request.POST.get('next_dose_date')
        report_file = request.FILES.get('report_file')
        snomed_diagnosis_code = request.POST.get('snomed_diagnosis_code', '').strip() or None
        snomed_diagnosis_display = request.POST.get('snomed_diagnosis_display', '').strip() or None
        
        if next_dose_date == '':
            next_dose_date = None
            
        record = create_medical_record(
            appointment_id=appointment.id,
            doctor=doctor,
            summary=summary,
            diagnosis=diagnosis,
            prescription=prescription,
            next_dose_date=next_dose_date,
            report_file=report_file,
            snomed_diagnosis_code=snomed_diagnosis_code,
            snomed_diagnosis_display=snomed_diagnosis_display,
            actor=request.user
        )
        
        messages.success(request, "Medical record created successfully.")
        return redirect('doctor:patient_detail', patient_id=appointment.patient.id)
        
    except Exception as e:
        messages.error(request, f"Error creating medical record: {str(e)}")
        # Redirect back to where the request came from
        return redirect(request.META.get('HTTP_REFERER', 'home'))

@login_required
def download_record_file(request, record_id):
    """Secure private streaming of report file attached to a medical record"""
    record = get_object_or_404(MedicalRecord, id=record_id)
    patient = record.patient
    
    if not verify_record_access(request.user, patient, record):
        raise PermissionDenied("You do not have permission to view or download this file.")
        
    if not record.report_file:
        raise Http404("No report file attached to this record.")
        
    file_path = record.report_file.path
    if not os.path.exists(file_path):
        raise Http404("File does not exist on storage.")
        
    log_audit_event(
        user=request.user,
        action="DOWNLOAD_RECORD_FILE",
        target_id=record.id,
        details=f"Streamed report file of Medical Record ID: {record.id}"
    )
    
    content_type, _ = mimetypes.guess_type(file_path)
    response = FileResponse(open(file_path, 'rb'), content_type=content_type or 'application/octet-stream')
    response['Content-Disposition'] = f'attachment; filename="{os.path.basename(file_path)}"'
    return response
