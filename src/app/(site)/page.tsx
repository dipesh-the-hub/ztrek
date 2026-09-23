import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TopTreks from "@/components/home/TopTreks";
import Testimonials from "@/components/home/Testimonials";
import Guides from "@/components/home/Guides";
import TripPlannerCTA from "@/components/home/TripPlannerCTA";
import BlogPreview from "@/components/home/BlogPreview";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";
import { getSiteSettings } from "@/lib/data/siteSettings";

export default async function Home() {
  const settings = await getSiteSettings();

  return (
    <>
      <Hero settings={settings} />
      {settings.showWhyChooseUs && <WhyChooseUs />}
      {settings.showTopTreks && <TopTreks />}
      {settings.showTestimonials && <Testimonials />}
      {settings.showGuides && <Guides />}
      {settings.showTripPlannerCta && <TripPlannerCTA />}
      {settings.showBlogPreview && <BlogPreview />}
      {settings.showFaq && <FAQSection />}
      {settings.showFinalCta && <FinalCTA />}
    </>
  );
}
