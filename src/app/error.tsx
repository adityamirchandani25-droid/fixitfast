"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled application error", error);
  }, [error]);

  return (
    <main className="grid min-h-[70vh] place-items-center px-6 py-16">
      <div className="max-w-xl text-center">
        <p className="site-overline">Something went wrong</p>
        <h1 className="site-display">That didn’t load correctly.</h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-ink-600">Your information is still safe. Try the page again, or return home and start fresh.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button onClick={retry}>Try again</Button>
          <Link href="/"><Button variant="secondary">Go home</Button></Link>
        </div>
        {error.digest && <p className="mt-5 text-xs text-ink-400">Reference: {error.digest}</p>}
      </div>
    </main>
  );
}
