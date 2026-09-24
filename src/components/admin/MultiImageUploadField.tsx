"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Plus, Spinner, UploadSimple, X } from "@phosphor-icons/react";
import { uploadImageAction } from "@/lib/actions/upload";
import { prepareImageUpload } from "@/lib/prepareImageUpload";
import { TextInput } from "@/components/admin/FormField";

/**
 * A list of image URLs with thumbnails. Photos can be uploaded (several at
 * once), added by pasting a link, reordered and removed. Submits as one
 * hidden field with one URL per line, the format the trek actions parse.
 */
export default function MultiImageUploadField({
  name,
  defaultValue = [],
}: {
  name: string;
  defaultValue?: string[];
}) {
  const [urls, setUrls] = useState<string[]>(defaultValue);
  const [pending, setPending] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [link, setLink] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: File[]) {
    setErrors([]);
    setPending(files.length);
    // One at a time keeps each request under the upload size limit and the order stable.
    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append("file", await prepareImageUpload(file));
        const result = await uploadImageAction(formData);
        if (result.url) {
          const url = result.url;
          setUrls((prev) => [...prev, url]);
        } else {
          setErrors((prev) => [...prev, `${file.name}: ${result.error ?? "Upload failed."}`]);
        }
      } catch {
        setErrors((prev) => [...prev, `${file.name}: Upload failed. Try again or use a smaller photo.`]);
      }
      setPending((n) => n - 1);
    }
  }

  function addLink() {
    const url = link.trim();
    if (!url) return;
    setUrls((prev) => [...prev, url]);
    setLink("");
  }

  function move(index: number, by: -1 | 1) {
    setUrls((prev) => {
      const next = [...prev];
      [next[index], next[index + by]] = [next[index + by], next[index]];
      return next;
    });
  }

  const iconButton =
    "grid place-items-center h-7 w-7 rounded-full bg-navy-950/75 text-white hover:bg-navy-950 disabled:opacity-30 cursor-pointer disabled:cursor-default";

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={urls.join("\n")} />

      {urls.length > 0 && (
        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {urls.map((url, i) => (
            <li key={url + i} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-stone-300 bg-stone-100">
              <Image src={url} alt={`Gallery photo ${i + 1}`} fill sizes="200px" className="object-cover" />
              <span className="absolute left-1.5 top-1.5 rounded-full bg-navy-950/75 px-2 py-0.5 text-[11px] font-semibold text-white">
                {i + 1}
              </span>
              <button type="button" onClick={() => setUrls((prev) => prev.filter((_, j) => j !== i))} aria-label={`Remove photo ${i + 1}`} className={`absolute right-1.5 top-1.5 ${iconButton}`}>
                <X size={14} weight="bold" aria-hidden="true" />
              </button>
              <div className="absolute inset-x-1.5 bottom-1.5 flex justify-between">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label={`Move photo ${i + 1} earlier`} className={iconButton}>
                  <ArrowLeft size={14} weight="bold" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === urls.length - 1} aria-label={`Move photo ${i + 1} later`} className={iconButton}>
                  <ArrowRight size={14} weight="bold" aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={pending > 0}
          className="flex items-center gap-1.5 min-h-11 px-4 rounded-lg border border-stone-300 text-sm font-semibold text-navy-900 hover:bg-navy-50 cursor-pointer disabled:opacity-60"
        >
          {pending > 0 ? (
            <Spinner size={16} className="animate-spin" aria-hidden="true" />
          ) : (
            <UploadSimple size={16} aria-hidden="true" />
          )}
          {pending > 0 ? `Uploading ${pending} photo${pending > 1 ? "s" : ""}…` : "Upload photos"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            const files = Array.from(e.target.files ?? []);
            e.target.value = "";
            if (files.length) handleFiles(files);
          }}
        />
        <div className="flex flex-1 min-w-60 gap-2">
          <TextInput
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addLink();
              }
            }}
            placeholder="…or paste an image link"
            aria-label="Image link to add"
          />
          <button
            type="button"
            onClick={addLink}
            className="shrink-0 flex items-center gap-1 min-h-11 px-3 rounded-lg border border-stone-300 text-sm font-semibold text-navy-900 hover:bg-navy-50 cursor-pointer"
          >
            <Plus size={14} aria-hidden="true" />
            Add
          </button>
        </div>
      </div>

      {errors.map((err) => (
        <p key={err} className="text-xs text-danger">{err}</p>
      ))}
    </div>
  );
}
