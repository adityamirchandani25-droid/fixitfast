import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
export function SiteHeader({ current }: { current?: "home" | "services" }) {
  return <header className="market-header"><div><Link href="/" aria-label="FixItFast home"><BrandLogo /></Link><nav aria-label="Main navigation"><Link href="/#how-it-works" aria-current={current === "home" ? "page" : undefined}>How it works</Link><Link href="/services" aria-current={current === "services" ? "page" : undefined}>Find a service</Link></nav><div className="market-logins"><Link href="/worker/login">For professionals <ArrowUpRight size={13} /></Link><Link href="/login" className="market-customer-login">Sign in</Link></div></div></header>;
}
