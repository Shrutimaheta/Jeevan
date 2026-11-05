# Demo identities

These are fictional demonstration identities, not real patients or licensed providers. Presentation names are natural; test labels are kept out of user-facing demo data. Email addresses use the reserved example.com domain and are not intended for delivery.

| Role | Display name | Username |
|---|---|---|
| Patient | Ananya Patel | ananya.patel |
| Doctor | Kavya Shah | kavya.shah |
| Nurse | Nisha Desai | nisha.desai |
| Receptionist | Riya Joshi | riya.joshi |
| Care coordinator | Meera Trivedi | meera.trivedi |
| Patient at another clinic | Isha Mehta | isha.mehta |

Clinics: Aarogya Multispeciality Clinic (Ahmedabad) and Prerna Family Clinic (Surat). Specialty: General Medicine. Additional synthetic visit patients use natural names too.

Existing passwords and IDs are preserved when refreshing these identities. Personal accounts and their records are not changed. New accounts get unusable passwords unless an initial password is explicitly supplied to the seed command. No real provider registration number is fabricated.

`python manage.py seed_demo --settings=jeevan.qa_settings` refreshes the dedicated local demo database. The legacy `seed_qa` command delegates to the same implementation. Both refuse production/clinic databases. Automated unit-test fixture names do not appear in the running demo.

Verification: two regression tests passed for repeatability, password preservation, personal-account isolation and production refusal. Five role dashboards returned 200 with no QA/Fictional/Example display labels.
