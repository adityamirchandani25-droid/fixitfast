import Link from "next/link";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

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
    <div className="site-page">
      <SiteHeader />
      <main id="main" className="site-legal">
        <div className="site-legal-head">
          <span className="site-overline">{eyebrow}</span>
          <h1 className="site-display">{title}</h1>
          <p className="site-legal-date">Effective {effectiveDate}</p>
          {intro && <p className="site-lede">{intro}</p>}
        </div>
        {sections && (
          <div className="site-legal-sections">
            {sections.map((section) => (
              <LegalSectionBlock key={section.title} title={section.title}>{section.body}</LegalSectionBlock>
            ))}
          </div>
        )}
        {children}
        <LegalCrossLinks />
      </main>
      <SiteFooter />
    </div>
  );
}

/** One row of a legal page: title on the left, body on the right (stacked on small screens). */
export function LegalSectionBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="site-legal-section">
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
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
    <nav aria-label="Other legal pages" className="site-legal-related">
      <span className="site-overline">Related</span>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
