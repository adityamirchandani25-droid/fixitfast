import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeDollarSign,
  CalendarClock,
  Check,
  Droplets,
  KeyRound,
  MapPin,
  Phone,
  ShieldCheck,
  Wind,
  Zap,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { BrandLogo } from "@/components/brand-logo";
import { CategoryIcon } from "@/components/category-icon";
import { CATEGORY_LABELS, CATEGORY_ORDER } from "@/lib/categories";
import { Reveal } from "@/components/marketing/reveal";
import { HeroServiceFinder } from "@/components/marketing/hero-service-finder";
import { HeroLocationMap } from "@/components/marketing/hero-location-map";
import "leaflet/dist/leaflet.css";
import "./marketplace.css";
import "./landing-polish.css";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const commonScenarios = [
  { icon: Droplets, eyebrow: "Plumbing", title: "Leaks & clogs", text: "Fixtures, pipes, drains, and water heaters.", href: "/services?category=PLUMBING" },
  { icon: Zap, eyebrow: "Electrical", title: "Electrical issues", text: "Outlets, breakers, lighting, and wiring.", href: "/services?category=ELECTRICAL" },
  { icon: Wind, eyebrow: "Heating & cooling", title: "Heating & cooling", text: "Comfort and air flow when you need it.", href: "/services?category=HVAC" },
  { icon: KeyRound, eyebrow: "Locksmith", title: "Locks & keys", text: "Lockouts, rekeying, and broken locks.", href: "/services?category=LOCKSMITH" },
];

const contacts = [
  { name: "Aditya Mirchandani", role: "CEO / CTO", phone: "4048551929", display: "(404) 855-1929", email: "adityamirchandani@fixit-fast.com" },
  { name: "Prahul Kota", role: "COO", phone: "6789650263", display: "(678) 965-0263", email: "prahulkota@fixit-fast.com" },
];

