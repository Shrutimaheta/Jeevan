from django.db import transaction
from django.core.exceptions import ValidationError, PermissionDenied
from django.utils import timezone
from django.urls import reverse
from .models import Appointment
from .scheduling import validate_booking_slot
from jeevan.decorators import log_audit_event
from patient.notifications import create_notification

from django.conf import settings
import datetime

def create_appointment(patient, doctor, hospital, appointment_date, appointment_time, symptoms=None, payment_mode='cash', status='pending', actor=None):
    """
    Service to book a new appointment.
    Ensures race-safety using database atomic transactions and checks slot availability.
    """
    if not doctor.is_active or not doctor.user.is_active:
        raise ValidationError('This doctor is not available for appointments.')
    actor = actor or patient.user
    role = getattr(actor, 'role', '')
    allowed = (role == 'patient' and actor.pk == patient.user_id) or (role == 'doctor' and actor.pk == doctor.user_id)
    if role == 'receptionist':
        profile = getattr(actor, 'receptionist', None)
        allowed = profile is not None and profile.is_active and profile.hospital_id == hospital.pk
    if not actor.is_authenticated or not actor.is_active or not allowed:
        raise PermissionDenied('You cannot book this appointment.')
    if role == 'patient' and status != 'pending':
        raise PermissionDenied('Patients can only request pending appointments.')
    if not appointment_date or not appointment_time:
        raise ValidationError("Appointment date and time must be explicitly specified.")
    
    # Parse date and time if string
    if isinstance(appointment_date, str):
        try:
            date_obj = datetime.datetime.strptime(appointment_date, "%Y-%m-%d").date()
        except ValueError:
            raise ValidationError("Invalid date format.")
    else:
        date_obj = appointment_date

    if isinstance(appointment_time, str):
        try:
            time_obj = datetime.datetime.strptime(appointment_time, "%H:%M:%S").time()
        except ValueError:
            try:
                time_obj = datetime.datetime.strptime(appointment_time, "%H:%M").time()
            except ValueError:
                raise ValidationError("Invalid time format.")
    else:
        time_obj = appointment_time

    # Combine into a single datetime object
    appt_dt = datetime.datetime.combine(date_obj, time_obj)
    if settings.USE_TZ:
        appt_dt = timezone.make_aware(appt_dt, timezone.get_current_timezone())
        now = timezone.now()
    else:
        now = datetime.datetime.now()

    if appt_dt < now:
        raise ValidationError("Appointment date and time cannot be in the past.")
        
    # Validate doctor belongs to selected hospital
    if doctor.hospital != hospital:
        raise ValidationError("The selected doctor does not belong to the selected hospital.")

    appointment_date, appointment_time = validate_booking_slot(date_obj, time_obj)
    with transaction.atomic():
        # Lock the doctor even when there are no appointments to lock yet.
        doctor = type(doctor).objects.select_for_update().select_related('user').get(pk=doctor.pk)
        if not doctor.is_active or not doctor.user.is_active:
            raise ValidationError('This doctor is not available for appointments.')
        if doctor.hospital_id != hospital.pk:
            raise ValidationError('The selected doctor does not belong to the selected hospital.')
        # Check slot availability with SELECT FOR UPDATE to prevent race conditions
        conflicting_appointments = Appointment.objects.select_for_update().filter(
            doctor=doctor,
            appointment_date=appointment_date,
            appointment_time=appointment_time
        ).exclude(status__in=['cancelled', 'rejected', 'expired'])
        
        if conflicting_appointments.exists():
            raise ValidationError("This time slot is already booked for the selected doctor.")
            
        appointment = Appointment.objects.create(
            patient=patient,
            doctor=doctor,
            hospital=hospital,
            appointment_date=appointment_date,
            appointment_time=appointment_time,
            symptoms=symptoms,
            payment_mode=payment_mode,
            status=status
        )
        
        # Add to associated hospitals
        patient.associated_hospitals.add(hospital)
        
        log_audit_event(actor or patient.user, "APPOINTMENT_STATUS_CHANGE", appointment.id, f"Status initialized to: {status} (booked by service)")
        
        return appointment

