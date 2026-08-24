import uuid
import os
import re
from django.utils.text import slugify

def secure_upload_path(folder_name):
    """
    Returns a callable upload path generator.
    Sanitizes the original filename using slugify and appends a secure UUID
    to prevent name collisions and directory traversal attacks.
    """
    def _path_generator(instance, filename):
        base, ext = os.path.splitext(filename)
        ext = ext.lower()
        
        # Allow only standard alphanumeric extensions (e.g. .pdf, .jpg)
        if not re.match(r'^\.[a-z0-9]{2,5}$', ext):
            ext = '.dat'
            
        # Sanitize base filename using Django's slugify
        sanitized_base = slugify(base)
        if not sanitized_base:
            sanitized_base = 'document'
            
        # Truncate sanitized base to 50 chars to avoid very long filenames
        sanitized_base = sanitized_base[:50]
        
        secure_filename = f"{sanitized_base}_{uuid.uuid4().hex}{ext}"
        return os.path.join(folder_name, secure_filename)
        
    return _path_generator

# Concrete module-level functions for Django Migrations serializer
def secure_reports_path(instance, filename):
    return secure_upload_path('reports')(instance, filename)

def secure_patient_documents_path(instance, filename):
    return secure_upload_path('patient_documents')(instance, filename)
