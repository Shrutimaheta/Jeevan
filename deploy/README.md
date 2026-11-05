# Jeevan deployment preparation

**આ deploymentની તૈયારી છે; project હજી live નથી.** Hosting, domain અને SMTP મળ્યા પછી આ guide પ્રમાણે setup અને acceptance checks કરવાના છે. હમણાં કોઈ account, server, domain કે email service બનાવવામાં આવી નથી.

The package targets one Linux host with Docker Compose: Caddy terminates HTTPS, Gunicorn runs the Django clinic application on Python 3.12, and PostgreSQL 16 stores application data. The separate React project is not the production clinic interface.

The user selected Render; use [RENDER.md](RENDER.md) for its protected free preview and separate paid production preparation. The remaining instructions on this page describe the alternative Linux/Docker host and are not Render commands.

## 1. Obtain and record the real deployment details

Before starting, an operator must supply:

- A Linux server with Docker and the Compose plugin, restricted administrator access, persistent disk and an update owner. Size it for the expected users and uploads; this repository does not establish a production capacity limit.
- A domain/subdomain controlled by the clinic. Point its DNS to the host. Add an IPv6 record only when the server's IPv6 routing works. Ports 80 and 443 must reach Caddy; do not publicly expose the database or Django's internal port.
- SMTP service credentials, its actual port/TLS mode, and a sender address the provider authorizes. Apply the provider's domain-authentication DNS records. Console/file email is not a substitute for patient recovery email.
- Unique application and database secrets. Keep them in the host's secret store or the ignored `deploy/.env.production`, readable only by the operator. Never put credentials into Git, screenshots, chat logs or the Docker image.
- Persistent public-media and private-media volumes, protected log collection, monitoring recipients and an encrypted off-host backup destination. Use [OPERATIONS.md](OPERATIONS.md) for backup, maintenance and restore-drill procedures.

Copy [`.env.production.example`](.env.production.example) to the ignored `deploy/.env.production` and fill its required values. Compose derives allowed hosts and HTTPS CSRF origins from the single `JEEVAN_DOMAIN`. Keep production mode enabled, demo mode disabled, and unsupported integrations disabled. Do not replace missing SMTP or host information with invented values to make a check appear successful.
Set `JEEVAN_IMAGE_TAG` to the reviewed source revision and retain that image for recovery; do not reuse a tag for different releases.

Public media is served from `/app/media` and is intended for public profile images. Medical documents belong in `/app/private_media` and must be downloaded through authorized Django routes. The private directory must never be mounted in Caddy or made public.

## 2. Inspect configuration before starting

The commands below are for the chosen Linux host, from the repository root. Do not run them until real configuration is available.

```sh
# Restrict the real secret file after creating it from the deployment example.
chmod 600 deploy/.env.production

# Use the same project name and secret file for every command.
dc() {
  docker compose --project-name jeevan-production \
    --env-file deploy/.env.production -f deploy/compose.production.yml "$@"
}

# Validate without printing expanded secrets.
dc config --quiet
dc build
```

Missing required variables must fail validation. Do not paste the output of an expanded `docker compose config` into a ticket because it may contain secrets.

Inspect the configuration before first use: only Caddy should publish HTTP/HTTPS ports; PostgreSQL, private files and the application port should remain internal. The web container must run as a non-root application user. Preserve the stack's persistent volumes across rebuilds.

## 3. First startup

```sh
dc up -d --build
dc ps -a
dc logs --tail=100 release web
```

The release service must finish successfully before web starts. It performs deployment checks, database migrations, runtime-role grants, static collection and the database/private-storage probe. The web role cannot migrate schemas or edit/delete audit events; migrations use a separate owner. Web receives neither database administrator nor migration passwords. Web does not independently run schema migrations on every worker start. A failed release is a failed deployment; inspect the cause instead of bypassing its checks.

After it succeeds:

```sh
dc exec web python manage.py createsuperuser
dc exec web python manage.py check --deploy --fail-level WARNING
dc exec web python manage.py verify_deployment
```

Create the first administrator interactively and use a unique password; select the Admin role on the sign-in page. Do not seed fictional QA accounts into production. Configure real staff accounts and hospital assignments with the clinic owner before the pilot.

For later releases, follow [OPERATIONS.md](OPERATIONS.md): build the new image, take the coordinated backup in a maintenance window, stop web before schema-changing release work, run the release service, then restart and repeat acceptance checks. Do not assume that downgrading an image reverses a database migration.

## 4. Acceptance gates before real patient use

Record the date, image revision and operator for each result. Startup alone is not acceptance.

