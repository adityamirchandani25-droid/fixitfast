"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import {
  COOKIE_CONSENT_EVENT,
  hasAnalyticsConsent,
} from "@/lib/cookie-consent";

const MEASUREMENT_ID = "G-5PEXGHYFKY";

function subscribeToConsent(callback: () => void) {
  window.addEventListener(COOKIE_CONSENT_EVENT, callback);
  return () => window.removeEventListener(COOKIE_CONSENT_EVENT, callback);
}

export function GoogleAnalytics() {
  const enabled = useSyncExternalStore(
    subscribeToConsent,
    hasAnalyticsConsent,
    () => false,
  );

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${MEASUREMENT_ID}');`}
      </Script>
    </>
  );
}
