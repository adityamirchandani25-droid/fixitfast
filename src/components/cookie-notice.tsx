"use client";

import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_NAME,
} from "@/lib/cookie-consent";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasConsent = document.cookie
      .split("; ")
      .some((cookie) => cookie.startsWith(`${COOKIE_CONSENT_NAME}=`));

    if (!hasConsent) {
      // The cookie jar only exists in the browser, after hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, []);

  function saveConsent(value: "accepted" | "essential") {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${COOKIE_CONSENT_NAME}=${value}; Path=/; Max-Age=${ONE_YEAR_SECONDS}; SameSite=Lax${secure}`;
    window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside className="cookie-notice" aria-label="Cookie notice">
      <div>
        <strong>Cookies on FixItFast</strong>
        <p>We use essential cookies for secure sign-in and preferences. With your permission, Google Analytics helps us understand site usage.</p>
      </div>
      <div className="cookie-notice-actions">
        <button type="button" className="secondary" onClick={() => saveConsent("essential")}>Essential only</button>
        <button type="button" onClick={() => saveConsent("accepted")}>Accept all</button>
      </div>
    </aside>
  );
}
