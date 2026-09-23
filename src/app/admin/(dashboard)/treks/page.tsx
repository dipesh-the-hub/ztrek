import Link from "next/link";
import { Plus, PencilSimple } from "@phosphor-icons/react/dist/ssr";
import { getAllTreksForAdmin } from "@/lib/data/treks";
import { deleteTrekAction } from "@/lib/actions/treks";
import { USE_DB } from "@/lib/db";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import { LinkButton } from "@/components/ui/Button";

export default async function AdminTreksPage() {
  const treks = await getAllTreksForAdmin();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy-950">Treks</h1>
          <p className="mt-1 text-sm text-stone-600">{treks.length} trek packages.</p>
        </div>
        {USE_DB && (
          <LinkButton href="/admin/treks/new" size="md">
            <Plus size={16} aria-hidden="true" />
            New Trek
          </LinkButton>
        )}
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-stone-300/60 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-200 text-left text-xs text-stone-500 uppercase tracking-wide">
              <th className="px-5 py-3 font-semibold">Name</th>
              <th className="px-5 py-3 font-semibold">Region</th>
              <th className="px-5 py-3 font-semibold">Price</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {treks.map((trek) => (
              <tr key={trek.id} className="border-b border-stone-100 last:border-0">
                <td className="px-5 py-3.5 font-medium text-navy-950">{trek.name}</td>
                <td className="px-5 py-3.5 text-stone-600">{trek.regionLabel}</td>
                <td className="px-5 py-3.5 text-stone-600">${trek.priceFrom}</td>
                <td className="px-5 py-3.5">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      trek.published ? "bg-success/10 text-success" : "bg-stone-200 text-stone-600"
                    }`}
                  >
                    {trek.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-4">
                    {USE_DB ? (
                      <>
                        <Link
                          href={`/admin/treks/${trek.id}`}
                          className="flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-gold-600"
                        >
                          <PencilSimple size={15} aria-hidden="true" />
                          Edit
                        </Link>
                        <form>
                          <ConfirmDeleteButton
                            action={deleteTrekAction.bind(null, trek.id)}
                            confirmMessage={`Delete "${trek.name}"? This can't be undone.`}
                          />
                        </form>
                      </>
                    ) : (
                      <Link href={`/treks/${trek.slug}`} className="text-sm text-stone-500 hover:text-gold-600">
                        View
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
