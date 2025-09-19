from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def test(request):
    return render(request, 'test.html')

def debug(request):
    return render(request, 'debug.html')

def simple_test(request):
    return render(request, 'simple_test.html')

def react_debug(request):
    return render(request, 'react_debug.html')

def patient_home(request):
    doctors = [
        {"name": "Dr. Aditi Sharma", "specialty": "Cardiologist", "photo": "https://via.placeholder.com/300x300?text=Dr.+Aditi"},
        {"name": "Dr. Rohan Verma", "specialty": "Neurologist", "photo": "https://via.placeholder.com/300x300?text=Dr.+Rohan"},
        {"name": "Dr. Meera Iyer", "specialty": "Pediatrician", "photo": "https://via.placeholder.com/300x300?text=Dr.+Meera"},
        {"name": "Dr. Akash Patel", "specialty": "Dermatologist", "photo": "https://via.placeholder.com/300x300?text=Dr.+Akash"},
    ]
    return render(request, 'patient_home.html', {"doctors": doctors})

def vaidya_login(request):
    return render(request, 'vaidya_login.html')