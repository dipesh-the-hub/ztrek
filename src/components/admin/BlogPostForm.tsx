"use client";

import { useActionState } from "react";
import { Field, TextInput, TextArea, Checkbox } from "@/components/admin/FormField";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { Button } from "@/components/ui/Button";
import { serializeContentBlocks } from "@/lib/content-format";
import type { BlogPost } from "@/lib/blog";

interface BlogPostFormProps {
  action: (state: unknown, formData: FormData) => Promise<{ error?: string } | undefined>;
  defaultValues?: BlogPost & { id?: string; published?: boolean };
  submitLabel: string;
}

export default function BlogPostForm({ action, defaultValues, submitLabel }: BlogPostFormProps) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="space-y-6">
      {defaultValues?.id && <input type="hidden" name="id" value={defaultValues.id} />}

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Title" htmlFor="title">
          <TextInput id="title" name="title" required defaultValue={defaultValues?.title} />
        </Field>
        <Field label="Slug" htmlFor="slug" hint="Used in the URL: /blog/your-slug">
          <TextInput id="slug" name="slug" required defaultValue={defaultValues?.slug} />
        </Field>
      </div>

      <Field label="Excerpt" htmlFor="excerpt" hint="Shown on blog cards and in search results">
        <TextArea id="excerpt" name="excerpt" required rows={2} className="font-sans" defaultValue={defaultValues?.excerpt} />
      </Field>

      <Field label="Cover image" htmlFor="coverImage">
        <ImageUploadField name="coverImage" defaultValue={defaultValues?.coverImage} />
      </Field>

      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Category" htmlFor="category">
          <TextInput id="category" name="category" defaultValue={defaultValues?.category} />
        </Field>
        <Field label="Author" htmlFor="author">
          <TextInput id="author" name="author" defaultValue={defaultValues?.author ?? "TrekVibe Nepal Team"} />
        </Field>
        <Field label="Read time" htmlFor="readTime" hint='e.g. "6 min read"'>
          <TextInput id="readTime" name="readTime" defaultValue={defaultValues?.readTime ?? "5 min read"} />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Publish date" htmlFor="date">
          <TextInput id="date" name="date" type="date" defaultValue={defaultValues?.date ?? new Date().toISOString().slice(0, 10)} />
        </Field>
        <Field label="SEO keywords" htmlFor="keywords" hint="One per line">
          <TextArea id="keywords" name="keywords" rows={2} defaultValue={defaultValues?.keywords.join("\n")} />
        </Field>
      </div>

      <Field
        label="Body content"
        htmlFor="content"
        hint='Headings start with "## ", bullet points start with "- ", everything else is a paragraph.'
      >
        <TextArea
          id="content"
          name="content"
          rows={16}
          defaultValue={defaultValues?.content ? serializeContentBlocks(defaultValues.content) : ""}
        />
      </Field>

      <Checkbox label="Published (visible on site)" name="published" defaultChecked={defaultValues?.published ?? true} />

      {state?.error && <p className="text-sm text-danger">{state.error}</p>}

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Saving…" : submitLabel}
      </Button>
    </form>
  );
}
