from django.utils.cache import patch_cache_control


class PrivateResponseMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if request.user.is_authenticated or request.path.startswith(('/login/', '/patient/', '/records/', '/doctor/', '/nurse/', '/receptionist/', '/teleconsultation/')):
            patch_cache_control(response, private=True, no_store=True, no_cache=True, must_revalidate=True)
        return response
