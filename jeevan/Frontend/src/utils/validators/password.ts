/**
 * Password validation utilities
 */

/**
 * Validates password strength
 * @param password - Password string to validate
 * @returns Object with validation results
 */
export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
  strength: 'weak' | 'medium' | 'strong';
} => {
  const errors: string[] = [];
  
  if (!password) {
    errors.push('Password is required');
    return { isValid: false, errors, strength: 'weak' };
  }
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  const isValid = errors.length === 0;
  
  // Calculate strength
  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  if (isValid) {
    if (password.length >= 12) {
      strength = 'strong';
    } else if (password.length >= 8) {
      strength = 'medium';
    }
  }
  
  return { isValid, errors, strength };
};

/**
 * Checks if password meets minimum requirements
 * @param password - Password string
 * @returns True if password meets minimum requirements
 */
export const isPasswordValid = (password: string): boolean => {
  return validatePassword(password).isValid;
};
