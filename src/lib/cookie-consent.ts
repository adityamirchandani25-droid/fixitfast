export const COOKIE_CONSENT_NAME = "fixitfast_cookie_consent";
export const COOKIE_CONSENT_EVENT = "fixitfast-cookie-consent";

export function hasAnalyticsConsent() {
  return document.cookie
    .split("; ")
    .some((cookie) => cookie === `${COOKIE_CONSENT_NAME}=accepted`);
}
