"use server";

import { revalidatePath } from "next/cache";
import { prisma, USE_DB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export interface TestimonialFormState {
  error?: string;
}

function buildData(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    trek: String(formData.get("trek") ?? "").trim(),
    rating: Number(formData.get("rating") ?? 5),
    quote: String(formData.get("quote") ?? "").trim(),
    published: formData.get("published") === "on",
  };
}

export async function createTestimonialAction(
  _prevState: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  await requireAdmin();
  if (!USE_DB) return { error: "No database connected." };

  const data = buildData(formData);
  if (!data.name || !data.quote) return { error: "Name and quote are required." };

  await prisma.testimonial.create({ data });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  revalidatePath("/reviews");
  return {};
}

export async function updateTestimonialAction(
  _prevState: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  await requireAdmin();
  if (!USE_DB) return { error: "No database connected." };

  const id = String(formData.get("id") ?? "");
  const data = buildData(formData);
  if (!data.name || !data.quote) return { error: "Name and quote are required." };

  await prisma.testimonial.update({ where: { id }, data });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  revalidatePath("/reviews");
  return {};
}

export async function deleteTestimonialAction(id: string) {
  await requireAdmin();
  if (!USE_DB) return;
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  revalidatePath("/reviews");
}

/** Quick show/hide toggle, e.g. to take down a spam review. */
export async function setTestimonialPublishedAction(id: string, published: boolean) {
  await requireAdmin();
  if (!USE_DB) return;
  await prisma.testimonial.update({ where: { id }, data: { published } });
  revalidatePath("/admin/testimonials");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/reviews");
}
