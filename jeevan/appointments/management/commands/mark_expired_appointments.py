from django.core.management.base import BaseCommand
from appointments.models import Appointment
from django.utils import timezone


class Command(BaseCommand):
    help = 'Mark expired appointments as expired status'

    def handle(self, *args, **options):
        """Mark all pending appointments with past dates as expired"""
        expired_count = Appointment.mark_expired_appointments()
        
        if expired_count > 0:
            self.stdout.write(
                self.style.SUCCESS(
                    f'Successfully marked {expired_count} appointments as expired'
                )
            )
        else:
            self.stdout.write(
                self.style.SUCCESS('No expired appointments found')
            )
