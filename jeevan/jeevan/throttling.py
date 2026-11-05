"""Atomic database throttling shared by every worker."""
import hashlib
import time
from datetime import timedelta
from django.db import transaction
from django.db.models import F
from django.utils import timezone


def client_ip(request):
    """Accept forwarding headers only from explicitly trusted proxy networks."""
    from django.conf import settings
    from ipaddress import ip_address, ip_network
    try:
        address = ip_address(request.META.get('REMOTE_ADDR', ''))
        trusted = [ip_network(network) for network in settings.TRUSTED_PROXY_NETWORKS]
        for hop in reversed(request.META.get('HTTP_X_FORWARDED_FOR', '').split(',')):
            if not any(address in network for network in trusted) or not hop.strip():
                break
            address = ip_address(hop.strip())
        return str(address)
    except ValueError:
        return request.META.get('REMOTE_ADDR', 'unknown')


def allow_request(key, limit, period):
    from care.models import RequestLimit
    window = int(time.time()) // period
    digest = hashlib.sha256(key.encode()).hexdigest()
    with transaction.atomic():
        RequestLimit.objects.get_or_create(key=digest, defaults={
            'window': window, 'count': 0,
            'expires_at': timezone.now() + timedelta(seconds=period * 2)})
        RequestLimit.objects.filter(pk=digest).exclude(window=window).update(
            window=window, count=0, expires_at=timezone.now() + timedelta(seconds=period * 2))
        return RequestLimit.objects.filter(pk=digest, window=window, count__lt=limit).update(
            count=F('count') + 1) == 1
