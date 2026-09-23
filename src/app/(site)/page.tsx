import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TopTreks from "@/components/home/TopTreks";
import Testimonials from "@/components/home/Testimonials";
import Guides from "@/components/home/Guides";
import TripPlannerCTA from "@/components/home/TripPlannerCTA";
import BlogPreview from "@/components/home/BlogPreview";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <TopTreks />
      <Testimonials />
      <Guides />
      <TripPlannerCTA />
      <BlogPreview />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
