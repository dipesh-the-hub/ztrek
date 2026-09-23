"use client";

import { useActionState } from "react";
import { Field, TextInput, TextArea, Checkbox } from "@/components/admin/FormField";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { Button } from "@/components/ui/Button";
import type { GuideFormState } from "@/lib/actions/guides";

interface GuideFormProps {
  action: (state: GuideFormState, formData: FormData) => Promise<GuideFormState>;
  defaultValues?: {
    id?: string;
    name: string;
    role: string;
    years: string;
    languages: string;
    bio: string;
    photoUrl?: string | null;
    published?: boolean;
  };
  submitLabel: string;
  onSuccess?: () => void;
}

export default function GuideForm({ action, defaultValues, submitLabel, onSuccess }: GuideFormProps) {
  const [state, formAction, pending] = useActionState(async (prev: GuideFormState, formData: FormData) => {
    const result = await action(prev, formData);
    if (!result.error) onSuccess?.();
    return result;
  }, {});

  return (
    <form action={formAction} className="space-y-4">
      {defaultValues?.id && <input type="hidden" name="id" value={defaultValues.id} />}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name" htmlFor="name">
          <TextInput id="name" name="name" required defaultValue={defaultValues?.name} />
        </Field>
        <Field label="Role" htmlFor="role">
          <TextInput id="role" name="role" required defaultValue={defaultValues?.role} />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Years of experience" htmlFor="years">
          <TextInput id="years" name="years" defaultValue={defaultValues?.years} />
        </Field>
        <Field label="Languages" htmlFor="languages">
          <TextInput id="languages" name="languages" defaultValue={defaultValues?.languages} />
        </Field>
      </div>
      <Field label="Bio" htmlFor="bio">
        <TextArea id="bio" name="bio" required rows={4} className="font-sans" defaultValue={defaultValues?.bio} />
      </Field>
      <Field label="Photo" htmlFor="photoUrl" hint="Optional — falls back to initials if left blank">
        <ImageUploadField name="photoUrl" defaultValue={defaultValues?.photoUrl ?? ""} />
      </Field>
      <Checkbox label="Published (visible on site)" name="published" defaultChecked={defaultValues?.published ?? true} />

      {state.error && <p className="text-sm text-danger">{state.error}</p>}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : submitLabel}
      </Button>
    </form>
  );
}
