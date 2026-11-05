# Production readiness verification — 3 November 2026

## Decision

The current application passes the local functional and integration checks below. Real-patient release remains blocked on deployment, recovery and operational acceptance. No finite test run establishes that every defect has been found. This report separates executed checks from work that still needs evidence.

Testing used fictional data and isolated databases. Existing project changes were retained. Nothing was published, no real email was sent, and no real-patient records were used.

## Checks executed on the current code

| Area | Result | Evidence in workspace |
| --- | --- | --- |
| Complete Django suite, PostgreSQL 18 | 198 tests passed, no skips, 179.152 seconds | `readiness-backend-pg-verified-20261103.txt` |
| Complete Django suite, SQLite | 198 tests run, 195 passed and 3 PostgreSQL-only skips, 157.422 seconds | `readiness-backend-sqlite-20261103.txt` |
| Django configuration and migration drift | No issues; no model changes without migrations | Executed `check` and `makemigrations --check --dry-run` |
| Production configuration | `check --deploy --fail-level WARNING` passed with synthetic configuration | `readiness-production-config-20261103.txt` |
| Frontend tests after compatible package updates | 19 passed across 5 suites | `readiness-frontend-tests-final-20261103.txt` |
| Frontend lint after updates | Passed with zero warnings | `readiness-frontend-lint-final-20261103.txt` |
| Production frontend build after updates | Passed, including TypeScript compilation | `readiness-frontend-build-final-20261103.txt` |
| Real HTTP workflows | 24 checks passed across five independent authenticated sessions | `readiness-live-http-20261103.txt`, `.qa/readiness-20261103/live-multiuser.json` |
| Concurrent HTTP smoke | 80 requests, four workers, zero errors | `readiness-http-smoke-20261103.json` |
| Recovery payload and network selection | 7 tests passed | `python -m unittest discover -s deploy/tests` |
| Deployment scripts | All Bash syntax checks passed; Compose and workflow YAML parsed | Local Bash/PyYAML checks |
| Patch formatting | `git diff --check` passed | Local check |

The backend suite covers role boundaries, clinic isolation, consent expiration/revocation, private files, account recovery, malformed inputs, throttling, scheduling, appointment lifecycle, prescriptions, medication logging, intake rollback, public/staff controls, configuration and runtime database permissions. PostgreSQL runs exercise the three tests skipped on SQLite, including competing bookings and medication submissions.

The five real HTTP sessions exercised a patient, doctor, nurse, receptionist and coordinator. They verified booking, rescheduling, approval visible in other sessions, vitals, report upload/download, denied access before consent, granted consent, coordinator export, prescription completion, revocation effective in existing sessions, cancellation and denial of access to another clinic's patient. These checks ran against a separate local SQLite app; PostgreSQL behavior was covered by the full automated suite.

The HTTP smoke requested the home page, liveness, readiness and an actual stylesheet 20 times each. Median local latencies were 38, 8, 17 and 19 milliseconds respectively; the slowest request was 487 milliseconds. This is a small development-server smoke test with tiny fictional data, not a production capacity or availability measurement.

Local backend execution used Python 3.14.6. The deployment image and CI target Python 3.12 and PostgreSQL 16; that exact combination was not executed here. The first backend invocation from the repository root discovered zero tests and was discarded. Both full-suite results above ran from `jeevan`. Earlier failed PostgreSQL connection attempts were environment setup failures and are not counted as passing runs.

## Changes made

1. Backup and upload restoration now run as the image's application user. The previous root override inherited `cap_drop: ALL`; root without filesystem capabilities can fail to read application-owned private files or change restored ownership. Keeping the helper under the upload owner avoids that mismatch. The Docker behavior is documented in the official [container capability reference](https://docs.docker.com/engine/containers/run/).
2. Recovery projects choose an unused Docker subnet rather than reusing production's fixed subnet. Proxy IP and trusted-proxy configuration change together. Four new tests cover overlap, broad networks, IPv6, empty IPAM and exhaustion. Host/VPN routes still require operator review.
3. Deployment CI now captures a private file restricted to its owner and restores it under the unprivileged image user with all capabilities dropped, then verifies bytes and ownership. This new container check is supplied but has not run here because Docker is unavailable.
4. Compatible frontend dependency updates were applied and lint/tests rerun. No forced dependency downgrades or major-version overrides were applied.
5. Generated readiness logs are ignored by Git; this report and the recovery changes remain reviewable source files.

## Dependency advisory results

The fresh backend audit reported no known advisories for all 23 explicitly pinned requirements. It used `pip-audit --no-deps --disable-pip`, so it does not certify every installed/transitive package, the Python runtime or operating system. Local `pip check` found no broken installed requirements.

The final frontend production dependency audit reported **zero advisories**. The full frontend tree still reports **30 affected packages: 27 moderate and 3 low, with no high or critical advisories**. These are development-tool chains around `minimatch`, `glob` and `deepmerge`, including lint and test tooling. Thirty affected packages does not mean thirty independent vulnerabilities. Compatible `npm audit fix` did not clear them; suggested forced changes include major version changes/downgrades. These remain open engineering work, not accepted as resolved.

Evidence: `readiness-python-audit-20261103.json`, `readiness-npm-audit-final-20261103.json`, `readiness-npm-production-audit-final-20261103.json`, and `readiness-npm-safe-updates-20261103.txt`.

## Required gates before real-patient rollout

| Gate | Current status / evidence required |
| --- | --- |
| Exact production image and database | Docker unavailable locally. Run the supplied deployment CI and verify clean installation, release failure handling, restart and upgrade against Python 3.12/PostgreSQL 16. |
| Actual domain, HTTPS and proxy | No live host/domain was supplied. Verify DNS, certificates/renewal, redirects, trusted proxy behavior, secure cookies and public denial of private paths through the real proxy. |
| SMTP recovery | No actual SMTP provider was supplied. Verify the connection, authorized sender, delivery to real test inboxes and complete password recovery. No email was sent in this review. |
| Database plus uploads recovery | Run encrypted off-host backup and an isolated full restore on the deployment stack; verify clinical relationships, file contents, access controls, ownership and measured recovery time/data loss. Local payload tests are insufficient. |
| Monitoring and operations | Name the operator and alert recipients; verify audit collection, uptime/readiness, application errors, disk exhaustion, database failures, backup age and scheduled cleanup. |
| Realistic load | Agree expected users, appointment volume, file volume and latency targets. Test those targets on production-like data and infrastructure; include sustained load and resource saturation. |
| Failure injection | Exercise database outage/recovery, disk-full behavior, SMTP outage, failed release/migration and backup failure in an isolated production-like stack. |
| User acceptance and accessibility | Repeat complete clinic workflows in supported desktop/mobile browsers, keyboard and screen-reader use, zoom, slow networks and session expiry. No fresh browser/device/accessibility certification was performed in this review. Earlier screenshots are historical evidence only. |
| Development-tool advisories | Resolve or explicitly review the remaining lint/test tool dependency advisories with compatibility checks before trusting untrusted contributions in CI. |
| Independent security/privacy assessment | Existing permission and abuse regression tests passed. This task did not perform a separate exhaustive security audit, penetration test, legal review or compliance certification. |
| External integrations | ABHA, SMS and video remain disabled/unavailable until real integrations and admission controls are implemented and verified. |

Release status: **local checks passed where recorded; deployment acceptance incomplete**. Do not relabel localhost or synthetic-configuration checks as live production verification.
