#!/bin/sh
set -eu
umask 027
if [ "${1:-}" = "release" ]; then
    python manage.py check --deploy --fail-level WARNING
    python manage.py migrate --noinput
    python manage.py grant_runtime_permissions
    python manage.py collectstatic --noinput
    python manage.py verify_deployment
    exit 0
fi
if [ "${1:-}" = "gunicorn" ]; then
    python manage.py check --deploy --fail-level WARNING
    python manage.py verify_deployment
fi
exec "$@"
