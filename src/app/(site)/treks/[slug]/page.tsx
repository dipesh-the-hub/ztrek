import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  Mountains,
  CalendarBlank,
  UsersThree,
  CheckCircle,
  XCircle,
  MapPinLine,
  ArrowRight,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import FAQAccordion from "@/components/home/FAQAccordion";
import TrekCard from "@/components/treks/TrekCard";
import { getAllTreks, getTrekBySlug, getRelatedTreks } from "@/lib/data/treks";

export const revalidate = 3600;

export async function generateStaticParams() {
  const treks = await getAllTreks();
  return treks.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trek = await getTrekBySlug(slug);
  if (!trek) return {};
  return {
    title: `${trek.name} | ${trek.duration}, from $${trek.priceFrom}`,
    description: trek.shortDescription,
    openGraph: {
      title: trek.name,
      description: trek.shortDescription,
      images: [{ url: trek.heroImage }],
    },
  };
}

const difficultyStyles: Record<string, string> = {
  Easy: "bg-success/10 text-success",
  Moderate: "bg-gold-500/15 text-gold-600",
  Challenging: "bg-danger/10 text-danger",
  Strenuous: "bg-danger/15 text-danger",
};

export default async function TrekDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trek = await getTrekBySlug(slug);
  if (!trek) notFound();

  const related = await getRelatedTreks(slug, 3);

  const quickFacts = [
    { icon: Clock, label: "Duration", value: trek.duration },
    { icon: Mountains, label: "Max Altitude", value: trek.maxAltitude },
    { icon: CalendarBlank, label: "Best Season", value: trek.bestSeason },
    { icon: UsersThree, label: "Group Size", value: trek.groupSize },
  ];

  return (
    <div>
      <section className="relative bg-navy-950">
        <div className="absolute inset-0">
          <Image
            src={trek.heroImage}
            alt={`${trek.name} landscape in the ${trek.region}, Nepal`}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/20" />
        </div>
        <Container className="relative py-20 sm:py-28">
          <nav aria-label="Breadcrumb" className="text-sm text-white/70">
            <Link href="/treks" className="hover:text-gold-300">Treks</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{trek.name}</span>
          </nav>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyStyles[trek.difficulty]}`}>
              {trek.difficulty}
            </span>
            {trek.restrictedArea && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/15 text-gold-300">
                Restricted Area Permit Required
              </span>
            )}
            <span className="flex items-center gap-1.5 text-xs font-semibold text-white/80">
              <MapPinLine size={14} aria-hidden="true" />
              {trek.region}
            </span>
          </div>
          <h1 className="mt-4 max-w-2xl font-display text-3xl sm:text-5xl font-semibold text-white text-balance">
            {trek.name}
          </h1>
          <p className="mt-3 max-w-xl text-white/85 text-lg">{trek.tagline}</p>
        </Container>
      </section>

      <section className="border-b border-stone-300/60 bg-white">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8">
            {quickFacts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-navy-50 text-navy-900 shrink-0">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-stone-500">{label}</p>
                  <p className="text-sm font-semibold text-navy-950">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-14">
              <div>
                <h2 className="font-display text-2xl font-semibold text-navy-950">Overview</h2>
                <p className="mt-4 text-stone-700 leading-relaxed">{trek.overview}</p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold text-navy-950">Trip Highlights</h2>
                <ul className="mt-4 space-y-3">
                  {trek.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-stone-700">
                      <CheckCircle size={20} weight="fill" className="text-gold-500 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold text-navy-950">Day-by-Day Itinerary</h2>
                <ol className="mt-6 relative border-l-2 border-stone-300 pl-6 space-y-8">
                  {trek.itinerary.map((day) => (
                    <li key={day.day} className="relative">
                      <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full bg-gold-500 ring-4 ring-cream" aria-hidden="true" />
                      <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">{day.day}</p>
                      <h3 className="mt-1 font-display text-lg font-semibold text-navy-950">{day.title}</h3>
                      <p className="mt-1.5 text-sm text-stone-700 leading-relaxed">{day.detail}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <h2 className="font-display text-xl font-semibold text-navy-950">Cost Includes</h2>
                  <ul className="mt-4 space-y-2.5">
                    {trek.included.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-stone-700">
                        <CheckCircle size={18} weight="fill" className="text-success mt-0.5 shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold text-navy-950">Cost Excludes</h2>
                  <ul className="mt-4 space-y-2.5">
                    {trek.excluded.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-stone-700">
                        <XCircle size={18} className="text-danger mt-0.5 shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-navy-950">Permits Required</h2>
                <ul className="mt-4 space-y-2.5">
                  {trek.permits.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-stone-700">
                      <CheckCircle size={18} weight="fill" className="text-navy-700 mt-0.5 shrink-0" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {trek.faqs.length > 0 && (
                <div>
                  <h2 className="font-display text-2xl font-semibold text-navy-950">
                    {trek.name} — FAQs
                  </h2>
                  <div className="mt-6">
                    <FAQAccordion items={trek.faqs} />
                  </div>
                </div>
              )}
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-28 rounded-2xl border border-stone-300/60 bg-white p-6 shadow-sm">
                <p className="text-sm text-stone-500">Starting from</p>
                <p className="font-display text-3xl font-semibold text-navy-950">
                  ${trek.priceFrom.toLocaleString()}
                  <span className="text-base font-normal text-stone-500"> / person</span>
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  Final price depends on group size and season
                </p>

                <LinkButton
                  href={`/plan-your-trek?trek=${encodeURIComponent(trek.name)}`}
                  size="lg"
                  className="mt-6 w-full"
                >
                  Enquire About This Trek
                </LinkButton>
                <a
                  href="https://wa.me/9779741765998"
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:brightness-105 transition-[filter] min-h-11"
                >
                  <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
                  Ask on WhatsApp
                </a>

                <dl className="mt-6 space-y-3 border-t border-stone-200 pt-6 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-stone-500">Region</dt>
                    <dd className="font-medium text-navy-950 text-right">{trek.region}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-stone-500">Difficulty</dt>
                    <dd className="font-medium text-navy-950 text-right">{trek.difficulty}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-stone-500">Restricted area</dt>
                    <dd className="font-medium text-navy-950 text-right">{trek.restrictedArea ? "Yes" : "No"}</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="section-y bg-white border-t border-stone-300/60">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-navy-950">
                You might also like
              </h2>
              <Link href="/treks" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-gold-600">
                All Treks <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((t) => (
                <TrekCard key={t.slug} trek={t} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