def update_appointment_status(appointment_id, new_status, actor, reason=None):
    """
    Service to update an appointment status with strict validation of transitions and roles.
    """
    ALLOWED_TRANSITIONS = {
        'pending': ['accepted', 'rejected', 'cancelled', 'expired'],
        'accepted': ['completed', 'cancelled'],
        'rejected': [],
        'completed': [],
        'cancelled': [],
        'expired': [],
    }
    if not getattr(actor, 'is_authenticated', False) or not actor.is_active:
        raise PermissionDenied('An active account is required.')
    if getattr(actor, 'role', '') in ('doctor', 'receptionist'):
        profile = getattr(actor, actor.role, None)
        if profile is None or not profile.is_active:
            raise PermissionDenied('An active staff profile is required.')

    with transaction.atomic():
        try:
            appointment = Appointment.objects.select_for_update().get(id=appointment_id)
        except Appointment.DoesNotExist:
            raise ValidationError("Appointment not found.")
            
        current_status = appointment.status
        
        # Check transition validity
        if new_status not in ALLOWED_TRANSITIONS.get(current_status, []):
            raise ValidationError(f"Invalid status transition from {current_status} to {new_status}.")
            
        # Role-based authorization check
        is_patient = hasattr(actor, 'role') and actor.role == 'patient'
        is_doctor = hasattr(actor, 'role') and actor.role == 'doctor'
        is_receptionist = hasattr(actor, 'role') and actor.role == 'receptionist'
        
        if is_patient:
            if appointment.patient.user != actor:
                raise PermissionDenied("You do not have permission to modify this appointment.")
            if new_status != 'cancelled':
                raise ValidationError("Patients can only cancel their appointments.")
                
        elif is_doctor:
            if appointment.doctor.user != actor:
                raise PermissionDenied("You do not have permission to modify this appointment.")
            if new_status not in ['accepted', 'rejected', 'cancelled', 'completed']:
                raise ValidationError("Invalid action for doctor.")
                
        elif is_receptionist:
            from receptionist.models import Receptionist
            try:
                receptionist = actor.receptionist
            except Receptionist.DoesNotExist:
                raise PermissionDenied("Receptionist profile not linked to user.")
                
            if appointment.hospital != receptionist.hospital:
                raise PermissionDenied("You cannot update appointments outside your hospital.")
            if new_status not in ['accepted', 'rejected', 'cancelled']:
                raise ValidationError("Invalid action for receptionist.")
        else:
            raise PermissionDenied("Unauthorized user role.")

        appointment.status = new_status
        if new_status == 'rejected' and reason:
            appointment.rejection_reason = reason
        appointment.save()
        
        # Log audit event
        log_audit_msg = f"Status updated to: {new_status}"
        if reason:
            log_audit_msg += f". Reason: {reason}"
        log_audit_msg += f" (by {actor.username})"
        log_audit_event(actor, "APPOINTMENT_STATUS_CHANGE", appointment.id, log_audit_msg)
        
        # Notify patient
        send_appointment_notification(appointment, new_status, reason)
        
        return appointment

def send_appointment_notification(appointment, status, reason=None):
    """Helper to send detailed notifications to the patient"""
    patient = appointment.patient
    doctor_name = appointment.doctor.full_name
    date_str = appointment.appointment_date.strftime('%B %d, %Y')
    time_str = appointment.appointment_time.strftime('%I:%M %p')
    
    if status == 'accepted':
        create_notification(
            patient=patient,
            title="Appointment Confirmed",
            message=f"Your appointment with Dr. {doctor_name} on {date_str} at {time_str} has been confirmed.",
            notification_type='appointment',
            action_url=reverse('appointments:appointment_detail', args=[appointment.pk])
        )
    elif status == 'rejected':
        msg = f"Your appointment with Dr. {doctor_name} on {date_str} has been rejected."
        if reason:
            msg += f" Reason: {reason}"
        create_notification(
            patient=patient,
            title="Appointment Rejected",
            message=msg,
            notification_type='appointment',
            action_url=reverse('appointments:appointment_detail', args=[appointment.pk])
        )
    elif status == 'cancelled':
        create_notification(
            patient=patient,
            title="Appointment Cancelled",
            message=f"Your appointment with Dr. {doctor_name} on {date_str} has been cancelled.",
            notification_type='appointment',
            action_url=reverse('appointments:appointment_detail', args=[appointment.pk])
        )
    elif status == 'completed':
        create_notification(
            patient=patient,
            title="Appointment Completed",
            message=f"Your appointment with Dr. {doctor_name} has been completed. Check your profile for prescriptions or notes.",
            notification_type='appointment',
            action_url=reverse('appointments:appointment_detail', args=[appointment.pk])
        )
    elif status == 'rescheduled':
        create_notification(
            patient=patient,
            title="Appointment Rescheduled",
            message=f"Your appointment with Dr. {doctor_name} has been rescheduled to {date_str} at {time_str}.",
            notification_type='appointment',
            action_url=reverse('appointments:appointment_detail', args=[appointment.pk])
        )

