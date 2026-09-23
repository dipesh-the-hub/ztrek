"use client";

import { useState } from "react";
import { useActionState } from "react";
import { PencilSimple, Lock } from "@phosphor-icons/react";
import { Field, TextInput, Checkbox } from "@/components/admin/FormField";
import { Button } from "@/components/ui/Button";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import { updateNavItemAction, deleteNavItemAction, type NavItemFormState } from "@/lib/actions/navItems";
import type { NavItemData } from "@/lib/data/navItems";

const TYPE_DESCRIPTIONS: Record<string, string> = {
  home: "Links to the homepage.",
  about: "Opens the \"About Us\" dropdown menu.",
  treks: "Opens the Treks & Regions mega menu, built from your live trek data.",
  travellerInfo: "Opens the \"Traveller's Info\" dropdown menu.",
  link: "Plain link.",
};

export default function NavItemRow({ item }: { item: NavItemData }) {
  const [editing, setEditing] = useState(false);
  const isProtected = item.type !== "link";

  const [state, formAction, pending] = useActionState<NavItemFormState, FormData>(
    async (prev, formData) => {
      const result = await updateNavItemAction(prev, formData);
      if (!result.error) setEditing(false);
      return result;
    },
    {}
  );

  if (editing) {
    return (
      <div className="rounded-2xl border border-navy-700/30 bg-white p-5">
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="id" value={item.id} />
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Label" htmlFor={`label-${item.id}`}>
              <TextInput id={`label-${item.id}`} name="label" required defaultValue={item.label} />
            </Field>
            {!isProtected && (
              <Field label="Link" htmlFor={`href-${item.id}`} hint='e.g. "/gallery" or "https://example.com"'>
                <TextInput id={`href-${item.id}`} name="href" required defaultValue={item.href ?? ""} />
              </Field>
            )}
          </div>
          <div className="grid sm:grid-cols-2 gap-4 items-end">
            <Field label="Sort order" htmlFor={`sortOrder-${item.id}`} hint="Lower numbers appear first">
              <TextInput id={`sortOrder-${item.id}`} name="sortOrder" type="number" defaultValue={item.sortOrder} className="max-w-32" />
            </Field>
            <Checkbox name="visible" label="Visible in menu" defaultChecked={item.visible} />
          </div>

          {state.error && <p className="text-sm text-danger">{state.error}</p>}

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={pending}>
              {pending ? "Saving…" : "Save Changes"}
            </Button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="text-xs font-semibold text-stone-500 hover:text-navy-900 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-stone-300/60 bg-white p-5 flex items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <p className="font-semibold text-navy-950">{item.label}</p>
          {isProtected && <Lock size={13} className="text-stone-400" aria-hidden="true" />}
          {!item.visible && (
            <span className="text-xs font-semibold text-gold-600 bg-gold-100 rounded-full px-2 py-0.5">Hidden</span>
          )}
        </div>
        <p className="mt-1 text-xs text-stone-500">
          {item.href ? item.href : TYPE_DESCRIPTIONS[item.type]}
        </p>
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
        {!isProtected && (
          <form>
            <ConfirmDeleteButton
              action={deleteNavItemAction.bind(null, item.id)}
              confirmMessage={`Remove "${item.label}" from the menu?`}
            />
          </form>
        )}
      </div>
    </div>
  );
}
