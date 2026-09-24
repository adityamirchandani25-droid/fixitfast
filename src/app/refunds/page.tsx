import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { BUSINESS } from "@/lib/business-info";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "When and how charges on FixItFast can be refunded or cancelled.",
  alternates: { canonical: "/refunds" },
};

const sections = [
  {
    title: "1. What you're charged, and when",
    body: "When you submit a service request, you're charged the displayed starting estimate — the callout plus the first hour — before the request is sent. That amount, and any demand-based multiplier, is shown on screen before you confirm payment. Anything beyond that (parts, extra time, additional work) is quoted and agreed with the provider on site and is not collected through FixItFast at booking.",
  },
  {
    title: "2. [Refund eligibility — confirm and complete before publishing]",
    body: "FixItFast's actual refund window and conditions need to be filled in here by the business (for example: full refund if no provider accepts within a stated time; full refund if you cancel before a provider is dispatched; partial/no refund once a provider is en route or has started work; how disputed or unsatisfactory work is handled). Until this section is completed with real, accurate terms, do not represent to customers that refunds are available on any specific timeline.",
  },
  {
    title: "3. No provider available",
    body: "If no provider accepts your request within the matching window and it's marked unmatched, the starting-estimate charge is refunded to your original payment method automatically.",
  },
  {
    title: "4. Cancelling a request",
    body: "You can cancel a request from your dashboard. Cancelling before a provider accepts is refunded in full. Cancelling after a provider has accepted, or once they're on site, may not be fully refundable, since the provider has already committed time — the specific cutoffs need to be confirmed (see section 2).",
  },
  {
    title: "5. How refunds are issued",
    body: "Approved refunds are returned to the original payment method through Stripe. Processing typically takes a few business days after approval, depending on your bank or card issuer.",
  },
  {
    title: "6. Disputing a charge",
    body: (
      <>
        If something doesn’t look right on a charge, contact us first at{" "}
        <a href={`mailto:${BUSINESS.supportEmail}`} className="text-brand-700 underline hover:text-brand-800">
          {BUSINESS.supportEmail}
        </a>{" "}
        before opening a chargeback with your bank — we can usually resolve it faster directly.
      </>
    ),
  },
];

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      effectiveDate="September 24, 2026"
      intro="This page explains when a charge made through FixItFast can be refunded and how to request it."
      sections={sections}
    />
  );
}
