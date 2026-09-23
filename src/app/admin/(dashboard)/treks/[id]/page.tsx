import { notFound, redirect } from "next/navigation";
import TrekForm from "@/components/admin/TrekForm";
import { getTrekByIdForAdmin } from "@/lib/data/treks";
import { updateTrekAction } from "@/lib/actions/treks";
import { getAllRegionsForAdmin } from "@/lib/data/regions";
import { getAllCategoriesForAdmin } from "@/lib/data/categories";
import { USE_DB } from "@/lib/db";

export default async function EditTrekPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!USE_DB) redirect("/admin/treks");

  const { id } = await params;
  const [trek, regions, categories] = await Promise.all([
    getTrekByIdForAdmin(id),
    getAllRegionsForAdmin(),
    getAllCategoriesForAdmin(),
  ]);
  if (!trek) notFound();

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl font-semibold text-navy-950">Edit Trek</h1>
      <p className="mt-1 text-sm text-stone-600">{trek.name}</p>
      <div className="mt-8">
        <TrekForm action={updateTrekAction} defaultValues={trek} regions={regions} categories={categories} submitLabel="Save Changes" />
      </div>
    </div>
  );
}
