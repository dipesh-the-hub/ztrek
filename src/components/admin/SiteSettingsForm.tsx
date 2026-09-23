"use client";

import { useActionState } from "react";
import { Field, TextInput, TextArea, Checkbox } from "@/components/admin/FormField";
import { Button } from "@/components/ui/Button";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { updateSiteSettingsAction, type SiteSettingsFormState } from "@/lib/actions/siteSettings";
import type { SiteSettingsData } from "@/lib/data/siteSettings";

const sectionToggles: { name: keyof SiteSettingsData; label: string }[] = [
  { name: "showWhyChooseUs", label: "\"Why Choose Us\" feature grid" },
  { name: "showTopTreks", label: "Featured treks grid" },
  { name: "showTestimonials", label: "Guest reviews / testimonials" },
  { name: "showGuides", label: "Meet our guides" },
  { name: "showTripPlannerCta", label: "Trip planner call-to-action banner" },
  { name: "showBlogPreview", label: "Latest from the blog" },
  { name: "showFaq", label: "Frequently asked questions" },
  { name: "showFinalCta", label: "Final \"Ready to feel the mountain vibe\" section" },
];

export default function SiteSettingsForm({ settings }: { settings: SiteSettingsData }) {
  const [state, formAction, pending] = useActionState<SiteSettingsFormState, FormData>(
    updateSiteSettingsAction,
    {}
  );

  return (
    <form action={formAction} className="space-y-10">
      <section>
        <h2 className="font-display text-lg font-semibold text-navy-950">Hero Section</h2>
        <p className="mt-1 text-sm text-stone-600">
          The first thing visitors see when they open the homepage.
        </p>
        <div className="mt-5 space-y-4">
          <Field label="Eyebrow text" htmlFor="heroEyebrow" hint="Small uppercase line above the headline">
            <TextInput id="heroEyebrow" name="heroEyebrow" defaultValue={settings.heroEyebrow} />
          </Field>
          <Field label="Headline" htmlFor="heroHeadline">
            <TextInput id="heroHeadline" name="heroHeadline" required defaultValue={settings.heroHeadline} />
          </Field>
          <Field label="Subheadline" htmlFor="heroSubheadline">
            <TextArea id="heroSubheadline" name="heroSubheadline" rows={3} className="font-sans" required defaultValue={settings.heroSubheadline} />
          </Field>
          <Field label="Hero background image" htmlFor="heroImage" hint="Full-width photo behind the headline">
            <ImageUploadField name="heroImage" defaultValue={settings.heroImage} />
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Primary button text" htmlFor="heroPrimaryCtaLabel">
              <TextInput id="heroPrimaryCtaLabel" name="heroPrimaryCtaLabel" defaultValue={settings.heroPrimaryCtaLabel} />
            </Field>
            <Field label="Primary button link" htmlFor="heroPrimaryCtaHref">
              <TextInput id="heroPrimaryCtaHref" name="heroPrimaryCtaHref" defaultValue={settings.heroPrimaryCtaHref} />
            </Field>
            <Field label="Secondary button text" htmlFor="heroSecondaryCtaLabel">
              <TextInput id="heroSecondaryCtaLabel" name="heroSecondaryCtaLabel" defaultValue={settings.heroSecondaryCtaLabel} />
            </Field>
            <Field label="Secondary button link" htmlFor="heroSecondaryCtaHref">
              <TextInput id="heroSecondaryCtaHref" name="heroSecondaryCtaHref" defaultValue={settings.heroSecondaryCtaHref} />
            </Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Rating value" htmlFor="heroRatingValue" hint='e.g. "4.9/5"'>
              <TextInput id="heroRatingValue" name="heroRatingValue" defaultValue={settings.heroRatingValue} />
            </Field>
            <Field label="Rating label" htmlFor="heroRatingLabel" hint='e.g. "guest rating"'>
              <TextInput id="heroRatingLabel" name="heroRatingLabel" defaultValue={settings.heroRatingLabel} />
            </Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Trust badge 1" htmlFor="heroBadge1">
              <TextInput id="heroBadge1" name="heroBadge1" defaultValue={settings.heroBadge1} />
            </Field>
            <Field label="Trust badge 2" htmlFor="heroBadge2">
              <TextInput id="heroBadge2" name="heroBadge2" defaultValue={settings.heroBadge2} />
            </Field>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-navy-950">Homepage Sections</h2>
        <p className="mt-1 text-sm text-stone-600">
          Turn sections on or off. They always appear in this order — the hero is always shown first.
        </p>
        <div className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-1 rounded-2xl border border-stone-300/60 bg-white p-5">
          {sectionToggles.map(({ name, label }) => (
            <Checkbox
              key={name}
              name={name}
              label={label}
              defaultChecked={Boolean(settings[name])}
            />
          ))}
        </div>
      </section>

      {state.error && <p className="text-sm text-danger">{state.error}</p>}
      {state.success && <p className="text-sm text-success">Saved — changes are live on the homepage.</p>}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save Changes"}
      </Button>
    </form>
  );
}