export default function Home() {
  return (
    <div className="landing-home">
      <SiteHeader current="home" />
      <a href="#main" className="skip-link">Skip to content</a>

      <main id="main">
        <section className="landing-hero">
          <div className="landing-hero-copy">
            <p className="landing-kicker"><span aria-hidden="true" /> Home services, made simple</p>
            <h1>Find the right pro<br />for the job.</h1>
            <p className="landing-hero-lede">Browse local home-service pros, check availability and starting prices, and send a request with the details in one place.</p>
            <HeroServiceFinder />
          </div>

          <HeroLocationMap />
        </section>

        <nav className="landing-service-strip" aria-label="Browse service categories">
          <span>Browse by service</span>
          <div>
            {CATEGORY_ORDER.map((category) => (
              <Link key={category} href={`/services?category=${category}`}>
                <CategoryIcon category={category} className="h-5 w-5" />
                {CATEGORY_LABELS[category]}
              </Link>
            ))}
          </div>
        </nav>

        <section className="landing-proof" aria-label="Why use FixItFast">
          <p><Check size={16} /> Browse before signup</p>
          <p><Check size={16} /> Starting prices shown</p>
          <p><Check size={16} /> Nearby status in real time</p>
        </section>

        <Reveal>
          <section id="how-it-works" className="landing-process">
            <div className="landing-section-heading">
              <span>How it works</span>
              <h2>From search to service in three steps.</h2>
              <p>Find a pro, share the job details, and keep track of what happens next.</p>
            </div>
            <ol className="landing-process-list">
              <li><span>01</span><div><h3>Tell us what needs fixing.</h3><p>Choose a service and add the useful details. You can browse before creating an account.</p></div></li>
              <li><span>02</span><div><h3>See who is actually around.</h3><p>Use your location to find approved providers sharing current availability nearby.</p></div></li>
              <li><span>03</span><div><h3>Review, send, and stay updated.</h3><p>Check the starting estimate and requested time, then follow the job in one thread.</p></div></li>
            </ol>
          </section>
        </Reveal>

        <Reveal>
          <section className="landing-standard">
            <div className="landing-standard-image">
              <Image src="/images/tipstaff-worker.jpg" alt="A professional electrician working carefully on a wall installation" fill sizes="(max-width: 820px) 100vw, 50vw" />
              <span>Local work, handled by local people.</span>
            </div>
            <div className="landing-standard-copy">
              <span className="landing-overline">Built for the whole job</span>
              <h2>Know what to expect before you book.</h2>
              <p>See the practical details up front, so you can choose a provider with more confidence.</p>
              <ul>
                <li><MapPin size={20} /><div><strong>Availability you can use</strong><span>See providers who are online and sharing a recent location nearby.</span></div></li>
                <li><BadgeDollarSign size={20} /><div><strong>A price starting point</strong><span>Compare the displayed callout and first-hour estimate before sending.</span></div></li>
                <li><ShieldCheck size={20} /><div><strong>A clear request record</strong><span>Keep the service, timing, payment, and latest status together.</span></div></li>
              </ul>
              <Link href="/services">Find a service <ArrowRight size={17} /></Link>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="landing-scenarios">
            <div className="landing-section-heading landing-scenarios-heading">
              <span>Start with the problem</span>
              <h2>What can we help you fix?</h2>
            </div>
            <div className="landing-scenario-grid">
              {commonScenarios.map(({ icon: Icon, eyebrow, title, text, href }, index) => (
                <Link key={eyebrow} href={href} className="landing-scenario-card">
                  <div><span>0{index + 1}</span><ArrowUpRight size={18} /></div>
                  <Icon size={26} />
                  <small>{eyebrow}</small>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </Link>
              ))}
            </div>
            <Link href="/services" className="landing-text-link">See all nine services <ArrowRight size={16} /></Link>
          </section>
        </Reveal>

        <Reveal>
          <section className="landing-expectations">
            <div className="landing-section-heading">
              <span>Good to know</span>
              <h2>No surprises about the next step.</h2>
            </div>
            <div className="landing-expectation-list">
              <article><CalendarClock size={21} /><h3>A requested time is not a confirmed appointment.</h3><p>Your provider still needs to accept and confirm the timing.</p></article>
              <article><BadgeDollarSign size={21} /><h3>The estimate is a starting point.</h3><p>Parts and work completed on site can change the final total.</p></article>
              <article><ShieldCheck size={21} /><h3>You review before anything is sent.</h3><p>Check the job, address, timing, and range in one place first.</p></article>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="contact" className="landing-contact">
            <div className="landing-contact-intro">
              <span>Talk to us</span>
              <h2>Questions? Talk to our team.</h2>
              <p>Questions about FixItFast, joining the network, or getting started? Call us directly.</p>
            </div>
            <div className="landing-contact-list">
              {contacts.map((contact) => (
                <article key={contact.phone} className="landing-contact-card">
                  <div><strong>{contact.name}</strong><span>{contact.role}</span></div>
                  <div><a href={`tel:+1${contact.phone}`}>{contact.display}</a>{contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}</div>
                  <a href={`tel:+1${contact.phone}`} aria-label={`Call ${contact.name}`}><Phone size={17} /></a>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <section className="landing-last">
          <div><span>Ready when you are</span><h2>What needs fixing?</h2></div>
          <Link href="/services">Browse home services <ArrowRight size={19} /></Link>
        </section>
      </main>

      <footer className="landing-footer">
        <div><Link href="/" aria-label="FixItFast home"><BrandLogo /></Link><p>Local home help, without the runaround.</p></div>
        <nav aria-label="Footer navigation">
          <Link href="/services">Services</Link><Link href="/worker/signup">Join as a pro</Link><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><Link href="/cookies">Cookies</Link><Link href="/refunds">Refunds</Link>
        </nav>
        <span>© {new Date().getFullYear()} FixItFast</span>
      </footer>
    </div>
  );
}
