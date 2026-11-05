# Real-user and production-readiness review — 2 November 2026

This review follows the earlier navigation audit. It tests failure paths, stale state, atomic writes, concurrent requests and permissions. Tests use fictional users and isolated QA databases; no deployment or external patient communication was performed.

## Findings repaired in this review

- Medication double submissions could create duplicate daily logs. Writes now serialize on the medication, preserve the first submission and use the clinic's local day. Inactive/future/foreign medications and invalid notes are rejected. Migration `patient/0026` changes the date default without deleting historical logs.
- Booking now checks the fresh locked provider state rather than trusting a stale selection. Inactive providers are hidden from booking choices and inactive actors cannot change appointments.
- A final booking delta rejects inactive receptionist profiles and a doctor reassigned to another hospital while the form was open; rejected writes create neither an appointment nor a clinic association.
- Missing private report files now produce an unavailable state and safe 404, without exposing filesystem paths.
- Production refuses weak/development secret keys, unrestricted `*` hosts and invalid/localhost recovery senders.
- Receptionist walk-in booking and portal registration now save atomically, use actual Patient fields, reject identity reuse/overwrite and validate dates/passwords. ABHA is optional and unverified. A failed slot reservation or profile save leaves no partial account. Walk-in users start with an unusable password; the existing email OTP flow through first password creation was verified with mocked email delivery.
- Empty prescriptions, medication entries missing required components and inactive doctors cannot finalize consultations.
- Login throttling preserves the sign-in form and retry guidance. Failed attempts preserve safe destinations without accepting unsafe/stale redirects. Restored login pages remask revealed passwords. CSRF rejection now gives a safe recovery page and does not replay submitted information.
- Public chat handles malformed/nested JSON, limits requests and no longer promises nonexistent human support. The legacy nearest-hospital page now describes a clinic directory with actual business contact numbers rather than invented emergency capacity, proximity or dispatch.
- Walk-in booking has a visible entry on patient management. Collapsed sidebar links retain accessible names and tooltips.

## Verified environment and evidence

- PostgreSQL 18: initial 12 concurrency, multi-user, clinic-workflow and medical-record access tests passed, with no skips.
- Full PostgreSQL suite: **183 tests passed, no skips**, in 185.328 seconds. This includes simultaneous booking and medication requests, role isolation, stale-state validation, atomic intake rollback and prescription safety.
- Five independent real HTTP sessions on the fictional-only PostgreSQL QA app: **24 checks passed**, including reschedule, approval, nurse vitals, report consent/export, prescription, cancellation and revocation for existing sessions.
- Browser: receptionist signed in, created a new fictional walk-in without ABHA and approved it; a fresh appointment list showed **Accepted**. Browser transport timed out after the approval click; the fresh page confirmed it had succeeded, so the action was not repeated. Evidence: `.qa/production-walkin-accepted.png`.
- Final PostgreSQL delta: **20 tests passed** in 15.108 seconds, covering the last booking guards, intake, validation and CSRF recovery. These overlap the full suite and are not added to its distinct test count.
- Frontend final rerun: **19 tests passed across five suites**; strict lint and production build passed before the final labeling-only JavaScript delta, whose shared UI regression also passed.
- Production-mode `check --deploy --fail-level WARNING` passed with synthetic configuration. This validates settings, not actual TLS, SMTP delivery or host infrastructure.
- Private storage write/read/delete verification passed locally. Migration drift check passed.
- Dependency advisory checks: no known vulnerabilities reported for pinned backend requirements or frontend production dependencies on this review date. Backend check used the explicit pins with `--no-deps`; it does not certify unlisted packages or the operating system.
- Local PostgreSQL dump restored into a separate QA database. Matching counts included six users, two patients, one fictional appointment, one fictional medical record and migration history. This did not test production data, private-file restoration, encrypted off-host retention or a recovery-time target.

## Production acceptance still required

The project is not certified for unrestricted real-patient production use by passing local tests. Before rollout, the actual hosting environment must prove HTTPS/proxy configuration, PostgreSQL credentials/permissions, durable private storage, SMTP delivery, protected audit collection, monitoring and database-plus-file recovery. A clinic representative must accept complete workflows and mobile/accessibility behavior. ABHA/SMS/video remain unavailable unless their actual providers are integrated and verified.

No production host or provider credentials were supplied in this task. The development server at localhost is for QA, not a production deployment.

Migration `patient/0026` was applied successfully to the main local QA database after taking a local snapshot. The main localhost app was restarted with the fixes. All changes remain local; nothing was published or deployed.