| Gate | Required evidence |
| --- | --- |
| Domain and HTTPS | Correct domain, valid certificate, HTTP redirects to HTTPS, no browser certificate warning. |
| Readiness | `/health/live/` and `/health/ready/` succeed through the public HTTPS host. Exercise database-failure detection in disposable staging, never by interrupting an active clinic database. |
| Login and roles | Fictional patient, doctor, nurse, receptionist and coordinator accounts reach their proper pages; unrelated staff cannot read another hospital's records. |
| Complete visit | Book, confirm, record vitals, upload a fictional report, grant/revoke consent, issue a prescription, and verify the final appointment status. |
| Private files | Authorized download works; guest and unrelated-user access fails. Raw private file paths never return a document. |
| Persistent storage | A fictional upload remains available after a web-container restart/recreation. This proves persistence, not backup recovery. |
| SMTP connection | `dc exec web python manage.py verify_deployment --check-smtp` connects without sending mail. |
| Email delivery | After explicitly selecting a test inbox you control, use `verify_deployment --send-test-email RECIPIENT`. Confirm inbox receipt and then test the normal recovery flow. SMTP acceptance alone does not prove delivery. |
| Browser assets | Actual clinic browsers load the required styles/scripts; check desktop, phone, keyboard navigation, forms, errors and downloads. See the dependency note below. |
| Recovery | Complete the isolated backup restoration procedure in [OPERATIONS.md](OPERATIONS.md). Record its result before the pilot. |
| Operations | An identified person receives actionable alerts; logs omit passwords, OTPs, request bodies and clinical document contents. |

ABHA, phone recovery, staffed live chat and ambulance dispatch are not supplied by this stack. Video remains disabled unless its external provider's admission and privacy controls have separately been verified. Do not enable flags just to make those controls appear available.

### Browser dependency note

Some Django pages still load Bootstrap, icons, HTMX, fonts or runtime Tailwind from third-party CDNs. `collectstatic` and a successful Docker build do not prove those resources load on a clinic's network. Test the actual user network and a blocked-CDN condition. If the service must work offline or through a restricted network, vendor/build the required assets locally and retest before rollout. No offline-readiness claim is made by this package.

## 5. Monitoring and routine ownership

Monitor HTTPS availability, readiness, application failures, failed-login spikes, SMTP failures, database availability, disk/volume capacity, backup completion and certificate renewal. Agree alert recipients and escalation times with the clinic. Use a protected external log collector; do not enable unrestricted request/body logging for clinical pages.

Schedule the following command daily, with the repository root as the job's working directory and failure reporting enabled. A scheduler cannot rely on the interactive `dc` shell helper:

```sh
docker compose --project-name jeevan-production \
  --env-file deploy/.env.production -f deploy/compose.production.yml \
  exec -T web python manage.py prune_request_limits
```

This guide does not install a host schedule or notification service. Review access and restore-drill evidence routinely, and repeat the acceptance gates after meaningful configuration or infrastructure changes.

## CI deployment-artifact validation

The deployment-package workflow uses disposable synthetic values, never production secrets or real patient data. Its checks include:

1. Retain the existing Python 3.12 SQLite/PostgreSQL backend checks, frontend tests/build and dependency audit.
2. Validate Compose syntax using a temporary complete test environment; verify that missing required host/secret/SMTP fields fail. Avoid printing resolved secrets.
3. Build the production Docker image and run its Django deployment checks, migrations, static collection and readiness/storage probe against disposable PostgreSQL.
4. Verify health dependencies, non-root execution, withheld administrator credentials, audit-update denial, upload persistence after restart and static-file delivery. Review the Compose volumes/ports and verify actual private-path denial through HTTPS during host acceptance.
5. Run an isolated startup/restart/teardown smoke test with fictional data. No email is sent by this job. Live SMTP connection/delivery checks remain host acceptance gates.
6. Check backup/restore shell syntax and test upload checksums plus unsafe-archive rejection. The encrypted off-host restore drill remains required before marking a real environment accepted. See [OPERATIONS.md](OPERATIONS.md).

The workflow is supplied in the repository; it has not been run on GitHub from this workspace. Docker is unavailable on this computer. Local checks do not prove container startup, live DNS, certificate issuance, SMTP inbox delivery or production recovery. Record actual CI and host results separately.

Reference behavior was checked against the official [Compose startup-order documentation](https://docs.docker.com/compose/how-tos/startup-order/) and [Caddy reverse-proxy documentation](https://caddyserver.com/docs/caddyfile/directives/reverse_proxy).
