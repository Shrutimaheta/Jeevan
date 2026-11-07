from pathlib import Path

from django.core.exceptions import ImproperlyConfigured
from django.test import SimpleTestCase, override_settings
from django.http import HttpResponse
from django.test import RequestFactory

from care import test_render_hosting as render_tests
from jeevan.render_hosting import RenderPreviewMiddleware


class VercelConfigurationTests(SimpleTestCase):
    def configuration(self, **changes):
        values = dict(VERCEL='1', VERCEL_URL='fictional-preview.vercel.app',
                      JEEVAN_VERCEL_PROFILE='preview', JEEVAN_DEMO_MODE='true',
                      DATABASE_URL='postgresql://example:example@localhost/jeevan_qa',
                      PREVIEW_ACCESS_TOKEN='fictional-access-token-12345678901234567890',
                      PREVIEW_ACCOUNT_PASSWORD='Fictional-Password!47',
                      EMAIL_BACKEND='django.core.mail.backends.dummy.EmailBackend')
        values.update(changes)
        return render_tests.RenderConfigurationTests().configuration(**values)

    def test_preview_uses_temporary_private_uploads_and_explicit_hosts(self):
        config = self.configuration()
        self.assertTrue(config['IS_VERCEL_PREVIEW'])
        self.assertFalse(config['IS_RENDER_PREVIEW'])
        self.assertIsNone(config['ASGI_APPLICATION'])
        self.assertNotIn('.vercel.app', config['ALLOWED_HOSTS'])
        self.assertIn('fictional-preview.vercel.app', config['ALLOWED_HOSTS'])
        self.assertNotEqual(config['MEDIA_ROOT'], config['PRIVATE_MEDIA_ROOT'])
        self.assertNotEqual(config['PRIVATE_MEDIA_ROOT'], Path(config['BASE_DIR']) / 'private_media')
        self.assertTrue(config['SESSION_COOKIE_SECURE'])

    def test_incomplete_or_real_patient_configuration_is_rejected(self):
        for change in ({'JEEVAN_VERCEL_PROFILE': ''}, {'JEEVAN_DEMO_MODE': 'false'},
                       {'DATABASE_URL': 'postgresql://user:pass@localhost/clinic'},
                       {'PREVIEW_ACCESS_TOKEN': ''}, {'PREVIEW_ACCOUNT_PASSWORD': ''},
                       {'EMAIL_BACKEND': 'django.core.mail.backends.console.EmailBackend'},
                       {'JEEVAN_RENDER_PROFILE': 'preview'}):
            with self.subTest(change=change), self.assertRaises(ImproperlyConfigured):
                self.configuration(**change)

    @override_settings(IS_RENDER_PREVIEW=False, IS_VERCEL_PREVIEW=True, PREVIEW_ACCESS_TOKEN='x' * 32)
    def test_vercel_preview_is_access_protected(self):
        response = RenderPreviewMiddleware(lambda request: HttpResponse('secret'))(RequestFactory().get('/'))
        self.assertEqual(response.status_code, 401)
        self.assertIn('no-store', response['Cache-Control'])
        self.assertEqual(response['X-Robots-Tag'], 'noindex, nofollow, noarchive')
