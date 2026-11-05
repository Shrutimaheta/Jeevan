#!/usr/bin/env bash
set -Eeuo pipefail
# Keep the repository root so deploy scripts and .python-version are available.
cd "$(dirname -- "${BASH_SOURCE[0]}")/../jeevan"
# No schema or patient-data writes during builds.
python -m pip install --requirement requirements.txt
python manage.py check --deploy --fail-level WARNING
python manage.py collectstatic --noinput
