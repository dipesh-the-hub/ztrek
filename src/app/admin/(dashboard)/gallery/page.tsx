import { getAllGalleryPhotosForAdmin } from "@/lib/data/gallery";
import { createGalleryPhotoAction } from "@/lib/actions/gallery";
import { USE_DB } from "@/lib/db";
import GalleryPhotoRow from "@/components/admin/GalleryPhotoRow";
import GalleryPhotoForm from "@/components/admin/GalleryPhotoForm";

export default async function AdminGalleryPage() {
  const photos = await getAllGalleryPhotosForAdmin();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-950">Gallery</h1>
      <p className="mt-1 text-sm text-stone-600">
        Photos in the &ldquo;Views you walk for&rdquo; section on the homepage. The first photo is shown large; three or five photos fill the layout best.
      </p>

      <div className="mt-8 space-y-4">
        {photos.map((p) => (
          <GalleryPhotoRow key={p.id} photo={p} />
        ))}
      </div>

      {USE_DB && (
        <div className="mt-10 rounded-2xl border border-dashed border-stone-300 bg-white p-5">
          <h2 className="font-display text-lg font-semibold text-navy-950">Add a photo</h2>
          <div className="mt-4">
            <GalleryPhotoForm action={createGalleryPhotoAction} submitLabel="Add Photo" />
          </div>
        </div>
      )}
    </div>
  );
}
