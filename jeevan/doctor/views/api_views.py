from django.http import JsonResponse
from jeevan.decorators import doctor_required
from doctor.models import Doctor
from appointments.models import Appointment
from .auth_views import get_current_doctor

@doctor_required
def doctor_appointments_api(request):
    """API to get list of appointments for the logged-in doctor"""
    doctor = get_current_doctor(request)
    if not doctor:
        return JsonResponse({'error': 'Doctor not found'}, status=404)
        
    appointments = Appointment.objects.filter(doctor=doctor).select_related('patient')
    appointments_data = []
    for appointment in appointments:
        appointments_data.append({
            'id': appointment.id,
            'patient_name': appointment.patient.full_name,
            'patient_contact': getattr(appointment.patient.user, 'contact_number', 'N/A') if hasattr(appointment.patient, 'user') else 'N/A',
            'appointment_date': appointment.appointment_date.strftime('%Y-%m-%d'),
            'appointment_time': appointment.appointment_time.strftime('%H:%M'),
            'status': appointment.status,
            'symptoms': appointment.symptoms,
            'payment_mode': appointment.payment_mode,
        })
        
    return JsonResponse(appointments_data, safe=False)

def doctor_list_api(request):
    """API to get list of doctors"""
    doctors = Doctor.objects.all()
    doctors_data = []
    for doctor in doctors:
        doctors_data.append({
            'id': doctor.id,
            'full_name': doctor.full_name,
            'specialization': [spec.sname for spec in doctor.specialization.all()],
            'hospital': doctor.hospital.name if doctor.hospital else None,
            'rating': float(doctor.rating),
            'experience_years': doctor.experience,
            'accepts_insurance': doctor.accepts_insurance,
        })
    return JsonResponse(doctors_data, safe=False)

@doctor_required
def doctor_profile_api(request):
    """API to get doctor profile"""
    doctor = get_current_doctor(request)
    if not doctor:
        return JsonResponse({'error': 'Doctor not found'}, status=404)
        
    # Serialize doctor data manually
    doctor_data = {
        'id': doctor.id,
        'full_name': doctor.full_name,
        'specialization': [spec.sname for spec in doctor.specialization.all()],
        'hospital': doctor.hospital.name if doctor.hospital else None,
        'rating': float(doctor.rating),
        'experience_years': doctor.experience,
        'accepts_insurance': doctor.accepts_insurance,
    }
    return JsonResponse(doctor_data)
