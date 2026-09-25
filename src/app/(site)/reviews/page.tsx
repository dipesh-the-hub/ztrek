import type { Metadata } from "next";
import { PencilSimpleLine, Quotes } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Avatar from "@/components/ui/Avatar";
import StarRating from "@/components/ui/StarRating";
import ReviewForm from "@/components/forms/ReviewForm";
import { getAllTestimonials } from "@/lib/data/testimonials";
import { getAllTreks } from "@/lib/data/treks";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Guest Reviews",
  description:
    "Read honest reviews from trekkers who walked the Himalaya with TrekVibe Nepal, and share your own experience of your trek.",
};

export default async function ReviewsPage() {
  const [reviews, treks] = await Promise.all([getAllTestimonials(), getAllTreks()]);
  const average = reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  return (
    <div className="section-y">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <SectionHeading
            eyebrow="Guest Reviews"
            title="What trekkers say after coming down"
            description="Every review here comes from a guest who trekked with us. Walked a trail with TrekVibe? We'd love to hear how it went."
          />
          <div className="flex items-center gap-5 shrink-0">
            {reviews.length > 0 && (
              <div>
                <p className="font-display text-4xl font-semibold text-navy-950 tabular-nums">{average.toFixed(1)}</p>
                <StarRating rating={Math.round(average)} />
                <p className="mt-1 text-xs text-stone-600">
                  {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
                </p>
              </div>
            )}
            <a
              href="#write"
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 hover:bg-gold-400 transition-colors min-h-11"
            >
              <PencilSimpleLine size={18} aria-hidden="true" />
              Write a review
            </a>
          </div>
        </div>

        {reviews.length > 0 ? (
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <figure key={i} className="rounded-2xl border border-stone-300/60 bg-white p-6 flex flex-col">
                <Quotes size={26} weight="fill" className="text-gold-500/70" aria-hidden="true" />
                <blockquote className="mt-3 text-sm text-stone-700 leading-relaxed flex-1 whitespace-pre-line">
                  {r.quote}
                </blockquote>
                <div className="mt-4">
                  <StarRating rating={r.rating} />
                </div>
                <figcaption className="mt-3 flex items-center gap-3">
                  <Avatar initials={r.name.slice(0, 2).toUpperCase()} className="h-10 w-10 text-sm" />
                  <div>
                    <p className="text-sm font-semibold text-navy-950">{r.name}</p>
                    <p className="text-xs text-stone-500">{[r.location, r.trek].filter(Boolean).join(" · ")}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <p className="mt-12 text-stone-600">No reviews yet. Be the first to share your trek.</p>
        )}

        <section id="write" className="mt-16 scroll-mt-28 rounded-2xl border border-stone-300/60 bg-white p-6 sm:p-8 max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-navy-950">Share your trek</h2>
          <p className="mt-2 text-sm text-stone-600">
            Your review helps other trekkers choose their route and their team.
          </p>
          <div className="mt-6">
            <ReviewForm treks={treks.map((t) => ({ slug: t.slug, name: t.name }))} />
          </div>
        </section>
      </Container>
    </div>
  );
}
