from django.db import transaction
from django.core.exceptions import ValidationError, PermissionDenied
from django.utils import timezone
from .models import MedicalRecord
from appointments.models import Appointment
from doctor.models import Doctor, Consent
from patient.models import Patient
from jeevan.decorators import log_audit_event

def check_doctor_patient_access(doctor, patient):
    """
    Helper to check if a doctor has a valid relationship with a patient
    either through active consent or an appointment.
    """
    # Active approved consent
    active_consent = Consent.objects.filter(
        doctor=doctor,
        patient=patient,
        status='approved'
    )
    # Check expiry
    for consent in active_consent:
        if consent.is_approved():
            return True
            
    # Or if doctor has any appointment with the patient
    if Appointment.objects.filter(doctor=doctor, patient=patient).exists():
        return True
        
    return False

def validate_record_file(file):
    """
    Validates uploaded file size, extension, and checks for executable magic bytes.
    """
    if not file:
        return
        
    # File size validation (10MB limit)
    if file.size > 10 * 1024 * 1024:
        raise ValidationError("File size exceeds the 10MB limit.")
        
    # File extension validation
    ext = file.name.split('.')[-1].lower()
    allowed_extensions = ['pdf', 'docx', 'jpg', 'jpeg', 'png']
    if ext not in allowed_extensions:
        raise ValidationError("Unsupported file extension. Allowed formats: PDF, DOCX, JPG, PNG.")
        
    # Magic bytes check for executable headers
    header = file.read(2048)
    file.seek(0)
    
    if header.startswith(b'MZ') or b'PE\x00\x00' in header or header.startswith(b'\x7fELF'):
        raise ValidationError("File content analysis failed: Executable code headers detected.")

def create_medical_record(appointment_id, doctor, summary, diagnosis='', prescription='', next_dose_date=None, report_file=None, snomed_diagnosis_code=None, snomed_diagnosis_display=None, actor=None):
    """
    Creates a new medical record. Verifies consent, validates file security,
    uses transactions, and logs audit events.
    """
    if not summary or not summary.strip():
        raise ValidationError("Record summary cannot be empty.")
        
    with transaction.atomic():
        try:
            appointment = Appointment.objects.select_for_update().get(id=appointment_id)
        except Appointment.DoesNotExist:
            raise ValidationError("Appointment not found.")
            
        patient = appointment.patient
        
        # Verify actor relationship and permissions
        if actor:
            if not hasattr(actor, 'role') or actor.role != 'doctor':
                raise PermissionDenied("Only doctors can create medical records.")
            if doctor.user != actor:
                raise PermissionDenied("Assigned doctor mismatch.")
                
        # Access control rule: doctor must have relationship or appointment
        if appointment.doctor != doctor:
            if not check_doctor_patient_access(doctor, patient):
                raise PermissionDenied("You do not have active consent or relationship to create records for this patient.")

        # File security validation
        if report_file:
            validate_record_file(report_file)

        # Create MedicalRecord
        record = MedicalRecord.objects.create(
            appointment=appointment,
            patient=patient,
            doctor=doctor,
            summary=summary,
            diagnosis=diagnosis,
            prescription=prescription,
            next_dose_date=next_dose_date,
            report_file=report_file,
            snomed_diagnosis_code=snomed_diagnosis_code,
            snomed_diagnosis_display=snomed_diagnosis_display
        )
        
        # Audit logging
        log_audit_event(
            user=doctor.user,
            action="CREATE_MEDICAL_RECORD",
            target_id=record.id,
            details=f"Medical record created for Patient ID: {patient.id} on Appointment ID: {appointment.id}"
        )
        
        return record
