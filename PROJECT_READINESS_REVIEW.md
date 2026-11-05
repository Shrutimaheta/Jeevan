# Jeevan: real-user readiness review

> Historical assessment before the requested fixes. See [implementation status](IMPLEMENTATION_STATUS.md) for the changes and current verification results.

Reviewed 26 October 2026. Repository commit: `d5e0bf0` (Fix default file storage configuration).

## Verdict

Jeevan addresses a real problem and contains substantial working application logic. It is an enhanced prototype, not yet suitable for unrestricted use with real patient records. A fictional-data demonstration is appropriate. A clinical pilot should wait until access-control defects, broken workflows, storage durability and release checks are resolved.

This assessment is based on repository inspection and local checks, not a production infrastructure audit, clinician acceptance test, legal assessment or a claim that every screen has been manually exercised.

## What exists

- Django is the currently integrated web application, with templates and role-based patient, doctor, nurse, receptionist and coordinator workflows.
- Database-backed appointments, prescriptions, patient documents, medical records, wellness logs, medication tracking, notifications and support tickets exist.
- Shared service functions, transactions, an active-slot uniqueness constraint, private medical-file storage, authorized download routes, password hashing, reset-token handling and security-oriented tests provide useful foundations.
- Production configuration enables secure cookies, HTTPS redirects and related security headers.
- React/TypeScript is a separate, partly template/demo frontend. Its screen count must not be treated as the count of fully integrated product features.

## Highest-priority findings

### 1. Staff access is not consistently scoped to a patient relationship or hospital — launch blocker

`jeevan/patient/views.py:30` lists all patients for any doctor, receptionist or nurse. `patient_detail` at line 47 permits those roles to view any patient ID without checking hospital affiliation, assigned care or consent. These routes are exposed in `patient/urls.py`. The detail template includes personal and health information.

Local reproduction: an unrelated doctor, with no appointment or consent, received HTTP 200 for another patient's detail page. Staff role membership is insufficient authorization for an individual patient's data.

Fix: centralize patient-access rules and enforce them on every list, detail, API, download and export route. Test unrelated staff within the same hospital as well as staff at other hospitals.

### 2. A historical or cancelled appointment bypasses the consent gate for medical records — launch blocker

`jeevan/records/services.py:10` grants access when any appointment exists, without checking status, time or rejected/expired consent. `records/views.py` uses this rule for record lists, details and report downloads. A record's creator also receives a separate access exception. In contrast, patient-document downloads require approved consent.

Local reproduction: a cancelled appointment and explicitly rejected consent still caused `check_doctor_patient_access` to return True.

Fix: define the intended clinical policy, including any legitimate creator exceptions, then apply it consistently. Rejected or expired consent must not be silently overridden by a stale appointment.

### 3. ABHA and SMS are not real integrations — launch blocker for advertised functionality

`jeevan/abha/views.py` generates local random identifiers. `verify_abha` at line 442 accepts an `ABHA-` prefix and returns mock identity information. OTP generation stores a four-digit code in cache but contains no SMS delivery call, despite returning an “OTP sent” message. DEBUG responses expose the code. Several ABHA endpoints are CSRF-exempt and OTP generation lacks request throttling. Verification state is keyed by mobile/Aadhaar rather than bound to the requesting account/session.

`jeevan/patient/forgot_password_views.py:74` prints password-reset OTPs without a DEBUG guard. Its phone-recovery branch similarly displays a sent message without sending an SMS. Email recovery has a real `send_mail` call, subject to deployment configuration.

Fix: disable or explicitly mark simulated features in demonstrations; implement and verify actual identity/SMS provider flows before claiming these features work for users. Remove OTPs from logs and bind challenges to the requesting session.

### 4. Invalid patient vitals can be saved — launch blocker for trustworthy health data

`jeevan/patient/api_views.py:135` calls `VitalSign.objects.create` without the model validation used by `nurse/services.py`. Django field validators are not automatically executed by `objects.create`.

Local reproduction: the patient endpoint accepted negative blood pressure/heart rate and oxygen saturation 999, returned success and stored the values.

Fix: use a common validated service/serializer for both patient and staff inputs, return useful field errors and make units clear.

### 5. Past appointments cannot be completed through the status service — high priority

`jeevan/appointments/models.py:61` rejects a past date in `clean`, and `save` always calls it. `update_appointment_status` saves the appointment even when only changing its status. Consequently the creation-time date rule blocks later administrative work.

Local reproduction: an accepted appointment moved to yesterday could not be marked completed; the service raised “Appointment date cannot be in the past.”

Fix: apply past-date rules when booking/rescheduling rather than when updating unrelated fields. Test next-day completion, cancellation and expiry flows.

### 6. Login accepts an arbitrary external redirect — high priority

`jeevan/jeevan/views.py:20-54` stores the supplied `next` value and redirects to it after login without validating the host/scheme.

Local reproduction: valid login with `next=https://example.org/review` returned a redirect to that external site.

Fix: validate with Django's allowed-host URL helper and use a local fallback.

### 7. React authentication and screens remain demonstrations — product integration gap

`jeevan/Frontend/src/pages/authentication/Login/login.tsx` checks hardcoded demo credentials, stores `fake-jwt-token-12345` and navigates to a dashboard. This is separate from Django's actual authentication and does not establish a backend session. `src/routes/router.tsx` mounts dashboard routes without an authentication gate. The dashboard and patient-list screens contain hardcoded template content. `src/utils/constants/api.ts` names endpoints that do not match the Django API namespace.

Fix: choose the user-facing application for the initial release. Completing Django templates first is a plausible smaller release; integrating React requires actual sessions, API contracts, permissions and real data throughout. A client-side route guard alone would not protect backend data.

### 8. Upload and audit durability depend on local files — deployment blocker on ephemeral hosting

