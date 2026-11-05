import os
from pathlib import Path
import runpy
import tempfile
from unittest.mock import patch
from django.core.exceptions import ImproperlyConfigured
from django.test import SimpleTestCase, RequestFactory, override_settings


class ProductionConfigurationTests(SimpleTestCase):
    def configuration(self, **changes):
        directory = Path(tempfile.gettempdir()) / "jeevan-config-tests"
        env = {
            'JEEVAN_ENV': 'production',
            'DJANGO_SECRET_KEY': 'configuration-test-only-key-' * 3,
            'DJANGO_ALLOWED_HOSTS': 'clinic.example.org',
            'DATABASE_URL': 'postgresql://example:example@localhost/example',
            'EMAIL_BACKEND': 'django.core.mail.backends.smtp.EmailBackend',
            'EMAIL_HOST': 'smtp.example.org', 'EMAIL_HOST_USER': 'example', 'EMAIL_HOST_PASSWORD': 'example',
            'DEFAULT_FROM_EMAIL': 'Clinic <noreply@example.org>',
            'MEDIA_ROOT': str(Path(directory) / 'public'),
            'PRIVATE_MEDIA_ROOT': str(Path(directory) / 'private'),
            'JEEVAN_PERSISTENT_STORAGE': 'true',
        }
        env.update(changes)
        with patch.dict(os.environ, env, clear=True):
            return runpy.run_path(str(Path(__file__).resolve().parents[1] / 'jeevan' / 'settings.py'))

    def test_postgres_url_takes_precedence_over_local_sqlite_default(self):
        config = self.configuration(DB_ENGINE='django.db.backends.sqlite3')
        self.assertFalse(config['DEBUG'])
        self.assertTrue(config['SESSION_COOKIE_SECURE'])
        self.assertEqual(config['DATABASES']['default']['ENGINE'], 'django.db.backends.postgresql')

    def test_sqlite_url_is_rejected_in_production(self):
        with self.assertRaises(ImproperlyConfigured):
            self.configuration(DATABASE_URL='sqlite:///unsafe.sqlite3')

    def test_unsafe_secret_and_unrestricted_hosts_are_rejected(self):
        for key in ('short', 'x' * 80, 'django-insecure-' + 'abc123' * 12):
            with self.subTest(key=key), self.assertRaises(ImproperlyConfigured):
                self.configuration(DJANGO_SECRET_KEY=key)
        with self.assertRaises(ImproperlyConfigured):
            self.configuration(DJANGO_ALLOWED_HOSTS='*')

    def test_placeholder_or_malformed_recovery_sender_is_rejected(self):
        for sender in ('JeevanCare <noreply@localhost>', 'invalid', ''):
            with self.subTest(sender=sender), self.assertRaises(ImproperlyConfigured):
                self.configuration(DEFAULT_FROM_EMAIL=sender)

    def test_console_email_is_rejected_for_real_users(self):
        with self.assertRaises(ImproperlyConfigured):
            self.configuration(EMAIL_BACKEND='django.core.mail.backends.console.EmailBackend')

    def test_unverified_or_public_private_storage_is_rejected(self):
        with self.assertRaises(ImproperlyConfigured):
            self.configuration(JEEVAN_PERSISTENT_STORAGE='false')
        with self.assertRaises(ImproperlyConfigured):
            self.configuration(PRIVATE_MEDIA_ROOT='relative-private-path')
        with self.assertRaises(ImproperlyConfigured):
            self.configuration(MEDIA_ROOT=str(Path(tempfile.gettempdir())), PRIVATE_MEDIA_ROOT=str(Path(tempfile.gettempdir()) / 'publicly-accessible'))

    def test_video_cannot_be_enabled_without_verified_admission(self):
        with self.assertRaises(ImproperlyConfigured):
            self.configuration(TELECONSULTATION_ENABLED='true', TELECONSULTATION_ORIGIN='https://meet.example.org')


class ProxyAddressTests(SimpleTestCase):
    @override_settings(TRUSTED_PROXY_NETWORKS=[])
    def test_untrusted_forwarding_header_is_ignored(self):
        from jeevan.throttling import client_ip
        request = RequestFactory().get('/', REMOTE_ADDR='198.51.100.8', HTTP_X_FORWARDED_FOR='1.1.1.1')
        self.assertEqual(client_ip(request), '198.51.100.8')

    @override_settings(TRUSTED_PROXY_NETWORKS=['10.0.0.0/8'])
    def test_proxy_chain_stops_at_the_first_untrusted_hop(self):
        from jeevan.throttling import client_ip
        request = RequestFactory().get('/', REMOTE_ADDR='10.0.0.2', HTTP_X_FORWARDED_FOR='1.1.1.1, 198.51.100.8, 10.0.0.1')
        self.assertEqual(client_ip(request), '198.51.100.8')

    @override_settings(TRUSTED_PROXY_NETWORKS=['10.0.0.0/8'])
    def test_malformed_header_falls_back_to_remote_address(self):
        from jeevan.throttling import client_ip
        request = RequestFactory().get('/', REMOTE_ADDR='10.0.0.2', HTTP_X_FORWARDED_FOR='invalid')
        self.assertEqual(client_ip(request), '10.0.0.2')
