import Hero from "@/components/home/Hero";
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
import { getGalleryPhotos } from "@/lib/data/gallery";

export default async function Home() {
  const [settings, galleryPhotos] = await Promise.all([getSiteSettings(), getGalleryPhotos()]);

  return (
    <>
      <IntroCurtain />
      <Hero settings={settings} />
      {settings.showWhyChooseUs && <WhyChooseUs />}
      {settings.showTopTreks && <TopTreks />}
      <ElevationProfile />
      {settings.showTestimonials && <Testimonials />}
      {settings.showGuides && <Guides />}
      {settings.showTripPlannerCta && <TripPlannerCTA />}
      {settings.showBlogPreview && <BlogPreview />}
      {settings.showFaq && <FAQSection />}
      {settings.showGallery && galleryPhotos.length > 0 && <Gallery photos={galleryPhotos} />}
      {settings.showFinalCta && <FinalCTA />}
    </>
  );
}
