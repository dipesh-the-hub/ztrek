import { Quotes } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Avatar from "@/components/ui/Avatar";
import StarRating from "@/components/ui/StarRating";
import SkylineDivider from "@/components/ui/SkylineDivider";
import { getAllTestimonials } from "@/lib/data/testimonials";

export default async function Testimonials() {
  const testimonials = await getAllTestimonials();
  return (
    <section className="relative section-y bg-navy-950 overflow-hidden">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Guest Reviews"
          title="What trekkers say after coming down"
        />

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col"
            >
              <Quotes size={28} weight="fill" className="text-gold-500/70" aria-hidden="true" />
              <blockquote className="mt-4 text-sm text-white/85 leading-relaxed flex-1">
                {t.quote}
              </blockquote>
              <StarRating rating={t.rating} />
              <figcaption className="mt-3 flex items-center gap-3">
                <Avatar initials={t.name.slice(0, 2).toUpperCase()} className="h-10 w-10 text-sm" />
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/60">
                    {t.location} · {t.trek}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>

      <SkylineDivider
        className="absolute bottom-0 left-0 h-16 sm:h-24 lg:h-28"
        colorClassName="text-gold-500/15"
      />
    </section>
  );
}
