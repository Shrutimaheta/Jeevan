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
    
    audit_logger.info(
        "AUDIT: User %s (ID: %s, Role: %s) performed %s on target ID: %s. Details: %s",
        username,
        user_id,
        role,
        action,
        target_id,
        details or "None"
    )

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
            if user_role not in allowed_roles:
                if is_ajax:
                    return JsonResponse({'success': False, 'message': 'You do not have permission to perform this action.'}, status=403)
                if redirect_to:
                    return redirect(redirect_to)
                raise PermissionDenied("You do not have permission to access this page.")
                
            return view_func(request, *args, **kwargs)
        return _wrapped_view
    return decorator

# Shorthand decorators
patient_required = role_required('patient')
doctor_required = role_required('doctor')
receptionist_required = role_required('receptionist')
nurse_required = role_required('nurse')

from django.conf import settings
from django.core.cache import cache


def get_client_ip(request):
    """Best-effort client IP.

    Behind a hosting proxy (Render, Railway, Heroku) every request arrives from
    the proxy's address, so REMOTE_ADDR alone would make all visitors share one
    rate-limit bucket. When TRUST_X_FORWARDED_FOR is on, use the first address
    in X-Forwarded-For, which the proxy sets to the real client.
    """
    if getattr(settings, "TRUST_X_FORWARDED_FOR", False):
        forwarded = request.META.get("HTTP_X_FORWARDED_FOR", "")
        if forwarded:
            return forwarded.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR", "unknown")


def hit_limit(key, limit, period):
    """Count one hit for ``key`` in a fixed window; return True once over ``limit``."""
    if cache.add(key, 1, period):
        return 1 > limit
    try:
        count = cache.incr(key)
    except ValueError:  # key expired between add() and incr()
        cache.set(key, 1, period)
        count = 1
    return count > limit


def rate_limit(key_prefix, limit=5, period=60, is_api=False, methods=("POST",)):
    """Simple fixed-window rate limit using Django's cache.

    Only requests whose method is in ``methods`` are counted, so just viewing a
    form page never uses up the allowance.
    """
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            if request.method not in methods:
                return view_func(request, *args, **kwargs)

            if request.user.is_authenticated:
                ident = f"u{request.user.id}"
            else:
                ident = get_client_ip(request)
            if hit_limit(f"rl:{key_prefix}:{ident}", limit, period):
                if is_api or request.path.startswith('/api/') or request.headers.get('x-requested-with') == 'XMLHttpRequest':
                    return JsonResponse({'success': False, 'error': 'Too many requests. Please wait a minute and try again.'}, status=429)
                from django.contrib import messages
                messages.error(request, 'Too many attempts. Please wait a minute and try again.')
                return redirect(request.path)
            return view_func(request, *args, **kwargs)
        return _wrapped_view
    return decorator
