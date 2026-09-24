import { prisma, USE_DB } from "@/lib/db";
import { galleryPhotos as staticPhotos, type GalleryPhoto } from "@/lib/gallery";

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  if (!USE_DB) return staticPhotos;
  const rows = await prisma.galleryPhoto.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
  return rows.map((r) => ({ imageUrl: r.imageUrl, alt: r.alt, title: r.title, detail: r.detail }));
}

export async function getAllGalleryPhotosForAdmin() {
  if (!USE_DB) {
    return staticPhotos.map((p, i) => ({ ...p, id: String(i), sortOrder: i, published: true }));
  }
  return prisma.galleryPhoto.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });
}
