from concurrent.futures import ThreadPoolExecutor
from threading import Barrier
from unittest import skipUnless
from django.db import connection, connections, close_old_connections
from django.test import TransactionTestCase
from django.utils import timezone
from jeevan.test_helpers import JeevanTestClientMixin
from .models import Medication, MedicationLog, Patient
from .services import record_medication_day


@skipUnless(connection.vendor == 'postgresql', 'Medication row-lock behavior requires PostgreSQL.')
class ConcurrentMedicationLoggingTests(JeevanTestClientMixin, TransactionTestCase):
    def test_two_simultaneous_submissions_create_one_daily_log(self):
        patient = self.create_patient_profile(self.create_user('concurrent_logging_patient'))
        medication = Medication.objects.create(patient=patient, name='Fictional item', dosage='Example dose',
            frequency='once_daily', prescribed_date=timezone.localdate())
        barrier = Barrier(2)

        def submit():
            close_old_connections()
            try:
                owner = Patient.objects.get(pk=patient.pk)
                barrier.wait(timeout=10)
                log, created = record_medication_day(owner, medication.pk)
                return log.pk, created
            finally:
                connections.close_all()

        with ThreadPoolExecutor(max_workers=2) as pool:
            results = list(pool.map(lambda _: submit(), range(2)))
        self.assertEqual(sorted(created for _, created in results), [False, True])
        self.assertEqual(len({pk for pk, _ in results}), 1)
        self.assertEqual(MedicationLog.objects.filter(medication=medication).count(), 1)
