"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Loader2 } from "lucide-react";
import { deleteMyAccount } from "@/lib/actions/account";
import { Button } from "@/components/ui/button";

export function DeleteAccountForm({ signedIn }: { signedIn: boolean }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  if (!signedIn) {
    return (
      <p className="text-sm text-ink-600">
        Sign in first, then come back to this page to delete your account — or email us using the address below and
        we’ll process the request by hand.
      </p>
    );
  }

  if (done) {
    return (
      <p role="status" className="text-sm text-emerald-700">
        Your account has been deleted and you’ve been signed out. It may take a few minutes for cached pages to
        catch up.
      </p>
    );
  }

  async function handleDelete() {
    setSubmitting(true);
    setError(null);
    try {
      const result = await deleteMyAccount();
      if (!result.ok) {
        setError(result.error ?? "Something went wrong. Try again or email support.");
        setSubmitting(false);
        return;
      }
      setDone(true);
      router.refresh();
    } catch {
      setError("Something went wrong. Try again or email support.");
      setSubmitting(false);
    }
  }

  if (!confirming) {
    return (
      <Button type="button" onClick={() => setConfirming(true)} className="bg-red-600 hover:bg-red-700">
        Delete my account and personal data
      </Button>
    );
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-red-200 bg-red-50 p-4">
      <p className="flex items-start gap-2 text-sm text-red-800">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
        This signs you out everywhere and removes your name, email, phone, and photo. It can’t be undone. Job and
        payment history is kept in de-identified form, as required for accounting — see the Privacy Policy.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button type="button" onClick={handleDelete} disabled={submitting} className="bg-red-600 hover:bg-red-700">
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitting ? "Deleting…" : "Yes, permanently delete"}
        </Button>
        <Button type="button" variant="secondary" onClick={() => setConfirming(false)}>
          Cancel
        </Button>
      </div>
      {error && <p role="alert" className="mt-2 text-[13px] text-red-700">{error}</p>}
    </div>
  );
}
