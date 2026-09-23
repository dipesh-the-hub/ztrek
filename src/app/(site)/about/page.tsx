import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Mountains, UsersThree, Star } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import Guides from "@/components/home/Guides";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "About TrekVibe Nepal",
  description:
    "TrekVibe Nepal is a Kathmandu-based trekking agency run by local, licensed guides. Learn about our story, values and the team behind every itinerary.",
};

const stats = [
  { icon: Mountains, value: "12+", label: "Curated trekking routes" },
  { icon: MapPin, value: "7", label: "Trekking regions covered" },
  { icon: UsersThree, value: "100%", label: "Locally licensed guides" },
  { icon: Star, value: "4.9/5", label: "Average guest rating" },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative bg-navy-950">
        <div className="absolute inset-0">
          <Image
            src="/images/treks/langtang.jpg"
            alt="Langtang valley mountain landscape"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/30" />
        </div>
        <Container className="relative py-24 sm:py-32 text-center">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-gold-400">About Us</p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-semibold text-white max-w-2xl mx-auto text-balance">
            A Kathmandu agency built by trekkers, for trekkers
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-white/85 leading-relaxed">
            TrekVibe Nepal — feel the mountain vibe, guided by the people who
            call these trails home.
          </p>
        </Container>
      </section>

      <section className="section-y bg-white">
        <Container className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading eyebrow="Our Story" title="Why we started TrekVibe Nepal" />
            <div className="mt-6 space-y-4 text-stone-700 leading-relaxed">
              <p>
                TrekVibe Nepal was founded in Kathmandu with a simple goal:
                give trekkers an honest, well-organized way to experience the
                Himalaya, led by guides who grew up in the regions they
                walk — not a call center booking agent.
              </p>
              <p>
                We started with a small handful of classic routes and have
                grown into a full portfolio spanning the Everest, Annapurna,
                Langtang, Manaslu, Mustang and Dolpo regions — from short
                family-friendly sunrise walks to three-week wilderness
                crossings into the remotest corners of Nepal.
              </p>
              <p>
                Every itinerary we run is built the same way: proper
                acclimatization first, transparent pricing second, and a
                guide team that treats your safety like it&apos;s their own
                family&apos;s.
              </p>
            </div>
            <LinkButton href="/treks" size="lg" className="mt-8">
              Explore Our Treks
            </LinkButton>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="rounded-2xl border border-stone-300/60 bg-cream p-6">
                <Icon size={26} className="text-gold-600" />
                <p className="mt-4 font-display text-3xl font-semibold text-navy-950">{value}</p>
                <p className="mt-1 text-sm text-stone-600">{label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Guides />
      <FinalCTA />
    </div>
  );
}
