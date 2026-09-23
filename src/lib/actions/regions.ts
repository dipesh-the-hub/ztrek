"use server";

import { revalidatePath } from "next/cache";
import { prisma, USE_DB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export interface RegionFormState {
  error?: string;
}

function buildData(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim().toLowerCase(),
    label: String(formData.get("label") ?? "").trim(),
    blurb: String(formData.get("blurb") ?? "").trim(),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };
}

function revalidateRegionPaths() {
  revalidatePath("/admin/regions");
  revalidatePath("/admin/treks");
  revalidatePath("/treks");
  revalidatePath("/");
}

export async function createRegionAction(
  _prevState: RegionFormState,
  formData: FormData
): Promise<RegionFormState> {
  await requireAdmin();
  if (!USE_DB) return { error: "No database connected." };

  const data = buildData(formData);
  if (!data.slug || !data.label) return { error: "Slug and label are required." };

  try {
    await prisma.region.create({ data });
  } catch {
    return { error: "Could not create region — the slug may already be in use." };
  }

  revalidateRegionPaths();
  return {};
}

export async function updateRegionAction(
  _prevState: RegionFormState,
  formData: FormData
): Promise<RegionFormState> {
  await requireAdmin();
  if (!USE_DB) return { error: "No database connected." };

  const id = String(formData.get("id") ?? "");
  const data = buildData(formData);
  if (!data.slug || !data.label) return { error: "Slug and label are required." };

  try {
    await prisma.region.update({ where: { id }, data });
  } catch {
    return { error: "Could not update region." };
  }

  revalidateRegionPaths();
  return {};
}

export async function deleteRegionAction(id: string) {
  await requireAdmin();
  if (!USE_DB) return;
  await prisma.region.delete({ where: { id } });
  revalidateRegionPaths();
}
