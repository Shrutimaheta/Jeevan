"""Django settings for Jeevan.

Local development is the default. Production values must be supplied through
environment variables; secrets must never be committed to source control.
"""

import base64
import binascii
import hashlib
import os
import tempfile
from pathlib import Path
import dotenv
import dj_database_url

from django.core.exceptions import ImproperlyConfigured


BASE_DIR = Path(__file__).resolve().parent.parent
dotenv.load_dotenv(BASE_DIR.parent / '.env', override=False)
ENVIRONMENT = os.getenv("JEEVAN_ENV", "development").strip().lower()
IS_PRODUCTION = ENVIRONMENT == "production"

if ENVIRONMENT not in {"development", "production"}:
    raise ImproperlyConfigured(
        "JEEVAN_ENV must be either 'development' or 'production'."
    )


def env_bool(name, default=False):
    """Read a strict boolean environment variable."""
    value = os.getenv(name)
    if value is None:
        return default
    normalized = value.strip().lower()
    if normalized in {"1", "true", "yes", "on"}:
        return True
    if normalized in {"0", "false", "no", "off"}:
        return False
    raise ImproperlyConfigured(f"{name} must be a boolean value.")


def env_list(name, default=()):
    """Read a comma-separated environment variable."""
    value = os.getenv(name)
    if value is None:
        return list(default)
    return [item.strip() for item in value.split(",") if item.strip()]


def required_env(name):
    """Read a required non-empty environment variable."""
    value = os.getenv(name, "").strip()
    if not value:
        raise ImproperlyConfigured(f"{name} is required in production.")
    return value


if IS_PRODUCTION:
    SECRET_KEY = required_env("DJANGO_SECRET_KEY")
    # Render generates 32 random bytes encoded as 44 base64 characters.
    # Preserve their 256-bit entropy while satisfying Django's length check.
    if os.getenv('JEEVAN_RENDER_PROFILE', '') in {'preview', 'production'} and len(SECRET_KEY) == 44:
        try:
            render_secret = base64.b64decode(SECRET_KEY, validate=True)
        except (ValueError, binascii.Error):
            render_secret = b''
        if len(render_secret) == 32 and len(set(render_secret)) >= 16:
            SECRET_KEY = hashlib.sha512(render_secret).hexdigest()
    if len(SECRET_KEY) < 50 or len(set(SECRET_KEY)) < 5 or SECRET_KEY.startswith('django-insecure-'):
        raise ImproperlyConfigured('Production requires a new random DJANGO_SECRET_KEY of at least 50 characters.')
    DEBUG = False
    ALLOWED_HOSTS = env_list("DJANGO_ALLOWED_HOSTS")
    hosting_hostname = (
        os.getenv("VERCEL_URL", "").strip()
        or os.getenv("RENDER_EXTERNAL_HOSTNAME", "").strip()
    )
    if hosting_hostname and hosting_hostname not in ALLOWED_HOSTS:
        ALLOWED_HOSTS.append(hosting_hostname)
    if not ALLOWED_HOSTS:
        raise ImproperlyConfigured(
            "DJANGO_ALLOWED_HOSTS must contain at least one production host."
        )
    if '*' in ALLOWED_HOSTS:
        raise ImproperlyConfigured('Production requires explicit allowed hosts; wildcard * is not permitted.')
else:
    # This value is deliberately development-only and must never be reused in production.
    SECRET_KEY = os.getenv(
        "DJANGO_SECRET_KEY", "django-insecure-jeevan-development-only"
    ) or "django-insecure-jeevan-development-only"
    DEBUG = True
    ALLOWED_HOSTS = env_list(
        "DJANGO_ALLOWED_HOSTS", ("localhost", "127.0.0.1", "0.0.0.0")
    )


INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "drf_spectacular",
    "care",
    "doctor",
    "nurse",
    "receptionist",
    "patient",
    "abha",
    "records",
    "appointments",
    "teleconsultation",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "jeevan.middleware.PrivateResponseMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "jeevan.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    }
]

WSGI_APPLICATION = "jeevan.wsgi.application"
ASGI_APPLICATION = "jeevan.asgi.application"
if os.getenv('VERCEL') == '1':
    # Vercel otherwise prefers ASGI when both entrypoints are defined.
    ASGI_APPLICATION = None


database_url = os.getenv("DATABASE_URL", "").strip()
db_engine = os.getenv("DB_ENGINE", "django.db.backends.postgresql" if IS_PRODUCTION else "django.db.backends.sqlite3").strip()
if IS_PRODUCTION and not database_url and "sqlite" in db_engine:
    raise ImproperlyConfigured("SQLite is disabled in production. You must configure and use PostgreSQL.")

if database_url:
    DATABASES = {
        "default": dj_database_url.parse(
            database_url, conn_max_age=int(os.getenv("DB_CONN_MAX_AGE", "60"))
        )
    }
