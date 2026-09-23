import { prisma, USE_DB } from "@/lib/db";
import { regions as staticRegions, type Region } from "@/lib/regions";

export async function getAllRegions(): Promise<Region[]> {
  if (!USE_DB) return staticRegions;
  const rows = await prisma.region.findMany({ orderBy: [{ sortOrder: "asc" }, { label: "asc" }] });
  return rows.map((r) => ({ slug: r.slug, label: r.label, blurb: r.blurb }));
}

export async function getAllRegionsForAdmin() {
  if (!USE_DB) return staticRegions.map((r, i) => ({ ...r, id: r.slug, sortOrder: i }));
  return prisma.region.findMany({ orderBy: [{ sortOrder: "asc" }, { label: "asc" }] });
}
