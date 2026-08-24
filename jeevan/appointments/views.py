from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from jeevan.decorators import patient_required, log_audit_event
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

@patient_required
def appointment_list(request):
    """Display list of appointments for the logged-in patient (exclude cancelled by default)"""
    try:
        patient = Patient.objects.get(user=request.user)
        
        # Mark expired appointments before processing
        Appointment.mark_expired_appointments()
        
        # Optional status filter via query param (?status=pending|accepted|rejected|completed|expired|cancelled|all)
        selected_status = request.GET.get('status', '').strip().lower()
        
        appointments_qs = Appointment.objects.select_related('doctor', 'patient', 'hospital').filter(patient=patient)
        
        # By default, exclude cancelled appointments unless explicitly requested
        if selected_status == 'all':
            # "All Statuses" includes cancelled appointments
            # Don't exclude any status
            pass
        elif selected_status:
            valid_statuses = {'pending', 'accepted', 'rejected', 'completed', 'expired', 'cancelled'}
            if selected_status in valid_statuses:
                appointments_qs = appointments_qs.filter(status=selected_status)
            else:
                # If invalid status, default to excluding cancelled
                appointments_qs = appointments_qs.exclude(status='cancelled')
        else:
            # Default (no filter): show all except cancelled
            appointments_qs = appointments_qs.exclude(status='cancelled')

        appointments = appointments_qs.order_by('-created_at')

        # Get hospitals and specializations for booking modal
        from care.models import Specialization
        hospitals = Hospital.objects.all().prefetch_related('specialization', 'doctor_set__specialization')
        specializations = Specialization.objects.all()

        context = {
            'appointments': appointments,
            'patient': patient,
            'selected_status': selected_status or 'all',
            'hospitals': hospitals,
            'specializations': specializations,
        }
        return render(request, 'appointments/appointment_list.html', context)
    except Patient.DoesNotExist:
        messages.error(request, "Patient profile not found.")
        return redirect('/login/')

@patient_required
def appointment_list_accepted(request):
    """Display only accepted appointments for the logged-in patient"""
    try:
        patient = Patient.objects.get(user=request.user)
        Appointment.mark_expired_appointments()
        appointments = (
            Appointment.objects
            .filter(patient=patient, status='accepted')
            .order_by('-created_at')
        )
        # Get hospitals and specializations for booking modal
        from care.models import Specialization
        hospitals = Hospital.objects.all().prefetch_related('specialization', 'doctor_set__specialization')
        specializations = Specialization.objects.all()
        
        context = {
            'appointments': appointments,
            'patient': patient,
            'accepted_only': True,
            'hospitals': hospitals,
            'specializations': specializations,
        }
        return render(request, 'appointments/appointment_list.html', context)
    except Patient.DoesNotExist:
        messages.error(request, "Patient profile not found.")
        return redirect('/login/')

