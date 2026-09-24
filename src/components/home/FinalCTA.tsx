import Image from "next/image";
import { Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { LinkButton } from "@/components/ui/Button";

export default function FinalCTA() {
  return (
    <section data-glow className="tv-grain relative w-full overflow-hidden isolate">
      <Image
        src="/images/treks/everest-sunset-cta.jpg"
        alt="Sunset light on Mount Everest above the clouds"
        fill
        sizes="100vw"
        className="object-cover -z-20"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/95 via-navy-950/70 to-navy-950/40" />
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(500px_circle_at_var(--mx,50%)_var(--my,50%),rgb(217_180_88/0.22),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="relative px-4 py-20 sm:py-28 lg:py-32 text-center" data-reveal>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white text-balance">
          Ready to feel the mountain vibe?
        </h2>
        <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-white/85 max-w-xl mx-auto">
          Talk to our Kathmandu team directly — no call centers, no scripts.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            data-magnetic
            href="tel:+9779741765998"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-5 sm:px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors min-h-11"
          >
            <Phone size={18} weight="fill" aria-hidden="true" />
            +977 974-1765998
          </a>
          <a
            data-magnetic
            href="https://wa.me/9779741765998"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 sm:px-6 py-3 text-sm font-semibold text-white hover:brightness-105 transition-[filter] min-h-11"
          >
            <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
            WhatsApp Us
          </a>
          <LinkButton href="/plan-your-trek" size="lg" magnetic>
            Plan Your Trek
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
