from decimal import Decimal, InvalidOperation
from django.core.exceptions import PermissionDenied, ValidationError
from django.db import transaction
from .access import can_access_patient
from .models import VitalSign, Patient, WellnessLog


def medication_logging_rate(medication, today=None):
    """Self-reported days with a log; this cannot measure prescribed doses."""
    from django.utils import timezone
    today = today or timezone.localdate()
    elapsed_days = (today - medication.prescribed_date).days + 1
    if elapsed_days <= 0:
        return None
    logged_days = medication.logs.filter(
        taken_date__gte=medication.prescribed_date, taken_date__lte=today
    ).values('taken_date').distinct().count()
    return round(min(100, logged_days / elapsed_days * 100), 1)


def medication_logging_summary(patient):
    rates = [medication_logging_rate(medication) for medication in patient.medications.filter(is_active=True)]
    rates = [rate for rate in rates if rate is not None]
    return (round(sum(rates) / len(rates), 1) if rates else None), len(rates)


@transaction.atomic
def record_medication_day(patient, medication_id, notes=''):
    """One self-reported log per clinic day, serialized on the medication row."""
    from django.utils import timezone
    from django.http import Http404
    from .models import Medication, MedicationLog
    value = str(medication_id)
    if isinstance(medication_id, bool) or not value.isascii() or not value.isdigit() or len(value) > 9:
        raise ValidationError('Choose a valid medication.')
    if not isinstance(notes, str) or len(notes) > 5000:
        raise ValidationError({'notes': ['Enter text of at most 5000 characters.']})
    medication = Medication.objects.select_for_update().filter(pk=medication_id, patient=patient).first()
    if medication is None:
        raise Http404('Medication not found.')
    today = timezone.localdate()
    if not medication.is_active or medication.prescribed_date > today:
        raise ValidationError('Only current active medications can be logged.')
    # Existing duplicate historical rows must not crash or be silently deleted.
    existing = MedicationLog.objects.filter(medication=medication, taken_date=today).order_by('pk').first()
    if existing:
        return existing, False
    return MedicationLog.objects.create(medication=medication, taken_date=today, notes=notes), True


@transaction.atomic
def record_wellness(patient, readings):
    """Serialize daily edits and validate before writing any values."""
    from django.utils import timezone
    Patient.objects.select_for_update().get(pk=patient.pk)
    log = WellnessLog.objects.filter(patient=patient, date=timezone.localdate()).first()
    created = log is None
    if created:
        log = WellnessLog(patient=patient, date=timezone.localdate(), sleep_hours=0, mood_score=3)
    bounds = {'water_intake_glasses': (0, 100), 'sleep_hours': (0, 24),
              'steps_count': (0, 200000), 'mood_score': (1, 5),
              'exercise_minutes': (0, 1440), 'stress_level': (1, 5)}
    for field, (minimum, maximum) in bounds.items():
        if field not in readings:
            continue
        raw = readings[field]
        try:
            value = Decimal(str(raw))
            if isinstance(raw, bool) or not value.is_finite() or not minimum <= value <= maximum:
                raise ValueError()
            if field != 'sleep_hours' and value != value.to_integral_value():
                raise ValueError()
        except (ValueError, InvalidOperation, TypeError) as exc:
            raise ValidationError({field: [f'Enter a number between {minimum} and {maximum}.']}) from exc
        setattr(log, field, value.normalize() if field == 'sleep_hours' else int(value))
    if 'notes' in readings:
        if not isinstance(readings['notes'], str) or len(readings['notes']) > 5000:
            raise ValidationError({'notes': ['Enter text of at most 5000 characters.']})
        log.notes = readings['notes']
    log.full_clean()
    log.save()
    return log, created


@transaction.atomic
def record_vitals(patient, actor, **readings):
    """One validation path for patient API and nurse forms, preserving decimals."""
    if getattr(actor, 'role', '') not in ('patient', 'nurse') or not can_access_patient(actor, patient, clinical=True):
        raise PermissionDenied('You cannot record readings for this patient.')
    for field in ('temperature', 'weight'):
        value = readings.get(field)
        if value is not None and value != '':
            try:
                readings[field] = Decimal(str(value)).normalize()
            except (InvalidOperation, ValueError) as exc:
                raise ValidationError({field: ['Enter a valid number.']}) from exc
        elif field == 'weight':
            readings[field] = None
    vital = VitalSign(patient=patient, **readings)
    vital.full_clean()
    vital.save()
    from jeevan.decorators import log_audit_event
    log_audit_event(actor, 'LOG_PATIENT_VITALS', vital.pk)
    return vital
