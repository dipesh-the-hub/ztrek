import { prisma, USE_DB } from "@/lib/db";
import { categories as staticCategories, type Category } from "@/lib/categories";

export async function getAllCategories(): Promise<Category[]> {
  if (!USE_DB) return staticCategories;
  const rows = await prisma.category.findMany({ orderBy: [{ sortOrder: "asc" }, { label: "asc" }] });
  return rows.map((c) => ({ slug: c.slug, label: c.label, blurb: c.blurb }));
}

export async function getAllCategoriesForAdmin() {
  if (!USE_DB) return staticCategories.map((c, i) => ({ ...c, id: c.slug, sortOrder: i }));
  return prisma.category.findMany({ orderBy: [{ sortOrder: "asc" }, { label: "asc" }] });
}