elif "sqlite" in db_engine:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / os.getenv("DB_NAME", "db.sqlite3"),
        }
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": db_engine,
            "NAME": required_env("DB_NAME") if IS_PRODUCTION else os.getenv("DB_NAME", ""),
            "USER": required_env("DB_USER") if IS_PRODUCTION else os.getenv("DB_USER", ""),
            "PASSWORD": required_env("DB_PASSWORD") if IS_PRODUCTION else os.getenv("DB_PASSWORD", ""),
            "HOST": os.getenv("DB_HOST", "localhost"),
            "PORT": os.getenv("DB_PORT", ""),
            "CONN_MAX_AGE": int(os.getenv("DB_CONN_MAX_AGE", "60" if IS_PRODUCTION else "0")),
        }
    }


AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
        "OPTIONS": {"min_length": 8},
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Kolkata"
USE_I18N = True
USE_TZ = True

STATIC_URL = "/static/"
STATICFILES_DIRS = [BASE_DIR / "static"]
STATIC_ROOT = BASE_DIR / "staticfiles"
STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

MEDIA_URL = "/media/"
MEDIA_ROOT = Path(os.getenv('MEDIA_ROOT', str(BASE_DIR / 'media')))
PRIVATE_MEDIA_ROOT = Path(os.getenv('PRIVATE_MEDIA_ROOT', str(BASE_DIR / 'private_media')))
STORAGES['private'] = {
    'BACKEND': 'django.core.files.storage.FileSystemStorage',
    'OPTIONS': {'location': PRIVATE_MEDIA_ROOT},
}
DEMO_MODE = env_bool('JEEVAN_DEMO_MODE', False)
RENDER_PROFILE = os.getenv('JEEVAN_RENDER_PROFILE', '').strip().lower()
if RENDER_PROFILE not in ('', 'preview', 'production'):
    raise ImproperlyConfigured('JEEVAN_RENDER_PROFILE must be preview or production.')
IS_RENDER_PREVIEW = RENDER_PROFILE == 'preview'
VERCEL_PROFILE = os.getenv('JEEVAN_VERCEL_PROFILE', '').strip().lower()
if VERCEL_PROFILE not in ('', 'preview'):
    raise ImproperlyConfigured('Only the fictional preview is configured for Vercel.')
IS_VERCEL_PREVIEW = VERCEL_PROFILE == 'preview'
if IS_VERCEL_PREVIEW:
    if RENDER_PROFILE or not IS_PRODUCTION or not DEMO_MODE or DATABASES['default']['NAME'] != 'jeevan_qa':
        raise ImproperlyConfigured('Vercel preview requires production settings, demo mode and a separate jeevan_qa database.')
    MEDIA_ROOT = Path(tempfile.gettempdir()) / 'jeevan-preview' / 'public'
    PRIVATE_MEDIA_ROOT = Path(tempfile.gettempdir()) / 'jeevan-preview' / 'private'
    STORAGES['private']['OPTIONS']['location'] = PRIVATE_MEDIA_ROOT
    if os.getenv('VERCEL_URL'):
        # The stable project alias must be supplied explicitly, never *.vercel.app.
        hosting_hostname = os.environ['VERCEL_URL'].strip()
if RENDER_PROFILE and not IS_PRODUCTION:
    raise ImproperlyConfigured('Render profiles require JEEVAN_ENV=production.')
PREVIEW_ACCESS_TOKEN = os.getenv('PREVIEW_ACCESS_TOKEN', '')
if IS_RENDER_PREVIEW or IS_VERCEL_PREVIEW:
    if not DEMO_MODE or DATABASES['default']['NAME'] != 'jeevan_qa':
        raise ImproperlyConfigured('Render preview requires demo mode and the disposable jeevan_qa database.')
    if len(PREVIEW_ACCESS_TOKEN) < 32 or len(os.getenv('PREVIEW_ACCOUNT_PASSWORD', '')) < 12:
        raise ImproperlyConfigured('Generate PREVIEW_ACCESS_TOKEN and PREVIEW_ACCOUNT_PASSWORD for the protected preview.')
if RENDER_PROFILE == 'production':
    if DEMO_MODE or DATABASES['default']['NAME'] == 'jeevan_qa':
        raise ImproperlyConfigured('Real-user Render deployments cannot use preview mode or the preview database.')
    if not all(path.resolve().is_relative_to(Path('/var/data').resolve()) for path in (MEDIA_ROOT, PRIVATE_MEDIA_ROOT)):
        raise ImproperlyConfigured('Render production uploads must be under the persistent /var/data mount.')
