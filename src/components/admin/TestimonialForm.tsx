"use client";

import { useActionState } from "react";
import { Field, TextInput, TextArea, Select, Checkbox } from "@/components/admin/FormField";
import { Button } from "@/components/ui/Button";
import type { TestimonialFormState } from "@/lib/actions/testimonials";

interface TestimonialFormProps {
  action: (state: TestimonialFormState, formData: FormData) => Promise<TestimonialFormState>;
  defaultValues?: {
    id?: string;
    name: string;
    location: string;
    trek: string;
    rating: number;
    quote: string;
    published?: boolean;
  };
  submitLabel: string;
  onSuccess?: () => void;
}

export default function TestimonialForm({ action, defaultValues, submitLabel, onSuccess }: TestimonialFormProps) {
  const [state, formAction, pending] = useActionState(async (prev: TestimonialFormState, formData: FormData) => {
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
        <Field label="Location" htmlFor="location">
          <TextInput id="location" name="location" defaultValue={defaultValues?.location} />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Trek" htmlFor="trek">
          <TextInput id="trek" name="trek" defaultValue={defaultValues?.trek} />
        </Field>
        <Field label="Rating" htmlFor="rating">
          <Select id="rating" name="rating" defaultValue={String(defaultValues?.rating ?? 5)}>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>{n} stars</option>
            ))}
          </Select>
        </Field>
      </div>
      <Field label="Quote" htmlFor="quote">
        <TextArea id="quote" name="quote" required rows={4} className="font-sans" defaultValue={defaultValues?.quote} />
      </Field>
      <Checkbox label="Published (visible on site)" name="published" defaultChecked={defaultValues?.published ?? true} />

      {state.error && <p className="text-sm text-danger">{state.error}</p>}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : submitLabel}
      </Button>
    </form>
  );
}
