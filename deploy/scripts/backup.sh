#!/usr/bin/env bash
# Requires a maintenance window: only this Compose web service may write data.
set -Eeuo pipefail
source "$(dirname -- "${BASH_SOURCE[0]}")/backup-common.sh"
init_options "$@"
[[ "$EXCLUSIVE" == 1 ]] || die 'Confirm no external writers/jobs using --exclusive-writer-confirmed.'
need flock
exec 9>"$(dirname "$ENV_FILE")/.backup.lock"
flock -n 9 || die 'Another backup is already running.'
[[ -n "$("${DC[@]}" ps -q web)" ]] || die 'Web must be running before the maintenance backup.'
STAGE=$(mktemp -d)
STOPPED=0
cleanup() {
  local status=$?
  trap - EXIT
  if [[ "$STOPPED" == 1 ]]; then
    "${DC[@]}" start web || status=1
  fi
  rm -rf -- "$STAGE"
  exit "$status"
}
trap cleanup EXIT
"${RC[@]}" snapshots --json >/dev/null # Repository must be initialized before downtime.
"${DC[@]}" stop web
STOPPED=1
"${DC[@]}" exec -T db sh -ceu 'export PGPASSWORD="$POSTGRES_PASSWORD"; exec pg_dump --no-password -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc --no-owner --no-acl' >"$STAGE/database.dump"
db_counts >"$STAGE/counts.json"
"${DC[@]}" run --rm --no-deps -T --entrypoint python web -c "$PAYLOAD_SOURCE" capture >"$STAGE/uploads.tar"
python3 "$SCRIPT_DIR/backup_payload.py" verify "$STAGE/uploads.tar"
python3 - "$STAGE" <<'PY'
import hashlib,json,pathlib,sys
root=pathlib.Path(sys.argv[1]);manifest={}
for name in ('database.dump','uploads.tar','counts.json'):
    h=hashlib.sha256()
    with (root/name).open('rb') as stream:
        for chunk in iter(lambda:stream.read(1024*1024),b''):h.update(chunk)
    manifest[name]=h.hexdigest()
(root/'checksums.json').write_text(json.dumps(manifest,sort_keys=True))
PY
"${DC[@]}" start web
STOPPED=0
(cd "$STAGE" && "${RC[@]}" backup --tag "jeevan-$PROJECT" --tag jeevan-consistent database.dump uploads.tar counts.json checksums.json)
"${RC[@]}" check
printf '%s\n' 'Encrypted backup uploaded and repository metadata checked. Record the snapshot ID and perform a restore drill; this is not proof of recoverability.'
