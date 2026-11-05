from functools import wraps
import logging
from django.http import JsonResponse
from django.shortcuts import redirect
from django.core.exceptions import PermissionDenied

# Configure structured audit logger
audit_logger = logging.getLogger('jeevan.audit')

def log_audit_event(user, action, target_id, details=None):
    """Log a structured clinical audit event."""
    username = user.username if user and user.is_authenticated else "Anonymous"
    user_id = user.id if user and user.is_authenticated else "N/A"
    role = getattr(user, 'role', 'N/A') if user and user.is_authenticated else "N/A"
    
    from care.models import AuditEvent
    import json
    event = AuditEvent.objects.create(actor_id=user.id if user and user.is_authenticated else None,
        role=str(role), action=str(action)[:80], target=str(target_id)[:100], details=details or '')
    audit_logger.info(json.dumps({'event_id': event.pk, 'actor_id': event.actor_id,
        'role': event.role, 'action': event.action, 'target': event.target}))


def role_required(allowed_roles, redirect_to=None):
    """
    Decorator for views that checks if the logged-in user has one of the allowed roles.
    If not authenticated, redirects standard requests to login, or returns 401 for AJAX/API.
    If authenticated but role is not allowed, raises PermissionDenied or returns 403.
    """
    if isinstance(allowed_roles, str):
        allowed_roles = [allowed_roles]

    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            is_ajax = (
                request.headers.get('x-requested-with') == 'XMLHttpRequest' or
                request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest' or
                request.path.startswith('/api/') or
                'application/json' in request.headers.get('accept', '') or
                'application/json' in request.META.get('HTTP_ACCEPT', '') or
                'json' in request.path or
                '/approve/' in request.path or
                '/reject/' in request.path or
                '/update-status/' in request.path
            )
            
            if not request.user.is_authenticated:
                if is_ajax:
                    return JsonResponse({'success': False, 'message': 'Authentication credentials were not provided.'}, status=401)
                return redirect('universal_login')

            user_role = getattr(request.user, 'role', None)
            if not request.user.is_active:
                raise PermissionDenied('This account is inactive.')
            if user_role not in allowed_roles:
                if is_ajax:
                    return JsonResponse({'success': False, 'message': 'You do not have permission to perform this action.'}, status=403)
                if redirect_to:
                    return redirect(redirect_to)
                raise PermissionDenied("You do not have permission to access this page.")

            if user_role in ('doctor', 'nurse', 'receptionist'):
                profile = getattr(request.user, user_role, None)
                if profile is None or not profile.is_active:
                    raise PermissionDenied('Your staff profile is inactive or unavailable.')
                
            return view_func(request, *args, **kwargs)
        return _wrapped_view
    return decorator

# Shorthand decorators
patient_required = role_required('patient')
doctor_required = role_required('doctor')
receptionist_required = role_required('receptionist')
nurse_required = role_required('nurse')

def rate_limit(key_prefix, limit=5, period=60, is_api=False):
    """Fixed-window limits backed by atomic shared database counters."""
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            if request.method in ('GET', 'HEAD', 'OPTIONS'):
                return view_func(request, *args, **kwargs)
            from .throttling import allow_request, client_ip
            ident = str(request.user.pk) if request.user.is_authenticated else client_ip(request)
            if not allow_request(f'{key_prefix}:{ident}', limit, period):
                response = JsonResponse({'success': False, 'error': 'Too many requests. Please try again shortly.'}, status=429)
                response['Retry-After'] = str(period)
                return response
            return view_func(request, *args, **kwargs)
        return _wrapped_view
    return decorator
