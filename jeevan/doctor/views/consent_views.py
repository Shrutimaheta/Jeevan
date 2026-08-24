from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from django.http import JsonResponse, Http404
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from jeevan.decorators import doctor_required, patient_required, log_audit_event
from doctor.models import Doctor, Consent
from patient.models import Patient
from .auth_views import get_current_doctor
from doctor.services import request_consent

def check_consent(doctor, patient):
    """Check if doctor has approved consent to view patient reports"""
    try:
        consent = Consent.objects.get(doctor=doctor, patient=patient)
        return consent.is_approved()
    except Consent.DoesNotExist:
        return False

@doctor_required
def request_patient_consent(request, patient_id):
    """Request consent from patient to view their medical reports"""
    doctor = get_current_doctor(request)
    if not doctor:
        messages.error(request, 'Doctor profile not found.')
        return redirect('doctor:patients')
        
    patient = get_object_or_404(Patient, id=patient_id)
    has_consent = check_consent(doctor, patient)
    
    consent_status = None
    existing_consent = None
    try:
        existing_consent = Consent.objects.get(doctor=doctor, patient=patient)
        consent_status = existing_consent.status
    except Consent.DoesNotExist:
        consent_status = 'none'
        
    if has_consent:
        messages.info(request, 'You already have consent to view this patient\'s reports.')
        return redirect('doctor:patient_reports', patient_id=patient_id)
        
    if request.method == 'POST':
        reason = request.POST.get('reason', 'Doctor needs access to view patient medical reports for treatment purposes')
        
        from doctor.services import request_consent as req_consent_svc
        try:
            consent = req_consent_svc(doctor=doctor, patient=patient, reason=reason)
            messages.success(request, 'Consent request sent to patient successfully.')
        except Exception as e:
            messages.error(request, str(e))
        return redirect('doctor:request_consent', patient_id=patient_id)
        
    context = {
        'doctor': doctor,
        'patient': patient,
        'has_consent': has_consent,
        'consent_status': consent_status,
        'existing_consent': existing_consent,
    }
    return render(request, 'doctor/request_consent.html', context)

@patient_required
@require_http_methods(["POST"])
def approve_consent(request, consent_id):
    """Approve consent request (called by patient)"""
    try:
        patient = get_object_or_404(Patient, user=request.user)
        consent = get_object_or_404(Consent, id=consent_id, patient=patient)
        notes = request.POST.get('notes', '')
        from doctor.services import approve_consent as approve_consent_svc
        approve_consent_svc(
            consent_id=consent_id,
            patient_user=request.user,
            notes=notes
        )
        messages.success(request, 'Consent approved successfully.')
        return JsonResponse({'status': 'success', 'message': 'Consent approved'})
    except Http404:
        raise
    except Exception as e:
        messages.error(request, f'Error approving consent: {str(e)}')
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@patient_required
@require_http_methods(["POST"])
def reject_consent(request, consent_id):
    """Reject consent request (called by patient)"""
    try:
        patient = get_object_or_404(Patient, user=request.user)
        consent = get_object_or_404(Consent, id=consent_id, patient=patient)
        notes = request.POST.get('notes', '')
        from doctor.services import reject_consent as reject_consent_svc
        reject_consent_svc(
            consent_id=consent_id,
            patient_user=request.user,
            notes=notes
        )
        messages.success(request, 'Consent rejected.')
        return JsonResponse({'status': 'success', 'message': 'Consent rejected'})
    except Http404:
        raise
    except Exception as e:
        messages.error(request, f'Error rejecting consent: {str(e)}')
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@login_required
def consent_status(request, doctor_id, patient_id):
    """Get consent status for doctor-patient pair"""
    try:
        doctor = get_object_or_404(Doctor, id=doctor_id)
        patient = get_object_or_404(Patient, id=patient_id)
        has_consent = check_consent(doctor, patient)
        return JsonResponse({
            'has_consent': has_consent,
            'doctor_id': doctor_id,
            'patient_id': patient_id
        })
    except Exception as e:
        return JsonResponse({
            'has_consent': False,
            'error': str(e)
        })
