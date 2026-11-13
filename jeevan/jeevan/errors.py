"""Turn exceptions into messages that are safe and readable for end users."""

import logging

from django.core.exceptions import PermissionDenied, ValidationError

logger = logging.getLogger("django")


def friendly_error(exc):
    """Return a readable message for ``exc``.

    Validation and permission errors carry messages written for users, so show
    them without Python's ``['...']`` list formatting. Anything else is
    unexpected: log it with a traceback and show a generic message instead of
    internal details.
    """
    if isinstance(exc, ValidationError):
        return " ".join(exc.messages)
    if isinstance(exc, PermissionDenied):
        return str(exc) or "You do not have permission to do that."
    logger.exception("Unexpected error shown to user as a generic message", exc_info=exc)
    return "Something went wrong. Please try again or contact support."
