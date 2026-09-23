"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { List, X, Phone, CaretDown } from "@phosphor-icons/react";
import Container from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import NavDropdown from "@/components/layout/NavDropdown";
import TreksMegaMenu from "@/components/layout/TreksMegaMenu";
import type { Region, Trek } from "@/lib/treks";

export type RegionGroup = Region & { treks: Trek[] };

const aboutItems = [
  { label: "Our Story", href: "/about", description: "Who we are and how TrekVibe Nepal started" },
  { label: "Meet Our Guides", href: "/about#our-guides", description: "Licensed local guides across every region" },
  { label: "Plan Your Trek", href: "/plan-your-trek", description: "Build a tailor-made itinerary" },
];

const travelInfoItems = [
  { label: "Best Time to Trek in Nepal", href: "/blog/best-time-to-trek-in-nepal" },
  { label: "Trekking Permits Explained", href: "/blog/nepal-trekking-permits-explained" },
  { label: "Altitude Sickness Guide", href: "/blog/altitude-sickness-guide-nepal-trekking" },
  { label: "Choosing a Trekking Agency", href: "/blog/choosing-a-trekking-agency-in-kathmandu" },
  { label: "All Trip-Planning Guides", href: "/blog" },
];

export default function Navbar({ regionGroups }: { regionGroups: RegionGroup[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
    setMobileGroup(null);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const hasHeroImage = pathname === "/";

  useEffect(() => {
    if (!hasHeroImage) return;
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasHeroImage]);

  const transparent = hasHeroImage && !scrolled && !open;

  const treksActive = pathname.startsWith("/treks");
  const aboutActive = pathname.startsWith("/about");
  const blogActive = pathname.startsWith("/blog");
  const contactActive = pathname.startsWith("/contact");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        transparent
          ? "bg-transparent border-transparent"
          : "bg-cream/95 backdrop-blur border-b border-stone-300/60"
      }`}
    >
      {transparent && (
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-950/70 via-navy-950/25 to-transparent" aria-hidden="true" />
      )}
      <Container className="flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/images/brand/logo.webp"
            alt="TrekVibe Nepal"
            width={48}
            height={48}
            className={`h-12 w-12 rounded-full transition-shadow ${transparent ? "ring-2 ring-white/40" : ""}`}
            priority
          />
          <span
            className={`font-display text-lg sm:text-xl font-semibold leading-tight transition-colors ${
              transparent ? "text-white" : "text-navy-950"
            }`}
          >
            TrekVibe <span className={transparent ? "text-gold-400" : "text-gold-600"}>Nepal</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          <Link
            href="/"
            className={`text-sm font-semibold transition-colors ${
              pathname === "/"
                ? transparent
                  ? "text-gold-400"
                  : "text-gold-600"
                : transparent
                  ? "text-white hover:text-gold-300"
                  : "text-navy-900 hover:text-gold-600"
            }`}
          >
            Home
          </Link>
          <NavDropdown label="About Us" items={aboutItems} light={transparent} />
          <TreksMegaMenu regionGroups={regionGroups} light={transparent} />
          <NavDropdown label="Traveller's Info" items={travelInfoItems} light={transparent} />
          <Link
            href="/blog"
            className={`text-sm font-semibold transition-colors ${
              blogActive
                ? transparent
                  ? "text-gold-400"
                  : "text-gold-600"
                : transparent
                  ? "text-white hover:text-gold-300"
                  : "text-navy-900 hover:text-gold-600"
            }`}
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className={`text-sm font-semibold transition-colors ${
              contactActive
                ? transparent
                  ? "text-gold-400"
                  : "text-gold-600"
                : transparent
                  ? "text-white hover:text-gold-300"
                  : "text-navy-900 hover:text-gold-600"
            }`}
          >
            Contact
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+9779741765998"
            className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
              transparent ? "text-white hover:text-gold-300" : "text-navy-900 hover:text-gold-600"
            }`}
          >
            <Phone size={18} weight="fill" aria-hidden="true" />
            +977 974-1765998
          </a>
          <LinkButton href="/plan-your-trek" size="md">
            Plan Your Trek
          </LinkButton>
        </div>

        <button
          type="button"
          className={`lg:hidden flex items-center justify-center h-11 w-11 -mr-2 cursor-pointer transition-colors ${
            transparent ? "text-white" : "text-navy-900"
          }`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <List size={26} />}
        </button>
      </Container>

      {open && (
        <div className="lg:hidden border-t border-stone-300/60 bg-cream max-h-[calc(100vh-5rem)] overflow-y-auto">
          <Container className="py-4 flex flex-col gap-1">
            <Link
              href="/"
              className={`min-h-11 flex items-center text-base font-semibold rounded-lg px-3 ${
                pathname === "/" ? "text-gold-600 bg-navy-50" : "text-navy-900"
              }`}
            >
              Home
            </Link>

            <MobileGroup
              title="About Us"
              open={mobileGroup === "about"}
              active={aboutActive}
              onToggle={() => setMobileGroup((g) => (g === "about" ? null : "about"))}
            >
              {aboutItems.map((item) => (
                <Link key={item.href} href={item.href} className="block min-h-11 flex items-center text-sm text-navy-800 pl-4">
                  {item.label}
                </Link>
              ))}
            </MobileGroup>

            <MobileGroup
              title="Treks & Regions"
              open={mobileGroup === "treks"}
              active={treksActive}
              onToggle={() => setMobileGroup((g) => (g === "treks" ? null : "treks"))}
            >
              {regionGroups.map((group) => (
                <div key={group.slug} className="pl-4">
                  <Link href={`/treks?region=${group.slug}`} className="block min-h-11 flex items-center text-sm font-semibold text-navy-900">
                    {group.label}
                  </Link>
                  <div className="pl-3 flex flex-col">
                    {group.treks.map((trek) => (
                      <Link key={trek.slug} href={`/treks/${trek.slug}`} className="block min-h-9 flex items-center text-sm text-navy-700">
                        {trek.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link href="/treks" className="block min-h-11 flex items-center text-sm font-semibold text-gold-600 pl-4">
                View All Treks
              </Link>
            </MobileGroup>

            <MobileGroup
              title="Traveller's Info"
              open={mobileGroup === "info"}
              active={false}
              onToggle={() => setMobileGroup((g) => (g === "info" ? null : "info"))}
            >
              {travelInfoItems.map((item) => (
                <Link key={item.href} href={item.href} className="block min-h-11 flex items-center text-sm text-navy-800 pl-4">
                  {item.label}
                </Link>
              ))}
            </MobileGroup>

            <Link
              href="/blog"
              className={`min-h-11 flex items-center text-base font-semibold rounded-lg px-3 ${
                blogActive ? "text-gold-600 bg-navy-50" : "text-navy-900"
              }`}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className={`min-h-11 flex items-center text-base font-semibold rounded-lg px-3 ${
                contactActive ? "text-gold-600 bg-navy-50" : "text-navy-900"
              }`}
            >
              Contact
            </Link>
            <a
              href="tel:+9779741765998"
              className="min-h-11 flex items-center gap-2 text-base font-semibold text-navy-900 px-3"
            >
              <Phone size={18} weight="fill" aria-hidden="true" />
              +977 974-1765998
            </a>
          </Container>
        </div>
      )}
    </header>
  );
}

function MobileGroup({
  title,
  open,
  active,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  active: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={`w-full min-h-11 flex items-center justify-between text-base font-semibold rounded-lg px-3 cursor-pointer ${
          active ? "text-gold-600 bg-navy-50" : "text-navy-900"
        }`}
      >
        {title}
        <CaretDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open && <div className="flex flex-col gap-0.5 pb-2">{children}</div>}
    </div>
  );
}
