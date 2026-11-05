from datetime import timedelta
from django.test import TestCase
from django.urls import reverse
from django.utils import timezone
from appointments.models import Appointment
from jeevan.test_helpers import JeevanTestClientMixin
from .models import MedicalRecord


class RecordNavigationTests(JeevanTestClientMixin, TestCase):
    def setUp(self):
        self.user = self.create_user('records_navigation')
        self.patient = self.create_patient_profile(self.user)
        self.client.force_login(self.user)

    def test_profile_medical_history_and_legacy_url_open_own_records(self):
        target = reverse('records:record_list', args=[self.patient.pk])
        response = self.client.get(reverse('patient:patient_profile'))
        self.assertContains(response, f'href="{target}"')
        self.assertNotContains(response, '/patient/save-abha-id/')
        self.assertRedirects(self.client.get('/patient/medical-records/'), target)
        self.assertContains(self.client.get(target), 'No medical records yet')

    def test_populated_records_detail_and_patient_isolation(self):
        hospital = self.create_hospital()
        doctor = self.create_doctor_profile(self.create_user('navigation_doctor', role='doctor'), hospital)
        appointment = Appointment.objects.create(patient=self.patient, doctor=doctor, hospital=hospital,
            appointment_date=timezone.localdate()+timedelta(days=1), appointment_time='10:00', status='accepted')
        record = MedicalRecord.objects.create(patient=self.patient, doctor=doctor, appointment=appointment,
            summary='Fictional visit summary', diagnosis='Fictional diagnosis')
        detail = reverse('records:record_detail', args=[record.pk])
        listing = reverse('records:record_list', args=[self.patient.pk])
        self.assertContains(self.client.get(listing), f'href="{detail}"')
        self.assertContains(self.client.get(detail), 'Fictional visit summary')
        outsider = self.create_user('navigation_outsider')
        self.create_patient_profile(outsider)
        self.client.force_login(outsider)
        self.assertEqual(self.client.get(listing).status_code, 403)
        self.assertEqual(self.client.get(detail).status_code, 403)
