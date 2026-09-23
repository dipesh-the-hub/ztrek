"use server";

import { revalidatePath } from "next/cache";
import { prisma, USE_DB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export interface GuideFormState {
  error?: string;
}

function buildData(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    role: String(formData.get("role") ?? "").trim(),
    years: String(formData.get("years") ?? "").trim(),
    languages: String(formData.get("languages") ?? "").trim(),
    bio: String(formData.get("bio") ?? "").trim(),
    photoUrl: String(formData.get("photoUrl") ?? "").trim() || null,
    published: formData.get("published") === "on",
  };
}

export async function createGuideAction(
  _prevState: GuideFormState,
  formData: FormData
): Promise<GuideFormState> {
  await requireAdmin();
  if (!USE_DB) return { error: "No database connected." };

  const data = buildData(formData);
  if (!data.name || !data.role) return { error: "Name and role are required." };

  await prisma.guide.create({ data });
  revalidatePath("/admin/guides");
  revalidatePath("/about");
  revalidatePath("/");
  return {};
}

export async function updateGuideAction(
  _prevState: GuideFormState,
  formData: FormData
): Promise<GuideFormState> {
  await requireAdmin();
  if (!USE_DB) return { error: "No database connected." };

  const id = String(formData.get("id") ?? "");
  const data = buildData(formData);
  if (!data.name || !data.role) return { error: "Name and role are required." };

  await prisma.guide.update({ where: { id }, data });
  revalidatePath("/admin/guides");
  revalidatePath("/about");
  revalidatePath("/");
  return {};
}

export async function deleteGuideAction(id: string) {
  await requireAdmin();
  if (!USE_DB) return;
  await prisma.guide.delete({ where: { id } });
  revalidatePath("/admin/guides");
  revalidatePath("/about");
  revalidatePath("/");
}
