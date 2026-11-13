"""Storage for private medical files (patient documents, lab results, reports).

Models pass ``storage=private_storage`` (a function). Django calls it when it
needs the storage, and migrations record only the function's name, not a
folder path, so they stay the same on every machine.

Where files go is configured in settings.STORAGES["private"]: a local folder
(``private_media/``) by default, or a private S3-compatible bucket when
S3_BUCKET_NAME is set.
"""

from django.core.files.storage import storages


def private_storage():
    return storages["private"]
