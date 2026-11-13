#!/usr/bin/env bash
# Build step for Render (or any host that runs a build command).
# Run from the Django project folder (the one with manage.py).
set -o errexit

pip install --upgrade pip
pip install -r requirements.txt

python manage.py collectstatic --noinput
python manage.py migrate --noinput
python manage.py createcachetable

# Demo deployments only: create the demo logins and sample appointments.
if [ "${DEMO_MODE,,}" = "true" ]; then
  python manage.py seed_demo
fi
