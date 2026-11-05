"""Atomic clinic registration and walk-in booking, without account reuse/overwrite."""
import uuid

from django.core.exceptions import PermissionDenied, ValidationError
from django.db import transaction
from django.utils import timezone

from care.models import CustomUser
from patient.models import Patient


def _active_receptionist(receptionist):
    if (not receptionist.is_active or not receptionist.user.is_active
            or receptionist.user.role != 'receptionist'):
        raise PermissionDenied('An active receptionist account is required.')


def _new_patient(receptionist, data, *, portal_account):
    _active_receptionist(receptionist)
    email = (data.get('email') or '').strip().lower() or None
    contact = data.get('contact_number') or None
    if ((email and CustomUser.objects.filter(email__iexact=email).exists())
            or (contact and CustomUser.objects.filter(contact_number=contact).exists())):
        raise ValidationError('Unable to register with these details. For an existing clinic patient, use Patients → Book Appointment.')
    full_name = (f"{data['first_name']} {data['last_name']}" if portal_account else data['patient_name']).strip()
    birth_date = data['dob'] if portal_account else data['date_of_birth']
    today = timezone.localdate()
    age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
    if birth_date > today or age > 120:
        raise ValidationError('Enter a date of birth between today and 120 years ago.')
    user = CustomUser(username=data['username'] if portal_account else 'walkin_' + uuid.uuid4().hex,
                      email=email, contact_number=contact, full_name=full_name, role='patient')
    if portal_account:
        from django.contrib.auth.password_validation import validate_password
        validate_password(data['password'], user=user)
        user.set_password(data['password'])
    else:
        # Walk-in intake never invents a usable password. Email recovery can set one later.
        user.set_unusable_password()
    user.full_clean()
    user.save()
    profile = Patient(user=user, full_name=full_name,
                      gender=data['gender'].title(),
                      date_of_birth=birth_date,
                      address=data['address'], city=data['city'], pincode=data['pincode'])
    if not portal_account:
        profile.abha_id = data.get('abha_id') or None
        for name in ('blood_group', 'emergency_number', 'existing_condition', 'allergies'):
            setattr(profile, name, data.get(name) or '')
    profile.full_clean()
    profile.save()
    profile.associated_hospitals.add(receptionist.hospital)
    return profile


@transaction.atomic
def register_patient(receptionist, data):
    patient = _new_patient(receptionist, data, portal_account=True)
    from jeevan.decorators import log_audit_event
    log_audit_event(receptionist.user, 'REGISTER_CLINIC_PATIENT', patient.pk)
    return patient


@transaction.atomic
def book_walkin_patient(receptionist, data):
    patient = _new_patient(receptionist, data, portal_account=False)
    from appointments.services import create_appointment
    appointment = create_appointment(patient=patient, doctor=data['doctor'], hospital=receptionist.hospital,
        appointment_date=data['appointment_date'], appointment_time=data['appointment_time'],
        symptoms=data.get('symptoms', ''), payment_mode='cash', status='pending', actor=receptionist.user)
    return appointment
