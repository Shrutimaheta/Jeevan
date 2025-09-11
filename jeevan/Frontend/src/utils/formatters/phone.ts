/**
 * Phone number formatting utilities
 */

/**
 * Formats a phone number with proper spacing and formatting
 * @param phone - Raw phone number string
 * @returns Formatted phone number
 */
export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  return phone;
};

/**
 * Extracts only digits from a phone number
 * @param phone - Phone number string
 * @returns Cleaned phone number with only digits
 */
export const cleanPhoneNumber = (phone: string): string => {
  return phone.replace(/\D/g, '');
};
