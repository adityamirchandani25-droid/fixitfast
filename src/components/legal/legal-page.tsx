import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

export interface LegalSection {
  title: string;
  body: ReactNode;
}

/**
 * Shared chrome for the legal pages (Terms, Privacy, Cookies, Refunds,
 * Data requests) so they read as one consistent, easy-to-navigate set
 * instead of five one-off layouts.
 */
export function LegalPage({
  eyebrow = "Legal",
  title,
  effectiveDate,
  intro,
  sections,
  children,
}: {
  eyebrow?: string;
  title: string;
  effectiveDate: string;
  intro?: ReactNode;
  sections?: LegalSection[];
  children?: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-ink-50 text-ink-900">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <Link href="/" aria-label="FixItFast home">
            <BrandLogo />
          </Link>
          <Link href="/" className="flex items-center gap-2 text-sm text-ink-600 hover:text-ink-900 hover:underline">
            <ArrowLeft size={16} /> Back home
          </Link>
        </div>
      </header>
      <main id="main" className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
        <span className="text-xs font-semibold uppercase tracking-[.16em] text-brand-700">{eyebrow}</span>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-3 text-sm text-ink-500">Effective {effectiveDate}</p>
        {intro && <p className="mt-8 text-base leading-7 text-ink-700">{intro}</p>}
        {sections && (
          <div className="mt-10 space-y-9">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-xl font-semibold">{section.title}</h2>
                <div className="mt-3 text-sm leading-7 text-ink-600">{section.body}</div>
              </section>
            ))}
          </div>
        )}
        {children}
        <LegalCrossLinks />
      </main>
    </div>
  );
}

function LegalCrossLinks() {
  const links = [
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/cookies", label: "Cookie Policy" },
    { href: "/refunds", label: "Refund & Cancellation Policy" },
    { href: "/data-request", label: "Access or delete your data" },
  ];
  return (
    <nav aria-label="Other legal pages" className="mt-14 border-t border-border pt-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Related</p>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-brand-700 underline hover:text-brand-800">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
