import { getAllCategoriesForAdmin } from "@/lib/data/categories";
import { getAllTreksForAdmin } from "@/lib/data/treks";
import { createCategoryAction, updateCategoryAction, deleteCategoryAction } from "@/lib/actions/categories";
import { USE_DB } from "@/lib/db";
import TaxonomyRow from "@/components/admin/TaxonomyRow";
import TaxonomyForm from "@/components/admin/TaxonomyForm";

export default async function AdminCategoriesPage() {
  const [categories, treks] = await Promise.all([getAllCategoriesForAdmin(), getAllTreksForAdmin()]);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-950">Categories</h1>
      <p className="mt-1 text-sm text-stone-600">
        Categories describe the kind of experience — Trekking, City Tour, Adventure Activity, or anything else you add. Every package in Treks picks one.
      </p>

      <div className="mt-8 space-y-4">
        {categories.map((category) => (
          <TaxonomyRow
            key={category.id}
            item={category}
            updateAction={updateCategoryAction}
            deleteAction={deleteCategoryAction}
            slugHint="Used internally to tag packages"
            trekCount={treks.filter((t) => t.categorySlug === category.slug).length}
          />
        ))}
      </div>

      {USE_DB && (
        <div className="mt-10 rounded-2xl border border-dashed border-stone-300 bg-white p-5">
          <h2 className="font-display text-lg font-semibold text-navy-950">Add a category</h2>
          <div className="mt-4">
            <TaxonomyForm
              action={createCategoryAction}
              slugHint='Lowercase, no spaces — e.g. "city-tour"'
              submitLabel="Add Category"
            />
          </div>
        </div>
      )}
    </div>
  );
}
