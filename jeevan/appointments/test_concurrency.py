from concurrent.futures import ThreadPoolExecutor
from datetime import timedelta, time
from threading import Barrier
from unittest import skipUnless
from django.core.exceptions import ValidationError
from django.db import connection, connections, close_old_connections
from django.test import TransactionTestCase
from django.utils import timezone
from jeevan.test_helpers import JeevanTestClientMixin
from appointments.models import Appointment
from appointments.services import create_appointment


@skipUnless(connection.vendor == 'postgresql', 'Row-lock concurrency is verified on PostgreSQL in CI.')
class ConcurrentBookingTests(JeevanTestClientMixin, TransactionTestCase):
    def test_only_one_concurrent_booking_can_win(self):
        hospital = self.create_hospital()
        doctor_user = self.create_user('concurrent_doctor', role='doctor')
        doctor = self.create_doctor_profile(doctor_user, hospital)
        patient_user = self.create_user('concurrent_patient')
        patient = self.create_patient_profile(patient_user)
        barrier = Barrier(2)

        def book():
            close_old_connections()
            try:
                from doctor.models import Doctor
                from patient.models import Patient
                assigned = Doctor.objects.select_related('user', 'hospital').get(pk=doctor.pk)
                attendee = Patient.objects.select_related('user').get(pk=patient.pk)
                barrier.wait(timeout=10)
                try:
                    create_appointment(attendee, assigned, assigned.hospital,
                        timezone.localdate()+timedelta(days=1), time(10), actor=attendee.user)
                    return True
                except ValidationError:
                    return False
            finally:
                connections.close_all()

        with ThreadPoolExecutor(max_workers=2) as pool:
            results = list(pool.map(lambda _: book(), range(2)))
        self.assertEqual(sorted(results), [False, True])
        self.assertEqual(Appointment.objects.count(), 1)
