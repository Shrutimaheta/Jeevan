import re
from django.db import transaction
from django.core.exceptions import ValidationError, PermissionDenied
from django.utils import timezone
from .models import Doctor, Consent, AppointmentPrescription
from appointments.models import Appointment
from jeevan.decorators import log_audit_event
from patient.notifications import create_notification

def request_consent(doctor, patient, reason=''):
    """
    Service to request access consent from a patient.
    Checks for any existing active consent (pending or approved).
    """
    with transaction.atomic():
        # Check if there is already an active consent (pending or approved)
        active_consent = Consent.objects.filter(
            doctor=doctor,
            patient=patient,
            status__in=['pending', 'approved']
        )
        if active_consent.exists():
            raise ValidationError("An active consent request already exists for this patient.")

        consent, created = Consent.objects.get_or_create(
            doctor=doctor,
            patient=patient,
            defaults={
                'reason': reason,
                'status': 'pending'
            }
        )
        
        if not created:
            consent.reason = reason
            consent.status = 'pending'
            consent.responded_at = None
            consent.requested_at = timezone.now()
            consent.save()
        
        # Notify patient
        create_notification(
            patient=patient,
            title="Consent Request",
            message=f"Dr. {doctor.full_name} has requested access to view your medical reports.",
            notification_type='system',
            action_url=f"/patient/consent/"
        )
        
        return consent

def approve_consent(consent_id, patient_user, notes=''):
    """
    Service for a patient to approve a consent request.
    Verifies that the patient actor owns the consent request.
    """
    with transaction.atomic():
        try:
            consent = Consent.objects.select_for_update().get(id=consent_id)
        except Consent.DoesNotExist:
            raise ValidationError("Consent request not found.")

        # Access check: Patient owner of the profile must be the actor
        if consent.patient.user != patient_user:
            raise PermissionDenied("You do not have permission to approve this consent request.")
            
        if consent.status != 'pending':
            raise ValidationError(f"Cannot approve consent in status: {consent.status}")

        consent.status = 'approved'
        consent.responded_at = timezone.now()
        consent.expires_at = timezone.now() + timezone.timedelta(days=30)  # Expires in 30 days
        consent.notes = notes
        consent.save()
        
        log_audit_event(patient_user, "CONSENT_STATUS_CHANGE", consent.id, f"Consent approved for Dr. {consent.doctor.full_name}")
        return consent

def reject_consent(consent_id, patient_user, notes=''):
    """
    Service for a patient to reject a consent request.
    Verifies that the patient actor owns the consent request.
    """
    with transaction.atomic():
        try:
            consent = Consent.objects.select_for_update().get(id=consent_id)
        except Consent.DoesNotExist:
            raise ValidationError("Consent request not found.")

        # Access check
        if consent.patient.user != patient_user:
            raise PermissionDenied("You do not have permission to reject this consent request.")
            
        if consent.status != 'pending':
            raise ValidationError(f"Cannot reject consent in status: {consent.status}")

        consent.status = 'rejected'
        consent.responded_at = timezone.now()
        consent.notes = notes
        consent.save()
        
        log_audit_event(patient_user, "CONSENT_STATUS_CHANGE", consent.id, f"Consent rejected for Dr. {consent.doctor.full_name}")
        return consent

def validate_medications_structure(medications_text):
    """
    Validates structural format of medications text.
    Format should be: Drug Name - Dose - Frequency - Duration
    """
    if not medications_text or not medications_text.strip():
        return
    lines = medications_text.strip().split('\n')
    for line in lines:
        line = line.strip()
        if not line:
            continue
        parts = line.split('-')
        if len(parts) < 4:
            raise ValidationError(
                "Each medication line must follow the structure: 'Drug Name - Dose - Frequency - Duration'. "
                "Example: 'Paracetamol - 500mg - Twice daily - 5 days'"
            )

def save_prescription(appointment_id, doctor, diagnosis, medications, tests_recommended='', advice='', follow_up_date=None, snomed_diagnosis_code=None, snomed_diagnosis_display=None):
    """
    Service to create or update a prescription.
    Enforces doctor ownership and blocks editing of completed appointments.
    """
    validate_medications_structure(medications)
    
    with transaction.atomic():
        try:
            appointment = Appointment.objects.select_for_update().get(id=appointment_id)
        except Appointment.DoesNotExist:
            raise ValidationError("Appointment not found.")
            
        # Ownership verification
        if appointment.doctor != doctor:
            raise PermissionDenied("You are not the assigned doctor for this appointment.")
            
        # Check if already completed and prescription exists (blocking edits)
        prescription_exists = hasattr(appointment, 'prescription')
        if appointment.status == 'completed' and prescription_exists:
            raise ValidationError("Cannot edit prescription after the appointment is finalized/completed.")
            
        if appointment.status not in ['accepted', 'completed']:
            raise ValidationError("Prescriptions can only be added to accepted appointments.")
            
        prescription, created = AppointmentPrescription.objects.get_or_create(
            appointment=appointment,
            defaults={
                'doctor': doctor,
                'patient_name': appointment.patient.full_name,
                'diagnosis': diagnosis,
                'medications': medications,
                'tests_recommended': tests_recommended,
                'advice': advice,
                'follow_up_date': follow_up_date,
                'snomed_diagnosis_code': snomed_diagnosis_code,
                'snomed_diagnosis_display': snomed_diagnosis_display
            }
        )
        
        if not created:
            # Updating existing pending prescription
            prescription.diagnosis = diagnosis
            prescription.medications = medications
            prescription.tests_recommended = tests_recommended
            prescription.advice = advice
            prescription.follow_up_date = follow_up_date
            prescription.snomed_diagnosis_code = snomed_diagnosis_code
            prescription.snomed_diagnosis_display = snomed_diagnosis_display
            prescription.save()
            
        # Transition appointment status to completed if not already completed
        if appointment.status != 'completed':
            from appointments.services import update_appointment_status
            update_appointment_status(appointment.id, 'completed', doctor.user)
            
        return prescription
