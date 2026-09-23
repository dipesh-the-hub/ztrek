import { prisma, USE_DB } from "@/lib/db";

export type NavItemType = "home" | "about" | "treks" | "travellerInfo" | "link";

export interface NavItemData {
  id: string;
  type: NavItemType;
  label: string;
  href: string | null;
  sortOrder: number;
  visible: boolean;
}

export const DEFAULT_NAV_ITEMS: NavItemData[] = [
  { id: "home", type: "home", label: "Home", href: "/", sortOrder: 0, visible: true },
  { id: "about", type: "about", label: "About Us", href: null, sortOrder: 1, visible: true },
  { id: "treks", type: "treks", label: "Treks & Regions", href: null, sortOrder: 2, visible: true },
  { id: "travellerInfo", type: "travellerInfo", label: "Traveller's Info", href: null, sortOrder: 3, visible: true },
  { id: "blog", type: "link", label: "Blog", href: "/blog", sortOrder: 4, visible: true },
  { id: "contact", type: "link", label: "Contact", href: "/contact", sortOrder: 5, visible: true },
];

export async function getNavItems(): Promise<NavItemData[]> {
  if (!USE_DB) return DEFAULT_NAV_ITEMS;
  const rows = await prisma.navItem.findMany({ orderBy: { sortOrder: "asc" } });
  if (rows.length === 0) return DEFAULT_NAV_ITEMS;
  return rows
    .filter((r) => r.visible)
    .map((r) => ({
      id: r.id,
      type: r.type as NavItemType,
      label: r.label,
      href: r.href,
      sortOrder: r.sortOrder,
      visible: r.visible,
    }));
}

export async function getAllNavItemsForAdmin(): Promise<NavItemData[]> {
  if (!USE_DB) return DEFAULT_NAV_ITEMS;
  const rows = await prisma.navItem.findMany({ orderBy: { sortOrder: "asc" } });
  if (rows.length === 0) return DEFAULT_NAV_ITEMS;
  return rows.map((r) => ({
    id: r.id,
    type: r.type as NavItemType,
    label: r.label,
    href: r.href,
    sortOrder: r.sortOrder,
    visible: r.visible,
  }));
}
