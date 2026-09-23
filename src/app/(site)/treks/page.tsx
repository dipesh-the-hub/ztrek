import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TreksListing from "@/components/treks/TreksListing";
import { getAllTreks, getRegions, getCategories } from "@/lib/data/treks";

export const metadata: Metadata = {
  title: "All Nepal Trekking Packages",
  description:
    "Browse all 12 TrekVibe Nepal trekking packages — Everest Base Camp, Annapurna Circuit, Manaslu, Upper Mustang, Dolpo and more. Filter by region and difficulty.",
};

export default async function TreksPage() {
  const [treks, regions, categories] = await Promise.all([getAllTreks(), getRegions(), getCategories()]);

  return (
    <div className="section-y">
      <Container>
        <SectionHeading
          eyebrow="All Packages"
          title="Every Himalayan trek we run, in one place"
          description="Filter by region or difficulty to find the right route for your dates, fitness level and travel style."
        />
        <div className="mt-10">
          <Suspense fallback={null}>
            <TreksListing treks={treks} regions={regions} categories={categories} />
          </Suspense>
        </div>
      </Container>
    </div>
  );
}