TELECONSULTATION_ENABLED = env_bool('TELECONSULTATION_ENABLED', False)
TELECONSULTATION_ORIGIN = os.getenv('TELECONSULTATION_ORIGIN', '').rstrip('/')
if os.getenv('VERCEL') == '1' and not IS_VERCEL_PREVIEW:
    raise ImproperlyConfigured('Vercel currently supports only the protected fictional preview.')
if IS_PRODUCTION and not DEMO_MODE:
    if not os.getenv('PRIVATE_MEDIA_ROOT') or not os.getenv('MEDIA_ROOT'):
        raise ImproperlyConfigured('Real-user deployments require MEDIA_ROOT and PRIVATE_MEDIA_ROOT on persistent volumes.')
    if not env_bool('JEEVAN_PERSISTENT_STORAGE', False):
        raise ImproperlyConfigured('Verify durable volumes and set JEEVAN_PERSISTENT_STORAGE=true.')
    if not MEDIA_ROOT.is_absolute() or not PRIVATE_MEDIA_ROOT.is_absolute():
        raise ImproperlyConfigured('Production media directories must be absolute paths.')
    if any(PRIVATE_MEDIA_ROOT.resolve().is_relative_to(directory.resolve())
           for directory in (MEDIA_ROOT, STATIC_ROOT, BASE_DIR / 'static', BASE_DIR / 'jeevan' / 'static')):
        raise ImproperlyConfigured('Private medical files must not be placed under public media or static directories.')
    if os.getenv('VERCEL') == '1':
        raise ImproperlyConfigured('Local-file storage cannot host real patient files on Vercel. Use a persistent host.')
if TELECONSULTATION_ENABLED:
    from urllib.parse import urlsplit
    meeting_origin = urlsplit(TELECONSULTATION_ORIGIN)
    if meeting_origin.scheme != 'https' or not meeting_origin.netloc or meeting_origin.path:
        raise ImproperlyConfigured('TELECONSULTATION_ORIGIN must be an HTTPS origin.')
    if not env_bool('TELECONSULTATION_ADMISSION_VERIFIED', False):
        raise ImproperlyConfigured('Verify meeting admission controls before enabling teleconsultations.')
if not IS_PRODUCTION:
    STORAGES['staticfiles']['BACKEND'] = 'django.contrib.staticfiles.storage.StaticFilesStorage'


DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
# Bound bulk exports by original file bytes, including highly compressible files.
REPORT_EXPORT_PATIENT_LIMIT = 50
REPORT_EXPORT_FILE_LIMIT = 500
REPORT_EXPORT_BYTE_LIMIT = 100 * 1024 * 1024
TRUSTED_PROXY_NETWORKS = env_list('JEEVAN_TRUSTED_PROXY_NETWORKS')
try:
    from ipaddress import ip_network
    for network in TRUSTED_PROXY_NETWORKS:
        ip_network(network)
except ValueError as exc:
    raise ImproperlyConfigured('JEEVAN_TRUSTED_PROXY_NETWORKS must contain valid IP networks.') from exc
AUTH_USER_MODEL = "care.CustomUser"

LOGIN_URL = "/login/"
LOGIN_REDIRECT_URL = "/"
LOGOUT_REDIRECT_URL = "/login/"


if IS_PRODUCTION:
    EMAIL_BACKEND = os.getenv(
        "EMAIL_BACKEND", "django.core.mail.backends.smtp.EmailBackend"
    )
    if EMAIL_BACKEND in ("django.core.mail.backends.console.EmailBackend", "django.core.mail.backends.dummy.EmailBackend"):
        EMAIL_HOST = ""
        EMAIL_HOST_USER = ""
        EMAIL_HOST_PASSWORD = ""
    else:
        EMAIL_HOST = required_env("EMAIL_HOST")
        EMAIL_HOST_USER = required_env("EMAIL_HOST_USER")
        EMAIL_HOST_PASSWORD = required_env("EMAIL_HOST_PASSWORD")
else:
    EMAIL_BACKEND = os.getenv(
        "EMAIL_BACKEND", "django.core.mail.backends.console.EmailBackend"
    )
    EMAIL_HOST = os.getenv("EMAIL_HOST", "")
    EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER", "")
    EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD", "")

if IS_PRODUCTION and not DEMO_MODE and EMAIL_BACKEND != 'django.core.mail.backends.smtp.EmailBackend':
    raise ImproperlyConfigured('Real-user deployments require an SMTP email backend.')
if (IS_RENDER_PREVIEW or IS_VERCEL_PREVIEW) and EMAIL_BACKEND != 'django.core.mail.backends.dummy.EmailBackend':
    raise ImproperlyConfigured('Render preview must disable email delivery with the dummy backend.')
if IS_PRODUCTION and DATABASES['default']['ENGINE'] != 'django.db.backends.postgresql':
    raise ImproperlyConfigured('Production requires PostgreSQL, including DATABASE_URL.')

