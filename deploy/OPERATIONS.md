# Production operations

These scripts target a Linux host with Docker Compose, Python 3, `flock` and restic. They have not been run against a production host. Use a protected encrypted staging disk: a private temporary plaintext recovery set exists while packaging/restoring. Deletion is not guaranteed secure erasure on SSDs.

Initialize an encrypted **remote** restic repository separately. Store its locator and password in operator-only files outside Git (`chmod 600`). Configure provider authentication outside the repository. Do not reuse the application/database passwords. The scripts refuse local repository paths and require an explicit off-host acknowledgement; that acknowledgement does not verify your provider's durability.

## Consistent backup

Arrange a maintenance window and stop all external writers, scheduled jobs, administrative edits and additional application instances. This package supports one web service, not independent writers. The script stops web, captures the database and both upload volumes, verifies upload hashes, restarts web, then uploads to restic. It attempts to restart web after errors. Expect temporary unavailability. Monitor the command exit code and web health.

From the repository root:

```sh
bash deploy/scripts/backup.sh --project jeevan-production \
  --env-file deploy/.env.production \
  --repository-file /secure/jeevan-restic-repository \
  --password-file /secure/jeevan-restic-password \
  --offhost-confirmed --exclusive-writer-confirmed
```

Record the exact restic snapshot ID, image tag/source revision, completion time and downtime. Database/files are included; DNS, environment secrets and Caddy certificates are not. Keep an independently protected copy of necessary configuration/secrets. Set retention with the clinic and cloud provider; these scripts never prune backups automatically. Alert on every failed/missing backup. `restic check` validates repository metadata, not a completed restore.

## Restore drill

Prepare a fresh environment file using **the same database role names** as the backup and new passwords. Use the exact application image revision that created the backup. Use a separate isolated host for sensitive records. No DNS, certificates or public port exposure is required. Outbound providers must be disabled/blocked for any later interactive drill.

```sh
bash deploy/scripts/restore-drill.sh --project jeevan-restore-20261102 \
  --env-file /secure/restore.env \
  --repository-file /secure/jeevan-restic-repository \
  --password-file /secure/jeevan-restic-password \
  --snapshot EXACT_HEX_SNAPSHOT_ID --offhost-confirmed
```

The script refuses existing project containers/volumes, validates the recovery checksums before database import, and never starts web or Caddy. It restores data into new project volumes, compares table counts and verifies private storage. New drill volumes remain for inspection; a failed attempt is not automatically deleted or retried over existing data. Verify consent, authorized/denied downloads, file contents and visit relationships before declaring recovery successful. Record measured recovery time and any missing data.

Recovery projects automatically choose a /24 from `10.200.0.0/16` or `172.30.0.0/16` that does not overlap existing Docker networks. The proxy address and trust setting follow the selected range together. Host/VPN routes are not inspected; use a separate host for sensitive data and check those routes before the drill. Backup and file restoration use the image's application user, which owns the upload volumes, and retain the container's dropped capabilities. Existing volumes must retain that user's ownership; do not switch recovery helpers to root to bypass an ownership error.

## Updates and incidents

Use immutable image tags. Build first, take a consistent backup, enter maintenance, stop web, run `release` explicitly, then start web/Caddy and verify health plus a fictional complete visit. A failed migration/release blocks startup; investigate rather than bypassing it. Container rollback is not database rollback. Recover production only through a separately reviewed incident plan; `restore-drill.sh` deliberately cannot overwrite production.

PostgreSQL initialization runs only on an empty database volume. Editing passwords/usernames in the environment file does not rotate existing database credentials. Rotate credentials through a reviewed database operation and update/restart the affected services together; do not delete the persistent volume to solve an authentication error.

Schedule backups and `prune_request_limits` on the host with monitored failure reporting. Monitor HTTPS/readiness, SMTP, application errors, disk usage and backup age. Docker log rotation bounds disk use; it is not a protected external audit collector. Provide that collector and alert recipients before clinic rollout.
