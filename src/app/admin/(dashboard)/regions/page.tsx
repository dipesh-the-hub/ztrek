import { getAllRegionsForAdmin } from "@/lib/data/regions";
import { getAllTreksForAdmin } from "@/lib/data/treks";
import { createRegionAction, updateRegionAction, deleteRegionAction } from "@/lib/actions/regions";
import { USE_DB } from "@/lib/db";
import TaxonomyRow from "@/components/admin/TaxonomyRow";
import TaxonomyForm from "@/components/admin/TaxonomyForm";

export default async function AdminRegionsPage() {
  const [regions, treks] = await Promise.all([getAllRegionsForAdmin(), getAllTreksForAdmin()]);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-950">Regions</h1>
      <p className="mt-1 text-sm text-stone-600">
        Regions group treks in the &ldquo;Treks &amp; Regions&rdquo; menu and on the /treks filter. Add a new one any time you expand into a new part of Nepal.
      </p>

      <div className="mt-8 space-y-4">
        {regions.map((region) => (
          <TaxonomyRow
            key={region.id}
            item={region}
            updateAction={updateRegionAction}
            deleteAction={deleteRegionAction}
            slugHint="Used in URLs like /treks?region=your-slug"
            trekCount={treks.filter((t) => t.regionSlug === region.slug).length}
          />
        ))}
      </div>

      {USE_DB && (
        <div className="mt-10 rounded-2xl border border-dashed border-stone-300 bg-white p-5">
          <h2 className="font-display text-lg font-semibold text-navy-950">Add a region</h2>
          <div className="mt-4">
            <TaxonomyForm
              action={createRegionAction}
              slugHint='Lowercase, no spaces — e.g. "kanchenjunga"'
              submitLabel="Add Region"
            />
          </div>
        </div>
      )}
    </div>
  );
}
