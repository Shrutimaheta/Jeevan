# Deploying Jeevan on Render

Render is the selected host as of 4 November 2026. The configuration is prepared locally; it has not been pushed, synced or deployed to a Render account. The earlier Oracle/DuckDNS plan is an alternative only.

## Start with the free protected preview

Use the repository-root [`render.yaml`](../render.yaml). It explicitly selects free web and database plans and disables automatic application deploys. It does not provision a paid disk or paid compute. The native Python runtime follows [`.python-version`](../.python-version), which selects the latest Python 3.12 patch supported by Render.

The preview is **fictional data only**. [Render Free](https://render.com/docs/free) sleeps when idle, discards uploaded local files on restarts/redeploys, blocks standard SMTP ports and expires its free PostgreSQL database after 30 days. The database is not a permanent record store. Do not enter real patient information, and do not change a real database's name to bypass the preview restriction.

1. The Render integration is connected, and the user confirmed **My Workspace** (`tea-dbe8mnks728c73bdhs20`). Discovery on 5 November 2026 found two unrelated free web services and no database; leave those existing services unchanged. The free web-hour allowance is shared across the workspace. If using the dashboard instead, sign in to [Render](https://dashboard.render.com/).
2. Review and publish the prepared application source to an authorized branch of `Shrutimaheta/Jeevan`. Render reads the remote Git branch, not this local working directory. Include the existing application fixes, migrations and tests that these files depend on. Do not publish local `.env` files, databases, uploaded reports, `.qa` artifacts or private credentials.
3. Create a Blueprint from that branch using the root `render.yaml`. Check that it describes `jeevan-preview` and `jeevan-preview-db`, both **Free**, before applying. Confirm these names will not modify existing resources. Render permits only one free database in a workspace; an existing database can therefore block creation. Do not delete or replace an existing database to get past that limit without reviewing its data.
4. Keep the Root Directory unset. The build/start commands need both `deploy/` and `jeevan/`; Render excludes files outside a configured root directory. The scripts locate the Django directory themselves. They install requirements, validate production settings, collect static files and start Gunicorn on Render's supplied `PORT`.
5. In the service's Environment page, retrieve the generated `PREVIEW_ACCESS_TOKEN` and `PREVIEW_ACCOUNT_PASSWORD`. Keep both private. The initial browser access prompt uses username **`preview`** and the access token as its password. This gate protects every application/static/media route except the minimal health endpoints.
6. At the normal Jeevan sign-in screen, use a fictional account from the table below, its matching role, and `PREVIEW_ACCOUNT_PASSWORD`. The preview initializes only the dedicated `jeevan_qa` database. It creates no superuser. Reseeding preserves existing account passwords; changing the environment password later does not rotate existing users' passwords.
7. Confirm the persistent on-screen fictional-data notice, clinic pages, static styles, appointment flows and private-report permissions. Recovery email deliberately returns an unavailable message, and the dummy backend sends no email or OTP to a provider or console log.

| Role | Fictional username |
| --- | --- |
| Patient | `ananya.patel` |
| Doctor | `kavya.shah` |
| Nurse | `nisha.desai` |
| Receptionist | `riya.joshi` |
| Care coordinator | `meera.trivedi` |

The preview uses HTTPS/secure cookies and production error handling. Its access gate, no-index headers and disabled email are additional preview behavior, not claims of clinical readiness. The health endpoints remain reachable for Render's probes without forcing an HTTPS redirect; they return only availability status. No secret values are stored in the Blueprint.

## Real-patient configuration — paid resources, not yet authorized or applied

[`render.production.yaml`](render.production.yaml) is a **separate, paid** configuration for review. It is not the default root Blueprint and must not be applied under the free-preview budget. It currently specifies web plan `1c-2g`, database plan `0.5c-1g`, a 10 GB upload disk and 15 GB database disk. These are initial sizing choices, not measured multi-clinic capacity. Check [current Render pricing](https://render.com/pricing) and obtain an explicit budget decision before creating or upgrading resources.

Both configurations select Singapore so the web service and database share a region. Review the clinics' data-region requirements before creating resources; moving an existing service between regions is not a simple setting change.

Production preparation steps:

1. Use the separate production database (`jeevan`), not `jeevan_qa`. Keep demo mode off. Set an actual verified email sender and SMTP credentials. The prepared paid-service profile uses Brevo STARTTLS on port 587; confirm connection and inbox delivery on the actual service. No email has been sent during preparation.
2. The [persistent disk](https://render.com/docs/disks) is mounted at `/var/data`. Public profile images use `/var/data/public-media`, and medical reports use `/var/data/private-media`. Files outside this mount are ephemeral. Verify the native runtime user's write/read/delete permissions and persistence across a restart. A Render-specific Django endpoint serves raster profile images from the public directory; private files continue to use authenticated application download routes. There is no public directory listing or generic private-file route.
3. Run database migrations as the migration owner in a controlled operator release. Do not put that owner's password into the web service. Create a separate login role without superuser, database creation, role creation, schema creation or owner-role membership. Render documents [SQL-created database users](https://render.com/docs/postgresql-credentials); verify the actual managed account supports the required role setup before accepting the host.
4. For example, from a protected operator PostgreSQL session, create `jeevan_runtime` with `LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT`, set its password with PostgreSQL's interactive `\password` command, and revoke schema creation from `PUBLIC`. Do not grant this role membership in the migration owner or an audit-table owner.
5. On the reviewed source revision, load production settings and the migration owner's connection URL into a protected operator environment. Use `JEEVAN_RUNTIME_DB_USER=jeevan_runtime`, then run `python manage.py migrate --noinput` and `python manage.py grant_runtime_permissions` from `jeevan`. The operator release does not require access to uploaded files. If connecting externally, temporarily allow only the operator's exact IP and restore the database's empty external IP allowlist afterward. The default Blueprint allows no external database connections.
6. Put the restricted role's connection URL into the web service's `DATABASE_URL`, with the password correctly URL encoded. Leave migration credentials out of that service. The production Blueprint intentionally does not auto-fill the owner's connection string and does not run migrations from the web process. Startup refuses pending migrations, unsafe runtime/audit privileges or failed private storage.
7. Create the platform administrator through an explicitly controlled operator action; production never seeds demonstration accounts or generates an administrator on startup. Set up individual clinic/staff identities and complete the [multiple-clinic acceptance steps](../MULTICLINIC_READINESS_2026-11-04.md).
8. Verify a full database-plus-public/private-file backup and restore using the actual Render services. The existing Compose `backup.sh`/`restore-drill.sh` scripts target the Linux Docker stack and **must not be presented as working Render backup scripts**. Provider database backups or disk snapshots alone do not prove a synchronized clinical recovery. A Render-specific backup schedule/restore drill remains an acceptance gate.
9. Configure protected audit collection, error/availability/storage/email/backup alerts, quotas and named operators. Test expected clinic volumes, slow networks, session expiry and complete patient/doctor/nurse/receptionist/coordinator journeys. Services with persistent disks have deployment/scale limitations; do not assume zero-downtime upgrades or horizontal scaling for this single-disk profile.

During live acceptance, also identify the actual proxy peer networks and configure `JEEVAN_TRUSTED_PROXY_NETWORKS` narrowly. Test login limits with two independent clients and a forged forwarding header. The conservative default ignores forwarded client IPs and can combine anonymous limits behind one proxy. Do not fix that by trusting every address or blindly trusting client-supplied headers.

Apply production only after budget authorization and infrastructure acceptance. Never remove the storage, schema, runtime-role or email checks to force an incomplete deployment to start.

## Verification supplied and performed

Both Blueprints passed the current official [Render JSON Schema](https://render.com/schema/render.yaml.json) locally. Build/start shell syntax passed. The focused PostgreSQL checks verified configuration rejection paths, preview gating/notices, disabled recovery, public image boundaries and a genuine restricted PostgreSQL role passing the production startup verifier. No new Python dependency was required for these hosting changes.

The complete local PostgreSQL suite passed **227 tests** without skips. A final focused check after invalid-filename handling passed **13 tests**. These results cover the local source and do not establish real-patient readiness or successful cloud deployment.

The [`Render preparation` CI workflow](../.github/workflows/render.yml) executes the real build/start scripts on Linux/Python 3.12/PostgreSQL 16, then tests HTTP access protection, the visible notice, readiness, recovery restriction and public/private files. This workflow has been supplied but not run on GitHub from this workspace. Local PostgreSQL verification uses Python 3.14/PostgreSQL 18; it is not evidence of a successful Render build or live TLS/email/storage recovery.

Source references: [Blueprint specification](https://render.com/docs/blueprint-spec), [monorepo root behavior](https://render.com/docs/monorepo-support), [Python version selection](https://render.com/docs/python-version), [Django deployment](https://render.com/docs/deploy-django).