def reschedule_appointment(appointment_id, new_date, new_time, symptoms=None, payment_mode=None, actor=None):
    """
    Reschedules an existing appointment with conflict checks.
    """
    # Parse date and time if string
    if isinstance(new_date, str):
        try:
            date_obj = datetime.datetime.strptime(new_date, "%Y-%m-%d").date()
        except ValueError:
            raise ValidationError("Invalid date format.")
    else:
        date_obj = new_date

    if isinstance(new_time, str):
        try:
            time_obj = datetime.datetime.strptime(new_time, "%H:%M:%S").time()
        except ValueError:
            try:
                time_obj = datetime.datetime.strptime(new_time, "%H:%M").time()
            except ValueError:
                raise ValidationError("Invalid time format.")
    else:
        time_obj = new_time

    # Combine into a single datetime object
    appt_dt = datetime.datetime.combine(date_obj, time_obj)
    if settings.USE_TZ:
        appt_dt = timezone.make_aware(appt_dt, timezone.get_current_timezone())
        now = timezone.now()
    else:
        now = datetime.datetime.now()

    if appt_dt < now:
        raise ValidationError("Appointment date and time cannot be in the past.")

    with transaction.atomic():
        try:
            # Booking and rescheduling take locks in the same order. Locking
            # an appointment before its doctor can deadlock a competing booking.
            from doctor.models import Doctor
            doctor_id = Appointment.objects.values_list('doctor_id', flat=True).get(id=appointment_id)
            locked_doctor = Doctor.objects.select_for_update().select_related('user').get(pk=doctor_id)
            if not locked_doctor.is_active or not locked_doctor.user.is_active:
                raise ValidationError('This doctor is not available for appointments.')
            appointment = Appointment.objects.select_for_update().get(id=appointment_id)
        except Appointment.DoesNotExist:
            raise ValidationError("Appointment not found.")
        if appointment.doctor_id != doctor_id:
            raise ValidationError('The doctor changed. Please reload and try again.')
            
        if not appointment.can_edit:
            raise ValidationError("This appointment cannot be edited.")
            
        if not actor or not actor.is_authenticated or not actor.is_active:
            raise PermissionDenied("An active account is required.")
        role = getattr(actor, 'role', '')
        if role in ('doctor', 'receptionist'):
            profile = getattr(actor, role, None)
            if profile is None or not profile.is_active:
                raise PermissionDenied('An active staff profile is required.')
        allowed = (role == 'patient' and appointment.patient.user_id == actor.pk) or (
            role == 'doctor' and appointment.doctor.user_id == actor.pk) or (
            role == 'receptionist' and getattr(actor, 'receptionist', None)
            and actor.receptionist.hospital_id == appointment.hospital_id)
        if not allowed:
            raise PermissionDenied("You do not have permission to modify this appointment.")
        new_date, new_time = validate_booking_slot(date_obj, time_obj)
            
        # Check slot availability
        conflicting_appointments = Appointment.objects.select_for_update().filter(
            doctor=appointment.doctor,
            appointment_date=new_date,
            appointment_time=new_time
        ).exclude(id=appointment.id).exclude(status__in=['cancelled', 'rejected', 'expired'])
        
        if conflicting_appointments.exists():
            raise ValidationError("This time slot is already booked for the selected doctor.")
            
        appointment.appointment_date = new_date
        appointment.appointment_time = new_time
        if symptoms is not None:
            appointment.symptoms = symptoms
        if payment_mode is not None:
            appointment.payment_mode = payment_mode
            
        appointment.save()
        
        log_audit_event(actor, "APPOINTMENT_STATUS_CHANGE", appointment.id, f"Appointment rescheduled to {new_date} at {new_time} (by {actor.username})")
        
        # Notify patient
        send_appointment_notification(appointment, 'rescheduled')
        
        return appointment
