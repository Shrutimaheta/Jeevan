import base64
from pathlib import Path
from tempfile import TemporaryDirectory
from types import SimpleNamespace
from unittest.mock import patch

from django.core.exceptions import ImproperlyConfigured
from django.core.management import call_command
from django.http import Http404, HttpResponse, JsonResponse
from django.test import RequestFactory, SimpleTestCase, TestCase, override_settings

from care.models import CustomUser
from care import test_production_config as config_tests
from jeevan.render_hosting import RenderPreviewMiddleware, public_media


class RenderConfigurationTests(SimpleTestCase):
    def configuration(self, **changes):
        return config_tests.ProductionConfigurationTests().configuration(**changes)

    def preview(self, **changes):
        values = dict(JEEVAN_RENDER_PROFILE='preview', JEEVAN_DEMO_MODE='true',
            DATABASE_URL='postgresql://example:example@localhost/jeevan_qa',
            PREVIEW_ACCESS_TOKEN='fictional-access-token-12345678901234567890',
            PREVIEW_ACCOUNT_PASSWORD='Fictional-Password!47',
            EMAIL_BACKEND='django.core.mail.backends.dummy.EmailBackend',
            RENDER_EXTERNAL_HOSTNAME='jeevan-preview.onrender.com')
        values.update(changes)
        return self.configuration(**values)

    def test_free_preview_keeps_https_and_private_cookies_and_disables_email(self):
        config = self.preview(EMAIL_HOST='', EMAIL_HOST_USER='', EMAIL_HOST_PASSWORD='')
        self.assertTrue(config['IS_RENDER_PREVIEW'])
        self.assertFalse(config['DEBUG'])
        self.assertTrue(config['SESSION_COOKIE_SECURE'])
        self.assertIn('jeevan-preview.onrender.com', config['ALLOWED_HOSTS'])
        self.assertIn('https://jeevan-preview.onrender.com', config['CSRF_TRUSTED_ORIGINS'])
        self.assertIn('jeevan.render_hosting.RenderPreviewMiddleware', config['MIDDLEWARE'])

    def test_preview_refuses_real_database_disabled_demo_and_missing_access_gate(self):
        for change in ({'DATABASE_URL': 'postgresql://user:pass@localhost/clinic'},
                       {'JEEVAN_DEMO_MODE': 'false'}, {'PREVIEW_ACCESS_TOKEN': ''},
                       {'PREVIEW_ACCOUNT_PASSWORD': ''},
                       {'EMAIL_BACKEND': 'django.core.mail.backends.console.EmailBackend'}):
            with self.subTest(change=change), self.assertRaises(ImproperlyConfigured):
                self.preview(**change)

    def test_real_user_render_profile_requires_durable_disk_and_non_preview_database(self):
        root = Path('/var/data').resolve()
        values = dict(JEEVAN_RENDER_PROFILE='production',
                      MEDIA_ROOT=str(root / 'public-media'), PRIVATE_MEDIA_ROOT=str(root / 'private-media'))
        self.assertFalse(self.configuration(**values)['IS_RENDER_PREVIEW'])
        for change in ({'JEEVAN_DEMO_MODE': 'true'},
                       {'DATABASE_URL': 'postgresql://user:pass@localhost/jeevan_qa'},
                       {'MEDIA_ROOT': str(Path(__file__).resolve().parent / 'ephemeral')},
                       {'JEEVAN_PERSISTENT_STORAGE': 'false'}):
            with self.subTest(change=change), self.assertRaises(ImproperlyConfigured):
                self.configuration(**{**values, **change})

    def test_unknown_render_profile_is_rejected(self):
        with self.assertRaises(ImproperlyConfigured):
            self.configuration(JEEVAN_RENDER_PROFILE='prodution')

    def test_render_generated_secret_retains_entropy_and_rejects_weak_or_malformed_values(self):
        import hashlib
        raw = bytes(range(32))
        encoded = base64.b64encode(raw).decode('ascii')
        self.assertEqual(self.preview(DJANGO_SECRET_KEY=encoded)['SECRET_KEY'], hashlib.sha512(raw).hexdigest())
        for secret in ('A' * 44, base64.b64encode(b'x' * 32).decode('ascii')):
            with self.subTest(secret=secret), self.assertRaises(ImproperlyConfigured):
                self.preview(DJANGO_SECRET_KEY=secret)
        with self.assertRaises(ImproperlyConfigured):
            self.configuration(DJANGO_SECRET_KEY=encoded)


