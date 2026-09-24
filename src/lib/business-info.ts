/**
 * Single source of truth for the legal/business facts shown in footers,
 * the legal pages (/terms, /privacy, /cookies, /refunds, /data-request),
 * and outgoing email. Update the bracketed placeholders with FixItFast's
 * actual registered details — nothing here should be relied on for
 * compliance until they're filled in.
 */
export const BUSINESS = {
  brandName: "FixItFast",
  /** Full registered legal entity name, e.g. "FixItFast, Inc." */
  legalName: "[FixItFast — insert registered legal entity name]",
  /** Registered/mailing address, required for CAN-SPAM and most privacy laws. */
  address: "[Insert registered business mailing address]",
  /** State/country of incorporation — drives which consumer-protection rules apply. */
  jurisdiction: "[Insert state or country of incorporation]",
  // Reusing the address already published on the site's contact section
  // rather than inventing a new, unverified inbox.
  supportEmail: "adityamirchandani@fixit-fast.com",
  privacyEmail: "adityamirchandani@fixit-fast.com",
  supportPhone: "(404) 855-1929",
  supportPhoneHref: "+14048551929",
} as const;
