"use client";

import { useState } from "react";
import { PencilSimple } from "@phosphor-icons/react";
import Avatar from "@/components/ui/Avatar";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import GuideForm from "@/components/admin/GuideForm";
import { updateGuideAction, deleteGuideAction } from "@/lib/actions/guides";

interface GuideRowProps {
  guide: {
    id: string;
    name: string;
    role: string;
    years: string;
    languages: string;
    bio: string;
    photoUrl: string | null;
    published: boolean;
  };
}

export default function GuideRow({ guide }: GuideRowProps) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <div className="rounded-2xl border border-navy-700/30 bg-white p-5">
        <GuideForm action={updateGuideAction} defaultValues={guide} submitLabel="Save Changes" onSuccess={() => setEditing(false)} />
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
      <div className="flex items-start gap-4">
        <Avatar initials={guide.name.slice(0, 2).toUpperCase()} className="h-12 w-12 text-base" />
        <div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-navy-950">{guide.name}</p>
            {!guide.published && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-200 text-stone-600">Draft</span>
            )}
          </div>
          <p className="text-xs text-gold-600 font-semibold">{guide.role}</p>
          <p className="mt-2 text-sm text-stone-700 leading-relaxed max-w-xl">{guide.bio}</p>
          <p className="mt-2 text-xs text-stone-500">{guide.years} · {guide.languages}</p>
        </div>
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
          <ConfirmDeleteButton action={deleteGuideAction.bind(null, guide.id)} />
        </form>
      </div>
    </div>
  );
}
