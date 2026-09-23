"use client";

import { Trash } from "@phosphor-icons/react";

export default function ConfirmDeleteButton({
  action,
  confirmMessage = "Delete this item? This can't be undone.",
}: {
  action: (formData: FormData) => void | Promise<void>;
  confirmMessage?: string;
}) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
      formAction={action}
      className="flex items-center gap-1.5 text-sm font-semibold text-danger hover:underline cursor-pointer"
    >
      <Trash size={15} aria-hidden="true" />
      Delete
    </button>
  );
}
