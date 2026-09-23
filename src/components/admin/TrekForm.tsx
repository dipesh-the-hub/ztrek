"use client";

import { useActionState } from "react";
import { Field, TextInput, TextArea, Select, Checkbox } from "@/components/admin/FormField";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { Button } from "@/components/ui/Button";
import type { Trek, Region, Category } from "@/lib/treks";

interface TrekFormProps {
  action: (state: unknown, formData: FormData) => Promise<{ error?: string } | undefined>;
  defaultValues?: Trek & { id?: string; published?: boolean };
  regions: Region[];
  categories: Category[];
  submitLabel: string;
}

const DIFFICULTIES = ["Easy", "Moderate", "Challenging", "Strenuous"];

export default function TrekForm({ action, defaultValues, regions, categories, submitLabel }: TrekFormProps) {
  const [state, formAction, pending] = useActionState(action, undefined);

  const itineraryText = defaultValues?.itinerary
    .map((d) => `${d.day} | ${d.title} | ${d.detail}`)
    .join("\n");
  const faqsText = defaultValues?.faqs.map((f) => `${f.q} | ${f.a}`).join("\n");

  return (
    <form action={formAction} className="space-y-8">
      {defaultValues?.id && <input type="hidden" name="id" value={defaultValues.id} />}

      <section className="space-y-4">
        <h2 className="font-display text-lg font-semibold text-navy-950">Basics</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Trek name" htmlFor="name">
            <TextInput id="name" name="name" required defaultValue={defaultValues?.name} />
          </Field>
          <Field label="Slug" htmlFor="slug" hint="Used in the URL: /treks/your-slug">
            <TextInput id="slug" name="slug" required defaultValue={defaultValues?.slug} />
          </Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Region" htmlFor="regionSlug" hint="Manage the list at Admin → Regions">
            <Select id="regionSlug" name="regionSlug" defaultValue={defaultValues?.regionSlug ?? regions[0]?.slug}>
              {regions.map((r) => (
                <option key={r.slug} value={r.slug}>{r.label}</option>
              ))}
            </Select>
          </Field>
          <Field label="Category" htmlFor="categorySlug" hint="Manage the list at Admin → Categories">
            <Select id="categorySlug" name="categorySlug" defaultValue={defaultValues?.categorySlug ?? categories[0]?.slug}>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>{c.label}</option>
              ))}
            </Select>
          </Field>
        </div>
        <Field label="Tagline" htmlFor="tagline">
          <TextInput id="tagline" name="tagline" defaultValue={defaultValues?.tagline} />
        </Field>
        <Field label="Hero image" htmlFor="heroImage">
          <ImageUploadField name="heroImage" defaultValue={defaultValues?.heroImage} />
        </Field>
        <Field label="Gallery images" htmlFor="gallery" hint="One image URL per line">
          <TextArea id="gallery" name="gallery" rows={3} defaultValue={defaultValues?.gallery.join("\n")} />
        </Field>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg font-semibold text-navy-950">Quick Facts</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Duration" htmlFor="duration" hint='e.g. "14 Days"'>
            <TextInput id="duration" name="duration" required defaultValue={defaultValues?.duration} />
          </Field>
          <Field label="Duration (days, number)" htmlFor="durationDays">
            <TextInput id="durationDays" name="durationDays" type="number" required defaultValue={defaultValues?.durationDays} />
          </Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Max altitude" htmlFor="maxAltitude" hint='e.g. "5,545 m / 18,192 ft"'>
            <TextInput id="maxAltitude" name="maxAltitude" defaultValue={defaultValues?.maxAltitude} />
          </Field>
          <Field label="Difficulty" htmlFor="difficulty">
            <Select id="difficulty" name="difficulty" defaultValue={defaultValues?.difficulty ?? "Moderate"}>
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </Select>
          </Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Best season" htmlFor="bestSeason">
            <TextInput id="bestSeason" name="bestSeason" defaultValue={defaultValues?.bestSeason} />
          </Field>
          <Field label="Group size" htmlFor="groupSize">
            <TextInput id="groupSize" name="groupSize" defaultValue={defaultValues?.groupSize} />
          </Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Price from (USD)" htmlFor="priceFrom">
            <TextInput id="priceFrom" name="priceFrom" type="number" required defaultValue={defaultValues?.priceFrom} />
          </Field>
          <div className="flex flex-col justify-end gap-3 pb-1.5">
            <Checkbox label="Restricted area (requires special permit)" name="restrictedArea" defaultChecked={defaultValues?.restrictedArea} />
            <Checkbox label="Published (visible on site)" name="published" defaultChecked={defaultValues?.published ?? true} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg font-semibold text-navy-950">Content</h2>
        <Field label="Short description" htmlFor="shortDescription" hint="Shown on trek cards, 1-2 sentences">
          <TextArea id="shortDescription" name="shortDescription" required rows={2} className="font-sans" defaultValue={defaultValues?.shortDescription} />
        </Field>
        <Field label="Overview" htmlFor="overview" hint="Main trek description paragraph">
          <TextArea id="overview" name="overview" required rows={5} className="font-sans" defaultValue={defaultValues?.overview} />
        </Field>
        <Field label="Highlights" htmlFor="highlights" hint="One per line">
          <TextArea id="highlights" name="highlights" rows={4} defaultValue={defaultValues?.highlights.join("\n")} />
        </Field>
        <Field label="Permits required" htmlFor="permits" hint="One per line">
          <TextArea id="permits" name="permits" rows={2} defaultValue={defaultValues?.permits.join("\n")} />
        </Field>
        <Field
          label="Itinerary"
          htmlFor="itinerary"
          hint='One day per line, format: Day 1 | Title | Detail description'
        >
          <TextArea id="itinerary" name="itinerary" rows={8} defaultValue={itineraryText} />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Cost includes" htmlFor="included" hint="One per line">
            <TextArea id="included" name="included" rows={4} defaultValue={defaultValues?.included.join("\n")} />
          </Field>
          <Field label="Cost excludes" htmlFor="excluded" hint="One per line">
            <TextArea id="excluded" name="excluded" rows={4} defaultValue={defaultValues?.excluded.join("\n")} />
          </Field>
        </div>
        <Field label="FAQs" htmlFor="faqs" hint="One per line, format: Question | Answer">
          <TextArea id="faqs" name="faqs" rows={4} defaultValue={faqsText} />
        </Field>
      </section>

      {state?.error && <p className="text-sm text-danger">{state.error}</p>}

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Saving…" : submitLabel}
      </Button>
    </form>
  );
}
