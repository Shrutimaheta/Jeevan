# Vercel personal demo verification — 8 November 2026

The fictional personal demo is deployed and its live checks passed. This is not approval for real-patient or commercial clinic use.

- Preview: https://jeevan-personal-demo-948cs5wiz-7airbnbcloned.vercel.app
- Vercel deployment: `dpl_3nGEqzVH4VRRRqGWnaTGcj3sh42c`, verified **Ready**, target **preview**, Django function in Singapore (`sin1`).
- Published application source: branch `codex/vercel-personal-preview-20261107`, commit `fa565deb244460fd1a7005729ac771aac07314a9`.
- Separate Neon project `plain-union-99415860`, isolated `fictional-preview` branch, PostgreSQL 16, database `jeevan_qa`. No existing Knowra data was reused or changed.
- Vercel Hobby and Neon Free plans were verified. No paid upgrade or Render resource deletion was performed.

## Verified live

All 28 checks in the local verification script passed against the protected deployed preview:

- HTTPS database readiness, application Basic authentication gate, fictional-data notice, no-store/no-index response headers, CDN stylesheet and explicitly disabled recovery email.
- Successful patient, doctor, nurse, receptionist and coordinator logins, secure HttpOnly session cookies, successful dashboards and private caching for each role.
- Patient access to the doctor dashboard denied; no generic public route for private PDF reports.

The verifier used the authenticated Vercel CLI's supported preview access. Vercel account protection remains enabled; anonymous public reachability of patient pages is not an acceptance condition. A user may need to sign into Vercel before the application's own access prompt.

Private login instructions are saved locally in `.qa/VERCEL_DEMO_ACCESS.txt`. The credentials and database URLs are excluded from Git and are not included in this report.

## Automated checks

- Local full SQLite run: **231 tests**, passed with **three PostgreSQL-only skips**.
- Local hosting/configuration subset: **27 tests**, passed.
- Published GitHub checks: PostgreSQL backend, SQLite backend and Python dependency audit passed. Deployment-package checks and Render preparation checks also passed.
- Frontend lint, **19 tests**, and build passed. The complete dependency audit remains failed on **five low-severity Jest/deepmerge tooling notices**. The moderate dependency advisories were removed with tested package overrides. This must not be described as a clean audit.
- The actual new Neon database was migrated, seeded with fictional records for two clinics, and passed database/private-storage round-trip verification before deployment.

## Remaining limits

Uploads use temporary function storage and can disappear or be unavailable to another instance. Email recovery and teleconsultation are disabled. Only fictional information may be entered. Real clinic use still requires an eligible commercial hosting plan, durable private object storage, reliable email, backup/restore acceptance, monitoring, measured capacity and clinic acceptance.

See [the deployment guide](deploy/VERCEL.md). Original local evidence remains in the ignored `.qa/` directory. Existing Render resources remain unchanged by this hosting switch.
