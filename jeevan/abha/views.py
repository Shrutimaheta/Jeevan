"""No local ABHA identities: an external integration must be connected first."""
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_POST
from jeevan.decorators import rate_limit

MESSAGE = 'ABHA services are not connected. No ABHA ID or OTP has been issued. You can continue without an ABHA ID.'

def unavailable():
    return JsonResponse({'success': False, 'available': False, 'error': MESSAGE}, status=503)

@login_required
def index(request):
    return render(request, 'abha/unavailable.html', {'message': MESSAGE}, status=503)

@login_required
def create_abha_id(request):
    return unavailable() if request.method == 'POST' else index(request)

@login_required
@require_POST
@rate_limit('abha', limit=5, period=60, is_api=True)
def generate_otp(request):
    return unavailable()

verify_otp = generate_otp
verify_abha = generate_otp
check_abha_uniqueness = generate_otp
