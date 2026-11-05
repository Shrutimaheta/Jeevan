from unittest.mock import patch

from django.test import TestCase


class HealthFailureTests(TestCase):
    def test_liveness_stays_available_during_database_failure(self):
        with patch('django.db.connection.cursor', side_effect=OSError('private-host:secret')):
            response = self.client.get('/health/live/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'status': 'ok'})

    def test_readiness_reports_database_failure_without_leaking_connection_details(self):
        with patch('django.db.connection.cursor', side_effect=OSError('private-host:secret')):
            response = self.client.get('/health/ready/')
        self.assertEqual(response.status_code, 503)
        self.assertEqual(response.json(), {'status': 'unavailable'})
        self.assertNotIn('secret', response.content.decode())

    def test_monitoring_endpoints_reject_writes(self):
        for path in ('/health/live/', '/health/ready/'):
            with self.subTest(path=path):
                self.assertEqual(self.client.post(path).status_code, 405)