EMAIL_PORT = int(os.getenv("EMAIL_PORT", "587"))
EMAIL_TIMEOUT = int(os.getenv('EMAIL_TIMEOUT', '10'))
EMAIL_USE_TLS = env_bool("EMAIL_USE_TLS", True)
DEFAULT_FROM_EMAIL = os.getenv(
    "DEFAULT_FROM_EMAIL", "JeevanCare <noreply@localhost>"
)
if IS_PRODUCTION and not DEMO_MODE:
    from email.utils import parseaddr
    from django.core.validators import validate_email
    from django.core.exceptions import ValidationError
    sender_address = parseaddr(DEFAULT_FROM_EMAIL)[1]
    try:
        validate_email(sender_address)
        if sender_address.rsplit('@', 1)[-1].lower() == 'localhost':
            raise ValidationError('A deliverable sender is required.')
    except ValidationError as exc:
        raise ImproperlyConfigured('Set DEFAULT_FROM_EMAIL to a valid production sender address.') from exc


SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_REFERRER_POLICY = "strict-origin-when-cross-origin"
SECURE_CROSS_ORIGIN_OPENER_POLICY = "same-origin"
X_FRAME_OPTIONS = "DENY"

SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_AGE = int(os.getenv("SESSION_COOKIE_AGE", "3600"))
SESSION_EXPIRE_AT_BROWSER_CLOSE = True
SESSION_SAVE_EVERY_REQUEST = True

CSRF_COOKIE_HTTPONLY = False
CSRF_COOKIE_AGE = 3600
CSRF_USE_SESSIONS = False
CSRF_FAILURE_VIEW = 'jeevan.security_views.csrf_failure'
CSRF_TRUSTED_ORIGINS = env_list(
    "DJANGO_CSRF_TRUSTED_ORIGINS",
    ("http://localhost:8000", "http://127.0.0.1:8000") if not IS_PRODUCTION else (),
)
if IS_PRODUCTION and hosting_hostname:
    hosting_origin = f"https://{hosting_hostname}"
    if hosting_origin not in CSRF_TRUSTED_ORIGINS:
        CSRF_TRUSTED_ORIGINS.append(hosting_origin)

SESSION_COOKIE_SECURE = IS_PRODUCTION
CSRF_COOKIE_SECURE = IS_PRODUCTION
SECURE_SSL_REDIRECT = IS_PRODUCTION
SECURE_HSTS_SECONDS = (
    int(os.getenv("SECURE_HSTS_SECONDS", "31536000")) if IS_PRODUCTION else 0
)
SECURE_HSTS_INCLUDE_SUBDOMAINS = IS_PRODUCTION
SECURE_HSTS_PRELOAD = IS_PRODUCTION
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https") if IS_PRODUCTION else None
if RENDER_PROFILE or IS_VERCEL_PREVIEW:
    SECURE_REDIRECT_EXEMPT = [r'^health/(live|ready)/$']
    MIDDLEWARE.insert(1, 'jeevan.render_hosting.RenderPreviewMiddleware')

# Logging configuration
LOG_DIR = BASE_DIR / "logs"
if os.getenv("VERCEL", "") == "1":
    # Vercel function deployments have a read-only source directory.
    LOG_DIR = Path(tempfile.gettempdir()) / 'jeevan-logs'
LOG_DIR.mkdir(parents=True, exist_ok=True)

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "{levelname} {asctime} {module} {process:d} {thread:d} {message}",
            "style": "{",
        },
        "simple": {
            "format": "{levelname} {message}",
            "style": "{",
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "simple",
        },
        "file": {
            "level": "ERROR",
            "class": "logging.FileHandler",
            "filename": LOG_DIR / "django_errors.log",
            "formatter": "verbose",
        },
        "audit_file": {
            "level": "INFO",
            "class": "jeevan.logging_handlers.CryptographicAuditLogHandler",
            "filename": LOG_DIR / "audit.log",
            "formatter": "verbose",
        },
    },
    "loggers": {
        "django": {
            "handlers": ["console", "file"],
            "level": "INFO",
            "propagate": True,
        },
        "jeevan.audit": {
            "handlers": ["audit_file"],
            "level": "INFO",
            "propagate": False,
        },
    },
}

if IS_PRODUCTION:
    LOGGING['loggers']['django']['handlers'] = ['console']
    LOGGING['loggers']['jeevan.audit']['handlers'] = ['console']
    LOGGING['handlers'].pop('file', None)
    LOGGING['handlers'].pop('audit_file', None)

# REST Framework & Swagger Documentation Settings
REST_FRAMEWORK = {
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

SPECTACULAR_SETTINGS = {
    "TITLE": "Jeevan Healthcare API",
    "DESCRIPTION": "Comprehensive EMR and Patient Management System APIs",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
}
