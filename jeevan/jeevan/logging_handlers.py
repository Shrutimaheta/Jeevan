import os
import hmac
import hashlib
import logging
from django.conf import settings

class CryptographicAuditLogHandler(logging.FileHandler):
    """
    Custom append-only file logging handler that secures log lines cryptographically.
    Each log entry is signed using HMAC-SHA256 chained to the previous line's signature,
    preventing administrators from modifying or deleting past entries undetected.
    """
    def __init__(self, filename, mode='a', encoding=None, delay=False, errors=None):
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        super().__init__(filename, mode, encoding, delay, errors)

    def _get_last_signature(self):
        """Read the signature of the last log entry from the file to chain them."""
        try:
            if not os.path.exists(self.baseFilename) or os.path.getsize(self.baseFilename) == 0:
                return "SEED_SIGNATURE"
            
            with open(self.baseFilename, 'rb') as f:
                size = os.path.getsize(self.baseFilename)
                offset = max(0, size - 4096)
                f.seek(offset)
                chunk = f.read().decode('utf-8', errors='ignore')
                lines = [line.strip() for line in chunk.split('\n') if line.strip()]
                if lines:
                    last_line = lines[-1]
                    if "[SIG:" in last_line:
                        return last_line.split("[SIG:")[1].split("]")[0]
        except Exception:
            pass
        return "SEED_SIGNATURE"

    def emit(self, record):
        """Format, sign, and write the log record."""
        try:
            msg = self.format(record)
            # Use DJANGO_SECRET_KEY as HMAC secret
            secret_key = bytes(settings.SECRET_KEY, 'utf-8')
            
            # Fetch previous signature to form the chain
            prev_sig = self._get_last_signature()
            
            # Compute SHA256 HMAC signature
            payload = f"{prev_sig}|{msg}"
            signature = hmac.new(secret_key, payload.encode('utf-8'), hashlib.sha256).hexdigest()
            
            # Form final log line
            signed_msg = f"[SIG:{signature}] [PREV:{prev_sig}] {msg}\n"
            
            # Write to file
            self.stream.write(signed_msg)
            self.flush()
        except Exception:
            self.handleError(record)
