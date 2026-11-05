from datetime import timedelta
from django.test import TestCase
from django.utils import timezone
from jeevan.test_helpers import JeevanTestClientMixin
from .forms import PatientProfileForm


class PatientProfileInputTests(JeevanTestClientMixin, TestCase):
    def setUp(self):
        self.user = self.create_user('profile_inputs', email='profile@example.test')
        self.patient = self.create_patient_profile(self.user)

    def data(self, **changes):
        data = dict(full_name='Patient Example', email=self.user.email, contact_number='9876543210',
                    gender='Male', date_of_birth='1990-01-01', address='Fictional address', city='Ahmedabad', pincode='380001')
        data.update(changes)
        return data

    def test_profile_rejects_future_birth_and_non_numeric_phone(self):
        form = PatientProfileForm(self.data(date_of_birth=(timezone.localdate()+timedelta(days=1)).isoformat(),
                                           contact_number='abc'), instance=self.patient)
        self.assertFalse(form.is_valid())
        self.assertIn('date_of_birth', form.errors)
        self.assertIn('contact_number', form.errors)

    def test_profile_email_duplicate_is_case_insensitive(self):
        self.create_user('existing_email', email='existing@example.test')
        form = PatientProfileForm(self.data(email='EXISTING@example.test'), instance=self.patient)
        self.assertFalse(form.is_valid())
        self.assertIn('email', form.errors)

    def test_existing_photo_is_not_reopened_when_saving_text(self):
        self.patient.profile_photo = 'patient_photos/old-unavailable-photo.png'
        self.patient.save()
        form = PatientProfileForm(self.data(), instance=self.patient)
        self.assertTrue(form.is_valid(), form.errors)
        updated = form.save()
        self.assertEqual(updated.profile_photo.name, 'patient_photos/old-unavailable-photo.png')

    def test_password_change_rejects_common_password(self):
        self.client.force_login(self.user)
        response = self.client.post('/patient/change-password/', {
            'current_password': 'password123', 'new_password': 'password123', 'confirm_password': 'password123'})
        self.assertEqual(response.status_code, 200)
        self.assertIn('new_password', response.context['form'].errors)

    def test_password_change_redirects_and_logs_out_without_server_error(self):
        self.client.force_login(self.user)
        response = self.client.post('/patient/change-password/', {
            'current_password': 'password123', 'new_password': 'Changed-QA-Password!47',
            'confirm_password': 'Changed-QA-Password!47'})
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, '/login/')
        self.assertNotIn('_auth_user_id', self.client.session)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password('Changed-QA-Password!47'))
