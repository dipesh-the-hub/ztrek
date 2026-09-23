"use server";

import { revalidatePath } from "next/cache";
import { prisma, USE_DB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { DEFAULT_NAV_ITEMS } from "@/lib/data/navItems";

export interface NavItemFormState {
  error?: string;
}

function revalidateNavPaths() {
  revalidatePath("/", "layout");
  revalidatePath("/admin/menu");
}

/** First edit ever: seed the DB with the current defaults so existing items don't vanish. */
async function ensureSeeded() {
  const count = await prisma.navItem.count();
  if (count > 0) return;
  await prisma.navItem.createMany({
    data: DEFAULT_NAV_ITEMS.map((item) => ({
      id: item.id,
      type: item.type,
      label: item.label,
      href: item.href,
      sortOrder: item.sortOrder,
      visible: item.visible,
    })),
  });
}

export async function createNavLinkAction(
  _prevState: NavItemFormState,
  formData: FormData
): Promise<NavItemFormState> {
  await requireAdmin();
  if (!USE_DB) return { error: "No database connected." };
  await ensureSeeded();

  const label = String(formData.get("label") ?? "").trim();
  const href = String(formData.get("href") ?? "").trim();
  const sortOrder = Number(formData.get("sortOrder") ?? 0);
  if (!label || !href) return { error: "Label and link are required." };

  await prisma.navItem.create({
    data: { type: "link", label, href, sortOrder, visible: true },
  });

  revalidateNavPaths();
  return {};
}

export async function updateNavItemAction(
  _prevState: NavItemFormState,
  formData: FormData
): Promise<NavItemFormState> {
  await requireAdmin();
  if (!USE_DB) return { error: "No database connected." };
  await ensureSeeded();

  const id = String(formData.get("id") ?? "");
  const label = String(formData.get("label") ?? "").trim();
  const sortOrder = Number(formData.get("sortOrder") ?? 0);
  const visible = formData.get("visible") === "on";
  if (!label) return { error: "Label is required." };

  const existing = await prisma.navItem.findUnique({ where: { id } });
  if (!existing) return { error: "Menu item not found." };

  const data: { label: string; sortOrder: number; visible: boolean; href?: string } = {
    label,
    sortOrder,
    visible,
  };

  if (existing.type === "link") {
    const href = String(formData.get("href") ?? "").trim();
    if (!href) return { error: "Link is required." };
    data.href = href;
  }

  await prisma.navItem.update({ where: { id }, data });
  revalidateNavPaths();
  return {};
}

export async function deleteNavItemAction(id: string) {
  await requireAdmin();
  if (!USE_DB) return;
  const existing = await prisma.navItem.findUnique({ where: { id } });
  if (!existing || existing.type !== "link") return;
  await prisma.navItem.delete({ where: { id } });
  revalidateNavPaths();
}
