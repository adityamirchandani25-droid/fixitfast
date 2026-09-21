"use client";

import { useEffect, useState } from "react";

const COOKIE_NAME = "fixitfast_cookie_consent";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasConsent = document.cookie
      .split("; ")
      .some((cookie) => cookie.startsWith(`${COOKIE_NAME}=`));

    if (!hasConsent) {
      // The cookie jar only exists in the browser, after hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, []);

  function acceptCookies() {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${COOKIE_NAME}=accepted; Path=/; Max-Age=${ONE_YEAR_SECONDS}; SameSite=Lax${secure}`;
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside className="cookie-notice" aria-label="Cookie notice">
      <div>
        <strong>Cookies on FixItFast</strong>
        <p>We use essential cookies to keep sign-in secure and remember your preferences.</p>
      </div>
      <button type="button" onClick={acceptCookies}>Accept cookies</button>
    </aside>
  );
}
