"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import TrekCard from "@/components/treks/TrekCard";
import type { Trek, Region, Category, Difficulty } from "@/lib/treks";

const difficulties: ("All Levels" | Difficulty)[] = [
  "All Levels",
  "Easy",
  "Moderate",
  "Challenging",
  "Strenuous",
];

export default function TreksListing({
  treks,
  regions,
  categories,
}: {
  treks: Trek[];
  regions: Region[];
  categories: Category[];
}) {
  const regionOptions = [{ slug: "all", label: "All Regions", blurb: "" }, ...regions];
  const categoryOptions = [{ slug: "all", label: "All Categories", blurb: "" }, ...categories];
  const searchParams = useSearchParams();
  const initialRegion = searchParams.get("region");
  const validInitialRegion = regions.some((r) => r.slug === initialRegion)
    ? initialRegion!
    : "all";
  const initialCategory = searchParams.get("category");
  const validInitialCategory = categories.some((c) => c.slug === initialCategory)
    ? initialCategory!
    : "all";

  const [regionSlug, setRegionSlug] = useState(validInitialRegion);
  const [categorySlug, setCategorySlug] = useState(validInitialCategory);
  const [difficulty, setDifficulty] = useState<"All Levels" | Difficulty>("All Levels");

  const filtered = useMemo(() => {
    return treks.filter((t) => {
      const regionMatch = regionSlug === "all" || t.regionSlug === regionSlug;
      const categoryMatch = categorySlug === "all" || t.categorySlug === categorySlug;
      const difficultyMatch = difficulty === "All Levels" || t.difficulty === difficulty;
      return regionMatch && categoryMatch && difficultyMatch;
    });
  }, [treks, regionSlug, categorySlug, difficulty]);

  return (
    <div>
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Filter by category">
          {categoryOptions.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setCategorySlug(c.slug)}
              aria-pressed={categorySlug === c.slug}
              className={`min-h-11 px-4 rounded-full text-sm font-semibold border transition-colors cursor-pointer ${
                categorySlug === c.slug
                  ? "bg-navy-950 text-white border-navy-950"
                  : "bg-white text-navy-900 border-stone-300 hover:border-navy-900"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by region">
          {regionOptions.map((r) => (
            <button
              key={r.slug}
              type="button"
              onClick={() => setRegionSlug(r.slug)}
              aria-pressed={regionSlug === r.slug}
              className={`min-h-11 px-4 rounded-full text-sm font-semibold border transition-colors cursor-pointer ${
                regionSlug === r.slug
                  ? "bg-navy-950 text-white border-navy-950"
                  : "bg-white text-navy-900 border-stone-300 hover:border-navy-900"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by difficulty">
        {difficulties.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDifficulty(d)}
            aria-pressed={difficulty === d}
            className={`min-h-11 px-4 rounded-full text-sm font-semibold border transition-colors cursor-pointer ${
              difficulty === d
                ? "bg-gold-500 text-navy-950 border-gold-500"
                : "bg-white text-navy-900 border-stone-300 hover:border-gold-500"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-stone-600" aria-live="polite">
        Showing {filtered.length} of {treks.length} treks
      </p>

      {filtered.length > 0 ? (
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((trek) => (
            <TrekCard key={trek.slug} trek={trek} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center text-stone-600">
          <p>No treks match these filters yet.</p>
        </div>
      )}
    </div>
  );
}
