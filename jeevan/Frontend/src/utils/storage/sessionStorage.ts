/**
 * SessionStorage utility functions
 */

/**
 * Sets a value in sessionStorage with optional expiration
 * @param key - Storage key
 * @param value - Value to store
 * @param expiresIn - Expiration time in milliseconds (optional)
 */
export const setSessionItem = <T>(
  key: string, 
  value: T, 
  expiresIn?: number
): void => {
  try {
    const item = {
      value,
      timestamp: Date.now(),
      expiresIn
    };
    sessionStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error('Error setting sessionStorage item:', error);
  }
};

/**
 * Gets a value from sessionStorage
 * @param key - Storage key
 * @returns Stored value or null if not found/expired
 */
export const getSessionItem = <T>(key: string): T | null => {
  try {
    const item = sessionStorage.getItem(key);
    if (!item) return null;
    
    const parsed = JSON.parse(item);
    
    // Check if expired
    if (parsed.expiresIn && Date.now() - parsed.timestamp > parsed.expiresIn) {
      sessionStorage.removeItem(key);
      return null;
    }
    
    return parsed.value;
  } catch (error) {
    console.error('Error getting sessionStorage item:', error);
    return null;
  }
};

/**
 * Removes an item from sessionStorage
 * @param key - Storage key
 */
export const removeSessionItem = (key: string): void => {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing sessionStorage item:', error);
  }
};

/**
 * Clears all sessionStorage
 */
export const clearSessionStorage = (): void => {
  try {
    sessionStorage.clear();
  } catch (error) {
    console.error('Error clearing sessionStorage:', error);
  }
};

/**
 * Gets all sessionStorage keys
 * @returns Array of storage keys
 */
export const getSessionKeys = (): string[] => {
  try {
    return Object.keys(sessionStorage);
  } catch (error) {
    console.error('Error getting sessionStorage keys:', error);
    return [];
  }
};
