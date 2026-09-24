"use client";

import { useActionState, useState } from "react";
import { Field, TextInput, Checkbox } from "@/components/admin/FormField";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { Button } from "@/components/ui/Button";
import type { GalleryPhotoFormState } from "@/lib/actions/gallery";

interface GalleryPhotoFormProps {
  action: (state: GalleryPhotoFormState, formData: FormData) => Promise<GalleryPhotoFormState>;
  defaultValues?: {
    id?: string;
    imageUrl: string;
    alt: string;
    title: string;
    detail: string;
    sortOrder: number;
    published?: boolean;
  };
  submitLabel: string;
  onSuccess?: () => void;
}

export default function GalleryPhotoForm({ action, defaultValues, submitLabel, onSuccess }: GalleryPhotoFormProps) {
  // Remounting clears the photo preview, which the upload field keeps in its own state.
  const [formKey, setFormKey] = useState(0);
  const [state, formAction, pending] = useActionState(async (prev: GalleryPhotoFormState, formData: FormData) => {
    const result = await action(prev, formData);
    if (!result.error) {
      if (!defaultValues?.id) setFormKey((k) => k + 1);
      onSuccess?.();
    }
    return result;
  }, {});

  const idSuffix = defaultValues?.id ?? "new";

  return (
    <form key={formKey} action={formAction} className="space-y-4">
      {defaultValues?.id && <input type="hidden" name="id" value={defaultValues.id} />}
      <Field label="Photo" htmlFor={`imageUrl-${idSuffix}`} hint="Landscape photos work best. The first photo is shown large.">
        <ImageUploadField name="imageUrl" defaultValue={defaultValues?.imageUrl ?? ""} />
      </Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Title" htmlFor={`title-${idSuffix}`}>
          <TextInput id={`title-${idSuffix}`} name="title" required placeholder="Gosaikunda Lake" defaultValue={defaultValues?.title} />
        </Field>
        <Field label="Caption" htmlFor={`detail-${idSuffix}`} hint="Optional — region, altitude…">
          <TextInput id={`detail-${idSuffix}`} name="detail" placeholder="Langtang · 4,380 m" defaultValue={defaultValues?.detail} />
        </Field>
      </div>
      <div className="grid sm:grid-cols-[1fr_10rem] gap-4">
        <Field label="Photo description" htmlFor={`alt-${idSuffix}`} hint="What the photo shows, for screen readers and Google">
          <TextInput id={`alt-${idSuffix}`} name="alt" required defaultValue={defaultValues?.alt} />
        </Field>
        <Field label="Order" htmlFor={`sortOrder-${idSuffix}`} hint="Lower shows first">
          <TextInput id={`sortOrder-${idSuffix}`} name="sortOrder" type="number" defaultValue={String(defaultValues?.sortOrder ?? 0)} />
        </Field>
      </div>
      <Checkbox label="Published (visible on site)" name="published" defaultChecked={defaultValues?.published ?? true} />

      {state.error && <p className="text-sm text-danger">{state.error}</p>}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : submitLabel}
      </Button>
    </form>
  );
}
