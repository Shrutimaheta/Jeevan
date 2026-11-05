#!/usr/bin/env bash
# Never restores over production. Leaves the fresh drill web service stopped.
set -Eeuo pipefail
source "$(dirname -- "${BASH_SOURCE[0]}")/backup-common.sh"
init_options "$@"
[[ "$PROJECT" == jeevan-restore-* ]] || die 'Use a NEW project named jeevan-restore-...'
[[ "$SNAPSHOT" =~ ^[a-f0-9]{8,64}$ ]] || die 'Specify an exact restic --snapshot ID (not latest).'
[[ -z "$(docker ps -aq --filter "label=com.docker.compose.project=$PROJECT")" ]] || die 'Drill project already has containers.'
[[ -z "$(docker volume ls -q --filter "label=com.docker.compose.project=$PROJECT")" ]] || die 'Drill project already has volumes.'
STAGE=$(mktemp -d)
cleanup() { local status=$?; trap - EXIT; rm -rf -- "$STAGE"; exit "$status"; }
trap cleanup EXIT
"${RC[@]}" restore "$SNAPSHOT" --target "$STAGE"
# restic restores the original absolute staging path; locate one complete set.
mapfile -t SETS < <(find "$STAGE" -type f -name checksums.json)
[[ ${#SETS[@]} == 1 ]] || die 'Snapshot must contain exactly one recovery set.'
SET=$(dirname "${SETS[0]}")
python3 - "$SET" <<'PY'
import hashlib,json,pathlib,sys
root=pathlib.Path(sys.argv[1]);manifest=json.loads((root/'checksums.json').read_text())
if set(manifest)!={'database.dump','uploads.tar','counts.json'}:raise SystemExit('Invalid recovery manifest')
for name,expected in manifest.items():
    h=hashlib.sha256()
    with (root/name).open('rb') as stream:
        for chunk in iter(lambda:stream.read(1024*1024),b''):h.update(chunk)
    if h.hexdigest()!=expected:raise SystemExit('Recovery checksum mismatch')
PY
python3 "$SCRIPT_DIR/backup_payload.py" verify "$SET/uploads.tar"
"${DC[@]}" up -d --wait db
"${DC[@]}" exec -T db sh -ceu 'export PGPASSWORD="$POSTGRES_PASSWORD"; exec pg_restore --no-password -U "$POSTGRES_USER" -d "$POSTGRES_DB" --role "$DB_MIGRATION_USER" --no-owner --no-acl --clean --if-exists --exit-on-error' <"$SET/database.dump"
"${DC[@]}" run --rm --no-deps -T --entrypoint python web -c "$PAYLOAD_SOURCE" restore <"$SET/uploads.tar"
db_counts >"$STAGE/restored-counts.json"
python3 - "$SET/counts.json" "$STAGE/restored-counts.json" <<'PY'
import json,sys
if json.load(open(sys.argv[1]))!=json.load(open(sys.argv[2])):raise SystemExit('Restored row counts differ')
PY
"${DC[@]}" run --rm --no-deps -T release python manage.py grant_runtime_permissions
"${DC[@]}" run --rm --no-deps -T web python manage.py verify_deployment
printf '%s\n' 'Isolated database/file checksums and counts matched. Web/Caddy remain stopped. Record recovery time, then verify consent and authorized downloads in an isolated pilot. No production data was replaced.'
