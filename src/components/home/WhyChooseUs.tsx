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
    <section className="section-y bg-white">
      <Container>
        <SectionHeading
          eyebrow="Why Trek With Us"
          title="Built by people who actually walk these trails"
          description="TrekVibe Nepal is run out of Kathmandu by a team that treats every itinerary as if we were sending our own family up the trail."
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-stone-300/60 bg-cream p-6"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-navy-950 text-gold-400">
                <Icon size={24} aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-navy-950">
                {title}
              </h3>
              <p className="mt-2 text-sm text-stone-700 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