@override_settings(IS_RENDER_PREVIEW=True, PREVIEW_ACCESS_TOKEN='fictional-access-token-12345678901234567890')
class PreviewAccessTests(SimpleTestCase):
    def setUp(self):
        self.factory = RequestFactory()

    def request(self, path='/', credentials='preview:fictional-access-token-12345678901234567890'):
        header = 'Basic ' + base64.b64encode(credentials.encode()).decode()
        return self.factory.get(path, HTTP_AUTHORIZATION=header)

    def test_unknown_and_malformed_credentials_are_denied_before_the_app_runs(self):
        from unittest.mock import Mock
        app = Mock()
        middleware = RenderPreviewMiddleware(app)
        for header in ('', 'Bearer fake', 'Basic !bad-base64', 'Basic /w==',
                       'Basic ' + base64.b64encode(b'other:wrong').decode()):
            with self.subTest(header=header):
                response = middleware(self.factory.get('/', HTTP_AUTHORIZATION=header))
                self.assertEqual(response.status_code, 401)
                self.assertIn('Basic realm=', response['WWW-Authenticate'])
                self.assertIn('no-store', response['Cache-Control'])
        app.assert_not_called()

    def test_authorized_html_has_visible_notice_correct_length_and_no_stale_etag(self):
        def app(request):
            response = HttpResponse('<html><body class="test">Clinic</body></html>')
            response['Content-Length'] = '1'
            response['ETag'] = 'stale'
            return response
        response = RenderPreviewMiddleware(app)(self.request())
        self.assertContains(response, 'Fictional-data preview only')
        self.assertContains(response, 'Email delivery is disabled')
        self.assertEqual(int(response['Content-Length']), len(response.content))
        self.assertFalse(response.has_header('ETag'))
        self.assertEqual(response['X-Robots-Tag'], 'noindex, nofollow, noarchive')

    def test_json_and_monitoring_are_not_modified_or_auth_blocked(self):
        app = lambda request: JsonResponse({'status': 'ok'})
        for path in ('/health/live/', '/health/ready/'):
            response = RenderPreviewMiddleware(app)(self.factory.get(path))
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.content, b'{"status": "ok"}')
        self.assertEqual(RenderPreviewMiddleware(app)(self.request('/patient/api/vitals/')).status_code, 200)

    def test_email_recovery_does_not_claim_to_send_a_disabled_email(self):
        from unittest.mock import Mock
        app = Mock()
        response = RenderPreviewMiddleware(app)(self.request('/patient/forgot-password/'))
        self.assertEqual(response.status_code, 503)
        self.assertContains(response, 'recovery are disabled', status_code=503)
        app.assert_not_called()

    @override_settings(IS_RENDER_PREVIEW=False)
    def test_preview_gate_does_not_affect_real_clinic_requests(self):
        response = RenderPreviewMiddleware(lambda request: HttpResponse('clinic'))(self.factory.get('/'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, b'clinic')
        self.assertFalse(response.has_header('WWW-Authenticate'))


@override_settings(RENDER_PROFILE='production')
class PublicImageTests(SimpleTestCase):
    def setUp(self):
        self.directory = TemporaryDirectory(dir=Path(__file__).resolve().parents[1])
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name) / 'public'
        self.root.mkdir()
        self.override = override_settings(MEDIA_ROOT=self.root)
        self.override.enable()
        self.addCleanup(self.override.disable)
        self.factory = RequestFactory()

    def test_public_image_bytes_are_delivered_with_safe_content_headers(self):
        content = b'fictional-image-bytes'
        (self.root / 'photo.png').write_bytes(content)
        response = public_media(self.factory.get('/media/photo.png'), 'photo.png')
        self.assertEqual(response['Content-Type'], 'image/png')
        self.assertEqual(response['X-Content-Type-Options'], 'nosniff')
        self.assertIn('sandbox', response['Content-Security-Policy'])
        self.assertEqual(b''.join(response.streaming_content), content)
        response.close()

    def test_traversal_private_documents_active_content_and_directories_are_denied(self):
        (self.root.parent / 'secret.png').write_bytes(b'private')
        (self.root / 'report.pdf').write_bytes(b'private-report')
        (self.root / 'script.svg').write_bytes(b'<svg/>')
        (self.root / 'page.html').write_text('<script>secret</script>')
        for name in ('../secret.png', 'report.pdf', 'script.svg', 'page.html', '.', 'missing.png', 'invalid\x00.png'):
            with self.subTest(name=name), self.assertRaises(Http404):
                public_media(self.factory.get('/media/' + name), name)

    def test_media_endpoint_rejects_writes(self):
        self.assertEqual(public_media(self.factory.post('/media/photo.png'), 'photo.png').status_code, 405)


class PreviewSeedingTests(TestCase):
    def test_only_explicit_disposable_preview_can_seed_under_production_settings(self):
        config = SimpleNamespace(IS_PRODUCTION=True, IS_RENDER_PREVIEW=True, DEMO_MODE=True,
                                 DATABASES={'default': {'NAME': 'jeevan_qa'}})
        with patch('care.management.commands.seed_demo.settings', config):
            call_command('seed_demo', password='Fictional-Password!47')
        user = CustomUser.objects.get(username='ananya.patel')
        self.assertTrue(user.check_password('Fictional-Password!47'))
        self.assertFalse(CustomUser.objects.filter(is_superuser=True).exists())
