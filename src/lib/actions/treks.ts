"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma, USE_DB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

function parseLines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseItinerary(value: FormDataEntryValue | null) {
  return parseLines(value)
    .map((line) => {
      const [day, title, ...rest] = line.split("|").map((p) => p.trim());
      return { day: day ?? "", title: title ?? "", detail: rest.join("|").trim() };
    })
    .filter((d) => d.day && d.title);
}

function parseFaqs(value: FormDataEntryValue | null) {
  return parseLines(value)
    .map((line) => {
      const [q, ...rest] = line.split("|").map((p) => p.trim());
      return { q: q ?? "", a: rest.join("|").trim() };
    })
    .filter((f) => f.q && f.a);
}

async function buildTrekData(formData: FormData) {
  const regionSlug = String(formData.get("regionSlug") ?? "");
  const categorySlug = String(formData.get("categorySlug") ?? "trekking");
  const [region, category] = await Promise.all([
    prisma.region.findUnique({ where: { slug: regionSlug } }),
    prisma.category.findUnique({ where: { slug: categorySlug } }),
  ]);

  return {
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    region: region?.label ?? regionSlug,
    regionSlug,
    regionLabel: region?.label ?? regionSlug,
    categorySlug,
    categoryLabel: category?.label ?? categorySlug,
    tagline: String(formData.get("tagline") ?? "").trim(),
    heroImage: String(formData.get("heroImage") ?? "").trim(),
    gallery: parseLines(formData.get("gallery")),
    duration: String(formData.get("duration") ?? "").trim(),
    durationDays: Number(formData.get("durationDays") ?? 0),
    maxAltitude: String(formData.get("maxAltitude") ?? "").trim(),
    difficulty: String(formData.get("difficulty") ?? "Moderate"),
    bestSeason: String(formData.get("bestSeason") ?? "").trim(),
    groupSize: String(formData.get("groupSize") ?? "").trim(),
    priceFrom: Number(formData.get("priceFrom") ?? 0),
    restrictedArea: formData.get("restrictedArea") === "on",
    shortDescription: String(formData.get("shortDescription") ?? "").trim(),
    overview: String(formData.get("overview") ?? "").trim(),
    highlights: parseLines(formData.get("highlights")),
    permits: parseLines(formData.get("permits")),
    itinerary: parseItinerary(formData.get("itinerary")),
    included: parseLines(formData.get("included")),
    excluded: parseLines(formData.get("excluded")),
    faqs: parseFaqs(formData.get("faqs")),
    published: formData.get("published") === "on",
  };
}

export async function createTrekAction(_prevState: unknown, formData: FormData) {
  await requireAdmin();
  if (!USE_DB) return { error: "No database connected." };

  const data = await buildTrekData(formData);
  if (!data.slug || !data.name) return { error: "Slug and name are required." };

  try {
    await prisma.trek.create({ data });
  } catch {
    return { error: "Could not create trek — the slug may already be in use." };
  }

  revalidatePath("/admin/treks");
  revalidatePath("/treks");
  revalidatePath("/");
  redirect("/admin/treks");
}

export async function updateTrekAction(_prevState: unknown, formData: FormData) {
  await requireAdmin();
  if (!USE_DB) return { error: "No database connected." };

  const id = String(formData.get("id") ?? "");
  const data = await buildTrekData(formData);
  if (!data.slug || !data.name) return { error: "Slug and name are required." };

  try {
    await prisma.trek.update({ where: { id }, data });
  } catch {
    return { error: "Could not update trek." };
  }

  revalidatePath("/admin/treks");
  revalidatePath("/treks");
  revalidatePath(`/treks/${data.slug}`);
  revalidatePath("/");
  redirect("/admin/treks");
}

export async function deleteTrekAction(id: string) {
  await requireAdmin();
  if (!USE_DB) return;
  await prisma.trek.delete({ where: { id } });
  revalidatePath("/admin/treks");
  revalidatePath("/treks");
  revalidatePath("/");
}
