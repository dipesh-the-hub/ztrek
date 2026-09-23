import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import { getAllGuides } from "@/lib/data/guides";

export default async function Guides() {
  const guides = await getAllGuides();
  return (
    <section id="our-guides" className="section-y bg-white scroll-mt-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Meet the Team"
            title="Guided by people who call these mountains home"
            description="Our guiding team holds government trekking licenses and wilderness first-aid training, with decades of combined experience across every region we operate in."
          />
          <LinkButton href="/about" variant="ghost" className="hidden sm:inline-flex">
            About TrekVibe Nepal
          </LinkButton>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide, i) => (
            <div key={i} className="rounded-2xl border border-stone-300/60 p-6">
              <Avatar initials={guide.initials} className="h-16 w-16 text-xl" />
              <h3 className="mt-5 font-display text-lg font-semibold text-navy-950">
                {guide.name}
              </h3>
              <p className="text-sm font-semibold text-gold-600">{guide.role}</p>
              <p className="mt-3 text-sm text-stone-700 leading-relaxed">{guide.bio}</p>
              <p className="mt-3 text-xs text-stone-500">
                {guide.years} · {guide.languages}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
