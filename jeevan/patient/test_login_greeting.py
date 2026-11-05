from django.test import TestCase
from django.urls import reverse
from django.contrib.messages import get_messages
from jeevan.test_helpers import JeevanTestClientMixin


class PatientLoginGreetingTests(JeevanTestClientMixin, TestCase):
    def setUp(self):
        self.user = self.create_user('greeting_patient')
        self.patient = self.create_patient_profile(self.user, full_name='Greeting Patient')

    def sign_in(self, **extra):
        return self.client.post(reverse('universal_login'), {
            'username': self.user.username, 'password': 'password123', 'role': 'patient', **extra,
        }, follow=True)

    def test_first_login_welcomes_and_refresh_keeps_same_greeting(self):
        response = self.sign_in()
        self.assertContains(response, 'Welcome, Greeting Patient!')
        self.assertNotContains(response, 'Welcome back, Greeting Patient!')
        self.assertFalse(any('Welcome' in str(message) for message in get_messages(response.wsgi_request)))
        self.user.refresh_from_db()
        self.assertIsNotNone(self.user.last_login)
        self.assertContains(self.client.get(reverse('patient:profile_dashboard')), 'Welcome, Greeting Patient!')

    def test_next_login_welcomes_back(self):
        self.sign_in()
        self.client.logout()
        response = self.sign_in()
        self.assertContains(response, 'Welcome back, Greeting Patient!')
        self.assertNotContains(response, 'Welcome, Greeting Patient!')
        self.assertFalse(any('Welcome' in str(message) for message in get_messages(response.wsgi_request)))

    def test_failed_attempt_does_not_use_up_first_login(self):
        self.sign_in(password='incorrect')
        self.user.refresh_from_db()
        self.assertIsNone(self.user.last_login)
        response = self.sign_in(next=reverse('patient:patient_dashboard'))
        self.assertContains(response, 'Welcome, Greeting Patient!')
