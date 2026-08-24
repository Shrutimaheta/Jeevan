from django.db import transaction
from django.core.exceptions import ValidationError, PermissionDenied
from django.utils import timezone
from .models import Nurse, ClinicalNote
from patient.models import Patient, VitalSign
from appointments.models import Appointment
from jeevan.decorators import log_audit_event

def check_nurse_patient_association(nurse, patient):
    """
    A nurse must only interact with patients who are associated with the nurse's hospital.
    """
    return patient.associated_hospitals.filter(id=nurse.hospital.id).exists()

def create_clinical_note(patient_id, nurse, note_text, actor):
    """
    Creates a clinical observation note for a patient.
    Verifies nurse role, hospital association, and logs audits.
    """
    if not actor or not hasattr(actor, 'role') or actor.role != 'nurse':
        raise PermissionDenied("Only registered nurses can record clinical notes.")
        
    if nurse.user != actor:
        raise PermissionDenied("Nurse profile mismatch.")
        
    if not note_text or not note_text.strip():
        raise ValidationError("Note text cannot be empty.")
        
    with transaction.atomic():
        try:
            patient = Patient.objects.get(id=patient_id)
        except Patient.DoesNotExist:
            raise ValidationError("Patient not found.")
            
        # Hospital association check
        if not check_nurse_patient_association(nurse, patient):
            raise PermissionDenied("You do not have permission to log notes for this patient as they are not registered at your hospital.")
            
        note = ClinicalNote.objects.create(
            patient=patient,
            nurse=nurse,
            note=note_text.strip()
        )
        
        # Enforce audit logging
        log_audit_event(
            user=actor,
            action="CREATE_CLINICAL_NOTE",
            target_id=note.id,
            details=f"Clinical note created by Nurse ID: {nurse.id} for Patient ID: {patient.id}"
        )
        
        return note

def update_clinical_note(note_id, nurse, note_text, actor):
    """
    Updates an existing clinical note.
    Verifies ownership, hospital association, and logs audits.
    """
    if not actor or not hasattr(actor, 'role') or actor.role != 'nurse':
        raise PermissionDenied("Only registered nurses can update clinical notes.")
        
    if nurse.user != actor:
        raise PermissionDenied("Nurse profile mismatch.")
        
    if not note_text or not note_text.strip():
        raise ValidationError("Note text cannot be empty.")
        
    with transaction.atomic():
        try:
            note = ClinicalNote.objects.select_for_update().get(id=note_id)
        except ClinicalNote.DoesNotExist:
            raise ValidationError("Clinical note not found.")
            
        if note.nurse != nurse:
            raise PermissionDenied("You can only edit notes that you have written.")
            
        # Hospital association check
        if not check_nurse_patient_association(nurse, note.patient):
            raise PermissionDenied("You do not have permission to interact with this patient's records.")
            
        note.note = note_text.strip()
        note.save()
        
        # Enforce audit logging
        log_audit_event(
            user=actor,
            action="UPDATE_CLINICAL_NOTE",
            target_id=note.id,
            details=f"Clinical note updated by Nurse ID: {nurse.id} for Patient ID: {note.patient.id}"
        )
        
        return note

def log_patient_vitals(patient_id, nurse, blood_pressure_systolic, blood_pressure_diastolic, heart_rate, temperature, oxygen_saturation, weight=None, notes='', actor=None):
    """
    Logs patient vitals with validation and nurse-patient hospital scoping check.
    """
    if not actor or not hasattr(actor, 'role') or actor.role != 'nurse':
        raise PermissionDenied("Only registered nurses can record vitals.")
        
    if nurse.user != actor:
        raise PermissionDenied("Nurse profile mismatch.")
        
    with transaction.atomic():
        try:
            patient = Patient.objects.get(id=patient_id)
        except Patient.DoesNotExist:
            raise ValidationError("Patient not found.")
            
        # Hospital association check
        if not check_nurse_patient_association(nurse, patient):
            raise PermissionDenied("You do not have permission to log vitals for this patient.")
            
        # Instantiate and validate ranges/constraints dynamically via Django's validation framework
        vital_sign = VitalSign(
            patient=patient,
            blood_pressure_systolic=blood_pressure_systolic,
            blood_pressure_diastolic=blood_pressure_diastolic,
            heart_rate=heart_rate,
            temperature=temperature,
            oxygen_saturation=oxygen_saturation,
            weight=weight,
            notes=notes
        )
        
        # This will raise ValidationError if values are outside model MinValue/MaxValue ranges
        vital_sign.full_clean()
        vital_sign.save()
        
        # Enforce audit logging
        log_audit_event(
            user=actor,
            action="LOG_PATIENT_VITALS",
            target_id=vital_sign.id,
            details=f"Vitals recorded by Nurse ID: {nurse.id} for Patient ID: {patient.id}"
        )
        
        return vital_sign
