import type { Metadata } from "next";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import InquiryForm from "@/components/forms/InquiryForm";
import { getAllTreks } from "@/lib/data/treks";

export const metadata: Metadata = {
  title: "Plan Your Trek",
  description:
    "Tell TrekVibe Nepal your dates, fitness level and travel style, and our Kathmandu team will build a tailor-made Himalayan trekking itinerary for you.",
};

const steps = [
  "Fill out the form with your travel dates, group size and trek of interest.",
  "Our Kathmandu team reviews your fitness level and travel style.",
  "You receive a tailored itinerary and itemized quote within 24 hours.",
];

export default async function PlanYourTrekPage({
  searchParams,
}: {
  searchParams: Promise<{ trek?: string }>;
}) {
  const { trek } = await searchParams;
  const treks = await getAllTreks();

  return (
    <div className="section-y">
      <Container>
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="Trip Planner"
              title="Build your own Himalayan itinerary"
              description="Whether you already know which trek you want or need a recommendation, tell us about your trip and we'll take it from there."
            />

            <ol className="mt-8 space-y-5">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex items-center justify-center h-7 w-7 rounded-full bg-navy-950 text-gold-400 text-xs font-semibold shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm text-stone-700 leading-relaxed pt-0.5">{step}</p>
                </li>
              ))}
            </ol>

            <div className="mt-8 rounded-2xl bg-navy-50 p-6">
              <div className="flex items-center gap-2 text-navy-950 font-semibold text-sm">
                <CheckCircle size={20} weight="fill" className="text-gold-600" aria-hidden="true" />
                No obligation, no spam
              </div>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                We only use your details to reply about your trek. No mailing lists, no pressure to book.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3 rounded-2xl border border-stone-300/60 bg-white p-6 sm:p-8">
            <InquiryForm variant="trip-planner" defaultTrek={trek} treks={treks} />
          </div>
        </div>
      </Container>
    </div>
  );
}
