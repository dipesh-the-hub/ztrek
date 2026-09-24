import Image from "next/image";
import { CheckCircle, Star } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import type { SiteSettingsData } from "@/lib/data/siteSettings";

export default function Hero({ settings }: { settings: SiteSettingsData }) {
  return (
    <section className="relative overflow-hidden bg-navy-950 -mt-20">
      <div className="absolute inset-0">
        <Image
          src={settings.heroImage}
          alt="Trekker ascending a snow ridge toward Mount Everest at sunrise"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/40 to-transparent" />
      </div>

      <Container className="relative pt-40 pb-28 sm:pt-48 sm:pb-32 lg:pt-56 lg:pb-40">
        <p className="text-sm font-semibold tracking-[0.25em] uppercase text-gold-400">
          {settings.heroEyebrow}
        </p>
        <h1 className="mt-5 max-w-2xl font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.08] text-balance">
          {settings.heroHeadline}
        </h1>
        <p className="mt-6 max-w-xl text-base sm:text-lg text-white/85 leading-relaxed">
          {settings.heroSubheadline}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <LinkButton href={settings.heroPrimaryCtaHref} size="lg">
            {settings.heroPrimaryCtaLabel}
          </LinkButton>
          <LinkButton
            href={settings.heroSecondaryCtaHref}
            variant="secondary"
            size="lg"
            className="bg-white/10 hover:bg-white/20 backdrop-blur"
          >
            {settings.heroSecondaryCtaLabel}
          </LinkButton>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          <div className="flex items-center gap-2 text-white">
            <Star size={20} weight="fill" className="text-gold-400" aria-hidden="true" />
            <span className="font-semibold">{settings.heroRatingValue}</span>
            <span className="text-sm text-white/70">{settings.heroRatingLabel}</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <CheckCircle size={20} weight="fill" className="text-gold-400" aria-hidden="true" />
            <span className="text-sm text-white/85">{settings.heroBadge1}</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <CheckCircle size={20} weight="fill" className="text-gold-400" aria-hidden="true" />
            <span className="text-sm text-white/85">{settings.heroBadge2}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
