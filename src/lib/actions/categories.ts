"use server";

import { revalidatePath } from "next/cache";
import { prisma, USE_DB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export interface CategoryFormState {
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

function revalidateCategoryPaths() {
  revalidatePath("/admin/categories");
  revalidatePath("/admin/treks");
  revalidatePath("/treks");
  revalidatePath("/");
}

export async function createCategoryAction(
  _prevState: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  await requireAdmin();
  if (!USE_DB) return { error: "No database connected." };

  const data = buildData(formData);
  if (!data.slug || !data.label) return { error: "Slug and label are required." };

  try {
    await prisma.category.create({ data });
  } catch {
    return { error: "Could not create category — the slug may already be in use." };
  }

  revalidateCategoryPaths();
  return {};
}

export async function updateCategoryAction(
  _prevState: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  await requireAdmin();
  if (!USE_DB) return { error: "No database connected." };

  const id = String(formData.get("id") ?? "");
  const data = buildData(formData);
  if (!data.slug || !data.label) return { error: "Slug and label are required." };

  try {
    await prisma.category.update({ where: { id }, data });
  } catch {
    return { error: "Could not update category." };
  }

  revalidateCategoryPaths();
  return {};
}

export async function deleteCategoryAction(id: string) {
  await requireAdmin();
  if (!USE_DB) return;
  await prisma.category.delete({ where: { id } });
  revalidateCategoryPaths();
}
