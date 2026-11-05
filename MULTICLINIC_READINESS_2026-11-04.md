# Multiple-clinic preparation — 4 November 2026

The target is multiple clinics with a free-plan starting point. The selected services and account setup are in [the free-tier guide](deploy/FREE_TIER.md). No provider accounts were created, no patient data was published and no live deployment or email delivery is claimed.

## Application changes

- Coordinator report access now requires registration with that clinic and approved, unexpired consent to an active doctor account at that clinic. A disabled doctor or a crafted request for an unregistered patient cannot authorize an export. Consent checks no longer change consent records during reads.
- Report exports read files in 64 KiB chunks, spill archives from memory into an owner-only temporary file after 8 MiB, and reject selections over 50 patients, 500 files or 100 MiB of original file data. Highly compressible and empty-file batches cannot bypass those limits. Read failures return a recovery message without revealing storage paths or returning a partial ZIP. Temporary resources close on failures; successful exports retain audit events.
- The coordinator patient list uses a paginated query with consent status calculated in the database rather than separate consent queries for every patient. The updated screen uses the project's blue palette.
- The deployment verifier now rejects unapplied migrations before probing private storage or email. Gunicorn startup invokes it, so a connected but unmigrated database or failed private-storage probe blocks startup. Failure tests distinguish process liveness from database readiness.
- Deployment CI supports an explicit ARM64 run for the selected Oracle A1 host. It has not been dispatched from this workspace.

No application database migration is required for these changes.

## Verification

| Check | Result / evidence |
| --- | --- |
| Focused PostgreSQL regressions | 25 passed in 4.719 seconds: `readiness-multiclinic-pg-delta-20261104.txt` |
| Final complete PostgreSQL suite | **214 tests passed, no skips**, in 256.890 seconds: `readiness-multiclinic-postgres-verified-20261104.txt` |
| Five independent real HTTP sessions | 24 checks passed: `readiness-live-http-20261104.txt` |
| Actual local deployment verifier | Applied-schema check and private-storage write/read/delete probe passed: `readiness-storage-schema-20261104.txt` |
| Django checks | No configuration issues; no migration drift |
| Recovery helpers | All 7 existing payload/network tests passed |
| Deployment scripts and CI | Bash syntax, workflow YAML and patch whitespace checks passed |
| Browser | Fictional coordinator sign-in and report selection screen checked at desktop and 390 × 844. Page width stayed at 390 pixels; the table scrolls inside its container. Screenshots: `.qa/readiness-20261103/coordinator-final-20261104.png` and `coordinator-mobile-20261104.png`. |

The real HTTP workflow checks again verified that consent grant allows a report export and revocation blocks it in an already signed-in coordinator session. Those sessions used the isolated SQLite QA app; the automated PostgreSQL regressions tested the production database engine. The frontend project was unchanged in this pass; its passing build/lint/19-test results are recorded in the [3 November review](PRODUCTION_READINESS_2026-11-03.md).

## Release status

Application-level clinic scoping is implemented, but this remains one shared application/database. Patients can belong to several clinics; staff currently belong to one. Historical staff transfers, separate clinic administrator roles and a separate database per clinic are not implemented workflows. Consent intentionally grants access to the patient's report history, not only files authored by that clinic. Explain these boundaries before onboarding clinics.

The owner must complete the chosen providers' account/identity and sender verification. Oracle free capacity has no SLA and can be reclaimed; a permanent zero bill and uninterrupted multi-clinic service cannot be guaranteed. The free-tier guide records actual limits and prohibits automatic paid fallback.

Live HTTPS, sender/inbox recovery, durable-volume restart tests, encrypted database-plus-upload restoration, alerts and realistic load still require the actual host and provider accounts. Docker remains unavailable on this workstation. Development-tool advisories from the previous review remain open. Several clinic pages still depend on external CDN scripts/fonts; local asset packaging and a restricted-network browser acceptance check remain work before a strict self-contained deployment can be claimed. No fresh exhaustive security audit or compliance certification was performed.

Real-patient release remains gated on those checks and acceptance by the participating clinics.
