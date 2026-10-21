export const COOKIE_CONSENT_KEY = "ambrosia_cookie_consent";

export type CookieConsent = "accepted" | "declined";

export function readCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const value = localStorage.getItem(COOKIE_CONSENT_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
}
