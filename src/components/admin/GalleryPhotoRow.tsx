"use client";

import { useState } from "react";
import Image from "next/image";
import { PencilSimple } from "@phosphor-icons/react";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import GalleryPhotoForm from "@/components/admin/GalleryPhotoForm";
import { updateGalleryPhotoAction, deleteGalleryPhotoAction } from "@/lib/actions/gallery";

interface GalleryPhotoRowProps {
  photo: {
    id: string;
    imageUrl: string;
    alt: string;
    title: string;
    detail: string;
    sortOrder: number;
    published: boolean;
  };
}

export default function GalleryPhotoRow({ photo }: GalleryPhotoRowProps) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <div className="rounded-2xl border border-navy-700/30 bg-white p-5">
        <GalleryPhotoForm
          action={updateGalleryPhotoAction}
          defaultValues={photo}
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
    <div className="rounded-2xl border border-stone-300/60 bg-white p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 min-w-0">
        <div className="relative h-16 w-24 shrink-0 rounded-lg overflow-hidden bg-stone-100 border border-stone-300">
          <Image src={photo.imageUrl} alt="" fill sizes="96px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-navy-950 truncate">{photo.title}</p>
            {!photo.published && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-200 text-stone-600">Draft</span>
            )}
          </div>
          <p className="text-xs text-stone-500 truncate">
            Order {photo.sortOrder}
            {photo.detail && ` · ${photo.detail}`}
          </p>
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
          <ConfirmDeleteButton action={deleteGalleryPhotoAction.bind(null, photo.id)} />
        </form>
      </div>
    </div>
  );
}
