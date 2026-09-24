"use server";

import { revalidatePath } from "next/cache";
import { prisma, USE_DB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export interface GalleryPhotoFormState {
  error?: string;
}

function buildData(formData: FormData) {
  return {
    imageUrl: String(formData.get("imageUrl") ?? "").trim(),
    alt: String(formData.get("alt") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    detail: String(formData.get("detail") ?? "").trim(),
    sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
    published: formData.get("published") === "on",
  };
}

function validate(data: ReturnType<typeof buildData>) {
  if (!data.imageUrl) return "Upload a photo or paste its URL.";
  if (!data.title) return "Title is required.";
  if (!data.alt) return "Describe the photo for screen readers and search engines.";
  return null;
}

export async function createGalleryPhotoAction(
  _prevState: GalleryPhotoFormState,
  formData: FormData
): Promise<GalleryPhotoFormState> {
  await requireAdmin();
  if (!USE_DB) return { error: "No database connected." };

  const data = buildData(formData);
  const error = validate(data);
  if (error) return { error };

  await prisma.galleryPhoto.create({ data });
  revalidatePath("/admin/gallery");
  revalidatePath("/");
  return {};
}

export async function updateGalleryPhotoAction(
  _prevState: GalleryPhotoFormState,
  formData: FormData
): Promise<GalleryPhotoFormState> {
  await requireAdmin();
  if (!USE_DB) return { error: "No database connected." };

  const id = String(formData.get("id") ?? "");
  const data = buildData(formData);
  const error = validate(data);
  if (error) return { error };

  await prisma.galleryPhoto.update({ where: { id }, data });
  revalidatePath("/admin/gallery");
  revalidatePath("/");
  return {};
}

export async function deleteGalleryPhotoAction(id: string) {
  await requireAdmin();
  if (!USE_DB) return;
  await prisma.galleryPhoto.delete({ where: { id } });
  revalidatePath("/admin/gallery");
  revalidatePath("/");
}
