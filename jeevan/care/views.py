from django.http import JsonResponse
from doctor.models import Doctor
from .models import CustomUser
from django.views.decorators.csrf import csrf_exempt

# Reusable AJAX view for all roles
@csrf_exempt
def get_user_info(request, user_id):
    try:
        user = CustomUser.objects.get(id=user_id)
        return JsonResponse({
            'full_name': user.full_name,
            'email': user.email,
            'role': user.role,
        })
    except CustomUser.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)

# from django.http import JsonResponse
# from django.contrib.auth import get_user_model
# from django.views.decorators.http import require_GET

# CustomUser = get_user_model()

# @require_GET
# def get_user_info(request, user_id):
#     try:
#         user = CustomUser.objects.get(id=user_id)
#         return JsonResponse({
#             'full_name': user.full_name,
#             'email': user.email,
#         })
#     except CustomUser.DoesNotExist:
#         return JsonResponse({'error': 'User not found'}, status=404)
