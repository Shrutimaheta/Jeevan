import uuid
import secrets
from django.db import transaction
from django.core.exceptions import ValidationError, PermissionDenied
from django.conf import settings
from .models import Teleconsultation
from jeevan.decorators import log_audit_event

def create_teleconsultation(appointment, symptoms=None, actor=None):
    """
    Creates a new Teleconsultation session with cryptographically secure random meeting room links.
    """
    if not appointment:
        raise ValidationError("Appointment must be specified.")
        
    if actor:
        if not hasattr(actor, 'role') or actor.role not in ['doctor', 'patient', 'receptionist']:
            raise PermissionDenied("Only doctors, patients, or receptionists can setup teleconsultations.")
            
    with transaction.atomic():
        # Generate cryptographically secure random values
        room_id = str(uuid.uuid4())
        meeting_id = secrets.token_hex(8)
        meeting_password = secrets.token_urlsafe(12)
        room_name = f"JeevanRoom_{room_id}"
        meeting_link = f"https://meet.jit.si/{room_name}#config.prejoinPageEnabled=false"
        
        tele_session = Teleconsultation.objects.create(
            doctor=appointment.doctor,
            hospital=appointment.hospital,
            patient=appointment.patient,
            appointment_date=appointment.appointment_date,
            appointment_time=appointment.appointment_time,
            meeting_link=meeting_link,
            meeting_id=meeting_id,
            meeting_password=meeting_password,
            symptoms=symptoms or appointment.symptoms,
            status='scheduled'
        )
        
        # Audit logging
        log_audit_event(
            user=actor or appointment.patient.user,
            action="CREATE_TELECONSULTATION",
            target_id=tele_session.id,
            details=f"Teleconsultation created for Appointment ID: {appointment.id} with secure room: {room_id}"
        )
        
        return tele_session
