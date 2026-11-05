# Running Jeevan for a clinic

The Django application is the supported clinic interface. React is a separate design preview and entry page; it does not replace Django authentication or clinical workflows.

## Deployment configuration

Use Python 3.12 and a supported PostgreSQL server on a host with persistent storage. Install `requirements.txt`. Configure production values through the host's secret manager; a root `.env` is loaded for local convenience without overriding environment variables.

Set these values before starting production:

- `JEEVAN_ENV=production`, `JEEVAN_DEMO_MODE=false`.
- A new random `DJANGO_SECRET_KEY` with at least 50 characters; exact HTTPS hosts in `DJANGO_ALLOWED_HOSTS` (no `*`) and origins in `DJANGO_CSRF_TRUSTED_ORIGINS`.
- `DATABASE_URL` for PostgreSQL, or `DB_ENGINE=django.db.backends.postgresql`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`.
- `EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend` and real SMTP credentials; set an authenticated sender in `DEFAULT_FROM_EMAIL`. The localhost development sender is rejected in real-user production mode.
- Absolute `PRIVATE_MEDIA_ROOT` and `MEDIA_ROOT` on separate durable directories. The private directory must never be exposed by the web server. Verify the host preserves both across deploys/restarts, then set `JEEVAN_PERSISTENT_STORAGE=true`.

Run from the directory containing `manage.py`:

```sh
python manage.py migrate --noinput
python manage.py collectstatic --noinput
python manage.py check --deploy
python manage.py verify_deployment
gunicorn jeevan.wsgi:application --bind 0.0.0.0:8000
```

Only trust `X-Forwarded-Proto` from the configured TLS proxy; the proxy must overwrite client-supplied forwarding headers. Set allowed hosts narrowly. Run the application as a non-root OS account. Grant the database role only the access it needs. Keep the schema-migration role separate from the runtime role if practical.

If requests arrive through a proxy, configure only its actual IP ranges in `JEEVAN_TRUSTED_PROXY_NETWORKS`. The throttle reads `X-Forwarded-For` only from those ranges and stops at the first untrusted hop. With no trusted networks configured, the direct remote address is used; do not add public client networks to the trusted list.

`/health/live/` checks the application; `/health/ready/` checks database connectivity. Monitor these plus error rates, failed logins, storage capacity, SMTP delivery and database availability. Run `python manage.py prune_request_limits` daily. Rate limiting uses atomic database counters shared by workers; it does not depend on a process-local cache or a proxy-supplied IP header.

## Existing uploads

The new migrations fix how storage configuration is serialized; they do not move files. Keep existing private-file contents and relative names when mounting the durable directory. If migrating from public medical uploads, inventory and copy them into private storage, verify authorized downloads and remove public copies through a separately reviewed data migration. Back up before any such migration.

Downloads and report exports use Django's storage API. The default configuration supports durable filesystem volumes. A remote backend can be configured under `STORAGES['private']`, but must keep objects private; test it before changing the deployment. No remote storage account is provisioned by the repository.

## Audit trail and backups

Audit events are stored in `care_auditevent` and production emits event IDs/actions to stdout. Forward stdout to a protected external collector with retention and access controls. The application does not expose audit editing/deletion. Database owners can still modify a database; a local HMAC chain is not proof against a privileged administrator. For stronger protection, grant a separate runtime role SELECT/INSERT but not UPDATE/DELETE on the audit table and archive events externally. Do not log OTPs, passwords, request bodies or clinical document contents.

Back up PostgreSQL and private/public files as a consistent recovery set, using encrypted backups outside the application host. Set retention and recovery objectives with the clinic. Test restoration into a separate environment: verify patient/appointment counts, consent state, file checksums and authorized downloads. Record when the restore passed. A successful storage round trip is not a backup/restore test. Backups, monitoring and the external collector require deployment configuration; local tests do not verify them.

## External features

- ABHA creation/verification and OTP endpoints return an explicit unavailable response. They issue no invented identifier and collect no Aadhaar/phone challenge while disconnected. Connect an approved provider and add provider-contract tests before enabling these features.
- Password recovery supports SMTP email. Phone recovery is disabled until a real SMS service is implemented. Configure and test delivery from the production sender.
- Video consultation is disabled by default. To enable a provider, configure `TELECONSULTATION_ENABLED=true`, an HTTPS `TELECONSULTATION_ORIGIN` and `TELECONSULTATION_ADMISSION_VERIFIED=true` only after testing provider admission, privacy and access controls. The app does not pretend that a locally generated password protects an external meeting. Start/join is a CSRF-protected POST and terminal sessions cannot be joined. Existing meeting links must match the configured provider.

## Pilot acceptance

Before using real patient data, run a supervised complete visit with fictional accounts for all roles. Include concurrent booking, declined/expired/renewed/revoked consent, an unauthorized staff account, next-day completion, email recovery, report download/export and error recovery. Verify phone layout and accessibility with the actual users. Review the activity indicator's wording with the clinical owner; it is a heuristic activity summary, not a diagnosis or validated clinical score.

Use `JEEVAN_DEMO_MODE=true` only for fictional-data demonstrations. Vercel with local uploads is a demo setup and cannot provide durable real-user records. No clinical or regulatory certification is claimed by the code.
