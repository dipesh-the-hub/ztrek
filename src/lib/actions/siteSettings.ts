"use server";

import { revalidatePath } from "next/cache";
import { prisma, USE_DB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export interface SiteSettingsFormState {
  error?: string;
  success?: boolean;
}

function checked(formData: FormData, name: string) {
  return formData.get(name) === "on";
}

export async function updateSiteSettingsAction(
  _prevState: SiteSettingsFormState,
  formData: FormData
): Promise<SiteSettingsFormState> {
  await requireAdmin();
  if (!USE_DB) return { error: "No database connected." };

  const heroEyebrow = String(formData.get("heroEyebrow") ?? "").trim();
  const heroHeadline = String(formData.get("heroHeadline") ?? "").trim();
  const heroSubheadline = String(formData.get("heroSubheadline") ?? "").trim();
  const heroImage = String(formData.get("heroImage") ?? "").trim();

  if (!heroHeadline || !heroSubheadline || !heroImage) {
    return { error: "Headline, subheadline and hero image are required." };
  }

  const data = {
    heroEyebrow,
    heroHeadline,
    heroSubheadline,
    heroImage,
    heroPrimaryCtaLabel: String(formData.get("heroPrimaryCtaLabel") ?? "").trim(),
    heroPrimaryCtaHref: String(formData.get("heroPrimaryCtaHref") ?? "").trim(),
    heroSecondaryCtaLabel: String(formData.get("heroSecondaryCtaLabel") ?? "").trim(),
    heroSecondaryCtaHref: String(formData.get("heroSecondaryCtaHref") ?? "").trim(),
    heroRatingValue: String(formData.get("heroRatingValue") ?? "").trim(),
    heroRatingLabel: String(formData.get("heroRatingLabel") ?? "").trim(),
    heroBadge1: String(formData.get("heroBadge1") ?? "").trim(),
    heroBadge2: String(formData.get("heroBadge2") ?? "").trim(),
    showWhyChooseUs: checked(formData, "showWhyChooseUs"),
    showTopTreks: checked(formData, "showTopTreks"),
    showTestimonials: checked(formData, "showTestimonials"),
    showGuides: checked(formData, "showGuides"),
    showTripPlannerCta: checked(formData, "showTripPlannerCta"),
    showBlogPreview: checked(formData, "showBlogPreview"),
    showFaq: checked(formData, "showFaq"),
    showFinalCta: checked(formData, "showFinalCta"),
    showGallery: checked(formData, "showGallery"),
  };

  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: data,
    create: { id: "main", ...data },
  });

  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
  return { success: true };
}
