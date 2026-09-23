import { prisma, USE_DB } from "@/lib/db";

export interface SiteSettingsData {
  heroEyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroImage: string;
  heroPrimaryCtaLabel: string;
  heroPrimaryCtaHref: string;
  heroSecondaryCtaLabel: string;
  heroSecondaryCtaHref: string;
  heroRatingValue: string;
  heroRatingLabel: string;
  heroBadge1: string;
  heroBadge2: string;
  showWhyChooseUs: boolean;
  showTopTreks: boolean;
  showTestimonials: boolean;
  showGuides: boolean;
  showTripPlannerCta: boolean;
  showBlogPreview: boolean;
  showFaq: boolean;
  showFinalCta: boolean;
}

export const DEFAULT_SITE_SETTINGS: SiteSettingsData = {
  heroEyebrow: "Feel the Mountain Vibe — Kathmandu, Nepal",
  heroHeadline: "Trek the Himalaya with TrekVibe Nepal",
  heroSubheadline:
    "A Kathmandu-based trekking agency taking you from Everest Base Camp to the hidden valleys of Upper Dolpo — guided by certified local experts who know these trails as home.",
  heroImage: "/images/treks/everest-base-camp.jpg",
  heroPrimaryCtaLabel: "Explore Treks",
  heroPrimaryCtaHref: "/treks",
  heroSecondaryCtaLabel: "Plan a Custom Trek",
  heroSecondaryCtaHref: "/plan-your-trek",
  heroRatingValue: "4.9/5",
  heroRatingLabel: "guest rating",
  heroBadge1: "Government-licensed guides",
  heroBadge2: "25+ curated Himalayan routes",
  showWhyChooseUs: true,
  showTopTreks: true,
  showTestimonials: true,
  showGuides: true,
  showTripPlannerCta: true,
  showBlogPreview: true,
  showFaq: true,
  showFinalCta: true,
};

export async function getSiteSettings(): Promise<SiteSettingsData> {
  if (!USE_DB) return DEFAULT_SITE_SETTINGS;
  const row = await prisma.siteSettings.findUnique({ where: { id: "main" } });
  if (!row) return DEFAULT_SITE_SETTINGS;
  return {
    heroEyebrow: row.heroEyebrow,
    heroHeadline: row.heroHeadline,
    heroSubheadline: row.heroSubheadline,
    heroImage: row.heroImage,
    heroPrimaryCtaLabel: row.heroPrimaryCtaLabel,
    heroPrimaryCtaHref: row.heroPrimaryCtaHref,
    heroSecondaryCtaLabel: row.heroSecondaryCtaLabel,
    heroSecondaryCtaHref: row.heroSecondaryCtaHref,
    heroRatingValue: row.heroRatingValue,
    heroRatingLabel: row.heroRatingLabel,
    heroBadge1: row.heroBadge1,
    heroBadge2: row.heroBadge2,
    showWhyChooseUs: row.showWhyChooseUs,
    showTopTreks: row.showTopTreks,
    showTestimonials: row.showTestimonials,
    showGuides: row.showGuides,
    showTripPlannerCta: row.showTripPlannerCta,
    showBlogPreview: row.showBlogPreview,
    showFaq: row.showFaq,
    showFinalCta: row.showFinalCta,
  };
}
