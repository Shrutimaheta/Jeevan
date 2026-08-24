import hmac
import hashlib
import sys
import os
import django

def verify_audit_log_file(filename, secret_key_str):
    """
    Verifies that the append-only cryptographic audit logs have not been tampered with.
    """
    if not os.path.exists(filename):
        print(f"Log file {filename} does not exist.")
        return False
        
    secret_key = bytes(secret_key_str, 'utf-8')
    expected_prev = "SEED_SIGNATURE"
    line_number = 0
    tampered = False
    
    with open(filename, 'r', encoding='utf-8') as f:
        for line in f:
            line_number += 1
            line = line.strip()
            if not line:
                continue
                
            if "[SIG:" not in line or "[PREV:" not in line:
                print(f"Line {line_number} is corrupted or missing signature tags.")
                tampered = True
                continue
                
            try:
                sig_part = line.split("[SIG:")[1].split("]")[0]
                prev_part = line.split("[PREV:")[1].split("]")[0]
                # Reconstruct the log message parts
                msg = line.split(f"[PREV:{prev_part}] ")[1]
            except IndexError:
                print(f"Line {line_number} has invalid tag formatting.")
                tampered = True
                continue
                
            # Verify chaining
            if prev_part != expected_prev:
                print(f"Line {line_number} signature chaining broken! Expected PREV: {expected_prev}, Got: {prev_part}")
                tampered = True
                
            # Recompute signature
            payload = f"{prev_part}|{msg}"
            computed_sig = hmac.new(secret_key, payload.encode('utf-8'), hashlib.sha256).hexdigest()
            
            if sig_part != computed_sig:
                print(f"Line {line_number} signature mismatch! Record tampered or modified!")
                tampered = True
                
            expected_prev = sig_part
            
    if tampered:
        print("FAIL: Audit log file integrity check failed. Tampering detected!")
        return False
    else:
        print(f"SUCCESS: Audit log file integrity verified. {line_number} records checked.")
        return True

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "jeevan.settings")
    django.setup()
    from django.conf import settings
    
    audit_file = settings.LOG_DIR / "audit.log"
    verify_audit_log_file(audit_file, settings.SECRET_KEY)
