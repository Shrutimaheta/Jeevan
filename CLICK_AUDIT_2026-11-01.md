# Control audit — 1 November 2026

The reported Medical History button pointed to a nonexistent route. Earlier page-only checking missed this hidden-tab action. This review checks rendered links, form destinations, tab/modal targets, inline handlers and role permissions separately from browser clicks.

## Repairs

- Profile Medical History opens the authorized records list. The old `/patient/medical-records/` URL redirects to the signed-in patient's own records. Records list/detail now have a responsive blue layout, useful empty states and working back/download links.
- Profile prescriptions, upload, appointment and account-menu actions use named routes. Removed obsolete simulated navigation and unused booking scripts. Photo selection previews until Save Changes; it no longer falsely announces a successful save. Edit pencils focus the section without disabling submitted fields.
- Hospital selection updates doctors; AM/PM survives validation. Removed fake ABHA generation and its nonexistent save endpoint. Guest bookings preserve selected provider through login. Fixed nested booking document markup and the empty-prescription booking link.
- Document deletion requires CSRF-protected POST; GET cannot delete a document.
- All five appointment notification branches now link to the real appointment detail route using named URL reversal; one additional regression verifies each status resolves and opens for its owner.
- Doctor patient cards no longer offer unauthorized details for pending-only relationships. Receptionist rejection works with apostrophes. Calendar data uses safe JSON embedding.
- Public search handles loading/errors, invalid filters, duplicate doctors and dynamically inserted cards. Staff navigation opens their own dashboard. Location lookup requests consent, uses the city and triggers search; actual third-party geolocation was not invoked in QA.

## Evidence and coverage

| Area | Verification |
|---|---|
| Patient/appointments | 17 populated pages; links, forms and modal targets; rendered booking JavaScript; safe deletion; 4 passing delta tests |
| Staff | 25 populated pages; 318 links, 22 form destinations, 32 compiled inline handlers, 27 unique followed destinations; appointment-info for five statuses; 4 passing tests |
| Records/profile | Own-record empty and populated navigation; legacy redirect; another patient's records denied; 2 passing tests |
| Public controls | 7 passing Django tests and 3 mocked JavaScript control tests |
| Integrated controls | 15 tests passed before the final booking markup/CTA delta; final delta separately passed |
| Role navigation sweep | 64 routes, no HTTP/server, nested-document or inline-JavaScript syntax errors detected |
| Frontend | 4 suites, 16 tests passed |
| Full Django suite | 145 tests run: 144 passed, 1 PostgreSQL-only concurrency test skipped under SQLite; 436.147 seconds |
| Final notification delta | 1 test passed covering five status links, resolution and owner access |
| Live independent user sessions | 24 checks passed: booking, reschedule, acceptance, nurse vitals, reports, prescription, exports, revocation and cancellation |

Browser verification used the fictional `qa_patient`, without modifying personal patient accounts. Clicked login → My Profile → Medical History → View Medical Records → Back to profile; Prescriptions → View Prescriptions; Reports & Documents → Upload Documents; Appointments → Book Appointment; hospital selector → matching doctor options; Patient Profile → edit pencil; account menu → Change Password; Help & Support. Profile fields remain enabled after the pencil click. Screenshot: `medical-records-fixed.png`.

This does not claim every control in every data state was physically clicked in a browser. Automated populated-control inventories and permission/workflow tests cover additional roles. Live ABHA is explicitly unavailable; mocked integration checks cannot certify an external service or production readiness. Password-change submission and real location permission were not exercised through the browser.

The live workflow initially failed its reschedule assertion. The persisted appointment and a separate client POST were inspected; the final live rerun passed all 24 checks without a product change. The two doctor endpoints use different display formats; the workflow keeps the actual API's 24-hour expectation. Earlier failed attempts are not counted as passes.
