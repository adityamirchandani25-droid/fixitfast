import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { CookiePreferencesButton } from "@/components/cookie-notice";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "What cookies FixItFast uses and how to control them.",
  alternates: { canonical: "/cookies" },
};

const rows = [
  {
    name: "fixitfast_cookie_consent",
    type: "Essential",
    purpose: "Remembers your cookie choice so we don't ask again.",
    duration: "1 year",
  },
  {
    name: "Supabase session cookies",
    type: "Essential",
    purpose: "Keeps you signed in securely between pages.",
    duration: "Session / until you sign out",
  },
  {
    name: "_ga, _ga_*",
    type: "Analytics — only set if you accept",
    purpose: "Google Analytics: counts visits and pages viewed, in aggregate, to help us improve the site.",
    duration: "Up to 2 years",
  },
];

const sections = [
  {
    title: "1. What cookies are",
    body: "Cookies are small text files a site stores in your browser. We use as few as possible, and only load the ones that aren't strictly necessary after you say it's OK.",
  },
  {
    title: "2. Cookies we use",
    body: (
      <div className="overflow-x-auto">
        <table className="mt-1 w-full min-w-[520px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-ink-500">
              <th scope="col" className="py-2 pr-4 font-medium">Cookie</th>
              <th scope="col" className="py-2 pr-4 font-medium">Type</th>
              <th scope="col" className="py-2 pr-4 font-medium">Purpose</th>
              <th scope="col" className="py-2 font-medium">Duration</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-b border-border/60 align-top">
                <td className="py-2.5 pr-4 font-mono text-xs">{row.name}</td>
                <td className="py-2.5 pr-4">{row.type}</td>
                <td className="py-2.5 pr-4">{row.purpose}</td>
                <td className="py-2.5">{row.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    title: "3. Cookies we don't use",
    body: "We don't use advertising or cross-site tracking cookies, and we don't sell data collected through cookies to anyone.",
  },
  {
    title: "4. Non-cookie network requests",
    body: "The provider map loads tiles from OpenStreetMap, which — like any map — receives your device's IP address when a tile loads; this isn't a cookie, and it happens whenever the map is on screen, not something the cookie banner controls. See our Privacy Policy for details on that and our other sub-processors.",
  },
  {
    title: "5. Managing your choice",
    body: (
      <>
        <p>You can accept or decline analytics cookies the first time you visit, and change your mind at any time:</p>
        <CookiePreferencesButton />
        <p className="mt-3">
          You can also block or delete cookies in your browser’s settings; blocking essential cookies may stop
          sign-in from working.
        </p>
      </>
    ),
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      effectiveDate="September 24, 2026"
      intro="This page explains exactly which cookies FixItFast sets, why, and how you can change your choice."
      sections={sections}
    />
  );
}
