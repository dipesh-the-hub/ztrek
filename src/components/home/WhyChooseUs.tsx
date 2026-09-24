import {
  Mountains,
  ShieldCheck,
  UsersThree,
  Wallet,
  Leaf,
  HeadCircuit,
} from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const values = [
  {
    icon: UsersThree,
    title: "Local, Licensed Guides",
    description:
      "Every trek is led by a government-licensed guide born and raised in the region you're walking through — not a subcontracted crew.",
  },
  {
    icon: ShieldCheck,
    title: "Safety-First Itineraries",
    description:
      "Built-in acclimatization days, daily oxygen checks above 3,000 m, and mandatory insurance requirements on every high-altitude route.",
  },
  {
    icon: Mountains,
    title: "25+ Curated Routes",
    description:
      "From the short and family-friendly Poon Hill trail to the three-week Upper Dolpo wilderness crossing.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    description:
      "No hidden fees — every quote itemizes permits, guide, porter and accommodation before you commit.",
  },
  {
    icon: Leaf,
    title: "Responsible Trekking",
    description:
      "We hire directly from trekking communities and follow Leave No Trace practices across every national park and conservation area.",
  },
  {
    icon: HeadCircuit,
    title: "Real Human Support",
    description:
      "Message our Kathmandu office directly on WhatsApp before, during and after your trek — no call centers.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-y bg-cream">
      <Container>
        <div data-reveal>
          <SectionHeading
            eyebrow="Why Trek With Us"
            title="Built by people who actually walk these trails"
            description="TrekVibe Nepal is run out of Kathmandu by a team that treats every itinerary as if we were sending our own family up the trail."
          />
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map(({ icon: Icon, title, description }, i) => (
            <div key={title} data-reveal style={{ "--d": `${(i % 3) * 0.1}s` } as React.CSSProperties}>
              <div
                data-glow
                className="h-full tv-glow group relative overflow-hidden rounded-[20px] border border-stone-300/60 bg-white p-7 transition-[border-color,transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-gold-300 hover:shadow-[0_20px_40px_-28px_rgb(8_21_39/0.45)]"
              >
                <div className="relative flex items-center justify-center h-13 w-13 rounded-[14px] bg-navy-950 text-gold-400 transition-[background-color,color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:bg-gold-500 group-hover:text-navy-950 group-hover:-rotate-8 group-hover:scale-108">
                  <Icon size={26} aria-hidden="true" />
                </div>
                <h3 className="relative mt-5 font-display text-xl font-semibold text-navy-950">
                  {title}
                </h3>
                <p className="relative mt-2 text-[0.95rem] text-stone-700 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
