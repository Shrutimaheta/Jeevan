#!/bin/bash
set -euo pipefail
# The migration owner has DDL rights; the running web role receives DML only.
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" \
  --set=runtime="$DB_USER" --set=runtime_password="$DB_PASSWORD" \
  --set=migrator="$DB_MIGRATION_USER" --set=migration_password="$DB_MIGRATION_PASSWORD" <<'SQL'
CREATE ROLE :"migrator" LOGIN PASSWORD :'migration_password' NOSUPERUSER NOCREATEDB NOCREATEROLE;
CREATE ROLE :"runtime" LOGIN PASSWORD :'runtime_password' NOSUPERUSER NOCREATEDB NOCREATEROLE;
ALTER DATABASE :"DBNAME" OWNER TO :"migrator";
ALTER SCHEMA public OWNER TO :"migrator";
REVOKE CREATE ON SCHEMA public FROM PUBLIC;
SQL
