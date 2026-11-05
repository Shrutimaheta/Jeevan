"""Patient access rules shared by HTML, download and API views.

An appointment permits demographics for the assigned doctor; medical records
require explicit, unexpired consent. Hospital staff are scoped to registered
patients. Administrative account privileges do not imply clinical access.
"""
from django.db.models import Q
from django.utils import timezone


def active_consents(doctor, patient=None):
    from doctor.models import Consent
    query = Consent.objects.filter(doctor=doctor, status='approved').filter(
        Q(expires_at__isnull=True) | Q(expires_at__gt=timezone.now())
    )
    return query.filter(patient=patient) if patient is not None else query


def has_medical_consent(doctor, patient):
    return doctor.is_active and doctor.user.is_active and active_consents(doctor, patient).exists()


def patients_for_user(user, clinical=False):
    from .models import Patient
    patients = Patient.objects.select_related('user')
    if not user.is_authenticated or not user.is_active:
        return patients.none()
    role = getattr(user, 'role', '')
    if role == 'patient':
        return patients.filter(user=user)
    if role == 'doctor':
        from doctor.models import Doctor
        doctor = Doctor.objects.filter(user=user, is_active=True).first()
        if not doctor:
            return patients.none()
        consent_ids = active_consents(doctor).values('patient_id')
        access = Q(pk__in=consent_ids)
        if not clinical:
            access |= Q(appointments__doctor=doctor,
                        appointments__status__in=['accepted', 'completed'])
        return patients.filter(access).distinct()
    if role in ('nurse', 'receptionist'):
        if clinical and role == 'receptionist':
            return patients.none()
        profile = getattr(user, role, None)
        if profile is not None and getattr(profile, 'is_active', True):
            return patients.filter(associated_hospitals=profile.hospital).distinct()
    return patients.none()


def can_access_patient(user, patient, clinical=False):
    return patients_for_user(user, clinical=clinical).filter(pk=patient.pk).exists()
