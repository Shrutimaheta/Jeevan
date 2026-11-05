"""Render-specific preview isolation and public image delivery.

Medical files remain in private storage and use the existing authorized routes.
"""
import base64
import binascii
import re
import secrets
from pathlib import Path

from django.conf import settings
from django.http import FileResponse, Http404, HttpResponse
from django.utils.cache import patch_cache_control
from django.views.decorators.http import require_safe


PREVIEW_NOTICE = (
    b'<style>body{padding-bottom:110px!important}'
    b'@media(max-width:480px){body{padding-bottom:160px!important}}</style>'
    b'<aside role="note" id="jeevan-preview-notice" style="position:fixed;'
    b'bottom:0;left:0;right:0;z-index:2147483647;padding:12px 20px;'
    b'background:#fff3cd;color:#5c4100;border-bottom:2px solid #b77900;'
    b'font:600 15px/1.5 system-ui,sans-serif;text-align:center">'
    b'Fictional-data preview only. Do not enter real patient information. '
    b'Uploaded files can disappear after a restart. Email delivery is disabled.</aside>'
)


class RenderPreviewMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not settings.IS_RENDER_PREVIEW:
            return self.get_response(request)
        if request.path in ('/health/live/', '/health/ready/'):
            response = self.get_response(request)
        elif not self.authorized(request):
            response = HttpResponse('Protected fictional-data preview. Use the preview access credentials.', status=401)
            response['WWW-Authenticate'] = 'Basic realm="Jeevan fictional-data preview", charset="UTF-8"'
        elif request.path.startswith(('/patient/forgot-password', '/patient/verify-otp/',
                                      '/patient/verify-email-otp/', '/patient/reset-password/')):
            response = HttpResponse('Email and password recovery are disabled in this fictional-data preview. '
                                    'Use the preview accounts provided by the operator.', status=503)
        else:
            response = self.get_response(request)
        patch_cache_control(response, private=True, no_store=True, no_cache=True, must_revalidate=True)
        response['X-Robots-Tag'] = 'noindex, nofollow, noarchive'
        if (not response.streaming and response.get('Content-Type', '').startswith('text/html')
                and not response.get('Content-Encoding')):
            response.content = re.sub(br'(<body\b[^>]*>)', lambda match: match.group(1) + PREVIEW_NOTICE,
                                      response.content, count=1, flags=re.IGNORECASE)
            if response.has_header('Content-Length'):
                response['Content-Length'] = str(len(response.content))
            if response.has_header('ETag'):
                del response['ETag']
        return response

    @staticmethod
    def authorized(request):
        try:
            scheme, encoded = request.headers.get('Authorization', '').split(' ', 1)
            if scheme.lower() != 'basic' or not settings.PREVIEW_ACCESS_TOKEN:
                return False
            username, password = base64.b64decode(encoded, validate=True).decode('utf-8').split(':', 1)
            return (username == 'preview' and secrets.compare_digest(
                password.encode('utf-8'), settings.PREVIEW_ACCESS_TOKEN.encode('utf-8')))
        except (ValueError, UnicodeError, binascii.Error):
            return False


@require_safe
def public_media(request, name):
    """Serve only raster images from public media on hosts without a file proxy."""
    if not settings.RENDER_PROFILE:
        raise Http404
    types = {'.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
             '.gif': 'image/gif', '.webp': 'image/webp', '.avif': 'image/avif',
             '.ico': 'image/x-icon', '.bmp': 'image/bmp', '.tif': 'image/tiff', '.tiff': 'image/tiff'}
    root = Path(settings.MEDIA_ROOT).resolve()
    try:
        target = (root / name).resolve()
    except (OSError, RuntimeError, ValueError):
        raise Http404 from None
    if not target.is_relative_to(root) or target.suffix.lower() not in types:
        raise Http404
    try:
        if not target.is_file():
            raise Http404
        response = FileResponse(target.open('rb'), content_type=types[target.suffix.lower()])
    except OSError:
        raise Http404 from None
    response['X-Content-Type-Options'] = 'nosniff'
    response['Content-Security-Policy'] = "default-src 'none'; sandbox"
    patch_cache_control(response, public=True, max_age=300)
    return response
