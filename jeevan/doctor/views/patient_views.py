from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from django.core.exceptions import PermissionDenied
from jeevan.decorators import doctor_required, log_audit_event
from doctor.models import Doctor, Consent
from patient.models import Patient
from appointments.models import Appointment
from .auth_views import get_current_doctor
from .consent_views import check_consent

def check_doctor_patient_access(doctor, patient):
    """
    Helper to check if a doctor has a valid relationship with a patient
    either through active consent or an appointment.
    """
    if check_consent(doctor, patient):
        return True
    if Appointment.objects.filter(doctor=doctor, patient=patient).exists():
        return True
    return False

@doctor_required
def doctor_patients(request):
    """Doctor patients view - shows patients who have appointments with this doctor"""
    doctor = get_current_doctor(request)
    if not doctor:
        messages.error(request, 'Doctor profile not found.')
        return redirect('universal_login')
    
    search_query = request.GET.get('search', '').strip()
    search_date = request.GET.get('date', '').strip()
    
    appointments = Appointment.objects.filter(doctor=doctor).select_related('patient').order_by('-appointment_date', '-appointment_time')
    
    if search_query:
        appointments = appointments.filter(patient__full_name__icontains=search_query)
    if search_date:
        appointments = appointments.filter(appointment_date=search_date)
        
    patients_data = {}
    for appointment in appointments:
        patient_id = appointment.patient.id
        if patient_id not in patients_data:
            patients_data[patient_id] = {
                'patient': appointment.patient,
                'latest_appointment_date': appointment.appointment_date,
                'latest_appointment_time': appointment.appointment_time,
                'latest_appointment_status': appointment.status,
                'latest_appointment_created_at': appointment.created_at,
                'total_appointments': 1
            }
        else:
            if appointment.appointment_date > patients_data[patient_id]['latest_appointment_date'] or \
               (appointment.appointment_date == patients_data[patient_id]['latest_appointment_date'] and 
                appointment.appointment_time > patients_data[patient_id]['latest_appointment_time']):
                patients_data[patient_id]['latest_appointment_date'] = appointment.appointment_date
                patients_data[patient_id]['latest_appointment_time'] = appointment.appointment_time
                patients_data[patient_id]['latest_appointment_status'] = appointment.status
                patients_data[patient_id]['latest_appointment_created_at'] = appointment.created_at
            patients_data[patient_id]['total_appointments'] += 1
            
    patients_list = list(patients_data.values())
    
    context = {
        'doctor': doctor,
        'patients_data': patients_list,
        'search_query': search_query,
        'search_date': search_date,
    }
    return render(request, 'doctor/patients.html', context)

@doctor_required
def patient_detail(request, patient_id):
    """Patient detail view - shows patient information and their appointments with this doctor"""
    try:
        doctor = Doctor.objects.get(user=request.user)
    except Doctor.DoesNotExist:
        messages.error(request, 'Doctor profile not found.')
        return render(request, 'doctor/patient_detail.html', {'doctor': None, 'patient': None, 'appointments': [], 'search_date': ''})
        
    search_date = request.GET.get('date', '').strip()
    patient = get_object_or_404(Patient, id=patient_id)
    
    # Security lookup restriction: check relationship
    if not check_doctor_patient_access(doctor, patient):
        raise PermissionDenied("You do not have permission to view this patient's profile details.")
        
    appointments = Appointment.objects.filter(doctor=doctor, patient=patient).order_by('-appointment_date', '-appointment_time')
    
    if search_date:
        appointments = appointments.filter(appointment_date=search_date)
        
    has_consent = check_consent(doctor, patient)
    consent_status = None
    existing_consent = None
    try:
        existing_consent = Consent.objects.get(doctor=doctor, patient=patient)
        consent_status = existing_consent.status
    except Consent.DoesNotExist:
        consent_status = 'none'
        
    context = {
        'doctor': doctor,
        'patient': patient,
        'appointments': appointments,
        'search_date': search_date,
        'has_consent': has_consent,
        'consent_status': consent_status,
        'existing_consent': existing_consent,
    }
    return render(request, 'doctor/patient_detail.html', context)

@doctor_required
def patient_reports(request, patient_id):
    """View patient medical reports with consent check"""
    doctor = get_current_doctor(request)
    if not doctor:
        messages.error(request, 'Doctor profile not found.')
        return redirect('doctor:patients')
        
    patient = get_object_or_404(Patient, id=patient_id)
    has_consent = check_consent(doctor, patient)
    
    consent_status = 'none'
    try:
        consent = Consent.objects.get(doctor=doctor, patient=patient)
        consent_status = consent.status
    except Consent.DoesNotExist:
        pass
        
    if consent_status == 'rejected':
        messages.error(request, f'Patient {patient.full_name} has rejected your consent request. You cannot view their medical reports.')
        return redirect('doctor:request_consent', patient_id=patient_id)
        
    if not has_consent:
        if consent_status == 'pending':
            messages.warning(request, 'Consent request is pending. Please wait for patient approval.')
            return redirect('doctor:request_consent', patient_id=patient_id)
        else:
            messages.info(request, 'Consent required to view patient reports. Please request consent.')
            return redirect('doctor:request_consent', patient_id=patient_id)
            
    documents = patient.documents.filter(document_type__in=['report', 'lab_result', 'scan']).order_by('-uploaded_at')
    
    medical_records = []
    try:
        from records.models import MedicalRecord
        medical_records = MedicalRecord.objects.filter(patient=patient, doctor=doctor).order_by('-created_at')
    except Exception:
        pass
        
    context = {
        'doctor': doctor,
        'patient': patient,
        'documents': documents,
        'medical_records': medical_records,
        'has_consent': has_consent,
        'consent_status': consent_status,
    }
    
    log_audit_event(request.user, "ACCESS_PATIENT_RECORDS", patient.id, f"Accessed records/reports of patient under valid consent status: {consent_status}")
    return render(request, 'doctor/patient_reports.html', context)
