from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from .models import Appointment
from .forms import AppointmentForm, AppointmentUpdateForm
from care.models import Hospital
from doctor.models import Doctor
from patient.models import Patient
import json

@login_required
def appointment_list(request):
    """Display list of appointments for the logged-in patient (exclude cancelled)"""
    try:
        patient = Patient.objects.get(user=request.user)
        appointments = Appointment.objects.filter(patient=patient).exclude(status='cancelled').order_by('-created_at')
        
        context = {
            'appointments': appointments,
            'patient': patient
        }
        return render(request, 'appointments/appointment_list.html', context)
    except Patient.DoesNotExist:
        messages.error(request, "Patient profile not found.")
        return redirect('patient:patient_login')

@login_required
def appointment_create(request):
    """Create a new appointment"""
    try:
        patient = Patient.objects.get(user=request.user)
        
        if request.method == 'POST':
            form = AppointmentForm(request.POST, patient=patient)
            
            # If form is invalid, reload doctor choices based on selected hospital
            if not form.is_valid() and 'hospital' in form.data:
                hospital_id = form.data.get('hospital')
                if hospital_id:
                    form.fields['doctor'].queryset = Doctor.objects.filter(hospital_id=hospital_id)
                    form.fields['doctor'].widget.attrs['disabled'] = False
            
            if form.is_valid():
                appointment = form.save(commit=False)
                appointment.patient = patient
                
                # Handle ABHA ID - if not provided, generate internal patient code
                if not appointment.abha_id:
                    from datetime import datetime
                    # Generate internal patient code: P + YYYYMMDD + 3-digit sequence
                    today = datetime.now()
                    date_str = today.strftime('%Y%m%d')
                    
                    # Get the count of appointments for this patient today
                    today_appointments = Appointment.objects.filter(
                        patient=patient,
                        created_at__date=today.date()
                    ).count()
                    
                    # Generate unique internal code
                    sequence = str(today_appointments + 1).zfill(3)
                    appointment.abha_id = f"P{date_str}{sequence}"
                
                appointment.save()
                messages.success(request, 'Appointment booked successfully! You will be notified once it\'s confirmed.')
                return redirect('appointments:appointment_list')
            else:
                # Debug: Print form errors
                print("Form errors:", form.errors)
                print("Form data:", form.data)
        else:
            form = AppointmentForm(patient=patient)
        
        context = {
            'form': form,
            'patient': patient
        }
        return render(request, 'appointments/appointment_create.html', context)
    except Patient.DoesNotExist:
        messages.error(request, "Patient profile not found.")
        return redirect('patient:patient_login')

@login_required
def appointment_update(request, appointment_id):
    """Update an existing appointment"""
    try:
        patient = Patient.objects.get(user=request.user)
        appointment = get_object_or_404(Appointment, id=appointment_id, patient=patient)
        
        if not appointment.can_edit:
            messages.error(request, "This appointment cannot be edited.")
            return redirect('appointments:appointment_list')
        
        if request.method == 'POST':
            form = AppointmentUpdateForm(request.POST, instance=appointment)
            if form.is_valid():
                form.save()
                messages.success(request, 'Appointment updated successfully!')
                return redirect('appointments:appointment_list')
            else:
                # Debug: Print form errors
                print("Update form errors:", form.errors)
                print("Update form data:", form.data)
        else:
            form = AppointmentUpdateForm(instance=appointment)
        
        context = {
            'form': form,
            'appointment': appointment,
            'patient': patient
        }
        return render(request, 'appointments/appointment_update.html', context)
    except Patient.DoesNotExist:
        messages.error(request, "Patient profile not found.")
        return redirect('patient:patient_login')

@login_required
def appointment_cancel(request, appointment_id):
    """Cancel an appointment"""
    try:
        patient = Patient.objects.get(user=request.user)
        appointment = get_object_or_404(Appointment, id=appointment_id, patient=patient)
        
        if not appointment.can_cancel:
            messages.error(request, "This appointment cannot be cancelled.")
            return redirect('appointments:appointment_list')
        
        if request.method == 'POST':
            appointment.status = 'cancelled'
            appointment.save()
            messages.success(request, 'Appointment cancelled successfully!')
            return redirect('appointments:appointment_list')
        
        context = {
            'appointment': appointment,
            'patient': patient
        }
        return render(request, 'appointments/appointment_cancel.html', context)
    except Patient.DoesNotExist:
        messages.error(request, "Patient profile not found.")
        return redirect('patient:patient_login')

@login_required
def get_doctors(request):
    """AJAX endpoint to get doctors based on selected hospital"""
    try:
        hospital_id = request.GET.get('hospital_id')
        if hospital_id:
            doctors = Doctor.objects.filter(hospital_id=hospital_id).prefetch_related('specialization')
            doctor_list = []
            for doctor in doctors:
                specializations = [spec.sname for spec in doctor.specialization.all()]
                doctor_list.append({
                    'id': doctor.id,
                    'full_name': doctor.full_name,
                    'specialization': ', '.join(specializations) if specializations else 'General Practitioner'
                })
            return JsonResponse(doctor_list, safe=False)
        return JsonResponse([], safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@login_required
def doctor_selection(request, hospital_id):
    """Display doctors available at a specific hospital"""
    try:
        patient = Patient.objects.get(user=request.user)
        hospital = get_object_or_404(Hospital, id=hospital_id)
        doctors = Doctor.objects.filter(hospital=hospital).prefetch_related('specialization')
        
        context = {
            'hospital': hospital,
            'doctors': doctors,
            'patient': patient
        }
        return render(request, 'appointments/doctor_selection.html', context)
    except Patient.DoesNotExist:
        messages.error(request, "Patient profile not found.")
        return redirect('patient:patient_login')

@login_required
def appointment_detail(request, appointment_id):
    """View appointment details"""
    try:
        patient = Patient.objects.get(user=request.user)
        appointment = get_object_or_404(Appointment, id=appointment_id, patient=patient)
        
        context = {
            'appointment': appointment,
            'patient': patient
        }
        return render(request, 'appointments/appointment_detail.html', context)
    except Patient.DoesNotExist:
        messages.error(request, "Patient profile not found.")
        return redirect('patient:patient_login')
