import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { DeleteAccountForm } from "@/components/account/delete-account-form";
import { BUSINESS } from "@/lib/business-info";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Access or delete your data",
  description: "Request a copy of your data or delete your FixItFast account.",
  alternates: { canonical: "/data-request" },
  robots: { index: false },
};

const sections = [
  {
    title: "Get a copy of your data",
    body: (
      <>
        Email{" "}
        <a href={`mailto:${BUSINESS.privacyEmail}?subject=Data export request`} className="text-brand-700 underline hover:text-brand-800">
          {BUSINESS.privacyEmail}
        </a>{" "}
        from the address on your account and we’ll send you an export of your account, service request, and payment
        history within 30 days.
      </>
    ),
  },
  {
    title: "Correct inaccurate information",
    body: "Most account details (name, phone, provider categories) can be edited directly from your dashboard. For anything you can't change yourself, email us and we'll update it.",
  },
];

export default async function DataRequestPage() {
  const session = await auth();
  return (
    <LegalPage
      title="Access or delete your data"
      effectiveDate="September 24, 2026"
      intro="Use this page to request a copy of your data, correct it, or delete your account. See the Privacy Policy for what's kept and why."
      sections={sections}
    >
      <section className="mt-9">
        <h2 className="font-display text-xl font-semibold">Delete your account</h2>
        <p className="mt-3 text-sm leading-7 text-ink-600">
          This removes your name, email, phone number, and photo, and disables sign-in immediately. Job and payment
          records tied to your account are kept in de-identified form only as long as required for accounting and
          dispute records, then removed.
        </p>
        <div className="mt-4">
          <DeleteAccountForm signedIn={!!session} />
        </div>
      </section>
    </LegalPage>
  );
}
