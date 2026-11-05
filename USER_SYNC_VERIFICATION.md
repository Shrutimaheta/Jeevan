# Cross-user workflow verification

Date: 1 November 2026. Checked the running local application with fictional records and five independent signed-in sessions: patient, doctor, nurse, receptionist and care coordinator. No real patient data or external email delivery was used.

## Live server result

**24 checks passed** against `127.0.0.1:8012`. Requests used separate cookie jars, normal login, real CSRF tokens and the application's HTTP endpoints. The normal login rate limit was respected. The test did not switch one authenticated client between roles.

| Feature | Verified behavior |
| --- | --- |
| Login | Each of the five roles signs in independently. |
| Booking | Patient booking appears in the doctor's API and receptionist's appointment page. |
| Rescheduling | Patient's new time appears in the existing doctor session. |
| Acceptance | Receptionist acceptance appears in both patient and doctor sessions. |
| Vitals | Nurse's saved reading, including decimal temperature, appears in the patient's API. |
| Private report | Patient upload succeeds; the doctor is denied before consent. |
| Consent grant | The existing doctor session can download the uploaded report after approval. |
| Coordinator export | The existing coordinator session receives a ZIP containing the correct report. |
| Prescription | Doctor's save completes the visit; the patient sees the prescription list entry and detail. |
| Consent revocation | Both existing doctor download access and coordinator export are denied after revocation. |
| Cancellation | Patient cancellation reaches the existing doctor's session. |
| Hospital boundary | Nurse cannot open another hospital's patient. |

The live workflow did not confirm a new application synchronization defect. An initial probe used an invalid minute choice and a later probe expected a different JSON key; those probe assumptions were corrected to match the real form/API before the complete successful run. They were not treated as application fixes.

## Repeatable regression coverage

Added `jeevan/care/test_multiuser_sync.py`: three integrated tests using five independently logged-in persistent Django clients. They cover reschedule/accept/cancel dashboard updates, nurse readings, prescription visibility, consent/download/export and revocation against already-authenticated staff sessions. All three passed.

Evidence: `implementation-live-multiuser.json`, `implementation-live-multiuser.txt`, `implementation-multiuser-sync-tests.txt`, and the current full-suite result in `implementation-sync-full-tests.txt`.

## Meaning of synchronization

These checks confirm that a subsequent page/API request reads the updated server data and permissions. Not every dashboard automatically refreshes an already-open page; there is no project-wide real-time broadcast mechanism. This report does not claim instant background updates in every browser tab, load capacity, production email delivery or production-host readiness.

The existing deployment requirements in `jeevan/docs/DEPLOYMENT.md` still apply. Fictional test records were retained in the isolated QA database for review; no production database was changed.

Final verification: the full SQLite backend suite ran 127 tests (126 passed, one PostgreSQL-only skip) in 191.376 seconds. The three new multi-user workflows plus the actual concurrent-booking test passed on PostgreSQL: four tests, no skips, in 16.295 seconds (`implementation-sync-postgres-tests.txt`). Django system and migration drift checks also passed.
