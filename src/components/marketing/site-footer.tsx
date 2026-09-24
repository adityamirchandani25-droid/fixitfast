import { BrandLogo } from "@/components/brand-logo";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <span className="font-display text-base font-semibold tracking-tight text-ink-900">
            <BrandLogo />
          </span>
          <p className="mt-0.5 text-xs text-ink-500">
            Urgent home help, matched and tracked like a delivery order.
          </p>
        </div>
        <div className="flex items-center gap-5 text-sm text-ink-600">
          <Link href="/login" className="hover:text-ink-900">
            Log in
          </Link>
          <Link href="/signup" className="hover:text-ink-900">
            Sign up
          </Link>
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center gap-3 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p className="text-ink-400">&copy; {new Date().getFullYear()} FixItFast</p>
        <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <Link href="/terms" className="hover:underline hover:text-ink-700">Terms</Link>
          <Link href="/privacy" className="hover:underline hover:text-ink-700">Privacy</Link>
          <Link href="/cookies" className="hover:underline hover:text-ink-700">Cookies</Link>
          <Link href="/refunds" className="hover:underline hover:text-ink-700">Refunds</Link>
          <Link href="/data-request" className="hover:underline hover:text-ink-700">Your data</Link>
        </nav>
      </div>
    </footer>
  );
}
