import Hero, { type HeroPhoto } from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TopTreks from "@/components/home/TopTreks";
import ElevationProfile from "@/components/home/ElevationProfile";
import Testimonials from "@/components/home/Testimonials";
import Guides from "@/components/home/Guides";
import TripPlannerCTA from "@/components/home/TripPlannerCTA";
import BlogPreview from "@/components/home/BlogPreview";
import FAQSection from "@/components/home/FAQSection";
import Gallery from "@/components/home/Gallery";
import FinalCTA from "@/components/home/FinalCTA";
import IntroCurtain from "@/components/motion/IntroCurtain";
import { getSiteSettings } from "@/lib/data/siteSettings";
import { getAllTreks } from "@/lib/data/treks";

// Treks shown behind the CMS hero image in the fanned photo stack.
const heroStackSlugs = ["annapurna-base-camp-trek", "manaslu-circuit-trek"];

export default async function Home() {
  const [settings, treks] = await Promise.all([getSiteSettings(), getAllTreks()]);

  const heroPhotos: HeroPhoto[] = [
    ...heroStackSlugs
      .map((slug) => treks.find((t) => t.slug === slug))
      .filter((t) => t !== undefined)
      .map((t) => ({
        src: t.heroImage,
        alt: `${t.name} in the ${t.region}, Nepal`,
        caption: `${t.name.replace(/ Trek$/, "")} · ${t.maxAltitude.split(" / ")[0]}`,
      })),
    {
      src: settings.heroImage,
      alt: "Trekking in the Nepal Himalaya with TrekVibe Nepal",
      caption: settings.heroBadge2,
    },
  ];

  return (
    <>
      <IntroCurtain />
      <Hero settings={settings} photos={heroPhotos} />
      {settings.showWhyChooseUs && <WhyChooseUs />}
      {settings.showTopTreks && <TopTreks />}
      <ElevationProfile />
      {settings.showTestimonials && <Testimonials />}
      {settings.showGuides && <Guides />}
      {settings.showTripPlannerCta && <TripPlannerCTA />}
      {settings.showBlogPreview && <BlogPreview />}
      {settings.showFaq && <FAQSection />}
      <Gallery />
      {settings.showFinalCta && <FinalCTA />}
    </>
  );
}
