# Deployment preparation — 2 November 2026

The user confirmed there is no hosting/domain or SMTP provider yet. This package prepares a single-host Linux deployment; it does not purchase services, create external accounts or publish patient data.

## Delivered

- Python 3.12/Gunicorn image running as an unprivileged user. Local databases, uploaded files, environment secrets and React development dependencies are excluded from the build context.
- PostgreSQL 16, HTTPS proxy, separate persistent public/private/static volumes and release-gated startup. Only the proxy publishes ports; private uploads are not mounted in the proxy. Database administrators, migration owners and runtime roles have separate credentials.
- Migration/release command grants runtime data access without schema creation or audit editing/deletion. The web container receives no administrator/migration passwords.
- Encrypted remote restic backup and isolated restore-drill scripts. These include coordinated maintenance, database plus both upload volumes, file checksums, row counts and refusal to restore over an existing stack.
- Deployment verifier supports a no-send SMTP connection check and an explicitly requested test email, with truthful delivery wording and sanitized failures.
- Host setup, acceptance, monitoring, credential rotation and recovery instructions. A CI workflow builds/starts disposable containers and checks health, persistence, permissions and static files.

## Verification actually performed

- **21 PostgreSQL tests passed** for deployment configuration, storage/SMTP probes and runtime privilege restrictions. SMTP was mocked; no email was sent.
- **3 recovery-payload tests passed**: byte-for-byte restore, checksum failure, unsafe paths/links and refusal to overwrite a nonempty destination.
- Deployment, initializer, backup and restore shell syntax passed using Git Bash. Compose/workflow YAML parsed and whitespace checks passed.
- The database initializer was executed against a new disposable PostgreSQL database: migration owner could create a table, runtime user was denied schema creation. Only those newly created QA resources were removed afterward.

Docker is not installed on this computer. The Docker image/Compose stack, real HTTPS, remote restic backup, SMTP delivery and the new GitHub CI job have **not** been executed here. The preceding full project review separately passed 183 PostgreSQL tests and a final 20-test delta; these are not substitutes for running the deployment stack.

## Remaining environment-dependent work

Supply hosting, DNS/domain, SMTP/verified sender, an encrypted off-host backup repository, protected audit collection and alert recipients. Run the supplied CI and host acceptance gates, complete an actual database-plus-files recovery drill and obtain clinic pilot acceptance before real-patient rollout. Some browser dependencies remain third-party CDN resources; verify the intended clinic network and vendor them if offline/restricted operation is required.

Start with [deploy/README.md](deploy/README.md) and [deploy/OPERATIONS.md](deploy/OPERATIONS.md). No production-ready certification or completed live deployment is claimed.
