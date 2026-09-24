import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";
import { BUSINESS } from "@/lib/business-info";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How FixItFast collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "1. Information we collect",
    body: (
      <>
        <p>We collect only what’s needed to run the service:</p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li><strong>Account information</strong> — name, email, phone (optional), and a hashed password, provided when you sign up.</li>
          <li><strong>Service request details</strong> — service category, description, optional photos you attach, urgency, and the service address you enter.</li>
          <li><strong>Provider information</strong> — categories of work, certifications you upload, and, only while you switch location sharing on, your live location — see the Location data section below.</li>
          <li><strong>Payment information</strong> — handled directly by Stripe; FixItFast never receives or stores your full card number (see Third-party services).</li>
          <li><strong>Usage data</strong> — standard server logs (IP address, browser, pages visited), and, only if you accept analytics cookies, aggregated analytics from Google Analytics.</li>
        </ul>
        <p className="mt-2">We do not sell your personal information, and we do not collect more than the account type you chose needs.</p>
      </>
    ),
  },
  {
    title: "2. Location data",
    body: "Customers: your browser only shares your location with us when you click \"Use my location\" on the services map, to find providers nearby; it is used for that search and is not stored against your account. Providers: your live location is only sent to us while you have location sharing switched on in your dashboard, so nearby customers can see you're available; turning sharing off (or five minutes of inactivity) removes it from the map.",
  },
  {
    title: "3. How we use your information",
    body: "To create and secure your account, match service requests with available providers, process payments, show you the status of a request, respond to support requests, meet legal and accounting obligations, and — only with your cookie consent — understand aggregate site usage so we can improve it.",
  },
  {
    title: "4. Third-party services (sub-processors)",
    body: (
      <>
        <p>We use a small number of specialist providers to run FixItFast, and share only what each one needs to do its job:</p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li><strong>Supabase</strong> — authentication and our database. Stores your account credentials (hashed) and profile.</li>
          <li><strong>Stripe</strong> — payment processing. Receives your payment details directly; see <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-700 underline hover:text-brand-800">Stripe’s Privacy Policy</a>.</li>
          <li><strong>Google Analytics</strong> — site-usage analytics, loaded only after you accept analytics cookies in the cookie banner. See our <Link href="/cookies" className="text-brand-700 underline hover:text-brand-800">Cookie Policy</Link>.</li>
          <li><strong>OpenStreetMap</strong> — map tiles for the provider map. Loading a tile sends your device’s IP address to OpenStreetMap’s tile servers, the same way it would for any map; see <a href="https://osmfoundation.org/wiki/Privacy_Policy" target="_blank" rel="noopener noreferrer" className="text-brand-700 underline hover:text-brand-800">their privacy policy</a>.</li>
          <li><strong>Hosting infrastructure</strong> (Vercel or equivalent) — runs the application and necessarily processes request metadata to serve pages.</li>
        </ul>
        <p className="mt-2">Fonts and icons used on this site are bundled with the app at build time and served from our own domain — no font or icon request is ever sent to a third party while you browse.</p>
      </>
    ),
  },
  {
    title: "5. Cookies",
    body: (
      <>
        We use a small essential cookie to keep you signed in and to remember your cookie choice, and, only if you
        accept, an analytics cookie from Google Analytics. Full details, including how to change your choice at any
        time, are in our <Link href="/cookies" className="text-brand-700 underline hover:text-brand-800">Cookie Policy</Link>.
      </>
    ),
  },
  {
    title: "6. Data retention",
    body: "We keep account and service-request records for as long as your account is active and, after that, only as long as needed for legal, tax, accounting, or dispute-resolution purposes. When you request deletion, we remove or de-identify personal identifiers immediately and keep only the minimum transaction record the law or our accountants require, for the period required.",
  },
  {
    title: "7. Your rights",
    body: (
      <>
        Depending on where you live, you may have the right to access, correct, export, or delete your personal
        information, or to object to or restrict certain processing. You can do this yourself, or ask us, at{" "}
        <Link href="/data-request" className="text-brand-700 underline hover:text-brand-800">Access or delete your data</Link>.
        We will not discriminate against you for exercising these rights.
      </>
    ),
  },
  {
    title: "8. Children's privacy",
    body: "FixItFast is not directed to children and our sign-up form requires confirming you are 13 or older. We do not knowingly collect personal information from children under 13 (or the minimum age required in your region). If you believe we have, contact us and we will delete it promptly.",
  },
  {
    title: "9. Security",
    body: "Passwords are hashed, not stored in plain text; traffic is encrypted in transit (HTTPS); and we apply standard security headers (see our published security headers) to reduce common web risks. No method of transmission or storage is 100% secure, and we cannot guarantee absolute security.",
  },
  {
    title: "10. Changes to this policy",
    body: "We may update this policy as the service changes. We will post the revised policy here and update the effective date; material changes will be highlighted on the site.",
  },
  {
    title: "11. Contact us",
    body: (
      <>
        Questions about this policy or your data can be sent to{" "}
        <a href={`mailto:${BUSINESS.privacyEmail}`} className="text-brand-700 underline hover:text-brand-800">
          {BUSINESS.privacyEmail}
        </a>{" "}
        or {BUSINESS.supportPhone}. Operated by {BUSINESS.legalName}, {BUSINESS.address}.
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      effectiveDate="September 24, 2026"
      intro="This Privacy Policy explains what personal information FixItFast collects, why, who we share it with, and the choices and rights you have over it."
      sections={sections}
    />
  );
}
