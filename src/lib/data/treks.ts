import { prisma, USE_DB } from "@/lib/db";
import {
  treks as staticTreks,
  type Trek,
  type ItineraryDay,
  type Difficulty,
} from "@/lib/treks";
import type { Trek as PrismaTrek } from "@/generated/prisma/client";
import { getAllRegions } from "@/lib/data/regions";
import { getAllCategories } from "@/lib/data/categories";

function mapDbTrek(row: PrismaTrek): Trek {
  return {
    slug: row.slug,
    name: row.name,
    region: row.region,
    regionSlug: row.regionSlug,
    regionLabel: row.regionLabel,
    categorySlug: row.categorySlug,
    categoryLabel: row.categoryLabel,
    tagline: row.tagline,
    heroImage: row.heroImage,
    gallery: row.gallery as unknown as string[],
    duration: row.duration,
    durationDays: row.durationDays,
    maxAltitude: row.maxAltitude,
    difficulty: row.difficulty as Difficulty,
    bestSeason: row.bestSeason,
    groupSize: row.groupSize,
    priceFrom: row.priceFrom,
    restrictedArea: row.restrictedArea,
    shortDescription: row.shortDescription,
    overview: row.overview,
    highlights: row.highlights as unknown as string[],
    permits: row.permits as unknown as string[],
    itinerary: row.itinerary as unknown as ItineraryDay[],
    included: row.included as unknown as string[],
    excluded: row.excluded as unknown as string[],
    faqs: row.faqs as unknown as { q: string; a: string }[],
  };
}

export async function getAllTreks(): Promise<Trek[]> {
  if (!USE_DB) return staticTreks;
  const rows = await prisma.trek.findMany({
    where: { published: true },
    orderBy: { createdAt: "asc" },
  });
  return rows.map(mapDbTrek);
}

export async function getTrekBySlug(slug: string): Promise<Trek | undefined> {
  if (!USE_DB) return staticTreks.find((t) => t.slug === slug);
  const row = await prisma.trek.findUnique({ where: { slug } });
  return row ? mapDbTrek(row) : undefined;
}

export async function getRelatedTreks(slug: string, count = 3): Promise<Trek[]> {
  const all = await getAllTreks();
  const current = all.find((t) => t.slug === slug);
  if (!current) return all.slice(0, count);
  return all
    .filter((t) => t.slug !== slug)
    .sort((a, b) => {
      const aRegion = a.regionSlug === current.regionSlug ? 0 : 1;
      const bRegion = b.regionSlug === current.regionSlug ? 0 : 1;
      return aRegion - bRegion;
    })
    .slice(0, count);
}

export async function getRegions() {
  return getAllRegions();
}

export async function getCategories() {
  return getAllCategories();
}

export async function getTreksGroupedByRegion() {
  const [all, regions] = await Promise.all([getAllTreks(), getAllRegions()]);
  return regions.map((region) => ({
    ...region,
    treks: all.filter((t) => t.regionSlug === region.slug),
  }));
}

export async function getTreksGroupedByCategory() {
  const [all, categories] = await Promise.all([getAllTreks(), getAllCategories()]);
  return categories.map((category) => ({
    ...category,
    treks: all.filter((t) => t.categorySlug === category.slug),
  }));
}

// --- Admin-only helpers (no-op / empty when no database is connected) ---

export async function getAllTreksForAdmin(): Promise<(Trek & { id: string; published: boolean })[]> {
  if (!USE_DB) return staticTreks.map((t) => ({ ...t, id: t.slug, published: true }));
  const rows = await prisma.trek.findMany({ orderBy: { createdAt: "asc" } });
  return rows.map((row) => ({ ...mapDbTrek(row), id: row.id, published: row.published }));
}

export async function getTrekByIdForAdmin(id: string) {
  if (!USE_DB) {
    const t = staticTreks.find((x) => x.slug === id);
    return t ? { ...t, id: t.slug, published: true } : null;
  }
  const row = await prisma.trek.findUnique({ where: { id } });
  return row ? { ...mapDbTrek(row), id: row.id, published: row.published } : null;
}
