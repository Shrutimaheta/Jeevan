# Jeevan — Patient Management System

Jeevan is a hospital and clinic management web application built with Django. It brings patients, doctors, receptionists and nurses onto one platform, with a separate dashboard for each role, appointment booking, digital prescriptions, consent-based access to medical records and video teleconsultations.

**Live demo:** https://jeevan-demo.onrender.com
**Built by:** [Shruti Maheta](https://github.com/Shrutimaheta)

> The demo runs on a free server that sleeps when idle, so the first visit can take up to a minute to load. It contains fictional sample data only.

---

## Try the demo

Open the [login page](https://jeevan-demo.onrender.com/login/) and click one of the demo buttons, or sign in manually. Every demo account uses the password **`Demo@2026`**.

| Role | Username | What to try |
|---|---|---|
| Patient | `demo_patient` | Book an appointment, view prescriptions, log vitals and wellness |
| Doctor | `dr_sharma` | Accept or reject appointments, write prescriptions, request record access |
| Receptionist | `demo_receptionist` | Register walk-in patients, book for them, check doctor availability |
| Nurse | `demo_nurse` | View hospital patients, record vitals and nursing notes |

Please don't enter real personal or medical information in the demo.

---

## Features

### Patients
- Self-registration, profile management and secure password reset by email OTP
- Book, reschedule and cancel appointments by hospital, doctor, date and time slot
- View prescriptions written by doctors
- Upload and manage medical documents in private storage
- Track vital signs, wellness logs and medications, with trend charts
- Approve or reject doctors' requests to view their records
- Help centre with FAQs, support tickets and health resources

### Doctors
- Dashboard with today's schedule, upcoming appointments and a 7-day overview
- Accept, reject and complete appointments; calendar view
- Write structured digital prescriptions
- View patient history and reports only after the patient grants consent
- Start video teleconsultations (Jitsi Meet) for accepted appointments
- Public profile page for patients

### Receptionists
- Register walk-in patients and book appointments on their behalf
- Approve, reject and manage appointments for their hospital
- See every doctor's hourly availability for any date

### Nurses
- View patients registered at their hospital
- Record vital signs and add or edit nursing notes

### Platform
- Role-based access control: each role can open only its own pages and its own hospital's data
- Care coordinator and admin dashboards, including ZIP export of patient reports
- Emergency guide and nearest-hospital finder
- ABHA (Ayushman Bharat Health Account) ID flow with OTP verification *(simulated; not connected to the national ABDM system)*
- REST API endpoints with OpenAPI documentation (drf-spectacular)

### Security
- Medical files stored in private storage and served only after an access check
- Login and password-reset rate limiting, hashed one-time codes and CSRF protection on every form and API
- Audit logging of sensitive actions with tamper-evident log records
- Production hardening: HTTPS-only secure cookies, HSTS and strict security headers, with startup refusing to run on unsafe settings

---

## Tech stack

| Layer | Technology |
|---|---|
| Backend | Python 3.12, Django 5.2, Django REST Framework |
| Database | PostgreSQL (production), SQLite (local development) |
| Frontend | Django templates, Bootstrap, JavaScript; React 19 + TypeScript + Vite source in `jeevan/Frontend` |
| Static files | WhiteNoise |
| File storage | Local disk, or any private S3-compatible bucket (e.g. Cloudflare R2) |
| Email | SMTP or Brevo / Resend API via django-anymail |
| Video calls | Jitsi Meet |
| Hosting | Render (web service) + Neon (PostgreSQL) |
| CI | GitHub Actions: migration check, tests on PostgreSQL, production settings check |

---

## Project structure

```text
Jeevan/
├── render.yaml              # Render deployment blueprint
├── .env.example             # Environment variable reference
└── jeevan/                  # Django project (manage.py is here)
    ├── jeevan/              # Settings, URLs, middleware helpers
    ├── care/                # Users, hospitals, specializations, admin/coordinator dashboards
    ├── patient/             # Patient portal, health tracking, documents, help centre
    ├── doctor/              # Doctor portal, prescriptions, consent
    ├── receptionist/        # Front-desk tools
    ├── nurse/               # Nursing tools
    ├── appointments/        # Booking rules and scheduling
    ├── records/             # Medical records
    ├── teleconsultation/    # Video consultation sessions
    ├── abha/                # ABHA ID flow
    ├── templates/           # Shared templates
    ├── static/              # CSS, JS and images
    ├── Frontend/            # React/TypeScript source
    ├── build.sh             # Build script used on Render
    └── requirements.txt
```

---

## Run it locally

Requires Python 3.11 or newer and Git.

```powershell
git clone https://github.com/Shrutimaheta/Jeevan.git
cd Jeevan
python -m venv .venv
.\.venv\Scripts\Activate.ps1          # macOS/Linux: source .venv/bin/activate
pip install -r jeevan\requirements.txt
Copy-Item .env.example .env           # macOS/Linux: cp .env.example .env
cd jeevan
python manage.py migrate
python manage.py seed_demo            # optional: demo accounts and sample data
python manage.py runserver
```

Then open http://127.0.0.1:8000/.

- The virtual environment and `.env` file live in the repository root. Settings load `.env` automatically, and real environment variables always take precedence.
- Keep `JEEVAN_ENV=development` locally. This uses SQLite and prints emails and one-time codes to the console.

### Run the checks

From the `jeevan` folder:

```powershell
python manage.py makemigrations --check --dry-run
python manage.py check
python manage.py test
```

The same checks run automatically on GitHub for every push, against PostgreSQL.

---

## Deployment (Render + Neon, free tier)

1. Create a free PostgreSQL project on [Neon](https://neon.com) and copy its pooled connection string.
2. On [Render](https://render.com), choose **New → Blueprint** and select this repository. `render.yaml` creates the web service. Paste the Neon string when asked for `DATABASE_URL`.
3. The build (`jeevan/build.sh`) installs packages, collects static files, runs migrations, creates the cache table and, when `DEMO_MODE=true`, creates the demo accounts.
4. Render redeploys automatically, but only after the GitHub Actions checks pass.

Optional settings:

| Purpose | Variables |
|---|---|
| Keep uploaded files across restarts | `S3_BUCKET_NAME`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_ENDPOINT_URL` (private bucket) |
| Send real emails (password reset) | `BREVO_API_KEY` or `RESEND_API_KEY`, plus a verified `DEFAULT_FROM_EMAIL` |
| Public API docs at `/api/v1/docs/` | `API_DOCS_PUBLIC=true` |

In production (`JEEVAN_ENV=production`) the app refuses to start without a secret key, allowed hosts and a PostgreSQL database. `/healthz/` reports whether the app and database are up.

---

## Limitations

This is a portfolio and learning project, not a certified medical system.

- ABHA integration is simulated, and SMS delivery is not connected.
- Before handling real patient data it would need a security review, backups, a privacy policy and patient consent, and compliance with India's DPDP Act.

---

## Author

**Shruti Maheta** — [GitHub](https://github.com/Shrutimaheta)

If you have feedback or would like to discuss this project, feel free to open an issue.
