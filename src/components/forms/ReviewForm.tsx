"use client";

import { useState, FormEvent } from "react";
import { CheckCircle, Star, WarningCircle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { submitReviewAction } from "@/lib/actions/reviews";
import { FORM_ENDPOINT } from "@/lib/formEndpoint";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full min-h-11 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-navy-950 focus:outline-2 focus:outline-offset-1 focus:outline-navy-700";
const labelClass = "block text-sm font-semibold text-navy-950 mb-1.5";
const ratingLabels = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];

export default function ReviewForm({ treks }: { treks: { slug: string; name: string }[] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const review = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      location: String(formData.get("location") ?? ""),
      trek: String(formData.get("trek") ?? ""),
      rating,
      quote: String(formData.get("quote") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    if (!rating) {
      setError("Please choose a star rating.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    const result = await submitReviewAction(review);
    if (!result.ok) {
      setError(result.error);
      setStatus("error");
      return;
    }

    // Let the team know a review is waiting for approval. Best-effort only:
    // the review is already saved, so a failed email doesn't matter to the guest.
    if (!review.website) {
      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New ${rating}-star review waiting for approval — TrekVibe Nepal`,
          _captcha: "false",
          name: review.name,
          email: review.email,
          trek: review.trek,
          rating: `${rating} / 5`,
          review: review.quote,
          approve: "Admin > Testimonials",
        }),
      }).catch(() => {});
    }

    setStatus("success");
    setRating(0);
    form.reset();
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-success/30 bg-success/10 p-8 text-center">
        <CheckCircle size={40} weight="fill" className="mx-auto text-success" aria-hidden="true" />
        <h3 className="mt-4 font-display text-xl font-semibold text-navy-950">Thank you for your review!</h3>
        <p className="mt-2 text-sm text-stone-700">
          We read every review before it goes live, so yours will appear on this page shortly.
        </p>
        <Button type="button" variant="ghost" className="mt-6" onClick={() => setStatus("idle")}>
          Write another review
        </Button>
      </div>
    );
  }

  const shown = hover || rating;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot field to deter basic spam bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <fieldset>
        <legend className={labelClass}>
          Your rating <span className="text-danger">*</span>
        </legend>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1" onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map((n) => (
              <label key={n} className="cursor-pointer p-0.5" onMouseEnter={() => setHover(n)}>
                <input
                  type="radio"
                  name="rating"
                  value={n}
                  checked={rating === n}
                  onChange={() => setRating(n)}
                  className="peer sr-only"
                />
                <Star
                  size={32}
                  weight={n <= shown ? "fill" : "regular"}
                  className={`${n <= shown ? "text-gold-500" : "text-stone-300"} rounded peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-navy-700`}
                  aria-hidden="true"
                />
                <span className="sr-only">{n} {n === 1 ? "star" : "stars"}</span>
              </label>
            ))}
          </div>
          <span className="text-sm text-stone-600">{ratingLabels[shown]}</span>
        </div>
      </fieldset>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="review-name" className={labelClass}>
            Your name <span className="text-danger">*</span>
          </label>
          <input id="review-name" name="name" type="text" required maxLength={80} autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="review-email" className={labelClass}>
            Email <span className="text-danger">*</span>
          </label>
          <input id="review-email" name="email" type="email" required autoComplete="email" className={inputClass} />
          <p className="mt-1 text-xs text-stone-500">Never shown publicly. We only use it to confirm your trip.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="review-location" className={labelClass}>
            Country
          </label>
          <input id="review-location" name="location" type="text" maxLength={80} autoComplete="country-name" placeholder="e.g. Germany" className={inputClass} />
        </div>
        <div>
          <label htmlFor="review-trek" className={labelClass}>
            Which trek did you do?
          </label>
          <select id="review-trek" name="trek" defaultValue="" className={inputClass}>
            <option value="">Choose a trek</option>
            {treks.map((t) => (
              <option key={t.slug} value={t.name}>
                {t.name}
              </option>
            ))}
            <option value="Custom trek">Custom / other trek</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="review-quote" className={labelClass}>
          Your review <span className="text-danger">*</span>
        </label>
        <textarea
          id="review-quote"
          name="quote"
          required
          minLength={20}
          maxLength={2000}
          rows={5}
          placeholder="How was your guide, the route, the teahouses and the views? What would you tell a friend?"
          className={inputClass}
        />
      </div>

      {status === "error" && (
        <p className="flex items-center gap-2 text-sm text-danger" role="alert">
          <WarningCircle size={18} aria-hidden="true" />
          {error}
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? "Sending…" : "Submit Review"}
      </Button>
    </form>
  );
}
