"""Django settings for Jeevan.

Local development is the default. Production values must be supplied through
environment variables; secrets must never be committed to source control.
"""

import os
import sys
from pathlib import Path
import dotenv
import dj_database_url

from django.core.exceptions import ImproperlyConfigured


BASE_DIR = Path(__file__).resolve().parent.parent
# Load a local .env if present (repo root or next to manage.py). Real environment
# variables set by the hosting platform always win over the file.
for _env_file in (BASE_DIR.parent / ".env", BASE_DIR / ".env"):
    if _env_file.exists():
        dotenv.load_dotenv(_env_file, override=False)
TESTING = len(sys.argv) > 1 and sys.argv[1] == "test"
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
    DEBUG = False
    ALLOWED_HOSTS = env_list("DJANGO_ALLOWED_HOSTS")
    hosting_hostname = (
        os.getenv("VERCEL_URL", "").strip()
        or os.getenv("RENDER_EXTERNAL_HOSTNAME", "").strip()
    )
    if hosting_hostname and hosting_hostname not in ALLOWED_HOSTS:
        ALLOWED_HOSTS.append(hosting_hostname)
    if os.getenv("VERCEL", "") == "1" and ".vercel.app" not in ALLOWED_HOSTS:
        ALLOWED_HOSTS.append(".vercel.app")
    if not ALLOWED_HOSTS:
        raise ImproperlyConfigured(
            "DJANGO_ALLOWED_HOSTS must contain at least one production host."
        )
else:
    # This value is deliberately development-only and must never be reused in production.
    # `or` (not a getenv default) so an empty DJANGO_SECRET_KEY= line in .env
    # still falls back to the development key.
    SECRET_KEY = (
        os.getenv("DJANGO_SECRET_KEY", "").strip()
        or "django-insecure-jeevan-development-only"
    )
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
                "jeevan.context_processors.site_flags",
            ],
        },
    }
]

WSGI_APPLICATION = "jeevan.wsgi.application"
ASGI_APPLICATION = "jeevan.asgi.application"


database_url = os.getenv("DATABASE_URL", "").strip()
db_engine = (os.getenv("DB_ENGINE", "").strip()
             or ("django.db.backends.postgresql" if IS_PRODUCTION else "django.db.backends.sqlite3"))
if IS_PRODUCTION and "sqlite" in db_engine:
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
        # Hashed, compressed files in production; plain storage for tests so they
        # don't need `collectstatic` to run first.
        "BACKEND": (
            "django.contrib.staticfiles.storage.StaticFilesStorage"
            if TESTING
            else "whitenoise.storage.CompressedManifestStaticFilesStorage"
        ),
    },
}

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"
PRIVATE_MEDIA_ROOT = BASE_DIR / "private_media"

# Private medical files: never served from a public URL, only streamed by the
# app after an access check.
STORAGES["private"] = {
    "BACKEND": "django.core.files.storage.FileSystemStorage",
    "OPTIONS": {"location": PRIVATE_MEDIA_ROOT, "base_url": None},
}

# Optional: keep uploads in an S3-compatible bucket (AWS S3, Cloudflare R2,
# Backblaze B2...) so they survive restarts on hosts with temporary disks
# (Render's free plan). The bucket must be PRIVATE; files are fetched by the
# app or through short-lived signed links.
S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME", "").strip()
if S3_BUCKET_NAME:
    _s3 = {
        "bucket_name": S3_BUCKET_NAME,
        "access_key": required_env("S3_ACCESS_KEY_ID"),
        "secret_key": required_env("S3_SECRET_ACCESS_KEY"),
        "endpoint_url": os.getenv("S3_ENDPOINT_URL", "").strip() or None,  # e.g. R2: https://<account>.r2.cloudflarestorage.com
        "region_name": os.getenv("S3_REGION", "").strip() or None,         # R2: "auto"
        "default_acl": None,
        "querystring_auth": True,      # signed, expiring URLs
        "querystring_expire": 300,
        "file_overwrite": False,
    }
    STORAGES["default"] = {"BACKEND": "storages.backends.s3.S3Storage", "OPTIONS": {**_s3, "location": "media"}}
    STORAGES["private"] = {"BACKEND": "storages.backends.s3.S3Storage", "OPTIONS": {**_s3, "location": "private"}}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Cache (used by login lockout and rate limiting). Local memory is per-process,
