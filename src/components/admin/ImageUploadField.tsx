"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { UploadSimple, Spinner } from "@phosphor-icons/react";
import { uploadImageAction } from "@/lib/actions/upload";
import { TextInput } from "@/components/admin/FormField";

export default function ImageUploadField({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setStatus("uploading");
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    const result = await uploadImageAction(formData);
    if (result.url) {
      setUrl(result.url);
      setStatus("idle");
    } else {
      setError(result.error ?? "Upload failed.");
      setStatus("error");
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <TextInput
          type="text"
          name={name}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https:// or upload below"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={status === "uploading"}
          className="shrink-0 flex items-center gap-1.5 min-h-11 px-4 rounded-lg border border-stone-300 text-sm font-semibold text-navy-900 hover:bg-navy-50 cursor-pointer disabled:opacity-60"
        >
          {status === "uploading" ? (
            <Spinner size={16} className="animate-spin" aria-hidden="true" />
          ) : (
            <UploadSimple size={16} aria-hidden="true" />
          )}
          Upload
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>
      {error && <p className="text-xs text-danger">{error}</p>}
      {url && (
        <div className="relative h-24 w-36 rounded-lg overflow-hidden border border-stone-300 bg-stone-100">
          <Image src={url} alt="" fill sizes="144px" className="object-cover" />
        </div>
      )}
    </div>
  );
}
