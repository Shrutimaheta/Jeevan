# Jeevan personal demo on Vercel

Selected on 7 November 2026: a free personal demo with fictional data, before any clinic rollout. Vercel's [Hobby plan](https://vercel.com/docs/plans/hobby) permits personal, non-commercial use. This setup is not an approved real-patient deployment.

## Resources and source

- Vercel project: `7airbnbcloned/jeevan-personal-demo`, verified Hobby plan.
- Neon organization: `Shruti`, verified Free plan. Separate project `plain-union-99415860` (`jeevan-personal-preview`), PostgreSQL 16 in Singapore; isolated `fictional-preview` branch and `jeevan_qa` database. Existing Knowra data is untouched.
- Vercel project root is `jeevan/`, with `manage.py`, `requirements.txt`, `.python-version` and `vercel.json`. Use the native [Django integration](https://vercel.com/docs/frameworks/full-stack/django), minimum CLI 50.38.0. The WSGI entrypoint is selected explicitly in settings by disabling the otherwise preferred ASGI entrypoint on Vercel.
- `.vercelignore` excludes local uploads, databases, environment files, logs and the separate React template preview. Local credentials are in the ignored root `.env.vercel-preview` file. Never commit or paste its contents.

## Isolation and release

`JEEVAN_ENV=production`, `JEEVAN_VERCEL_PROFILE=preview`, `JEEVAN_DEMO_MODE=true` and database name `jeevan_qa` are required together. Missing access credentials, a real database name, another hosting profile or enabled email output rejects configuration. The application adds its exact Vercel deployment hostname; stable aliases must be listed explicitly. It does not trust all `*.vercel.app` hosts.

Run migrations and `seed_demo` once through an authorized operator environment using the direct Neon URL. Application traffic uses the pooled URL with `DB_CONN_MAX_AGE=0`. Never run migrations or seeds during the Vercel build or per request. The build checks production settings; Vercel collects static assets automatically. Its public CDN serves only static assets; the application gate protects patient pages and media/download routes.

Configure the new credentials as sensitive Preview environment variables. Deploy with `vercel deploy`, then verify HTTPS, readiness, access protection, login, static assets, disabled recovery and role permissions. Vercel account authentication may protect the deployment before the application's browser prompt. The application prompt uses username `preview` and `PREVIEW_ACCESS_TOKEN`. Normal fictional account passwords use `PREVIEW_ACCOUNT_PASSWORD`:

| Role | Username |
| --- | --- |
| Patient | `ananya.patel` |
| Doctor | `kavya.shah` |
| Nurse | `nisha.desai` |
| Receptionist | `riya.joshi` |
| Care coordinator | `meera.trivedi` |

The generated credentials are separate from the earlier Render credentials. Seeding preserves existing account passwords; changing an environment variable does not rotate seeded passwords.

## Demo limitations

Uploads use separate public/private directories under the function's temporary directory. They can disappear or be unavailable on another function instance. Never upload real patient files. The visible notice and no-store/no-index headers identify the fictional demo. Email and password recovery are disabled; teleconsultation remains unavailable.

Real clinic use requires an eligible commercial hosting plan, durable private object storage, a reviewed upload/download design, reliable email, backups and restore validation, monitoring, load testing and clinic acceptance. The app continues to refuse real-patient Vercel configuration with its current local-file storage. No paid plan upgrade or Render resource deletion is authorized by this demo setup.

The previously prepared frontend dependency updates remove the moderate advisories. Five low-severity Jest/deepmerge tooling notices remain; the upstream [deepmerge advisory](https://github.com/advisories/GHSA-gcqx-w48m-w2h4) has no published fix. The full audit continues to fail and must not be presented as clean.

On 7 November, the full local SQLite suite passed 231 tests with three PostgreSQL-only checks skipped. The hosting/configuration subset passed 27 checks. The new Neon database was migrated, seeded with fictional two-clinic data, and passed the database/private-storage round-trip verifier. These are distinct from verification of the live Vercel deployment.
