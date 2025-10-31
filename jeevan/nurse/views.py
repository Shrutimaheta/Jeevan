from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import Nurse

def some_view(request):
    return HttpResponse("Nurse app working.")

@login_required
def nurse_dashboard(request):
    """Nurse dashboard view"""
    if request.user.role != 'nurse':
        return HttpResponse("Access denied. This page is for nurses only.", status=403)
    
    context = {
        'user': request.user,
        'nurse': getattr(request.user, 'nurse', None),
    }
    return render(request, 'nurse/dashboard.html', context)

def NURSESIGNUP(request):
    # Ensure you have: templates/nurse/nurse_login.html
    return render(request, 'nurse/nurse_login.html')

def nurse_list_api(request):
    """API to get list of nurses"""
    nurses = Nurse.objects.all()
    nurses_data = []
    for nurse in nurses:
        nurses_data.append({
            'id': nurse.id,
            'full_name': nurse.full_name,
            'email': nurse.email,
            'contact_number': nurse.contact_number,
            'qualification': nurse.qualification,
            'experience': nurse.experience,
        })
    
    return JsonResponse(nurses_data, safe=False)
