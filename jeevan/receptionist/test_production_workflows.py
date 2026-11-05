from datetime import timedelta
from unittest.mock import patch

from django.core.exceptions import ValidationError
from django.test import TestCase
from django.urls import reverse
from django.utils import timezone

from appointments.models import Appointment
from care.models import CustomUser
from jeevan.test_helpers import JeevanTestClientMixin
from patient.models import Patient
from receptionist.forms import ReceptionistBookAppointmentForm
from receptionist.patient_forms import ReceptionistPatientRegistrationForm


class ReceptionistIntakeProductionTests(JeevanTestClientMixin, TestCase):
    def setUp(self):
        self.hospital = self.create_hospital()
        self.user = self.create_user('intake_reception', role='receptionist')
        self.create_receptionist_profile(self.user, self.hospital, full_name='Intake Receptionist')
        doctor_user = self.create_user('intake_doctor', role='doctor')
        self.doctor = self.create_doctor_profile(doctor_user, self.hospital)
        self.client.force_login(self.user)

    def walkin_data(self):
        return dict(patient_name='Fictional Walkin Patient', email='walkin@example.test', contact_number='9000000011',
                    gender='female', date_of_birth='1990-01-01', address='Fictional Intake Street', city='Ahmedabad',
                    pincode='380001', abha_id='', emergency_number='9000000012',
                    existing_condition='', allergies='', blood_group='', doctor=self.doctor.pk,
                    appointment_date=(timezone.localdate() + timedelta(days=2)).isoformat(),
                    appointment_time='10:00', symptoms='Fictional intake request')

    def registration_data(self):
        return dict(username='registered_intake_patient', first_name='Fictional', last_name='Registered Patient',
                    email='registered@example.test', contact_number='9000000021', gender='Female',
                    dob='1990-01-01', address='Fictional Intake Street', city='Ahmedabad', pincode='380001',
                    password='Fictional-Portal!47-Zebra', confirm_password='Fictional-Portal!47-Zebra')

    def test_new_walkin_booking_succeeds_without_abha_or_partial_account(self):
        management = self.client.get(reverse('receptionist:patient_list'))
        self.assertContains(management, 'Book walk-in appointment')
        self.assertContains(management, f'href="{reverse("receptionist:book_appointment")}"')
        data = self.walkin_data()
        form = ReceptionistBookAppointmentForm(data, hospital=self.hospital)
        self.assertTrue(form.is_valid(), form.errors)
        response = self.client.post(reverse('receptionist:book_appointment'), data)
        self.assertEqual(response.status_code, 302)
        user = CustomUser.objects.get(email='walkin@example.test')
        self.assertFalse(user.has_usable_password())
        patient = Patient.objects.get(user=user)
        self.assertEqual(patient.gender, 'Female')
        self.assertTrue(patient.associated_hospitals.filter(pk=self.hospital.pk).exists())
        appointment = Appointment.objects.get(patient=patient)
        self.assertEqual(appointment.status, 'pending')
        self.assertEqual(appointment.doctor_id, self.doctor.pk)

    def test_walkin_email_recovery_can_set_first_portal_password(self):
        import re
        from django.test import Client
        from patient.models import PasswordResetToken
        self.assertEqual(self.client.post(reverse('receptionist:book_appointment'), self.walkin_data()).status_code, 302)
        user = CustomUser.objects.get(email='walkin@example.test')
        browser = Client(REMOTE_ADDR='192.0.2.210')
        with patch('patient.forgot_password_views.send_mail') as send:
            response = browser.post(reverse('patient:forgot_password'), {'recovery_method': 'email', 'email': user.email})
        self.assertEqual(response.status_code, 302)
        send.assert_called_once()
        code = re.search(r'code is: (\d{6})', send.call_args.args[1]).group(1)
        response = browser.post(response.url, {'otp': code})
        self.assertEqual(response.status_code, 302)
        token = PasswordResetToken.objects.get(patient=user.patient_profile, is_used=False)
        response = browser.post(reverse('patient:reset_password', args=[token.token]), {
            'new_password': 'New-Portal-Fictional!47', 'confirm_password': 'New-Portal-Fictional!47'})
        self.assertEqual(response.status_code, 302)
        user.refresh_from_db()
        self.assertTrue(user.check_password('New-Portal-Fictional!47'))

    def test_late_booking_failure_rolls_back_new_account_and_profile(self):
        with patch('appointments.services.create_appointment', side_effect=ValidationError('Slot is no longer available.')):
            response = self.client.post(reverse('receptionist:book_appointment'), self.walkin_data())
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Slot is no longer available.')
        self.assertFalse(CustomUser.objects.filter(email='walkin@example.test').exists())
        self.assertFalse(Patient.objects.filter(full_name='Fictional Walkin Patient').exists())
        self.assertFalse(Appointment.objects.exists())

    def test_walkin_phone_cannot_overwrite_staff_or_other_clinic_identity(self):
        other = self.create_user('intake_other_staff', role='doctor', full_name='Unchanged Staff Member', contact_number='9000000011')
        data = self.walkin_data()
        data['email'] = ''
        response = self.client.post(reverse('receptionist:book_appointment'), data)
        self.assertEqual(response.status_code, 200)
        other.refresh_from_db()
        self.assertEqual(other.full_name, 'Unchanged Staff Member')
        self.assertEqual(other.role, 'doctor')
        self.assertFalse(Patient.objects.filter(user=other).exists())
        self.assertFalse(Appointment.objects.exists())

    def test_receptionist_registration_creates_valid_patient_portal_account(self):
        data = self.registration_data()
        form = ReceptionistPatientRegistrationForm(data)
        self.assertTrue(form.is_valid(), form.errors)
        response = self.client.post(reverse('receptionist:register_patient'), data)
        self.assertEqual(response.status_code, 302)
        user = CustomUser.objects.get(username=data['username'])
        self.assertTrue(user.check_password(data['password']))
        self.assertEqual(user.patient_profile.date_of_birth.isoformat(), data['dob'])
        self.assertTrue(user.patient_profile.associated_hospitals.filter(pk=self.hospital.pk).exists())
        self.assertTrue(self.client.login(username=data['username'], password=data['password']))

    def test_registration_rejects_common_password_and_case_variant_email(self):
        data = self.registration_data()
        data.update(password='password', confirm_password='password', email=self.user.email.upper())
        form = ReceptionistPatientRegistrationForm(data)
        self.assertFalse(form.is_valid())
        self.assertIn('password', form.errors)
        self.assertIn('email', form.errors)

    def test_profile_creation_failure_rolls_back_registered_user(self):
        with patch('receptionist.services.Patient.full_clean', side_effect=ValidationError('Invalid patient profile.')):
            response = self.client.post(reverse('receptionist:register_patient'), self.registration_data())
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Invalid patient profile.')
        self.assertFalse(CustomUser.objects.filter(username='registered_intake_patient').exists())

    def test_registration_rejects_future_or_implausibly_old_birth_date(self):
        for birth_date in ((timezone.localdate() + timedelta(days=1)).isoformat(), '1800-01-01'):
            with self.subTest(birth_date=birth_date):
                data = self.registration_data()
                data['dob'] = birth_date
                response = self.client.post(reverse('receptionist:register_patient'), data)
                self.assertEqual(response.status_code, 200)
                self.assertIn('dob', response.context['form'].errors)
                self.assertFalse(CustomUser.objects.filter(username=data['username']).exists())
