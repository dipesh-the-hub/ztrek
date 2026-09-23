import { getAllGuidesForAdmin } from "@/lib/data/guides";
import { createGuideAction } from "@/lib/actions/guides";
import { USE_DB } from "@/lib/db";
import GuideRow from "@/components/admin/GuideRow";
import GuideForm from "@/components/admin/GuideForm";

export default async function AdminGuidesPage() {
  const guides = await getAllGuidesForAdmin();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-950">Guides</h1>
      <p className="mt-1 text-sm text-stone-600">Team profiles shown on the homepage and About page.</p>

      <div className="mt-8 space-y-4">
        {guides.map((g) => (
          <GuideRow key={g.id} guide={g} />
        ))}
      </div>

      {USE_DB && (
        <div className="mt-10 rounded-2xl border border-dashed border-stone-300 bg-white p-5">
          <h2 className="font-display text-lg font-semibold text-navy-950">Add a guide</h2>
          <div className="mt-4">
            <GuideForm action={createGuideAction} submitLabel="Add Guide" />
          </div>
        </div>
      )}
    </div>
  );
}
