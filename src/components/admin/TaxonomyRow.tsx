"use client";

import { useState } from "react";
import { PencilSimple } from "@phosphor-icons/react";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import TaxonomyForm from "@/components/admin/TaxonomyForm";

interface TaxonomyItem {
  id: string;
  slug: string;
  label: string;
  blurb: string;
  sortOrder: number;
}

interface TaxonomyRowProps {
  item: TaxonomyItem;
  updateAction: (state: { error?: string }, formData: FormData) => Promise<{ error?: string }>;
  deleteAction: (id: string) => Promise<void>;
  slugHint: string;
  trekCount?: number;
}

export default function TaxonomyRow({ item, updateAction, deleteAction, slugHint, trekCount }: TaxonomyRowProps) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <div className="rounded-2xl border border-navy-700/30 bg-white p-5">
        <TaxonomyForm
          action={updateAction}
          defaultValues={item}
          slugHint={slugHint}
          submitLabel="Save Changes"
          onSuccess={() => setEditing(false)}
        />
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="mt-3 text-xs font-semibold text-stone-500 hover:text-navy-900 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-stone-300/60 bg-white p-5 flex items-start justify-between gap-4">
      <div>
        <p className="font-semibold text-navy-950">{item.label}</p>
        <p className="text-xs text-stone-500">/{item.slug}</p>
        {item.blurb && <p className="mt-2 text-sm text-stone-700 leading-relaxed max-w-xl">{item.blurb}</p>}
        {typeof trekCount === "number" && (
          <p className="mt-2 text-xs text-stone-500">{trekCount} trek{trekCount === 1 ? "" : "s"}</p>
        )}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-gold-600 cursor-pointer"
        >
          <PencilSimple size={15} aria-hidden="true" />
          Edit
        </button>
        <form>
          <ConfirmDeleteButton
            action={deleteAction.bind(null, item.id)}
            confirmMessage={
              trekCount
                ? `Delete "${item.label}"? ${trekCount} trek${trekCount === 1 ? "" : "s"} currently use it — they'll keep their existing label but won't match this filter anymore.`
                : `Delete "${item.label}"?`
            }
          />
        </form>
      </div>
    </div>
  );
}
