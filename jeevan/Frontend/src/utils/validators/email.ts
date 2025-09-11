export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateEmailDomain = (email: string, allowedDomains: string[]): boolean => {
  if (!isValidEmail(email)) return false;
  const domain = email.split('@')[1];
  return allowedDomains.includes(domain);
};
