# Jeevan — patient management

Jeevan is a Django application for patients, doctors, nurses, receptionists and care coordinators. It includes appointments, prescriptions, private documents, consent, clinical notes, wellness tracking and support.

The Django application is the supported user interface. The separate React project contains a clinic entry page and an explicit development-only design preview. Production React builds do not enable the template preview or simulate authentication, appointments or identity verification.

See [real-user verification](REAL_WORLD_TEST_REPORT.md) for the latest browser checks, fixes, fictional QA setup and remaining deployment requirements.
See [UI/UX verification](UI_UX_VERIFICATION.md) for the responsive design and usability changes.
The selected Render hosting path is in [the Render deployment guide](deploy/RENDER.md). The root `render.yaml` creates only a protected free preview for fictional data; a separate paid configuration is prepared for later real-patient acceptance. Provider connection, reviewed source publication and live acceptance remain required.
See [4 November multiple-clinic verification](MULTICLINIC_READINESS_2026-11-04.md) for export safeguards, startup checks and current test results.
For the prepared Linux/Docker production package, see [deployment setup](deploy/README.md), [backup and recovery](deploy/OPERATIONS.md) and [the exact preparation/verification status](DEPLOYMENT_PREPARATION_2026-11-02.md). Hosting, SMTP and live acceptance remain required.

## Local setup

Use Python 3.12 and Node.js 22. From the repository root:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r jeevan/requirements.txt
Copy-Item .env.example .env
cd jeevan
python manage.py migrate
python manage.py runserver
```

Open <http://127.0.0.1:8000/>. Local development defaults to SQLite. Configuration loads the root `.env` without overriding existing environment variables. Use fictional data locally.

## Checks

Run from `jeevan`:

```sh
python manage.py check
python manage.py makemigrations --check --dry-run
python manage.py test --noinput
```

The CI workflow repeats the backend checks with both SQLite and PostgreSQL. A PostgreSQL-only concurrency test verifies two competing bookings cannot both succeed. Local SQLite runs explicitly skip that test.

Run from `jeevan/Frontend`:

```sh
npm ci
npm run lint -- --max-warnings=0
npm test -- --runInBand
npm run build
```

The React build goes to `Frontend/dist`; it does not overwrite Django static assets. Set `VITE_CLINIC_ORIGIN` to your deployed HTTPS Django origin when hosting the entry page separately. For a local design preview only, set `VITE_ENABLE_TEMPLATE_PREVIEW=true` and run `npm run dev`. Preview pages use fictional template data and are clearly labelled.

## Access and scheduling

- Patients can see their own records.
- Doctors need active, unexpired patient consent to read medical records and uploaded documents. An accepted/completed appointment permits demographics, not blanket access to medical history. Revocation applies even to a record's author.
- Nurses and receptionists are scoped to patients registered with their hospital. Receptionists cannot read clinical details through the generic patient profile.
- Consent renewal creates a new historical request. Patients can revoke an approval.
- Appointments use local time and 15-minute slots from 09:00 to 17:45. Database constraints and doctor-row locks prevent duplicate active slots. A visit can be completed after its scheduled day.
- Sensitive responses are private and not stored by caches. Request limits use shared atomic database counters. Audit events are retained in the database and emitted to a production log collector.

## External services and deployment

ABHA is unavailable until an actual integration is implemented; no mock identity or OTP is issued. Phone password recovery is unavailable; email recovery requires working SMTP. Video consultations are disabled until an HTTPS provider and admission controls have been configured and verified. An application-generated password is not presented as protection for an external meeting.

Real-user production requires PostgreSQL, SMTP, persistent public/private volumes, backups with a verified restore, external audit collection and operational monitoring. Vercel with local uploaded files is suitable only for fictional-data demonstrations. No compliance certification is implied by private storage.

See [deployment and pilot instructions](jeevan/docs/DEPLOYMENT.md) and [implementation status](IMPLEMENTATION_STATUS.md). Local code checks do not replace a deployment restore test or user acceptance by the clinic.

### Brand palette

Use the homepage blue palette consistently across public pages, authentication and dashboards: primary `#2c5aa0`, dark/hover `#1e3a8a`, light surface `#eaf1fc`. Do not introduce separate teal or green brand palettes for login or registration.
