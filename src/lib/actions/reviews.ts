"use server";

import { revalidatePath } from "next/cache";
import { prisma, USE_DB } from "@/lib/db";

export interface ReviewInput {
  name: string;
  /** Optional; never shown publicly. */
  email?: string;
  location: string;
  trek: string;
  rating: number;
  quote: string;
  /** Honeypot: real visitors never see or fill this field. */
  website?: string;
}

export type ReviewResult = { ok: true } | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Called from the public review form on /reviews. Reviews go live straight
 * away; the team can hide or delete one later in Admin > Testimonials.
 */
export async function submitReviewAction(input: ReviewInput): Promise<ReviewResult> {
  // Pretend success to bots so they don't retry.
  if (input.website) return { ok: true };
  if (!USE_DB) return { ok: false, error: "Reviews can't be submitted right now. Please try again later." };

  const name = input.name.trim().slice(0, 80);
  const email = (input.email ?? "").trim().slice(0, 200);
  const location = input.location.trim().slice(0, 80);
  const trek = input.trek.trim().slice(0, 120);
  const quote = input.quote.trim();
  const rating = Math.round(Number(input.rating));

  if (!name) return { ok: false, error: "Please enter your name." };
  if (email && !EMAIL_RE.test(email)) return { ok: false, error: "That email address doesn't look right. You can also leave it empty." };
  if (!(rating >= 1 && rating <= 5)) return { ok: false, error: "Please choose a star rating." };
  if (quote.length < 20) return { ok: false, error: "Please write at least a couple of sentences about your trek." };
  if (quote.length > 2000) return { ok: false, error: "Please keep your review under 2,000 characters." };
  // Reviews publish without approval, so refuse links: they're the usual sign of spam.
  if (/https?:\/\/|www\.|\.(com|net|org|ru|xyz)\b/i.test(`${name} ${location} ${quote}`)) {
    return { ok: false, error: "Please remove any links from your review." };
  }

  try {
    await prisma.testimonial.create({
      data: { name, email: email || null, location, trek, rating, quote, published: true },
    });
  } catch {
    return { ok: false, error: "Something went wrong saving your review. Please try again." };
  }
  revalidatePath("/admin/testimonials");
  revalidatePath("/reviews");
  revalidatePath("/");
  return { ok: true };
}
