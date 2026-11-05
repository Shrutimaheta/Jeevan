"""One local-time scheduling policy: 15-minute visits, 09:00–18:00."""
from datetime import datetime, time, timedelta
from django.core.exceptions import ValidationError
from django.utils import timezone

SLOT_MINUTES = 15
OPENING_TIME = time(9)
CLOSING_TIME = time(18)
INACTIVE_STATUSES = ('cancelled', 'rejected', 'expired')


def validate_booking_slot(day, slot):
    if isinstance(day, str):
        try:
            day = datetime.strptime(day, '%Y-%m-%d').date()
        except ValueError as exc:
            raise ValidationError('Invalid date format.') from exc
    if isinstance(slot, str):
        try:
            slot = time.fromisoformat(slot)
        except ValueError as exc:
            raise ValidationError('Invalid time format.') from exc
    if not day or not slot:
        raise ValidationError('Appointment date and time must be explicitly specified.')
    if not (OPENING_TIME <= slot < CLOSING_TIME):
        raise ValidationError('Appointments must start between 9:00 AM and 5:45 PM.')
    if slot.minute % SLOT_MINUTES or slot.second or slot.microsecond:
        raise ValidationError('Please choose a 15-minute appointment slot.')
    local_now = timezone.localtime()
    start = timezone.make_aware(datetime.combine(day, slot))
    if start <= local_now:
        raise ValidationError('Appointment date and time cannot be in the past.')
    if day > local_now.date() + timedelta(days=180):
        raise ValidationError('Appointment date cannot be more than 6 months in the future.')
    return day, slot
