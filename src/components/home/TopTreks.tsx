import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import TrekCard from "@/components/treks/TrekCard";
import { getAllTreks } from "@/lib/data/treks";
import type { Trek } from "@/lib/treks";

const featured = [
  "everest-base-camp-trek",
  "annapurna-base-camp-trek",
  "manaslu-circuit-trek",
  "langtang-valley-trek",
  "annapurna-circuit-trek",
  "ghorepani-poon-hill-trek",
  "upper-mustang-trek",
  "mardi-himal-trek",
];

export default async function TopTreks() {
  const treks = await getAllTreks();
  const featuredTreks = featured
    .map((slug) => treks.find((t) => t.slug === slug))
    .filter((t): t is Trek => Boolean(t));

  return (
    <section className="section-y bg-cream" id="top-treks">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Top Trekking Routes"
            title="12 hand-picked treks across Nepal"
            description="From five-day sunrise walks to three-week wilderness crossings — every itinerary is built around proper acclimatization, not just the shortest possible schedule."
          />
          <LinkButton href="/treks" variant="ghost" className="hidden sm:inline-flex">
            View All Treks
          </LinkButton>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTreks.map((trek, i) => (
            <TrekCard key={trek.slug} trek={trek} priority={i < 4} />
          ))}
        </div>

        <div className="mt-10 flex sm:hidden justify-center">
          <LinkButton href="/treks" variant="ghost">
            View All Treks
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
