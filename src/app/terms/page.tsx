import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";
import { BUSINESS } from "@/lib/business-info";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of the FixItFast platform.",
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    title: "1. Agreement and eligibility",
    body: "By creating an account or using FixItFast, you agree to these terms and to our Privacy Policy. You must be at least 13 years old to create an account; FixItFast is not directed to children under 13 and does not knowingly collect their information (see the Children's privacy section below). If you use FixItFast for a business, you confirm that you have authority to bind that business to these terms.",
  },
  {
    title: "2. What FixItFast provides",
    body: "FixItFast helps customers discover and contact independent home-service providers, view availability and starting estimates, and organize service requests. Unless we clearly say otherwise, FixItFast is not the provider performing the requested work and does not guarantee that a provider will accept or complete a request.",
  },
  {
    title: "3. Accounts",
    body: "You must provide accurate information, keep your login credentials secure, and promptly update information that changes. You are responsible for activity under your account and should notify us if you believe it has been accessed without permission.",
  },
  {
    title: "4. Providers and service requests",
    body: "Providers are independent professionals or companies responsible for their own qualifications, licensing, insurance, availability, pricing, and work — FixItFast reviews basic account information before approving a provider but does not verify or guarantee a provider's license, insurance, or workmanship. A requested time is not confirmed until the provider accepts it. Customers are responsible for providing accurate job and location details and for providing safe, lawful access to the service location.",
  },
  {
    title: "5. Estimates, payments, and fees",
    body: (
      <>
        Displayed estimates are starting estimates covering the callout and first hour and may change based on the
        work, parts, taxes, or conditions found on site — the final price is set by the provider and reviewed with
        you before work continues. Any demand-based (“surge”) multiplier is shown on screen before you pay, and the
        exact charge amount is shown again on the payment step — nothing is added after checkout. Payments are
        processed by Stripe, a third-party payment processor, and are also subject to{" "}
        <a href="https://stripe.com/legal/consumer" target="_blank" rel="noopener noreferrer" className="text-brand-700 underline hover:text-brand-800">
          Stripe’s terms
        </a>
        . See our <Link href="/refunds" className="text-brand-700 underline hover:text-brand-800">Refund &amp; Cancellation Policy</Link> for
        when a charge can be refunded.
      </>
    ),
  },
  {
    title: "6. Acceptable use",
    body: "Do not misuse the platform, impersonate another person, submit unlawful or deceptive requests, interfere with platform security, scrape the service without permission, or use FixItFast to harm others or violate applicable law.",
  },
  {
    title: "7. Platform availability and disclaimers",
    body: "We work to keep FixItFast accurate and available, but the platform and provider information are offered on an as-available basis. To the extent permitted by law, we disclaim implied warranties, including merchantability, fitness for a particular purpose, and non-infringement.",
  },
  {
    title: "8. Limitation of liability",
    body: "To the extent permitted by law, FixItFast will not be liable for indirect, incidental, special, consequential, or punitive damages, or for losses arising from a provider's acts, omissions, or services. Rights that cannot legally be limited remain unaffected.",
  },
  {
    title: "9. Suspension and termination",
    body: (
      <>
        You may stop using FixItFast at any time from your account, or by asking us to close it — see{" "}
        <Link href="/data-request" className="text-brand-700 underline hover:text-brand-800">
          Access or delete your data
        </Link>
        . We may restrict or terminate access when reasonably necessary to protect users, enforce these terms,
        comply with law, or maintain platform security.
      </>
    ),
  },
  {
    title: "10. Children's privacy",
    body: "FixItFast is intended for users 13 and older and is not directed to children. We do not knowingly collect personal information from anyone under 13. If you believe a child under 13 has created an account or given us information, contact us using the details below and we will delete it.",
  },
  {
    title: "11. Governing law",
    body: `These terms are governed by the laws of ${BUSINESS.jurisdiction}, without regard to conflict-of-law rules, except where local consumer-protection law requires otherwise.`,
  },
  {
    title: "12. Changes and contact",
    body: (
      <>
        We may update these terms as the service changes. We will post the revised terms and update the effective
        date. Continued use after an update means you accept the revised terms. Questions, including about this
        entity’s identity, may be sent to{" "}
        <a href={`mailto:${BUSINESS.supportEmail}`} className="text-brand-700 underline hover:text-brand-800">
          {BUSINESS.supportEmail}
        </a>{" "}
        or (404) 855-1929.
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      effectiveDate="September 21, 2026"
      intro="These Terms of Service govern your access to and use of FixItFast. Please read them before creating an account or submitting a service request."
      sections={sections}
    >
      <BusinessDetails />
    </LegalPage>
  );
}

function BusinessDetails() {
  return (
    <section className="mt-9 rounded-[var(--radius-lg)] border border-border bg-surface p-5 text-sm leading-6 text-ink-600">
      <h2 className="font-display text-base font-semibold text-ink-900">Who runs FixItFast</h2>
      <dl className="mt-3 grid gap-2 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-ink-500">Operated by</dt>
          <dd>{BUSINESS.legalName}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-ink-500">Address</dt>
          <dd>{BUSINESS.address}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-ink-500">Support email</dt>
          <dd>
            <a href={`mailto:${BUSINESS.supportEmail}`} className="text-brand-700 underline hover:text-brand-800">
              {BUSINESS.supportEmail}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-ink-500">Support phone</dt>
          <dd>
            <a href={`tel:${BUSINESS.supportPhoneHref}`} className="text-brand-700 underline hover:text-brand-800">
              {BUSINESS.supportPhone}
            </a>
          </dd>
        </div>
      </dl>
    </section>
  );
}
