from django.core.management.base import BaseCommand
from django.utils import timezone
from care.models import RequestLimit


class Command(BaseCommand):
    help = 'Remove expired request-limit counters; run daily.'

    def handle(self, *args, **options):
        deleted, _ = RequestLimit.objects.filter(expires_at__lt=timezone.now()).delete()
        self.stdout.write(f'Removed {deleted} expired counters.')