`jeevan/jeevan/settings.py` stores medical files under local `private_media`, and `records/views.py` uses filesystem paths to download reports. Audit records are local files; on Vercel they go to `/tmp`. The README itself limits that deployment to fictional demo data.

The HMAC log chain in `logging_handlers.py` adds integrity evidence but is not sufficient proof of immutable auditing: processes can race on the previous signature, logs can be truncated, and the signing secret lives with the application. No independently protected checkpoint is evident.

Fix: provide durable private storage, tested database/file restore, centralized protected auditing and monitoring. Adapt filesystem-dependent downloads if using remote object storage.

### 9. Consent renewal conflicts with its own state machine — high priority

`doctor/services.py:10` reuses an old consent row and sets its status back to pending. `doctor/models.py` forbids transitions from rejected or expired to pending. Some reads use `.get(doctor, patient)` although the conditional constraint permits multiple historical rows.

Fix: create a fresh request for renewal, query the active request explicitly, and test rejection/expiry followed by a new request.

### 10. Scheduling rules disagree — high priority

Appointment forms allow 08:00 while the model allows 09:00 onwards. Forms and availability screens use different slot intervals. `receptionist/views.py:423` marks an entire hour busy if it contains an appointment and excludes only cancelled appointments, so rejected/expired appointments can still appear busy. Several form checks use UTC `timezone.now().time()` instead of local time.

The database constraint correctly prevents identical active start times. It does not establish duration-overlap handling, doctor leave or a configurable working schedule.

Fix: one scheduling service should own local time, working hours, slot duration, leave, active-status definitions and overlap rules. Retain database conflict protection and return a friendly conflict response under concurrent booking.

### 11. Rate limiting is local to each process — scaling/security gap

`jeevan/decorators.py:74` uses Django cache with no shared cache configured in settings, leaving the default local-memory cache. The get/increment/set sequence is not atomic. Multiple workers or cold starts do not share a reliable limit; OTP cache state also will not be reliably available across workers.

Fix: configure shared state and atomic throttling, with appropriate proxy/IP handling and tests across workers.

### 12. Migration/configuration portability needs repair

The migration check proposes alterations to PatientDocument.file, LabResult.file_attachment and MedicalRecord.report_file. Committed migrations serialize an absolute developer-machine path such as `C:/Shru/Jeevan/jeevan/private_media`, while runtime storage uses the current workspace path.

README setup instructions also disagree with settings: SQLite is described as the local default, but the code defaults DB_ENGINE to PostgreSQL; README says dotenv is not automatically loaded, but settings loads the root `.env` with `override=True`. The described correction-plan file is absent from this checkout.

Fix: make storage migration serialization portable, reconcile documentation and configuration, pin a supported Python runtime and verify a fresh installation in CI.

### 13. Displayed health score is an application heuristic

`patient/views.py:681` combines hand-written wellness/vitals/adherence weights. Missing data can produce a fallback score and appointment scoring uses a different scale from the other components. No clinical validation evidence is included in the repository.

Fix: explain what the number represents, distinguish missing data from measured results and obtain appropriate product/clinical validation before presenting it as a meaningful health assessment.

### 14. Teleconsultation password is not enforced by the meeting provider

`teleconsultation/services.py` generates a random Jitsi room and separately stores a password. The code does not configure that password on Jitsi. Authorized app routes protect link retrieval, but a stored password does not itself protect the external meeting.

Fix: verify the provider's actual admission controls, meeting lifecycle and intended privacy configuration. Exercise the doctor/patient flow end to end.

## Verification

- Django system check: passed.
- Migration drift check: failed; proposed changes for three file fields in two apps.
- Five separate reproduction tests: all passed, meaning all five undesirable behaviors above were reproduced. Source: `review_probes.py`; output: `review-probe-output.txt`.
- Frontend tests: failed before running tests because `jest-environment-jsdom` is missing from the installed dependency set.
- Frontend lint: failed with 161 problems (146 errors, 15 warnings).
- Frontend build: inconclusive. After dependencies finished installing, `npm run build` remained at the TypeScript stage without diagnostics during the remaining review period and was interrupted. No successful frontend build is claimed. Earlier attempts made before dependency installation completed are not used as product evidence.
- Existing backend suite, original password configuration: 56 tests ran in 301.802 seconds; failed with nine errors. Errors include hardcoded appointment dates that are now in the past and missing static-manifest entries. These failures mean the documented test command is not clean in this fresh setup; they do not mean nine production vulnerabilities were demonstrated.
- An additional accelerated backend diagnostic run used a review-only MD5 password hasher. Its password-reset assertion failure is an artifact of that override and is not counted as a product defect. The original-configuration run above is authoritative for suite status.
- Local testing uses a disposable SQLite test database. PostgreSQL behavior and real hosting were not exercised. The installed Python is 3.14.6; the pinned PostgreSQL driver could not build on this machine, so local test dependencies omit it. Production source dependencies were not edited.

## Release order

1. Close patient/hospital access leaks, unify consent, remove OTP logging and validate login redirects.
2. Fix vitals, status changes, consent renewal, scheduling and migration drift; add regression coverage for the reproduced defects.
3. Select and complete the actual user interface. Remove misleading simulation/success states; connect or disable ABHA, SMS and video functionality as appropriate.
4. Set up durable files, database backups with restore verification, protected audit storage, shared cache, monitoring and automated release checks.
5. Run a supervised fictional-data workflow with a patient, receptionist, nurse and doctor: registration, booking, approval, visit, prescription, report upload/download, consent rejection/renewal, password recovery and support. Verify phone layouts, accessibility and error recovery.
6. Only then consider a narrowly scoped real-user pilot with explicit operating ownership and acceptance criteria.

No product source fixes were made during this assessment.
