from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
import json
import random
import string
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)

@csrf_exempt
@require_http_methods(["POST"])
def send_abha_otp(request):
    """
    Send OTP for ABHA ID creation
    """
    try:
        data = json.loads(request.body)
        mobile_number = data.get('mobile')
        
        if not mobile_number or len(mobile_number) != 10:
            return JsonResponse({
                'success': False,
                'error': 'Invalid mobile number'
            }, status=400)
        
        # Simulate OTP sending (in production, integrate with SMS service)
        otp = str(random.randint(100000, 999999))
        
        # Store OTP in session for verification
        request.session[f'abha_otp_{mobile_number}'] = {
            'otp': otp,
            'timestamp': datetime.now().isoformat(),
            'attempts': 0
        }
        
        logger.info(f"ABHA OTP sent to {mobile_number}: {otp}")
        
        return JsonResponse({
            'success': True,
            'message': 'OTP sent successfully',
            'otp': otp  # Remove this in production
        })
        
    except Exception as e:
        logger.error(f"Error sending ABHA OTP: {str(e)}")
        return JsonResponse({
            'success': False,
            'error': 'Failed to send OTP'
        }, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def verify_abha_otp(request):
    """
    Verify OTP for ABHA ID creation
    """
    try:
        data = json.loads(request.body)
        mobile_number = data.get('mobile')
        otp = data.get('otp')
        
        if not mobile_number or not otp:
            return JsonResponse({
                'success': False,
                'error': 'Mobile number and OTP are required'
            }, status=400)
        
        # Get stored OTP from session
        session_key = f'abha_otp_{mobile_number}'
        stored_data = request.session.get(session_key)
        
        if not stored_data:
            return JsonResponse({
                'success': False,
                'error': 'OTP not found or expired'
            }, status=400)
        
        # Check if OTP is expired (5 minutes)
        otp_time = datetime.fromisoformat(stored_data['timestamp'])
        if datetime.now() - otp_time > timedelta(minutes=5):
            del request.session[session_key]
            return JsonResponse({
                'success': False,
                'error': 'OTP has expired'
            }, status=400)
        
        # Check attempts limit
        if stored_data['attempts'] >= 3:
            del request.session[session_key]
            return JsonResponse({
                'success': False,
                'error': 'Maximum attempts exceeded'
            }, status=400)
        
        # Verify OTP
        if stored_data['otp'] != otp:
            stored_data['attempts'] += 1
            request.session[session_key] = stored_data
            return JsonResponse({
                'success': False,
                'error': 'Invalid OTP'
            }, status=400)
        
        # OTP verified successfully
        del request.session[session_key]
        
        return JsonResponse({
            'success': True,
            'message': 'OTP verified successfully'
        })
        
    except Exception as e:
        logger.error(f"Error verifying ABHA OTP: {str(e)}")
        return JsonResponse({
            'success': False,
            'error': 'Failed to verify OTP'
        }, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def create_abha_id(request):
    """
    Create ABHA ID after OTP verification
    """
    try:
        data = json.loads(request.body)
        
        # Validate required fields
        required_fields = ['name', 'dob', 'gender', 'mobile', 'aadhaar']
        for field in required_fields:
            if not data.get(field):
                return JsonResponse({
                    'success': False,
                    'error': f'{field} is required'
                }, status=400)
        
        # Validate mobile number
        mobile = data.get('mobile')
        if len(mobile) != 10 or not mobile.isdigit():
            return JsonResponse({
                'success': False,
                'error': 'Invalid mobile number'
            }, status=400)
        
        # Validate Aadhaar number
        aadhaar = data.get('aadhaar')
        if len(aadhaar) != 12 or not aadhaar.isdigit():
            return JsonResponse({
                'success': False,
                'error': 'Invalid Aadhaar number'
            }, status=400)
        
        # Generate ABHA ID (mock implementation)
        # In production, this would integrate with ABHA API
        abha_id = generate_abha_id()
        
        # Store ABHA ID in session for the user
        request.session['created_abha_id'] = {
            'abha_id': abha_id,
            'name': data.get('name'),
            'mobile': mobile,
            'created_at': datetime.now().isoformat()
        }
        
        logger.info(f"ABHA ID created: {abha_id} for {data.get('name')}")
        
        return JsonResponse({
            'success': True,
            'abha_id': abha_id,
            'message': 'ABHA ID created successfully'
        })
        
    except Exception as e:
        logger.error(f"Error creating ABHA ID: {str(e)}")
        return JsonResponse({
            'success': False,
            'error': 'Failed to create ABHA ID'
        }, status=500)

def generate_abha_id():
    """
    Generate a mock ABHA ID
    In production, this would be handled by the ABHA API
    """
    # Generate a 14-character alphanumeric ABHA ID
    prefix = 'ABHA'
    suffix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
    return f"{prefix}{suffix}"

@require_http_methods(["GET"])
def check_abha_status(request):
    """
    Check if ABHA ID exists and is valid
    """
    try:
        abha_id = request.GET.get('abha_id')
        
        if not abha_id:
            return JsonResponse({
                'success': False,
                'error': 'ABHA ID is required'
            }, status=400)
        
        # Mock ABHA status check
        # In production, this would query the ABHA API
        is_valid = validate_abha_id(abha_id)
        
        return JsonResponse({
            'success': True,
            'valid': is_valid,
            'message': 'ABHA ID is valid' if is_valid else 'ABHA ID is invalid'
        })
        
    except Exception as e:
        logger.error(f"Error checking ABHA status: {str(e)}")
        return JsonResponse({
            'success': False,
            'error': 'Failed to check ABHA status'
        }, status=500)

def validate_abha_id(abha_id):
    """
    Validate ABHA ID format
    """
    if not abha_id:
        return False
    
    # Remove spaces and dashes
    clean_id = abha_id.replace(' ', '').replace('-', '')
    
    # Check if it's 14 characters
    if len(clean_id) != 14:
        return False
    
    # Check if it starts with ABHA
    if not clean_id.upper().startswith('ABHA'):
        return False
    
    # Check if the rest is alphanumeric
    suffix = clean_id[4:]
    return suffix.isalnum()

@require_http_methods(["GET"])
def get_abha_info(request):
    """
    Get ABHA information for the current user
    """
    try:
        if not request.user.is_authenticated:
            return JsonResponse({
                'success': False,
                'error': 'Authentication required'
            }, status=401)
        
        # Get ABHA ID from session or user profile
        abha_id = request.session.get('created_abha_id', {}).get('abha_id')
        
        if not abha_id:
            return JsonResponse({
                'success': False,
                'error': 'No ABHA ID found'
            }, status=404)
        
        return JsonResponse({
            'success': True,
            'abha_id': abha_id,
            'message': 'ABHA ID retrieved successfully'
        })
        
    except Exception as e:
        logger.error(f"Error getting ABHA info: {str(e)}")
        return JsonResponse({
            'success': False,
            'error': 'Failed to get ABHA information'
        }, status=500)
