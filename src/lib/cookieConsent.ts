export const STORAGE_KEY = 'wellpredict_cookie_consent';

export const CONSENT_EVENT = 'wellpredict-cookie-consent';
export const RESET_EVENT = 'wellpredict-cookie-consent-reset';

export type CookiePreferences = {
  essential: true;
  analytics: boolean;
  preferences: boolean;
  savedAt: string;
};

export function loadCookieConsent(): CookiePreferences | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookiePreferences;
    if (parsed.essential !== true) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveCookieConsent(settings: Omit<CookiePreferences, 'savedAt'>): CookiePreferences {
  const payload: CookiePreferences = {
    ...settings,
    essential: true,
    savedAt: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: payload }));
  return payload;
}

export function resetCookieConsent(): void {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(RESET_EVENT));
}
