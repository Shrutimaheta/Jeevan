export function clinicUrl(path = '/login/') {
  const configured = import.meta.env.VITE_CLINIC_ORIGIN || (import.meta.env.DEV ? 'http://localhost:8000' : window.location.origin);
  const origin = new URL(configured);
  if (!['http:', 'https:'].includes(origin.protocol) || (!import.meta.env.DEV && origin.protocol !== 'https:')) {
    throw new Error('Configure a valid HTTPS clinic origin.');
  }
  return new URL(path, origin).href;
}