# so production uses the database to share counts across gunicorn workers.
# Run `python manage.py createcachetable` once (build.sh does this).
if IS_PRODUCTION:
    CACHES = {
        "default": {
            "BACKEND": "django.core.cache.backends.db.DatabaseCache",
            "LOCATION": "jeevan_cache",
        }
    }
else:
    CACHES = {
        "default": {"BACKEND": "django.core.cache.backends.locmem.LocMemCache"}
    }

# Behind Render/Railway/Heroku the real client IP is in X-Forwarded-For.
TRUST_X_FORWARDED_FOR = env_bool("TRUST_X_FORWARDED_FOR", IS_PRODUCTION)

# Demo mode: shows a "sample data only" banner and the demo logins on the
# login page. Never enable on a deployment with real patients.
DEMO_MODE = env_bool("DEMO_MODE", False)

# Password reset by SMS needs an SMS provider; keep the option hidden until one
# is wired up.
SMS_ENABLED = env_bool("SMS_ENABLED", False)

# Show /api/v1/docs/ in production too (always on in development).
API_DOCS_PUBLIC = env_bool("API_DOCS_PUBLIC", False)
AUTH_USER_MODEL = "care.CustomUser"

LOGIN_URL = "/login/"
LOGIN_REDIRECT_URL = "/"
LOGOUT_REDIRECT_URL = "/login/"


# Email. Options:
#   * SMTP (EMAIL_HOST/EMAIL_HOST_USER/EMAIL_HOST_PASSWORD)
#   * an HTTP email API, for hosts that block SMTP ports (Render's free plan):
#     set BREVO_API_KEY or RESEND_API_KEY and the backend is chosen for you
#   * the console backend, which only prints emails (development / demos)
BREVO_API_KEY = os.getenv("BREVO_API_KEY", "").strip()
RESEND_API_KEY = os.getenv("RESEND_API_KEY", "").strip()
ANYMAIL = {}
if BREVO_API_KEY:
    _default_email_backend = "anymail.backends.brevo.EmailBackend"
    ANYMAIL["BREVO_API_KEY"] = BREVO_API_KEY
elif RESEND_API_KEY:
    _default_email_backend = "anymail.backends.resend.EmailBackend"
    ANYMAIL["RESEND_API_KEY"] = RESEND_API_KEY
elif IS_PRODUCTION:
    _default_email_backend = "django.core.mail.backends.smtp.EmailBackend"
else:
    _default_email_backend = "django.core.mail.backends.console.EmailBackend"

EMAIL_BACKEND = os.getenv("EMAIL_BACKEND", "").strip() or _default_email_backend
if IS_PRODUCTION and EMAIL_BACKEND == "django.core.mail.backends.smtp.EmailBackend":
    EMAIL_HOST = required_env("EMAIL_HOST")
    EMAIL_HOST_USER = required_env("EMAIL_HOST_USER")
    EMAIL_HOST_PASSWORD = required_env("EMAIL_HOST_PASSWORD")
else:
    EMAIL_HOST = os.getenv("EMAIL_HOST", "")
    EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER", "")
    EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD", "")

# False when emails are only printed/discarded; password reset then tells the
# user it isn't available instead of "sending" a code nobody receives.
EMAIL_DELIVERY_ENABLED = EMAIL_BACKEND not in (
    "django.core.mail.backends.console.EmailBackend",
    "django.core.mail.backends.dummy.EmailBackend",
    "django.core.mail.backends.filebased.EmailBackend",
) or DEBUG

EMAIL_PORT = int(os.getenv("EMAIL_PORT", "587"))
EMAIL_USE_TLS = env_bool("EMAIL_USE_TLS", True)
DEFAULT_FROM_EMAIL = os.getenv(
    "DEFAULT_FROM_EMAIL", "JeevanCare <noreply@localhost>"
)


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

# Logging configuration
LOG_DIR = BASE_DIR / "logs"
if os.getenv("VERCEL", "") == "1":
    # Vercel function deployments have a read-only source directory.
    LOG_DIR = Path("/tmp/jeevan-logs")
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
