from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse
from patient.models import Patient

class ABHAAvailabilityTests(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(username='abha_patient', password='Example123!', role='patient')
        self.client.force_login(self.user)

    def test_no_fake_id_or_otp_is_issued(self):
        for endpoint in ('generate_otp', 'verify_otp', 'verify_abha', 'create_abha_id', 'check_abha_uniqueness'):
            response = self.client.post(reverse('abha:' + endpoint), {'mobile': '9876543210'})
            self.assertEqual(response.status_code, 503)
            self.assertFalse(response.json()['success'])
            self.assertNotIn('otp', response.json())
            self.assertNotIn('abha_id', response.json())
        self.assertFalse(Patient.objects.filter(user=self.user).exists())

    def test_csrf_and_authentication_are_required(self):
        client = Client(enforce_csrf_checks=True)
        client.force_login(self.user)
        self.assertEqual(client.post(reverse('abha:generate_otp')).status_code, 403)
        self.client.logout()
        self.assertEqual(self.client.post(reverse('abha:generate_otp')).status_code, 302)
