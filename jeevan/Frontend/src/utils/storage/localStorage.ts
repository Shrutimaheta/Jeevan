export const storage = {
  get: (key: string) => {
    try {
      return JSON.parse(localStorage.getItem(key) || 'null');
    } catch {
      return null;
    }
  },
  set: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key: string) => localStorage.removeItem(key),
  clear: () => localStorage.clear()
};
