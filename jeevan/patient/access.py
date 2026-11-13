"""Who may see which patient.

One place for the rule so every staff-facing patient view applies the same
scoping:

* patient       -> only their own record
* doctor        -> patients they have an appointment with or approved consent for
* receptionist  -> patients associated with the receptionist's hospital
* nurse         -> patients associated with the nurse's hospital
* superuser     -> everyone
"""

from django.db.models import Q

from .models import Patient


def _staff_hospital(user):
    for attr in ("receptionist", "nurse"):
        profile = getattr(user, attr, None)
        if profile is not None and getattr(profile, "hospital_id", None):
            return profile.hospital_id
    return None


def visible_patients_for(user):
    """Return the queryset of patients ``user`` is allowed to see."""
    if not user.is_authenticated:
        return Patient.objects.none()
    if user.is_superuser:
        return Patient.objects.all()

    role = getattr(user, "role", None)

    if role == "patient":
        return Patient.objects.filter(user=user)

    if role == "doctor":
        doctor = getattr(user, "doctor", None)
        if doctor is None:
            return Patient.objects.none()
        from doctor.models import Consent  # local import avoids app-loading cycles

        consent_ids = [
            c.patient_id
            for c in Consent.objects.filter(doctor=doctor, status="approved")
            if c.is_approved()
        ]
        return Patient.objects.filter(
            Q(appointments__doctor=doctor) | Q(id__in=consent_ids)
        ).distinct()

    if role in ("receptionist", "nurse"):
        hospital_id = _staff_hospital(user)
        if hospital_id is None:
            return Patient.objects.none()
        return Patient.objects.filter(associated_hospitals__id=hospital_id).distinct()

    return Patient.objects.none()


def can_view_patient(user, patient):
    return visible_patients_for(user).filter(pk=patient.pk).exists()
