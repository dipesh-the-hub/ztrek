-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL DEFAULT 'main',
    "heroEyebrow" TEXT NOT NULL DEFAULT 'Feel the Mountain Vibe — Kathmandu, Nepal',
    "heroHeadline" TEXT NOT NULL DEFAULT 'Trek the Himalaya with TrekVibe Nepal',
    "heroSubheadline" TEXT NOT NULL,
    "heroImage" TEXT NOT NULL DEFAULT '/images/treks/everest-base-camp.jpg',
    "heroPrimaryCtaLabel" TEXT NOT NULL DEFAULT 'Explore Treks',
    "heroPrimaryCtaHref" TEXT NOT NULL DEFAULT '/treks',
    "heroSecondaryCtaLabel" TEXT NOT NULL DEFAULT 'Plan a Custom Trek',
    "heroSecondaryCtaHref" TEXT NOT NULL DEFAULT '/plan-your-trek',
    "heroRatingValue" TEXT NOT NULL DEFAULT '4.9/5',
    "heroRatingLabel" TEXT NOT NULL DEFAULT 'guest rating',
    "heroBadge1" TEXT NOT NULL DEFAULT 'Government-licensed guides',
    "heroBadge2" TEXT NOT NULL DEFAULT '12+ curated Himalayan routes',
    "showWhyChooseUs" BOOLEAN NOT NULL DEFAULT true,
    "showTopTreks" BOOLEAN NOT NULL DEFAULT true,
    "showTestimonials" BOOLEAN NOT NULL DEFAULT true,
    "showGuides" BOOLEAN NOT NULL DEFAULT true,
    "showTripPlannerCta" BOOLEAN NOT NULL DEFAULT true,
    "showBlogPreview" BOOLEAN NOT NULL DEFAULT true,
    "showFaq" BOOLEAN NOT NULL DEFAULT true,
    "showFinalCta" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NavItem" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'link',
    "label" TEXT NOT NULL,
    "href" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NavItem_pkey" PRIMARY KEY ("id")
);
