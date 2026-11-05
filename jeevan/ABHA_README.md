# ABHA availability

ABHA creation, verification and OTP endpoints intentionally return unavailable (HTTP 503). They require authentication and CSRF protection and do not generate local identifiers, send pretend SMS messages or return OTPs. Legacy imports use the same endpoints.

An approved external integration and provider-contract/security tests are required before this feature can be enabled. Do not collect Aadhaar details while the service is disconnected. Appointments can be booked without ABHA.
