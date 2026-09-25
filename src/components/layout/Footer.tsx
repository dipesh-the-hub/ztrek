import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  EnvelopeSimple,
  MapPin,
  InstagramLogo,
  FacebookLogo,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/ui/Container";
import { getAllTreks } from "@/lib/data/treks";

export default async function Footer() {
  const treks = await getAllTreks();
  const topTreks = treks.slice(0, 6);

  return (
    <footer className="bg-navy-950 text-navy-100">
      <Container className="py-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/brand/logo.webp"
              alt="TrekVibe Nepal"
              width={44}
              height={44}
              className="h-11 w-11 rounded-full"
            />
            <span className="font-display text-lg font-semibold text-white">
              TrekVibe <span className="text-gold-400">Nepal</span>
            </span>
          </Link>
          <p className="mt-4 text-sm text-navy-100/80 leading-relaxed">
            A Kathmandu-based trekking agency guiding travelers through the
            Everest, Annapurna, Langtang, Manaslu, Mustang and Dolpo regions.
            Feel the mountain vibe.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://www.instagram.com/_adityaneupane"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TrekVibe Nepal on Instagram"
              className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-gold-500 hover:text-navy-950 transition-colors"
            >
              <InstagramLogo size={20} aria-hidden="true" />
            </a>
            <a
              href="https://www.facebook.com/aditya.neupane.77"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TrekVibe Nepal on Facebook"
              className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-gold-500 hover:text-navy-950 transition-colors"
            >
              <FacebookLogo size={20} aria-hidden="true" />
            </a>
            <a
              href="https://wa.me/9779741765998"
              aria-label="Message TrekVibe Nepal on WhatsApp"
              className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-gold-500 hover:text-navy-950 transition-colors"
            >
              <WhatsappLogo size={20} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase text-gold-400">
            Popular Treks
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            {topTreks.map((trek) => (
              <li key={trek.slug}>
                <Link
                  href={`/treks/${trek.slug}`}
                  className="text-navy-100/85 hover:text-gold-300 transition-colors"
                >
                  {trek.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase text-gold-400">
            Company
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link href="/about" className="text-navy-100/85 hover:text-gold-300 transition-colors">About Us</Link>
            </li>
            <li>
              <Link href="/treks" className="text-navy-100/85 hover:text-gold-300 transition-colors">All Treks</Link>
            </li>
            <li>
              <Link href="/blog" className="text-navy-100/85 hover:text-gold-300 transition-colors">Blog</Link>
            </li>
            <li>
              <Link href="/reviews" className="text-navy-100/85 hover:text-gold-300 transition-colors">Reviews</Link>
            </li>
            <li>
              <Link href="/plan-your-trek" className="text-navy-100/85 hover:text-gold-300 transition-colors">Plan Your Trek</Link>
            </li>
            <li>
              <Link href="/contact" className="text-navy-100/85 hover:text-gold-300 transition-colors">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase text-gold-400">
            Get in Touch
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin size={18} className="text-gold-400 mt-0.5 shrink-0" aria-hidden="true" />
              <span className="text-navy-100/85">Thamel, Kathmandu, Nepal</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone size={18} className="text-gold-400 mt-0.5 shrink-0" aria-hidden="true" />
              <a href="tel:+9779741765998" className="text-navy-100/85 hover:text-gold-300 transition-colors">
                +977 974-1765998
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <EnvelopeSimple size={18} className="text-gold-400 mt-0.5 shrink-0" aria-hidden="true" />
              <a href="mailto:adityaneupane53@gmail.com" className="text-navy-100/85 hover:text-gold-300 transition-colors break-all">
                adityaneupane53@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-10 flex flex-col items-center text-center">
          <h3 className="text-sm font-semibold tracking-wide uppercase text-gold-400">
            Associated With
          </h3>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-7 sm:gap-10">
            <Image
              src="/images/brand/logo-nepal-govt-t.png"
              alt="Government of Nepal"
              width={488}
              height={409}
              className="h-14 sm:h-16 w-auto drop-shadow-[0_0_3px_rgba(255,255,255,0.55)]"
            />
            <Image
              src="/images/brand/logo-ntb-t.png"
              alt="Nepal Tourism Board (NTB)"
              width={400}
              height={359}
              className="h-14 sm:h-16 w-auto drop-shadow-[0_0_3px_rgba(255,255,255,0.55)]"
            />
            <Image
              src="/images/brand/logo-taan-t.png"
              alt="Trekking Agencies' Association of Nepal (TAAN)"
              width={743}
              height={413}
              className="h-11 sm:h-12 w-auto drop-shadow-[0_0_3px_rgba(255,255,255,0.55)]"
            />
            <Image
              src="/images/brand/logo-nma-t.png"
              alt="Nepal Mountaineering Association (NMA)"
              width={554}
              height={554}
              className="h-14 sm:h-16 w-auto drop-shadow-[0_0_3px_rgba(255,255,255,0.55)]"
            />
          </div>
        </Container>
      </div>

      <div className="border-t border-white/10">
        <Container className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-navy-100/60">
          <p>&copy; {new Date().getFullYear()} TrekVibe Nepal. All rights reserved.</p>
          <p>Registered trekking agency, Kathmandu, Nepal.</p>
          <p>
            Powered by{" "}
            <span className="text-gold-400 font-medium">Dipesh Aryal</span>
          </p>
        </Container>
      </div>
    </footer>
  );
}
