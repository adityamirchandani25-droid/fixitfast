import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <div className="site-page">
      <SiteHeader />
      <main className="grid flex-1 place-items-center px-6 py-20">
        <div className="max-w-xl text-center">
          <p className="site-overline">404</p>
          <h1 className="site-display">This page needs a different address.</h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-ink-600">The link may be outdated, or the page may have moved.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/services"><Button>Find a service</Button></Link>
            <Link href="/"><Button variant="secondary">Go home</Button></Link>
          </div>
        </div>
      </main>
    </div>
  );
}
