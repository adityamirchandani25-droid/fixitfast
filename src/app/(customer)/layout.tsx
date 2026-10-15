import { BrandLogo } from "@/components/brand-logo";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { Plus } from "lucide-react";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { accountHome } from "@/lib/auth-routing";

export const metadata: Metadata = { robots: { index: false } };

export default async function CustomerLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "CUSTOMER") redirect(accountHome(session.user.role));

  return (
    <div className="flex min-h-screen flex-col">
      <header className="app-header">
        <div>
          <Link href="/" aria-label="FixItFast home">
            <BrandLogo />
          </Link>
          <nav aria-label="Account navigation">
            <Link href="/dashboard">My requests</Link>
            <Link href="/data-request">Privacy &amp; data</Link>
          </nav>
          <div className="app-header-account">
            <span>{session.user.name}</span>
            <SignOutButton />
            <Link href="/request/new" className="app-header-cta">
              New request <Plus size={15} strokeWidth={2.25} />
            </Link>
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col bg-surface">{children}</main>
    </div>
  );
}
