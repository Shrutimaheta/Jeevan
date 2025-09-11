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