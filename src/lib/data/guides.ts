import { prisma, USE_DB } from "@/lib/db";
import { guides as staticGuides, type GuideProfile } from "@/lib/guides";

export async function getAllGuides(): Promise<GuideProfile[]> {
  if (!USE_DB) return staticGuides;
  const rows = await prisma.guide.findMany({
    where: { published: true },
    orderBy: { createdAt: "asc" },
  });
  return rows.map((r) => ({
    name: r.name,
    role: r.role,
    years: r.years,
    languages: r.languages,
    bio: r.bio,
    initials: r.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
  }));
}

export async function getAllGuidesForAdmin() {
  if (!USE_DB) {
    return staticGuides.map((g, i) => ({
      ...g,
      id: String(i),
      photoUrl: null as string | null,
      published: true,
    }));
  }
  return prisma.guide.findMany({ orderBy: { createdAt: "asc" } });
}
