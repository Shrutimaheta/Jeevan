"""Isolated local QA settings. Never use with real records or in production."""
from .settings import *  # noqa: F403
from django.core.exceptions import ImproperlyConfigured

if IS_PRODUCTION:
    raise ImproperlyConfigured('QA settings cannot be used in production.')
if DATABASES['default']['ENGINE'].endswith('sqlite3'):
    DATABASES['default']['NAME'] = BASE_DIR / 'qa.sqlite3'
elif DATABASES['default']['NAME'] != 'jeevan_qa':
    raise ImproperlyConfigured('QA PostgreSQL must use the dedicated jeevan_qa database.')
EMAIL_BACKEND = 'django.core.mail.backends.filebased.EmailBackend'
EMAIL_FILE_PATH = BASE_DIR / 'qa_emails'
ALLOWED_HOSTS = ['127.0.0.1', 'localhost', 'testserver']
TEMPLATES[0]['APP_DIRS'] = False
TEMPLATES[0]['OPTIONS']['loaders'] = [
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
]
MEDIA_ROOT = BASE_DIR.parent / '.qa' / 'public-media'
PRIVATE_MEDIA_ROOT = BASE_DIR.parent / '.qa' / 'private-media'
STORAGES = {**STORAGES, 'private': {
    'BACKEND': 'django.core.files.storage.FileSystemStorage',
    'OPTIONS': {'location': PRIVATE_MEDIA_ROOT},
}}
