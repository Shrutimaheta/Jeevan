from django.shortcuts import render
from django.utils.cache import patch_cache_control


def csrf_failure(request, reason=''):
    """Explain a rejected form without exposing internals or replaying its data."""
    response = render(request, 'errors/csrf.html', status=403)
    patch_cache_control(response, private=True, no_store=True)
    return response
