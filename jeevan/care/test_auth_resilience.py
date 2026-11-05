from unittest.mock import patch
import json
from django.test import TestCase
from care.models import RequestLimit
from jeevan.test_helpers import JeevanTestClientMixin


class LoginFailureRecoveryTests(JeevanTestClientMixin, TestCase):
    def setUp(self):
        self.user = self.create_user('login_resilience', email='Login.Example@example.test')
        self.create_patient_profile(self.user)

    def test_throttled_browser_keeps_form_and_retry_guidance_without_password(self):
        with patch('jeevan.throttling.time.time', return_value=600):
            for _ in range(6):
                response = self.client.post('/login/', {'username': self.user.username,
                    'role': 'patient', 'password': 'Secret-Failed-QA-Password'})
        self.assertEqual(response.status_code, 429)
        self.assertEqual(response['Retry-After'], '60')
        self.assertContains(response, 'id="loginForm"', status_code=429)
        self.assertContains(response, 'Wait one minute', status_code=429)
        self.assertContains(response, 'value="login_resilience"', status_code=429)
        self.assertNotContains(response, 'Secret-Failed-QA-Password', status_code=429)
        with patch('jeevan.throttling.time.time', return_value=660):
            response = self.client.post('/login/', {'username': self.user.username,
                'role': 'patient', 'password': 'password123'})
        self.assertEqual(response.status_code, 302)
        self.assertEqual(int(self.client.session['_auth_user_id']), self.user.pk)

    def test_unsafe_next_clears_previous_target_and_never_redirects_outside_site(self):
        self.client.get('/login/', {'next': '/appointments/'})
        self.assertEqual(self.client.session['next_url'], '/appointments/')
        self.client.get('/login/', {'next': '//evil.example/collect'})
        self.assertNotIn('next_url', self.client.session)
        response = self.client.post('/login/', {'username': self.user.username,
            'role': 'patient', 'password': 'password123'})
        self.assertEqual(response.url, '/patient/welcomePatient/')

    def test_failed_password_keeps_safe_destination_for_corrected_attempt(self):
        self.client.get('/login/', {'next': '/appointments/create/?doctor=12'})
        response = self.client.post('/login/', {'username': self.user.username,
            'role': 'patient', 'password': 'incorrect'})
        self.assertEqual(response.status_code, 200)
        response = self.client.post('/login/', {'username': self.user.username,
            'role': 'patient', 'password': 'password123'})
        self.assertEqual(response.url, '/appointments/create/?doctor=12')

    def test_email_sign_in_is_case_insensitive_and_trims_surrounding_spaces(self):
        response = self.client.post('/login/', {'username': '  LOGIN.EXAMPLE@EXAMPLE.TEST  ',
            'role': 'patient', 'password': 'password123'})
        self.assertEqual(response.status_code, 302)
        self.assertEqual(int(self.client.session['_auth_user_id']), self.user.pk)

    def test_login_rejects_unsupported_methods_without_consuming_attempt_budget(self):
        response = self.client.put('/login/', '{}', content_type='application/json')
        self.assertEqual(response.status_code, 405)
        self.assertFalse(RequestLimit.objects.exists())


class PublicChatFailureTests(TestCase):
    def test_excessive_json_nesting_is_a_client_error(self):
        response = self.client.post('/chat/dialogflow/webhook/',
            '{"queryResult":' + '[' * 1200 + '0' + ']' * 1200 + '}', content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_malformed_or_nested_nonobject_payloads_are_rejected(self):
        for payload in ([], None, {'queryResult': None}, {'queryResult': []},
                        {'queryResult': {'intent': None}},
                        {'queryResult': {'parameters': []}},
                        {'queryResult': {'intent': {'displayName': []}}}):
            with self.subTest(payload=payload):
                response = self.client.post('/chat/dialogflow/webhook/', json.dumps(payload), content_type='application/json')
                self.assertEqual(response.status_code, 400)

    def test_unsupported_human_chat_does_not_claim_to_forward_a_message(self):
        response = self.client.post('/chat/dialogflow/webhook/', json.dumps({
            'queryResult': {'intent': {'displayName': 'Escalation.Human'}}}), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('unavailable', response.json()['fulfillmentText'])
        self.assertIn('no message has been forwarded', response.json()['fulfillmentText'])

    def test_appointment_navigation_rejects_query_injection(self):
        response = self.client.post('/chat/dialogflow/webhook/', json.dumps({
            'queryResult': {'intent': {'displayName': 'Appointment.Query'},
                            'parameters': {'hospital': '1&next=https://evil.example'}}}), content_type='application/json')
        self.assertEqual(response.status_code, 400)


class HonestClinicDirectoryTests(JeevanTestClientMixin, TestCase):
    def setUp(self):
        self.hospital = self.create_hospital(name='Listed Ahmedabad Clinic', location='Ahmedabad', contact_no='9000000047')

    def test_directory_uses_real_clinic_contact_without_invented_emergency_claims(self):
        response = self.client.get('/emergency/nearest-hospitals/')
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, '<h1>Clinic directory</h1>')
        self.assertContains(response, 'tel:9000000047')
        self.assertContains(response, 'does not calculate proximity')
        self.assertNotContains(response, 'tel:108')
        self.assertNotContains(response, '24/7 Emergency Services')
        self.assertNotContains(response, 'Finding nearest hospitals')
        self.assertNotContains(response, 'getCurrentPosition')

    def test_directory_search_and_missing_phone_have_no_false_fallback(self):
        self.create_hospital(name='Other Surat Clinic', location='Surat', registration_number='OTHER47', contact_no='')
        response = self.client.get('/emergency/nearest-hospitals/', {'search': 'Surat'})
        self.assertContains(response, 'Other Surat Clinic')
        self.assertContains(response, 'Clinic phone not listed.')
        self.assertNotContains(response, 'Listed Ahmedabad Clinic')
        self.assertNotContains(response, 'tel:108')

    def test_directory_empty_search_can_be_cleared(self):
        response = self.client.get('/emergency/nearest-hospitals/', {'search': 'Missing Clinic'})
        self.assertContains(response, 'No clinics found')
        self.assertContains(response, 'href="/emergency/nearest-hospitals/"')
