import { redirect } from "next/navigation";
import TrekForm from "@/components/admin/TrekForm";
import { createTrekAction } from "@/lib/actions/treks";
import { getAllRegionsForAdmin } from "@/lib/data/regions";
import { getAllCategoriesForAdmin } from "@/lib/data/categories";
import { USE_DB } from "@/lib/db";

export default async function NewTrekPage() {
  if (!USE_DB) redirect("/admin/treks");

  const [regions, categories] = await Promise.all([
    getAllRegionsForAdmin(),
    getAllCategoriesForAdmin(),
  ]);

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl font-semibold text-navy-950">New Trek</h1>
      <p className="mt-1 text-sm text-stone-600">Fill in the details below to add a new trek package.</p>
      <div className="mt-8">
        <TrekForm action={createTrekAction} regions={regions} categories={categories} submitLabel="Create Trek" />
      </div>
    </div>
  );
}
