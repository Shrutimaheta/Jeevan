from datetime import time, timedelta
from django.test import TestCase
from django.urls import reverse
from django.utils import timezone
from appointments.models import Appointment
from jeevan.test_helpers import JeevanTestClientMixin


class ReceptionistWorkflowRegressionTests(JeevanTestClientMixin, TestCase):
    def setUp(self):
        self.hospital = self.create_hospital()
        self.user = self.create_user('list_receptionist', role='receptionist')
        self.create_receptionist_profile(self.user, self.hospital, full_name='List Receptionist')
        doctor_user = self.create_user('list_doctor', role='doctor')
        self.doctor = self.create_doctor_profile(doctor_user, self.hospital)
        patient_user = self.create_user('list_patient')
        self.patient = self.create_patient_profile(patient_user)
        self.client.force_login(self.user)

    def test_reading_list_preserves_accepted_visit_for_completion(self):
        appointment = Appointment.objects.create(patient=self.patient, doctor=self.doctor,
            hospital=self.hospital, appointment_date=timezone.localdate() + timedelta(days=1),
            appointment_time=time(10), status='accepted')
        Appointment.objects.filter(pk=appointment.pk).update(appointment_date=timezone.localdate() - timedelta(days=1))
        self.assertEqual(self.client.get(reverse('receptionist:appointments')).status_code, 200)
        appointment.refresh_from_db()
        self.assertEqual(appointment.status, 'accepted')

    def test_malformed_date_and_doctor_filters_are_client_errors(self):
        for value in ('not-a-date', '2026-02-31'):
            with self.subTest(value=value):
                self.assertEqual(self.client.get(reverse('receptionist:appointments'), {'date': value}).status_code, 400)
                self.assertEqual(self.client.get(reverse('receptionist:doctor_availability'), {'date': value}).status_code, 400)

    def test_status_actions_require_post(self):
        url = reverse('receptionist:appointment_action', args=[123, 'accept'])
        self.assertEqual(self.client.get(url).status_code, 405)

    def test_patient_filter_does_not_render_another_clinics_identity(self):
        user = self.create_user('other_clinic_patient')
        other = self.create_patient_profile(user, full_name='Unrelated Private Patient')
        response = self.client.get(reverse('receptionist:appointments'), {'patient': other.pk})
        self.assertEqual(response.status_code, 302)
        self.assertNotContains(self.client.get(response.url), other.full_name)
