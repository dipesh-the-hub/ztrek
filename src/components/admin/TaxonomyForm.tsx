"use client";

import { useActionState } from "react";
import { Field, TextInput, TextArea } from "@/components/admin/FormField";
import { Button } from "@/components/ui/Button";

interface TaxonomyFormState {
  error?: string;
}

interface TaxonomyFormProps {
  action: (state: TaxonomyFormState, formData: FormData) => Promise<TaxonomyFormState>;
  defaultValues?: {
    id?: string;
    slug: string;
    label: string;
    blurb: string;
    sortOrder?: number;
  };
  slugHint: string;
  submitLabel: string;
  onSuccess?: () => void;
}

export default function TaxonomyForm({
  action,
  defaultValues,
  slugHint,
  submitLabel,
  onSuccess,
}: TaxonomyFormProps) {
  const [state, formAction, pending] = useActionState(async (prev: TaxonomyFormState, formData: FormData) => {
    const result = await action(prev, formData);
    if (!result.error) onSuccess?.();
    return result;
  }, {});

  return (
    <form action={formAction} className="space-y-4">
      {defaultValues?.id && <input type="hidden" name="id" value={defaultValues.id} />}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name" htmlFor="label">
          <TextInput id="label" name="label" required defaultValue={defaultValues?.label} />
        </Field>
        <Field label="Slug" htmlFor="slug" hint={slugHint}>
          <TextInput id="slug" name="slug" required defaultValue={defaultValues?.slug} />
        </Field>
      </div>
      <Field label="Short description" htmlFor="blurb" hint="One line, shown in menus and filters">
        <TextArea id="blurb" name="blurb" rows={2} className="font-sans" defaultValue={defaultValues?.blurb} />
      </Field>
      <Field label="Sort order" htmlFor="sortOrder" hint="Lower numbers appear first">
        <TextInput id="sortOrder" name="sortOrder" type="number" defaultValue={defaultValues?.sortOrder ?? 0} className="max-w-32" />
      </Field>

      {state.error && <p className="text-sm text-danger">{state.error}</p>}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : submitLabel}
      </Button>
    </form>
  );
}
