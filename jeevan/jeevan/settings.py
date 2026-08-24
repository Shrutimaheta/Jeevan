"""Django settings for Jeevan.

Local development is the default. Production values must be supplied through
environment variables; secrets must never be committed to source control.
"""

import os
from pathlib import Path
import dotenv
import dj_database_url

from django.core.exceptions import ImproperlyConfigured


BASE_DIR = Path(__file__).resolve().parent.parent
dotenv.load_dotenv(BASE_DIR.parent / '.env', override=True)
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
    SECRET_KEY = os.getenv(
        "DJANGO_SECRET_KEY", "django-insecure-jeevan-development-only"
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
            ],
        },
    }
]

WSGI_APPLICATION = "jeevan.wsgi.application"
ASGI_APPLICATION = "jeevan.asgi.application"


database_url = os.getenv("DATABASE_URL", "").strip()
db_engine = os.getenv("DB_ENGINE", "django.db.backends.postgresql").strip()
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
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"
PRIVATE_MEDIA_ROOT = BASE_DIR / "private_media"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
AUTH_USER_MODEL = "care.CustomUser"

LOGIN_URL = "/login/"
LOGIN_REDIRECT_URL = "/"
LOGOUT_REDIRECT_URL = "/login/"


if IS_PRODUCTION:
    EMAIL_BACKEND = os.getenv(
        "EMAIL_BACKEND", "django.core.mail.backends.smtp.EmailBackend"
    )
    if EMAIL_BACKEND == "django.core.mail.backends.console.EmailBackend":
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
