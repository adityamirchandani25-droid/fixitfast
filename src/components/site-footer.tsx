import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

/** The homepage footer, shared by the other public pages. */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div><Link href="/" aria-label="FixItFast home"><BrandLogo /></Link><p>Local home help, without the runaround.</p></div>
      <nav aria-label="Footer navigation">
        <Link href="/services">Services</Link><Link href="/worker/signup">Join as a pro</Link><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><Link href="/cookies">Cookies</Link><Link href="/refunds">Refunds</Link>
      </nav>
      <span>© {new Date().getFullYear()} FixItFast</span>
    </footer>
  );
}
