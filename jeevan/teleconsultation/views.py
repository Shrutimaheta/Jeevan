from django.conf import settings
from django.views.decorators.http import require_POST
from django.shortcuts import get_object_or_404, redirect, render
from django.http import HttpResponse, JsonResponse
from django.core.exceptions import PermissionDenied
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from .models import Teleconsultation
from jeevan.decorators import log_audit_event

@login_required
@require_POST
def start_teleconsultation(request, teleconsultation_id):
    """
    Launch view for teleconsultations. Redirects to secure meeting URL
    and transitions status to ongoing if accessed by the doctor.
    """
    session = get_object_or_404(Teleconsultation, id=teleconsultation_id)
    
    # Authorisation check
    is_doctor = (request.user == session.doctor.user)
    is_patient = (request.user == session.patient.user)
    
    if not (is_doctor or is_patient):
        raise PermissionDenied("You are not authorized to join this teleconsultation.")
        
    if not settings.TELECONSULTATION_ENABLED:
        return JsonResponse({'error': 'Video consultations are not connected.'}, status=503)
    from urllib.parse import urlsplit
    origin = urlsplit(settings.TELECONSULTATION_ORIGIN)
    destination = urlsplit(session.meeting_link or '')
    if destination.scheme != 'https' or destination.netloc != origin.netloc:
        raise PermissionDenied('Invalid meeting provider.')
    if session.status not in ('scheduled', 'ongoing'):
        return JsonResponse({'error': 'This consultation is no longer available.'}, status=409)

    # Status transition
    if is_doctor and session.status == 'scheduled':
        session.status = 'ongoing'
        session.started_at = timezone.now()
        session.save()
        
    log_audit_event(
        user=request.user,
        action="JOIN_TELECONSULTATION",
        target_id=session.id,
        details=f"User {request.user.username} joined teleconsultation session ID: {session.id}"
    )
    
    return redirect(session.meeting_link)

@login_required
def get_teleconsultation_details(request, teleconsultation_id):
    """
    API view returning secure meeting credentials to authorized doctor/patient.
    """
    session = get_object_or_404(Teleconsultation, id=teleconsultation_id)
    
    # Authorisation check
    is_doctor = (request.user == session.doctor.user)
    is_patient = (request.user == session.patient.user)
    
    if not (is_doctor or is_patient):
        raise PermissionDenied("You do not have access to this teleconsultation.")
        
    if not settings.TELECONSULTATION_ENABLED:
        return JsonResponse({'error': 'Video consultations are not connected.'}, status=503)
    if session.status not in ('scheduled', 'ongoing'):
        return JsonResponse({'error': 'This consultation is no longer available.'}, status=409)
    return JsonResponse({
        'id': session.id,
        'meeting_id': session.meeting_id,
        'admission': 'Managed by the meeting provider',
        'meeting_link': session.meeting_link,
        'status': session.status,
        'symptoms': session.symptoms
    })
