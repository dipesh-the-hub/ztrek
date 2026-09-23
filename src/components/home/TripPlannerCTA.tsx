import Image from "next/image";
import { NotePencil } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export default function TripPlannerCTA() {
  return (
    <section className="section-y bg-cream">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-navy-900">
          <div className="absolute inset-0">
            <Image
              src="/images/treks/manaslu-circuit.jpg"
              alt="Himalayan mountain range at golden hour"
              fill
              sizes="100vw"
              className="object-cover opacity-30"
            />
          </div>
          <div className="relative px-6 py-14 sm:px-14 sm:py-20 flex flex-col items-start">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gold-500 text-navy-950">
              <NotePencil size={24} aria-hidden="true" />
            </div>
            <h2 className="mt-6 font-display text-3xl sm:text-4xl font-semibold text-white max-w-xl text-balance">
              Don&apos;t see the exact itinerary you want?
            </h2>
            <p className="mt-4 max-w-xl text-white/80 leading-relaxed">
              Tell us your dates, fitness level and travel style, and our
              Kathmandu team will build a tailor-made trekking itinerary —
              solo, as a couple, or with a private group.
            </p>
            <LinkButton href="/plan-your-trek" size="lg" className="mt-8">
              Start Your Trip Planner
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
