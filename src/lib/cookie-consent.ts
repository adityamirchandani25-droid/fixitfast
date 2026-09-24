export const COOKIE_CONSENT_NAME = "fixitfast_cookie_consent";
export const COOKIE_CONSENT_EVENT = "fixitfast-cookie-consent";
// Fired to reopen the cookie banner from elsewhere (e.g. the Cookie Policy
// page's "change your choice" control) without a full page reload.
export const COOKIE_CONSENT_REOPEN_EVENT = "fixitfast-cookie-consent-reopen";

export function hasAnalyticsConsent() {
  return document.cookie
    .split("; ")
    .some((cookie) => cookie === `${COOKIE_CONSENT_NAME}=accepted`);
}

/** Clears the stored choice and reopens the banner so the visitor can pick again. */
export function reopenCookieConsent() {
  document.cookie = `${COOKIE_CONSENT_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
  window.dispatchEvent(new Event(COOKIE_CONSENT_REOPEN_EVENT));
  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
}
