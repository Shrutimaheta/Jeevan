# Jeevan — Patient Management System

Jeevan is a Django-based patient-management system for patient profiles, hospitals, doctors, appointment scheduling, prescriptions, documents and role-based dashboards.

> **Project status:** Enhanced prototype. Private patient records are secured using a HIPAA-compliant `private_media` storage pattern, security test paths are conditionally disabled in production, and login/reset actions are protected by rate limiters. Teleconsultations are integrated with live Jitsi Meet rooms. Review plan status is tracked in `scripts/JEEVAN_CODE_REVIEW_CORRECTION_PLAN.md`.

## Technology

- Python and Django 5.2
- Django REST Framework
- SQLite for local development
- React 19, TypeScript and Vite for the separate frontend source
- Django templates for the currently integrated web interface

## Repository layout

```text
Jeevan/
├── jeevan/                 # Django project root (manage.py is here)
│   ├── jeevan/             # Django settings, URLs, WSGI and ASGI
│   ├── care/               # Users, hospitals and specializations
│   ├── patient/
│   ├── doctor/
│   ├── nurse/
│   ├── receptionist/
│   ├── appointments/
│   ├── records/
│   ├── abha/
│   ├── Frontend/           # React/Vite source
│   └── requirements.txt
└── scripts/                # Review and maintenance documentation
```

## Backend setup

Python 3.11 or newer is recommended.

```powershell
git clone https://github.com/Shrutimaheta/Jeevan.git
cd Jeevan\jeevan
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
Copy-Item ..\.env.example ..\.env     # optional: defaults work for local development
python manage.py migrate
python manage.py seed_demo              # optional: demo logins + sample data
python manage.py runserver
```

Open <http://127.0.0.1:8000/>. After `seed_demo`, log in as `demo_patient`, `dr_sharma`,
`demo_receptionist` or `demo_nurse` with password `Demo@2026`.

Settings are read from environment variables. A `.env` file in the repository root
(or next to `manage.py`) is loaded automatically; variables set by the hosting
platform take priority. With no `.env` at all, development uses SQLite and a
development-only secret key.

## Frontend setup

The React frontend is maintained separately from the Django templates:

```powershell
cd Jeevan\jeevan\Frontend
npm ci
npm run lint
npm test -- --runInBand
npm run build
```

Do not commit `node_modules`, generated `dist` output or collected `staticfiles`.

## Development checks

Run these commands from `Jeevan\jeevan`:

```powershell
python manage.py makemigrations --check --dry-run
python manage.py check
python manage.py test
```

## Production configuration

Set `JEEVAN_ENV=production`. Production startup intentionally fails unless the secret key, allowed hosts and a PostgreSQL database are configured. Use `EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend` if no SMTP server is available.

## Deploying a free demo (Render + Neon)

1. Create a free Postgres project on [Neon](https://neon.com) and copy its connection string (it ends with `?sslmode=require`).
2. On [Render](https://render.com): **New + → Blueprint**, pick this repository. `render.yaml` creates the web service; paste the Neon URL when asked for `DATABASE_URL`.
3. The build runs `jeevan/build.sh`: installs packages, collects static files, migrates, creates the cache table and (with `DEMO_MODE=true`) seeds the demo logins.
4. Open `https://<your-service>.onrender.com/login/`. The demo panel fills in a login for each role.

Things to know about the free tiers:

- The free web service sleeps after 15 minutes without traffic and takes about a minute to wake. Open the site a minute before showing it to someone.
- Uploaded files are lost whenever the service restarts or redeploys. Fine for a demo; for real use move uploads to S3-compatible storage.
- Render's free Postgres is deleted after 30 days, which is why the blueprint uses Neon instead.
- Never enable `DEMO_MODE` where real patient data is stored: it publishes the demo password on the login page.

Required production variables include:

- `DJANGO_SECRET_KEY`
- `DJANGO_ALLOWED_HOSTS`
- `DJANGO_CSRF_TRUSTED_ORIGINS`
- `DB_ENGINE`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`
- `EMAIL_HOST`, `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`

Production deployment is not approved until all phases in the correction plan have passed.

## Vercel portfolio deployment

Jeevan can be deployed to Vercel without Docker. In Vercel, import this
repository and set the **Root Directory** to `jeevan` (the directory that
contains `manage.py` and `requirements.txt`). Vercel detects Django, serves
static files through its CDN, and runs the application as a Python deployment.

Add these environment variables in Vercel:

- `JEEVAN_ENV=production`
- `DJANGO_SECRET_KEY` (a new long random value)
- `DATABASE_URL` (a PostgreSQL connection string from Neon, Supabase, or another hosted provider)
- `DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1`
- `DJANGO_CSRF_TRUSTED_ORIGINS=http://localhost:8000,http://127.0.0.1:8000`
- `EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend` for the public demo

Vercel provides the deployed hostname automatically. Use only fictional demo
accounts and records: uploaded files and local logs are not persistent in a
serverless deployment.

## Data safety

- Use fictional records in development and demonstrations.
- Never commit databases, uploaded media, credentials, OTPs or logs.
- Medical uploads require private storage and authorization before production use.
