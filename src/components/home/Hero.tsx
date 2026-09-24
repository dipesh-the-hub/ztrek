import Image from "next/image";
import { ArrowRight, CheckCircle, Star } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import type { SiteSettingsData } from "@/lib/data/siteSettings";

export interface HeroPhoto {
  src: string;
  alt: string;
  caption: string;
}

// Position, tilt and mouse-parallax depth for each photo in the fanned stack (back to front).
const stackLayout = [
  { className: "left-0 top-[10%] w-[58%] h-[72%]", rotate: "-7deg", depth: 18 },
  { className: "right-0 top-[2%] w-[58%] h-[72%]", rotate: "6deg", depth: 30 },
  { className: "left-[18%] bottom-0 w-[64%] h-[60%] z-10", rotate: "-1deg", depth: 45 },
];

const ridge =
  "M0 92 L90 70 L150 84 L230 40 L290 66 L360 52 L430 78 L520 22 L580 58 L650 44 L720 70 L800 30 L870 62 L940 50 L1010 76 L1090 18 L1150 56 L1220 42 L1300 72 L1370 54 L1440 66";

export default function Hero({
  settings,
  photos,
}: {
  settings: SiteSettingsData;
  photos: HeroPhoto[];
}) {
  const words = settings.heroHeadline.split(/\s+/).filter(Boolean);

  return (
    <section
      className="tv-hero relative overflow-hidden -mt-20 text-white isolate bg-navy-950 bg-[radial-gradient(1200px_600px_at_80%_20%,#173a63_0%,var(--color-navy-950)_60%)]"
      data-parallax-root
    >
      <Container className="relative grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-8 items-center pt-32 pb-28 sm:pt-40 sm:pb-32">
        <div>
          <p className="tv-fade-up text-sm font-semibold tracking-[0.25em] uppercase text-gold-400" style={{ "--i": 0 } as React.CSSProperties}>
            {settings.heroEyebrow}
          </p>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-[4.4rem] font-semibold leading-[1.05] tracking-[-0.01em] text-balance">
            {words.map((word, i) => (
              <span key={i}>
                <span
                  className={/himalaya/i.test(word) ? "tv-shine" : "tv-word"}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  {word}
                </span>{" "}
              </span>
            ))}
          </h1>
          <p className="tv-fade-up mt-6 max-w-xl text-base sm:text-lg text-white/80 leading-relaxed" style={{ "--i": 2 } as React.CSSProperties}>
            {settings.heroSubheadline}
          </p>

          <div className="tv-fade-up mt-9 flex flex-wrap items-center gap-4" style={{ "--i": 3 } as React.CSSProperties}>
            <LinkButton href={settings.heroPrimaryCtaHref} size="lg" magnetic className="shadow-[0_8px_24px_-10px_rgb(201_153_47/0.8)]">
              {settings.heroPrimaryCtaLabel}
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </LinkButton>
            <LinkButton
              href={settings.heroSecondaryCtaHref}
              variant="secondary"
              size="lg"
              magnetic
              className="bg-white/10 hover:bg-white/20 ring-1 ring-inset ring-white/25 backdrop-blur"
            >
              {settings.heroSecondaryCtaLabel}
            </LinkButton>
          </div>

          <div className="tv-fade-up mt-10 flex flex-wrap items-center gap-x-8 gap-y-3" style={{ "--i": 4 } as React.CSSProperties}>
            <div className="flex items-center gap-2">
              <Star size={20} weight="fill" className="text-gold-400" aria-hidden="true" />
              <span className="font-semibold">{settings.heroRatingValue}</span>
              <span className="text-sm text-white/70">{settings.heroRatingLabel}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} weight="fill" className="text-gold-400" aria-hidden="true" />
              <span className="text-sm text-white/85">{settings.heroBadge1}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} weight="fill" className="text-gold-400" aria-hidden="true" />
              <span className="text-sm text-white/85">{settings.heroBadge2}</span>
            </div>
          </div>
        </div>

        <div className="relative w-full max-w-[400px] lg:max-w-[520px] aspect-square justify-self-center">
          {photos.slice(0, 3).map((photo, i) => {
            const layout = stackLayout[i];
            return (
              <figure
                key={photo.src + i}
                data-depth={layout.depth}
                className={`tv-photo absolute m-0 overflow-hidden rounded-[22px] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)] ring-1 ring-white/10 ${layout.className}`}
                style={{ "--r": layout.rotate, "--i": i } as React.CSSProperties}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  preload={i === 2}
                  sizes="(min-width: 1024px) 340px, 60vw"
                  className="object-cover"
                />
                <figcaption className="absolute left-3 bottom-3 rounded-full bg-navy-950/75 backdrop-blur px-2.5 py-1 text-xs font-semibold">
                  {photo.caption}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </Container>

      <svg
        className="absolute inset-x-0 -bottom-px w-full h-auto"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d={`M0 120 L${ridge.slice(1)} L1440 120 Z`} className="fill-navy-950" />
        <path d={ridge} className="tv-ridge-line fill-none stroke-gold-400/70" strokeWidth={1.5} />
      </svg>
    </section>
  );
}
