#!/usr/bin/env bash
set -Eeuo pipefail
umask 027
cd "$(dirname -- "${BASH_SOURCE[0]}")/../jeevan"
case "${JEEVAN_RENDER_PROFILE:-}" in
  preview)
    # These operations are restricted to the disposable jeevan_qa database.
    python manage.py check --deploy --fail-level WARNING
    python manage.py shell -c 'from django.conf import settings; assert settings.IS_RENDER_PREVIEW and settings.DATABASES["default"]["NAME"] == "jeevan_qa"'
    python manage.py migrate --noinput
    python manage.py shell -c 'import os; from django.core.management import call_command; call_command("seed_demo", password=os.environ["PREVIEW_ACCOUNT_PASSWORD"])'
    ;;
  production)
    # The operator releases migrations separately; web has a restricted role.
    python manage.py check --deploy --fail-level WARNING
    ;;
  *) printf '%s\n' 'Set JEEVAN_RENDER_PROFILE to preview or production.' >&2; exit 1;;
esac
python manage.py verify_deployment
exec gunicorn jeevan.wsgi:application --bind "0.0.0.0:${PORT:-10000}" \
  --workers "${WEB_CONCURRENCY:-1}" --threads 2 --timeout 60 --error-logfile -
