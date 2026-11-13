import os

from django.conf import settings


def site_flags(request):
    """Expose a few feature flags to every template as ``site_flags``."""
    demo = getattr(settings, "DEMO_MODE", False)
    return {
        "site_flags": {
            "DEMO_MODE": demo,
            "SMS_ENABLED": getattr(settings, "SMS_ENABLED", False),
            # Only exposed on demo deployments, where it is meant to be public.
            "DEMO_PASSWORD": (os.getenv("DEMO_PASSWORD", "").strip() or "Demo@2026") if demo else "",
        }
    }
