from datetime import timedelta, time
from django.test import TestCase
from django.utils import timezone
from jeevan.test_helpers import JeevanTestClientMixin
from .models import Appointment


class PatientAppointmentInputTests(JeevanTestClientMixin, TestCase):
    def setUp(self):
        self.user = self.create_user('input_patient')
        self.patient = self.create_patient_profile(self.user)
        self.client.force_login(self.user)

    def test_bad_selection_ids_cannot_crash_booking_page(self):
        for field in ('hospital', 'doctor'):
            for value in ('abc', '9999999999999999999999', '-1'):
                with self.subTest(field=field, value=value):
                    self.assertEqual(self.client.get('/appointments/create/', {field: value}).status_code, 400)

    def test_bad_hospital_post_is_rendered_as_form_error(self):
        response = self.client.post('/appointments/create/', {
            'hospital': 'abc', 'doctor': 'abc',
            'appointment_date': (timezone.localdate() + timedelta(days=1)).isoformat(),
            'appointment_time': '10:00', 'hour': '10', 'minute': '0',
            'am_pm': 'AM', 'payment_mode': 'cash',
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn('hospital', response.context['form'].errors)
        self.assertFalse(Appointment.objects.exists())

    def test_missing_preselected_doctor_does_not_lock_an_empty_form(self):
        self.assertEqual(self.client.get('/appointments/create/?doctor=999999').status_code, 400)
        self.assertEqual(self.client.post('/appointments/create/?doctor=999999', {}).status_code, 400)

    def test_each_appointment_notification_links_to_its_detail(self):
        from django.urls import resolve, reverse
        from appointments.services import send_appointment_notification
        hospital = self.create_hospital()
        doctor = self.create_doctor_profile(self.create_user('notification_doctor', role='doctor'), hospital)
        appointment = Appointment.objects.create(patient=self.patient, doctor=doctor, hospital=hospital,
            appointment_date=timezone.localdate()+timedelta(days=1), appointment_time=time(10), status='pending')
        for status in ('accepted', 'rejected', 'cancelled', 'completed', 'rescheduled'):
            with self.subTest(status=status):
                send_appointment_notification(appointment, status)
                notification = self.patient.notifications.latest('pk')
                self.assertEqual(notification.action_url, reverse('appointments:appointment_detail', args=[appointment.pk]))
                match = resolve(notification.action_url)
                self.assertEqual(match.view_name, 'appointments:appointment_detail')
                self.assertEqual(match.kwargs['appointment_id'], appointment.pk)
                self.assertEqual(self.client.get(notification.action_url).status_code, 200)

    def test_reading_list_does_not_change_other_patients_appointments(self):
        hospital = self.create_hospital()
        doctor_user = self.create_user('list_doctor', role='doctor')
        doctor = self.create_doctor_profile(doctor_user, hospital)
        other = self.create_patient_profile(self.create_user('other_list_patient'))
        appointment = Appointment.objects.create(patient=other, doctor=doctor, hospital=hospital,
            appointment_date=timezone.localdate() + timedelta(days=1), appointment_time=time(10), status='pending')
        Appointment.objects.filter(pk=appointment.pk).update(appointment_date=timezone.localdate() - timedelta(days=1))
        self.assertEqual(self.client.get('/appointments/').status_code, 200)
        appointment.refresh_from_db()
        self.assertEqual(appointment.status, 'pending')
