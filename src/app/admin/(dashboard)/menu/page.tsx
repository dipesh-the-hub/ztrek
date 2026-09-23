import { getAllNavItemsForAdmin } from "@/lib/data/navItems";
import { USE_DB } from "@/lib/db";
import NavItemRow from "@/components/admin/NavItemRow";
import NavItemForm from "@/components/admin/NavItemForm";

export default async function AdminMenuPage() {
  const items = await getAllNavItemsForAdmin();
  const sorted = [...items].sort((a, b) => a.sortOrder - b.sortOrder);
  const nextSortOrder = sorted.length ? Math.max(...sorted.map((i) => i.sortOrder)) + 1 : 0;

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-950">Navigation Menu</h1>
      <p className="mt-1 text-sm text-stone-600">
        Control what shows in the top navigation bar. Relabel, reorder or hide any item — the
        lock icon marks built-in menus (About Us, Treks &amp; Regions, Traveller&apos;s Info)
        whose sub-items are fixed, but you can still rename, reorder or hide them.
      </p>

      <div className="mt-8 space-y-4">
        {sorted.map((item) => (
          <NavItemRow key={item.id} item={item} />
        ))}
      </div>

      {USE_DB && (
        <div className="mt-10 rounded-2xl border border-dashed border-stone-300 bg-white p-5">
          <h2 className="font-display text-lg font-semibold text-navy-950">Add a menu link</h2>
          <div className="mt-4">
            <NavItemForm nextSortOrder={nextSortOrder} />
          </div>
        </div>
      )}
    </div>
  );
}
