#!/usr/bin/env bash
# Linux deployment helpers; sourced only by backup.sh and restore-drill.sh.
set -Eeuo pipefail
umask 077

die() { printf '%s\n' "ERROR: $*" >&2; exit 1; }
need() { command -v "$1" >/dev/null || die "Required command unavailable: $1"; }

init_options() {
  PROJECT='' ENV_FILE='' REPOSITORY_FILE='' PASSWORD_FILE='' SNAPSHOT=''
  OFFHOST=0 EXCLUSIVE=0
  while (($#)); do
    case "$1" in
      --project|--env-file|--repository-file|--password-file|--snapshot)
        (($# >= 2)) || die "Missing value for $1"
        case "$1" in
          --project) PROJECT=$2;; --env-file) ENV_FILE=$2;;
          --repository-file) REPOSITORY_FILE=$2;; --password-file) PASSWORD_FILE=$2;; --snapshot) SNAPSHOT=$2;;
        esac
        shift 2;;
      --offhost-confirmed) OFFHOST=1; shift;;
      --exclusive-writer-confirmed) EXCLUSIVE=1; shift;;
      *) die "Unknown option: $1";;
    esac
  done
  [[ "$PROJECT" =~ ^[a-z0-9][a-z0-9_-]+$ ]] || die 'An explicit Compose --project is required.'
  [[ -n "$ENV_FILE" && -f "$ENV_FILE" ]] || die 'An existing --env-file is required.'
  [[ -n "$REPOSITORY_FILE" && -s "$REPOSITORY_FILE" ]] || die 'An existing --repository-file is required.'
  [[ -n "$PASSWORD_FILE" && -s "$PASSWORD_FILE" ]] || die 'An existing --password-file is required.'
  [[ "$OFFHOST" == 1 ]] || die 'Confirm the encrypted repository is off-host using --offhost-confirmed.'
  need docker; need restic; need python3
  SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)
  COMPOSE_FILE="$SCRIPT_DIR/../compose.production.yml"
  [[ -f "$COMPOSE_FILE" ]] || die 'Compose deployment file is missing.'
  if [[ "$PROJECT" == jeevan-restore-* ]]; then
    # Keep the live stack running: a second fixed subnet would overlap it.
    local network_ids
    network_ids=$(docker network ls -q) || die 'Cannot inspect Docker networks.'
    if [[ -n "$network_ids" ]]; then
      JEEVAN_NETWORK_PREFIX=$(docker network inspect $network_ids | python3 "$SCRIPT_DIR/restore_network.py")
    else
      JEEVAN_NETWORK_PREFIX=$(printf '[]' | python3 "$SCRIPT_DIR/restore_network.py")
    fi
    export JEEVAN_NETWORK_PREFIX
  fi
  ENV_FILE=$(python3 -c 'import pathlib,sys;print(pathlib.Path(sys.argv[1]).resolve())' "$ENV_FILE")
  REPOSITORY_FILE=$(python3 -c 'import pathlib,sys;print(pathlib.Path(sys.argv[1]).resolve())' "$REPOSITORY_FILE")
  PASSWORD_FILE=$(python3 -c 'import pathlib,sys;print(pathlib.Path(sys.argv[1]).resolve())' "$PASSWORD_FILE")
  local repository
  IFS= read -r repository < "$REPOSITORY_FILE" || true
  case "$repository" in s3:*|sftp:*|rest:*|azure:*|gs:*|b2:*|rclone:*) ;; *) die 'A remote restic repository is required; local paths are rejected.';; esac
  unset RESTIC_REPOSITORY RESTIC_REPOSITORY_FILE RESTIC_PASSWORD RESTIC_PASSWORD_COMMAND RESTIC_PASSWORD_FILE
  DC=(docker compose --project-name "$PROJECT" --env-file "$ENV_FILE" -f "$COMPOSE_FILE")
  RC=(restic --repository-file "$REPOSITORY_FILE" --password-file "$PASSWORD_FILE")
  "${DC[@]}" config --quiet
  # Reject shared/fixed volume names: a drill must not mount another stack's data.
  "${DC[@]}" config --format json | python3 -c '
import json,sys
data=json.load(sys.stdin); project=sys.argv[1]
for volume in data.get("volumes", {}).values():
    if volume.get("external") or not volume.get("name", "").startswith(project+"_"):
        raise SystemExit("Volumes must be project-scoped; external/fixed names are not supported.")
for service in data.get("services", {}).values():
    if service.get("container_name"):
        raise SystemExit("Fixed container names are not supported for safe recovery drills.")
web=data["services"]["web"]
for target in ("/app/media", "/app/private_media"):
    matches=[mount for mount in web.get("volumes",[]) if mount.get("target")==target]
    if len(matches)!=1 or matches[0].get("type")!="volume":
        raise SystemExit("Public/private uploads must be separate project-scoped named volumes.")
' "$PROJECT"
  PAYLOAD_SOURCE=$(cat "$SCRIPT_DIR/backup_payload.py")
}

db_counts() {
  "${DC[@]}" exec -T db sh -ceu 'export PGPASSWORD="$POSTGRES_PASSWORD"; exec psql --no-password -U "$POSTGRES_USER" -d "$POSTGRES_DB" -At -v ON_ERROR_STOP=1' <<'SQL'
SELECT json_build_object('users',(SELECT count(*) FROM care_customuser),'patients',(SELECT count(*) FROM patient_patient),'appointments',(SELECT count(*) FROM appointments_appointment),'records',(SELECT count(*) FROM records_medicalrecord),'documents',(SELECT count(*) FROM patient_patientdocument),'migrations',(SELECT count(*) FROM django_migrations));
SQL
}
