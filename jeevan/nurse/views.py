import json
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, JsonResponse, Http404
from django.core.exceptions import PermissionDenied
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from jeevan.decorators import nurse_required, log_audit_event
from patient.models import Patient
from appointments.models import Appointment
from .models import Nurse, ClinicalNote
from .services import check_nurse_patient_association, create_clinical_note, update_clinical_note, log_patient_vitals

@login_required
@nurse_required
def nurse_dashboard(request):
    """Nurse dashboard view - lists patients with appointments at the nurse's hospital"""
    try:
        nurse = Nurse.objects.get(user=request.user)
    except Nurse.DoesNotExist:
        messages.error(request, "Nurse profile not found.")
        return redirect('universal_login')
        
    # Get patients who have booked or completed appointments at the nurse's hospital
    appointments = Appointment.objects.filter(
        hospital=nurse.hospital,
        status__in=['pending', 'accepted', 'completed']
    ).select_related('patient').order_by('-appointment_date', '-appointment_time')
    
    # De-duplicate patients
    seen_patients = set()
    patients_data = []
    for appt in appointments:
        if appt.patient.id not in seen_patients:
            seen_patients.add(appt.patient.id)
            patients_data.append(appt.patient)
            
    context = {
        'nurse': nurse,
        'patients': patients_data,
        'hospital': nurse.hospital
    }
    return render(request, 'nurse/dashboard.html', context)

@login_required
@nurse_required
def patient_detail(request, patient_id):
    """View details, vitals history and clinical notes for a patient"""
    try:
        nurse = Nurse.objects.get(user=request.user)
    except Nurse.DoesNotExist:
        messages.error(request, "Nurse profile not found.")
        return redirect('universal_login')
        
    patient = get_object_or_404(Patient, id=patient_id)
    
    # Enforce active hospital association check
    if not check_nurse_patient_association(nurse, patient):
        raise PermissionDenied("You do not have permission to view this patient's details.")
        
    # Fetch patient's vitals and notes
    vitals_history = patient.vital_signs.all().order_by('-recorded_at')
    clinical_notes = patient.clinical_notes.filter(nurse__hospital=nurse.hospital).order_by('-created_at')
    
    # Log audit event
    log_audit_event(
        user=request.user,
        action="NURSE_VIEW_PATIENT_DETAIL",
        target_id=patient.id,
        details=f"Nurse ID: {nurse.id} viewed details of Patient ID: {patient.id}"
    )
    
    context = {
        'nurse': nurse,
        'patient': patient,
        'vitals_history': vitals_history,
        'clinical_notes': clinical_notes
    }
    return render(request, 'nurse/patient_detail.html', context)

@login_required
@nurse_required
@require_http_methods(["POST"])
def log_vitals(request, patient_id):
    """Log vital signs for a patient"""
    try:
        nurse = Nurse.objects.get(user=request.user)
        
        # Get POST inputs
        blood_pressure_systolic = int(request.POST.get('blood_pressure_systolic'))
        blood_pressure_diastolic = int(request.POST.get('blood_pressure_diastolic'))
        heart_rate = int(request.POST.get('heart_rate'))
        temperature = float(request.POST.get('temperature'))
        oxygen_saturation = int(request.POST.get('oxygen_saturation'))
        weight = request.POST.get('weight')
        weight = float(weight) if weight else None
        notes = request.POST.get('notes', '').strip()
        
        log_patient_vitals(
            patient_id=patient_id,
            nurse=nurse,
            blood_pressure_systolic=blood_pressure_systolic,
            blood_pressure_diastolic=blood_pressure_diastolic,
            heart_rate=heart_rate,
            temperature=temperature,
            oxygen_saturation=oxygen_saturation,
            weight=weight,
            notes=notes,
            actor=request.user
        )
        
        messages.success(request, "Vitals recorded successfully.")
        
    except Exception as e:
        messages.error(request, f"Error recording vitals: {str(e)}")
        
    return redirect('nurse:patient_detail', patient_id=patient_id)

@login_required
@nurse_required
@require_http_methods(["POST"])
def add_note(request, patient_id):
    """Add a clinical observation note for a patient"""
    try:
        nurse = Nurse.objects.get(user=request.user)
        note_text = request.POST.get('note', '').strip()
        
        create_clinical_note(
            patient_id=patient_id,
            nurse=nurse,
            note_text=note_text,
            actor=request.user
        )
        
        messages.success(request, "Clinical note recorded successfully.")
        
    except Exception as e:
        messages.error(request, f"Error recording clinical note: {str(e)}")
        
    return redirect('nurse:patient_detail', patient_id=patient_id)

@login_required
@nurse_required
@require_http_methods(["POST"])
def edit_note(request, note_id):
    """Edit an existing clinical note written by the nurse"""
    note = get_object_or_404(ClinicalNote, id=note_id)
    patient_id = note.patient.id
    
    try:
        nurse = Nurse.objects.get(user=request.user)
        note_text = request.POST.get('note', '').strip()
        
        update_clinical_note(
            note_id=note_id,
            nurse=nurse,
            note_text=note_text,
            actor=request.user
        )
        
        messages.success(request, "Clinical note updated successfully.")
        
    except Exception as e:
        messages.error(request, f"Error updating clinical note: {str(e)}")
        
    return redirect('nurse:patient_detail', patient_id=patient_id)

@login_required
@nurse_required
def nurse_list_api(request):
    """API to get list of nurses"""
    nurses = Nurse.objects.all()
    nurses_data = []
    for nurse in nurses:
        nurses_data.append({
            'id': nurse.id,
            'full_name': nurse.full_name,
            'email': nurse.user.email,
            'contact_number': getattr(nurse.user, 'contact_number', 'N/A'),
            'hospital': nurse.hospital.name
        })
    return JsonResponse(nurses_data, safe=False)
