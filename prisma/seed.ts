import "dotenv/config";
import { PrismaClient, Prisma } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { treks } from "../src/lib/treks";
import { blogPosts } from "../src/lib/blog";
import { testimonials } from "../src/lib/testimonials";
import { guides } from "../src/lib/guides";
import { regions } from "../src/lib/regions";
import { categories } from "../src/lib/categories";
import { DEFAULT_SITE_SETTINGS } from "../src/lib/data/siteSettings";
import { DEFAULT_NAV_ITEMS } from "../src/lib/data/navItems";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

function toJson(value: unknown): Prisma.InputJsonValue {
  return value as unknown as Prisma.InputJsonValue;
}

async function main() {
  console.log(`Seeding ${regions.length} regions...`);
  for (let i = 0; i < regions.length; i++) {
    const r = regions[i];
    await prisma.region.upsert({
      where: { slug: r.slug },
      update: {},
      create: { slug: r.slug, label: r.label, blurb: r.blurb, sortOrder: i },
    });
  }

  console.log(`Seeding ${categories.length} categories...`);
  for (let i = 0; i < categories.length; i++) {
    const c = categories[i];
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: { slug: c.slug, label: c.label, blurb: c.blurb, sortOrder: i },
    });
  }

  console.log(`Seeding ${treks.length} treks...`);
  for (const t of treks) {
    await prisma.trek.upsert({
      where: { slug: t.slug },
      update: {},
      create: {
        slug: t.slug,
        name: t.name,
        region: t.region,
        regionSlug: t.regionSlug,
        regionLabel: t.regionLabel,
        categorySlug: t.categorySlug,
        categoryLabel: t.categoryLabel,
        tagline: t.tagline,
        heroImage: t.heroImage,
        gallery: toJson(t.gallery),
        duration: t.duration,
        durationDays: t.durationDays,
        maxAltitude: t.maxAltitude,
        difficulty: t.difficulty,
        bestSeason: t.bestSeason,
        groupSize: t.groupSize,
        priceFrom: t.priceFrom,
        restrictedArea: t.restrictedArea,
        shortDescription: t.shortDescription,
        overview: t.overview,
        highlights: toJson(t.highlights),
        permits: toJson(t.permits),
        itinerary: toJson(t.itinerary),
        included: toJson(t.included),
        excluded: toJson(t.excluded),
        faqs: toJson(t.faqs),
      },
    });
  }

  console.log(`Seeding ${blogPosts.length} blog posts...`);
  for (const p of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        coverImage: p.coverImage,
        category: p.category,
        author: p.author,
        date: new Date(p.date),
        readTime: p.readTime,
        keywords: toJson(p.keywords),
        content: toJson(p.content),
      },
    });
  }

  // Testimonial/Guide have no natural unique key, so re-running this seed
  // would create duplicates via .create() — only seed them the first time.
  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    console.log(`Seeding ${testimonials.length} testimonials...`);
    for (const t of testimonials) {
      await prisma.testimonial.create({
        data: {
          name: t.name,
          location: t.location,
          trek: t.trek,
          rating: t.rating,
          quote: t.quote,
        },
      });
    }
  } else {
    console.log(`Skipping testimonials — ${testimonialCount} already in the database.`);
  }

  const guideCount = await prisma.guide.count();
  if (guideCount === 0) {
    console.log(`Seeding ${guides.length} guides...`);
    for (const g of guides) {
      await prisma.guide.create({
        data: {
          name: g.name,
          role: g.role,
          years: g.years,
          languages: g.languages,
          bio: g.bio,
        },
      });
    }
  } else {
    console.log(`Skipping guides — ${guideCount} already in the database.`);
  }

  console.log("Seeding site settings...");
  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {},
    create: { id: "main", ...DEFAULT_SITE_SETTINGS },
  });

  const navItemCount = await prisma.navItem.count();
  if (navItemCount === 0) {
    console.log(`Seeding ${DEFAULT_NAV_ITEMS.length} nav items...`);
    for (const item of DEFAULT_NAV_ITEMS) {
      await prisma.navItem.create({
        data: {
          id: item.id,
          type: item.type,
          label: item.label,
          href: item.href,
          sortOrder: item.sortOrder,
          visible: item.visible,
        },
      });
    }
  } else {
    console.log(`Skipping nav items — ${navItemCount} already in the database.`);
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
