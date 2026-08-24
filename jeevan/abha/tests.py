import json
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.core.cache import cache

from patient.models import Patient
from abha.views import generate_unique_abha_id

User = get_user_model()

class ABHATests(TestCase):
    def setUp(self):
        self.client = Client()
        cache.clear()
        
        # Create a user
        self.user = User.objects.create_user(
            username="abhapatient",
            email="abhapatient@example.com",
            password="Password123!",
            role="patient"
        )

    def test_generate_unique_abha_id_format(self):
        abha_id = generate_unique_abha_id()
        self.assertTrue(abha_id.startswith("ABHA-"))
        # Format: ABHA-XX-YYYY-ZZZZ where X, Y, Z are digits
        parts = abha_id.split("-")
        self.assertEqual(len(parts), 4)
        self.assertEqual(parts[0], "ABHA")
        self.assertTrue(parts[1].isdigit())
        self.assertTrue(parts[2].isdigit())
        self.assertTrue(parts[3].isdigit())

    def test_otp_flow_and_attempts_limiter(self):
        # 1. Generate OTP
        url_gen = reverse('abha:generate_otp')
        payload = {
            'name': 'Abha Patient',
            'dob': '1990-05-15',
            'gender': 'M',
            'mobile': '9876543210',
            'aadhaar': '123456789012'
        }
        response = self.client.post(url_gen, json.dumps(payload), content_type='application/json')
        self.assertEqual(response.status_code, 200, response.content)
        data = response.json()
        self.assertTrue(data.get('success'), f"OTP generation failed: {data.get('error')}")
        
        # Fetch OTP directly from cache since settings.DEBUG is False in tests
        cache_key = f"abha_otp_9876543210_123456789012"
        stored_data = cache.get(cache_key)
        self.assertIsNotNone(stored_data)
        otp = stored_data['otp']
        
        # 2. Verify with wrong OTP
        url_verify = reverse('abha:verify_otp')
        wrong_payload = {
            'mobile': '9876543210',
            'aadhaar': '123456789012',
            'otp': '0000'
        }
        
        # Attempt 1
        resp_wrong1 = self.client.post(url_verify, json.dumps(wrong_payload), content_type='application/json')
        self.assertFalse(resp_wrong1.json()['success'])
        self.assertIn('Attempts remaining: 2', resp_wrong1.json()['error'])
        
        # Attempt 2
        resp_wrong2 = self.client.post(url_verify, json.dumps(wrong_payload), content_type='application/json')
        self.assertFalse(resp_wrong2.json()['success'])
        self.assertIn('Attempts remaining: 1', resp_wrong2.json()['error'])
        
        # Attempt 3 - Should fail and delete cache
        resp_wrong3 = self.client.post(url_verify, json.dumps(wrong_payload), content_type='application/json')
        self.assertFalse(resp_wrong3.json()['success'])
        self.assertIn('Too many failed attempts', resp_wrong3.json()['error'])
        
        # 3. Regenerate and verify successfully
        response_new = self.client.post(url_gen, json.dumps(payload), content_type='application/json')
        stored_data_new = cache.get(cache_key)
        self.assertIsNotNone(stored_data_new)
        otp_new = stored_data_new['otp']
        
        correct_payload = {
            'mobile': '9876543210',
            'aadhaar': '123456789012',
            'otp': otp_new
        }
        resp_correct = self.client.post(url_verify, json.dumps(correct_payload), content_type='application/json')
        self.assertTrue(resp_correct.json()['success'])
