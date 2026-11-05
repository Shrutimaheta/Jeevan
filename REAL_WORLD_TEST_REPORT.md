# Real-user verification — 26 October 2026

## Current assessment

The core clinic workflow runs locally with fictional accounts. It is suitable for a supervised pilot after the deployment prerequisites below are verified. This is not a claim that every possible failure, every device, or a live production deployment has been tested.

No real patient records were used. Changes remain local; nothing has been published or deployed.

## Newly discovered and repaired

- The patient dashboard had a JavaScript syntax error that prevented its booking/upload controls from initializing. Rendered scripts are now checked by a regression test.
- Nurse and care coordinator were missing from the actual universal login selector. Coordinator login now redirects correctly. Missing/inactive profiles cannot leave a successful login session.
- The patient dashboard read obsolete email/phone attributes. It now shows the account's actual contact details.
- Narrow screens clipped the patient's identity and booking card. The cards now wrap their contents.
- Wellness input accepted impossible values and negative counts. Daily writes now lock the patient, validate ranges and preserve omitted fields. Invalid requests do not leave partial rows.
- JSON arrays, null, malformed JSON, invalid identifiers and wrong-role requests now receive appropriate input/access responses rather than exposing internal exception text.
- Registration now enforces password validators and phone format. A username created between validation and saving can no longer cause an existing account to be overwritten.
- Password recovery no longer renders a patient's identity on its public verification screen or redirects to different patient IDs for known/unknown emails. Cooldowns use the same destination, failed email delivery removes the unusable code, and code generation is serialized per account. SMTP has a bounded timeout.
- Invalid public search filters return a client error instead of a server crash. Missing hospitals return HTTP 404.
- Homepage ambulance/emergency bookings and live support were simulations that falsely promised confirmation or a response. These have been removed. Emergency information explicitly says that Jeevan does not dispatch ambulances or monitor emergencies. Fake contact details and unsupported verification claims were removed.
- The patient layout's simulated support chat now links to the real support area. Appointment confirmation text directs patients to their appointment status rather than promising an unimplemented notification.
- Booking form hours now match the server's 09:00–17:45 schedule.
- Time-sensitive nurse test fixtures now use a future local date. Download tests no longer close a streamed response twice, which had broken PostgreSQL test transactions.

## Verification performed

- Real browser: fictional patient login → dashboard → hospital selection → doctor → booking form → pending appointment.
- Real browser: fictional doctor login → accept appointment → accepted status and updated counters.
- Phone-sized viewport: patient identity, booking cards and navigation inspected; viewport restored afterward.
- Five roles: patient, doctor, nurse, receptionist and care coordinator; 31 linked pages checked for server failures and inline JavaScript syntax errors.
- PostgreSQL 18: complete 94-test suite passed, including two simultaneous booking attempts with exactly one successful reservation.
- Final SQLite suite: 95 run, 94 passed, one PostgreSQL-only skip. Final targeted input/recovery checks: 19 passed on each database. Evidence filenames are recorded in IMPLEMENTATION_STATUS.md.
- Coverage also includes report upload/download, consent approval and revocation, hospital isolation, prescription completion, CSRF, invalid vital signs, account recovery limits and unavailable integrations.

The first local PostgreSQL attempts overlapped against the same disposable test database and interrupted each other. They were discarded; the subsequent sequential full run passed. One SQLite verification attempt encountered a Windows temporary-directory cleanup restriction; its test scratch files were moved into the workspace and the affected regression checks passed afterward.

## Before real patient data

Follow `jeevan/docs/DEPLOYMENT.md`. Verify the actual HTTPS host, PostgreSQL credentials and migrations, persistent private file storage, working SMTP delivery, backup restoration, monitoring, restricted administrative accounts and protected audit retention. Test these against the intended hosting environment; local success does not establish that a host is configured correctly.

ABHA remains unavailable until a genuine authorized integration is provided. Video consultations remain disabled unless the configured provider's admission controls have been verified. Ambulance dispatch and staffed live chat are not supplied by this project.

Clinic operators still need to provide their real contact details, operating schedules, service terms and privacy information. Large-scale load, prolonged outages, penetration testing and an independent clinical review were not completed in this local session.

## Reproduce locally with fictional data

From `jeevan/`, install `requirements.txt`, then run:

```powershell
python manage.py migrate --settings=jeevan.qa_settings
python manage.py seed_qa --settings=jeevan.qa_settings
python manage.py runserver 127.0.0.1:8012 --settings=jeevan.qa_settings
```

The seed command provides fictional accounts for all five roles. QA settings reject production mode, use a dedicated database and isolate uploads under `.qa/`. Run normal regression tests with `python manage.py test --noinput`; PostgreSQL is needed for the actual row-lock concurrency test.

## Design and usability follow-up — 1 November 2026

The existing clean authentication and shared UI styles were preserved and checked in the running app. Desktop login and 320px/390px phone layouts were visually inspected. The phone dashboard and login had no horizontal document overflow. Login, mobile menu open/close, Escape-to-close and the hospital booking dialog were exercised with fictional QA data.

Additional fixes: upcoming appointment counts now exclude past accepted visits and elapsed times today; the mobile navigation closes on Escape and returns focus to its button; shared script versioning delivers the update to browsers with an older cached asset; patient dashboard feedback messages are rendered visibly and announced accessibly.

Verification: 15 input/dashboard regression tests passed in 29.868 seconds; a separate 15-test input and clinic-workflow run passed in 43.619 seconds. Five-role smoke check covered 35 pages with no server errors or inline script syntax errors. Django checks, JavaScript syntax check and whitespace check passed. These were focused follow-up checks, not a new full PostgreSQL run. Browser viewport override was reset; no real records were used.

Screenshots are saved locally under `.qa/design-login-20261101.png` and `.qa/design-mobile-20261101.png`. Production deployment requirements above still apply.

## Homepage layout repair — 1 November 2026

The reported broken page was the public homepage. It embedded the complete standalone login document inside an unused modal, importing authentication CSS that changed the homepage body to a horizontal flex layout. Removed that nested document; login remains a separate page. Added regression coverage asserting one document/body and no authentication stylesheet/form in the homepage.

Also repaired empty-fragment navigation handling, mobile menu closure (including clicks during its transition), and a scroll listener referencing a missing sticky bar. Removed section entrance hiding so all content is visible immediately rather than leaving blank blocks while scrolling. Browser checks verified normal block layout, all section opacity values at 1, correct desktop/mobile document width, and mobile menu closure. Preview: `.qa/home-repaired.png`.
