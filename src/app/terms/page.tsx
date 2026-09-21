import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of the FixItFast platform.",
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    title: "1. Agreement and eligibility",
    body: "By creating an account or using FixItFast, you agree to these terms. You must be at least 13 years old. If you use FixItFast for a business, you confirm that you have authority to bind that business to these terms.",
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
    body: "Providers are responsible for their qualifications, licensing, insurance, availability, pricing, and work. A requested time is not confirmed until the provider accepts it. Customers are responsible for providing accurate job and location details and for providing safe, lawful access to the service location.",
  },
  {
    title: "5. Estimates and payments",
    body: "Displayed estimates are starting estimates and may change based on the work, parts, taxes, or conditions found on site. Review the final price with the provider. Payments may be processed by third-party payment providers and may also be subject to their terms.",
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
    body: "To the extent permitted by law, FixItFast will not be liable for indirect, incidental, special, consequential, or punitive damages, or for losses arising from a provider’s acts, omissions, or services. Rights that cannot legally be limited remain unaffected.",
  },
  {
    title: "9. Suspension and termination",
    body: "You may stop using FixItFast at any time. We may restrict or terminate access when reasonably necessary to protect users, enforce these terms, comply with law, or maintain platform security.",
  },
  {
    title: "10. Changes and contact",
    body: "We may update these terms as the service changes. We will post the revised terms and update the effective date. Continued use after an update means you accept the revised terms. Questions may be sent to adityamirchandani@fixit-fast.com.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-ink-50 text-ink-900">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <Link href="/" aria-label="FixItFast home"><BrandLogo /></Link>
          <Link href="/" className="flex items-center gap-2 text-sm text-ink-600 hover:text-ink-900">
            <ArrowLeft size={16} /> Back home
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
        <span className="text-xs font-semibold uppercase tracking-[.16em] text-brand-700">Legal</span>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">Terms of Service</h1>
        <p className="mt-3 text-sm text-ink-500">Effective September 21, 2026</p>
        <p className="mt-8 text-base leading-7 text-ink-700">
          These Terms of Service govern your access to and use of FixItFast. Please read them before creating an account or submitting a service request.
        </p>
        <div className="mt-10 space-y-9">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-xl font-semibold">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-ink-600">{section.body}</p>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
