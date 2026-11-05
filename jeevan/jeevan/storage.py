from django.core.files.storage import storages

def private_storage():
    """Serializable factory: never freeze a machine's path in migrations."""
    return storages['private']
