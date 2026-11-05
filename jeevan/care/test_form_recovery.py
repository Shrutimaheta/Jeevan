from django.test import Client, SimpleTestCase


class RejectedFormRecoveryTests(SimpleTestCase):
    def test_missing_csrf_keeps_protection_and_shows_safe_recovery(self):
        response = Client(enforce_csrf_checks=True).post('/login/', {'password': 'fictional-secret'})
        self.assertContains(response, 'Please reopen the form', status_code=403)
        self.assertContains(response, 'href="/login/"', status_code=403)
        self.assertNotContains(response, 'fictional-secret', status_code=403)
        self.assertNotContains(response, 'CSRF cookie not set', status_code=403)
        self.assertIn('no-store', response['Cache-Control'])
