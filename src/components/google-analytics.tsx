"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import {
  COOKIE_CONSENT_EVENT,
  hasAnalyticsConsent,
} from "@/lib/cookie-consent";

// Configurable per-environment rather than hardcoded, so a staging/preview
// deploy doesn't silently report into the production Analytics property.
const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-5PEXGHYFKY";

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
// This only ever loads after the visitor accepts analytics cookies, so
// there's no need to ask Google Analytics for ad-related signals we don't
// use — keep it to plain, consented usage analytics.
gtag('set', 'allow_google_signals', false);
gtag('set', 'ad_personalization', 'denied');
gtag('set', 'ad_storage', 'denied');
gtag('config', '${MEASUREMENT_ID}');`}
      </Script>
    </>
  );
}