@patient_required
def appointment_create(request):
    """Create a new appointment"""
    try:
        patient = Patient.objects.get(user=request.user)
        
        # Support pre-selection via query params (doctor or hospital)
        preselect_hospital_id = request.GET.get('hospital')
        preselect_doctor_id = request.GET.get('doctor')
        # Ensure initial_data exists for both GET and POST code paths
        initial_data = {}

        if request.method == 'POST':
            # If doctor is preselected via query param, force hospital/doctor values
            if preselect_doctor_id:
                try:
                    locked_doctor = Doctor.objects.get(id=preselect_doctor_id)
                    post_data = request.POST.copy()
                    post_data['hospital'] = str(locked_doctor.hospital_id)
                    post_data['doctor'] = str(locked_doctor.id)
                    # Keep for template context
                    initial_data['hospital'] = locked_doctor.hospital_id
                    initial_data['doctor'] = locked_doctor.id
                    form = AppointmentForm(post_data, patient=patient)
                    # Ensure the doctor choice is valid for the locked hospital
                    form.fields['doctor'].queryset = Doctor.objects.filter(hospital_id=locked_doctor.hospital_id)
                except Doctor.DoesNotExist:
                    form = AppointmentForm(request.POST, patient=patient)
            else:
                form = AppointmentForm(request.POST, patient=patient)
            
            # If form is invalid, reload doctor choices based on selected hospital
            if not form.is_valid() and 'hospital' in form.data:
                hospital_id = form.data.get('hospital')
                if hospital_id:
                    form.fields['doctor'].queryset = Doctor.objects.filter(hospital_id=hospital_id)
                    form.fields['doctor'].widget.attrs['disabled'] = False
            
            if form.is_valid():
                from .services import create_appointment
                try:
                    appointment = create_appointment(
                        patient=patient,
                        doctor=form.cleaned_data['doctor'],
                        hospital=form.cleaned_data['hospital'],
                        appointment_date=form.cleaned_data['appointment_date'],
                        appointment_time=form.cleaned_data['appointment_time'],
                        symptoms=form.cleaned_data.get('symptoms'),
                        payment_mode=form.cleaned_data.get('payment_mode', 'cash'),
                        actor=request.user
                    )
                    messages.success(request, 'Appointment booked successfully! You will be notified once it\'s confirmed.')
                    return redirect('appointments:appointment_list')
                except Exception as e:
                    messages.error(request, str(e))
            else:
                # Check for slot busy errors specifically
                slot_busy_error = None
                
                # Check non_field_errors first (from clean() method)
                if form.non_field_errors():
                    for error in form.non_field_errors():
                        error_str = str(error)
                        # Check if this is a slot busy error
                        if 'time slot is already booked' in error_str.lower() or 'already booked' in error_str.lower() or 'slot' in error_str.lower():
                            slot_busy_error = error_str
                        else:
                            messages.error(request, str(error))
                
                # Check field errors
                for field, errors in form.errors.items():
                    if field != '__all__':  # Skip non_field_errors already handled
                        for error in errors:
                            error_str = str(error)
                            # Check if this is a slot busy error
                            if 'time slot is already booked' in error_str.lower() or 'already booked' in error_str.lower() or 'slot' in error_str.lower():
                                slot_busy_error = error_str
                            else:
                                messages.error(request, f"{field}: {error}")
                
                # Store slot busy error separately for modal display
                context = {
                    'form': form,
                    'patient': patient,
                    'lock_selection': bool(preselect_doctor_id),
                    'locked_hospital_id': initial_data.get('hospital'),
                    'locked_doctor_id': initial_data.get('doctor'),
                    'slot_busy_error': slot_busy_error,
                }
                return render(request, 'appointments/appointment_create.html', context)
        else:
            # Build initial data for GET based on query params
            if preselect_doctor_id:
                try:
                    selected_doctor = Doctor.objects.get(id=preselect_doctor_id)
                    initial_data['hospital'] = selected_doctor.hospital_id
                    initial_data['doctor'] = selected_doctor.id
                except Doctor.DoesNotExist:
                    pass
            elif preselect_hospital_id:
                try:
                    initial_data['hospital'] = int(preselect_hospital_id)
                except (TypeError, ValueError):
                    pass

            form = AppointmentForm(patient=patient, initial=initial_data)

            # If doctor is preselected, constrain doctor queryset to that hospital so the option exists
            if 'doctor' in initial_data and 'hospital' in initial_data:
                form.fields['doctor'].queryset = Doctor.objects.filter(hospital_id=initial_data['hospital'])
                # Lock both hospital and doctor if a doctor is preselected (coming from hospital doctors page)
                form.fields['hospital'].widget.attrs['disabled'] = True
                form.fields['doctor'].widget.attrs['disabled'] = True
            # If only hospital is preselected, start with an empty doctor list until AJAX fills it, but allow manual selection
            elif 'hospital' in initial_data:
                form.fields['doctor'].queryset = Doctor.objects.filter(hospital_id=initial_data['hospital'])
        
        context = {
            'form': form,
            'patient': patient,
            # Expose locking state to the template so we can include hidden inputs for disabled fields
            'lock_selection': bool(preselect_doctor_id),
            'locked_hospital_id': initial_data.get('hospital'),
            'locked_doctor_id': initial_data.get('doctor'),
            'slot_busy_error': None,  # No error on GET request
        }
        return render(request, 'appointments/appointment_create.html', context)
    except Patient.DoesNotExist:
        messages.error(request, "Patient profile not found.")
        return redirect('/login/')

@patient_required
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
                from .services import reschedule_appointment
                try:
                    reschedule_appointment(
                        appointment_id=appointment.id,
                        new_date=form.cleaned_data['appointment_date'],
                        new_time=form.cleaned_data['appointment_time'],
                        symptoms=form.cleaned_data.get('symptoms'),
                        payment_mode=form.cleaned_data.get('payment_mode'),
                        actor=request.user
                    )
                    messages.success(request, 'Appointment updated successfully!')
                    return redirect('appointments:appointment_list')
                except Exception as e:
                    messages.error(request, str(e))
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
        return redirect('/login/')

@patient_required
def appointment_cancel(request, appointment_id):
    """Cancel an appointment"""
    try:
        patient = Patient.objects.get(user=request.user)
        appointment = get_object_or_404(Appointment, id=appointment_id, patient=patient)
        
        if not appointment.can_cancel:
            messages.error(request, "This appointment cannot be cancelled.")
            return redirect('appointments:appointment_list')
        
        if request.method == 'POST':
            from .services import update_appointment_status
            try:
                update_appointment_status(
                    appointment_id=appointment.id,
                    new_status='cancelled',
                    actor=request.user
                )
                messages.success(request, 'Appointment cancelled successfully!')
                return redirect('appointments:appointment_list')
            except Exception as e:
                messages.error(request, str(e))
        
        context = {
            'appointment': appointment,
            'patient': patient
        }
        return render(request, 'appointments/appointment_cancel.html', context)
    except Patient.DoesNotExist:
        messages.error(request, "Patient profile not found.")
        return redirect('/login/')

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
        return redirect('/login/')

@patient_required
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
        return redirect('/login/')
