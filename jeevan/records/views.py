from django.http import HttpResponse

def record_list(request):
    # If you want to use a template, ensure you have: templates/records/record_list.html
    return HttpResponse("Records list page")
