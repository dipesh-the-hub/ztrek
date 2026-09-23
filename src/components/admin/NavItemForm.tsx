"use client";

import { useActionState } from "react";
import { Field, TextInput } from "@/components/admin/FormField";
import { Button } from "@/components/ui/Button";
import { createNavLinkAction, type NavItemFormState } from "@/lib/actions/navItems";

export default function NavItemForm({ nextSortOrder }: { nextSortOrder: number }) {
  const [state, formAction, pending] = useActionState<NavItemFormState, FormData>(
    createNavLinkAction,
    {}
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Label" htmlFor="label" hint='e.g. "Gallery"'>
          <TextInput id="label" name="label" required />
        </Field>
        <Field label="Link" htmlFor="href" hint='e.g. "/gallery" or "https://example.com"'>
          <TextInput id="href" name="href" required />
        </Field>
      </div>
      <input type="hidden" name="sortOrder" value={nextSortOrder} />

      {state.error && <p className="text-sm text-danger">{state.error}</p>}

      <Button type="submit" disabled={pending}>
        {pending ? "Adding…" : "Add Menu Link"}
      </Button>
    </form>
  );
}
