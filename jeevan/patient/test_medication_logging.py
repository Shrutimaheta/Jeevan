from datetime import timedelta
from django.test import TestCase
from django.utils import timezone
from jeevan.test_helpers import JeevanTestClientMixin
from .models import Medication, MedicationLog
from .services import medication_logging_rate, medication_logging_summary
from .views import calculate_health_score, calculate_medication_adherence


class MedicationLoggingMetricTests(JeevanTestClientMixin, TestCase):
    def setUp(self):
        self.user = self.create_user('logging_patient')
        self.patient = self.create_patient_profile(self.user)
        self.client.force_login(self.user)

    def medication(self, **changes):
        values = dict(patient=self.patient, name='Fictional medication', dosage='Example dose',
                      frequency='twice_daily', prescribed_date=timezone.localdate())
        values.update(changes)
        return Medication.objects.create(**values)

    def test_no_medications_is_not_perfect_adherence_or_zero_logging(self):
        self.assertIsNone(calculate_medication_adherence(self.patient))
        data = self.client.get('/patient/api/medication-adherence/').json()['data']
        self.assertIsNone(data['overall_adherence'])
        self.assertEqual(data['medication_count'], 0)
        self.assertIn('not proof', data['metric_description'])
        response = self.client.get('/patient/dashboard/')
        self.assertNotContains(response, 'None%')
        from django.template.loader import render_to_string
        html = render_to_string('patient/dashboard.html', {
            'patient': self.patient, 'medication_adherence': None, 'health_score': None,
        }, request=response.wsgi_request)
        self.assertIn('Medication Logging', html)
        self.assertNotIn('None%', html)
        self.assertIn('No medication logging data yet.', html)

    def test_both_dashboard_urls_use_complete_canonical_context(self):
        legacy = self.client.get('/patient/dashboard/')
        canonical = self.client.get('/patient/welcomePatient/')
        for key in ('upcoming_count', 'prescriptions_count', 'reports_count'):
            with self.subTest(key=key):
                self.assertIn(key, legacy.context)
                self.assertEqual(legacy.context[key], canonical.context[key])

    def test_twice_daily_log_means_day_logged_not_half_doses(self):
        medication = self.medication()
        log = MedicationLog.objects.create(medication=medication)
        MedicationLog.objects.filter(pk=log.pk).update(taken_date=timezone.localdate())
        self.assertEqual(medication_logging_rate(medication), 100)
        self.assertEqual(self.client.get('/patient/api/medication-adherence/').json()['data']['overall_adherence'], 100)
        self.assertIsNone(calculate_health_score(self.patient))

    def test_logs_outside_elapsed_interval_do_not_inflate_rate(self):
        medication = self.medication(prescribed_date=timezone.localdate() - timedelta(days=1))
        for offset in (-2, 0, 1):
            log = MedicationLog.objects.create(medication=medication)
            MedicationLog.objects.filter(pk=log.pk).update(taken_date=timezone.localdate() + timedelta(days=offset))
        self.assertEqual(medication_logging_rate(medication), 50)

    def test_future_prescription_has_no_eligible_logging_data(self):
        medication = self.medication(prescribed_date=timezone.localdate() + timedelta(days=1))
        self.assertIsNone(medication_logging_rate(medication))
        self.assertEqual(medication_logging_summary(self.patient), (None, 0))
