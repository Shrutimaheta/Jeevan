from .auth_views import (
    get_current_doctor,
    doctor_profile,
    doctor_home,
    public_doctor_profile,
)
from .appointment_views import (
    doctor_dashboard,
    doctor_appointments,
    update_appointment_status,
    get_appointment_info,
    appointment_prescription,
    view_prescription,
    doctor_calendar,
)
from .patient_views import (
    doctor_patients,
    patient_detail,
    patient_reports,
)
from .consent_views import (
    check_consent,
    request_patient_consent,
    request_consent,
    approve_consent,
    reject_consent,
    consent_status,
)
from .api_views import (
    doctor_appointments_api,
    doctor_list_api,
    doctor_profile_api,
)
