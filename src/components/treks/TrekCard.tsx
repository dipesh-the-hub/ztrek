import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Mountains, Path } from "@phosphor-icons/react/dist/ssr";
import type { Trek } from "@/lib/treks";

const difficultyStyles: Record<string, string> = {
  Easy: "bg-[#ecf6f0]/95 text-success",
  Moderate: "bg-gold-100/95 text-gold-600",
  Challenging: "bg-[#faeae5]/95 text-danger",
  Strenuous: "bg-[#faeae5]/95 text-danger",
};

export default function TrekCard({ trek, priority = false }: { trek: Trek; priority?: boolean }) {
  return (
    <div className="[perspective:1000px]">
      <Link
        href={`/treks/${trek.slug}`}
        data-tilt
        className="tv-tilt group relative flex flex-col h-full rounded-2xl overflow-hidden bg-white border border-stone-300/60 shadow-sm hover:shadow-[0_0_0_1.5px_var(--color-gold-400),0_30px_50px_-24px_rgb(8_21_39/0.55)]"
      >
        <span className="tv-glare pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
        <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
          <Image
            src={trek.heroImage}
            alt={`${trek.name} in the ${trek.region}, Nepal`}
            fill
            preload={priority}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[var(--ease-out-expo)]"
          />
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyStyles[trek.difficulty]}`}
          >
            {trek.difficulty}
          </span>
          {trek.restrictedArea && (
            <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-navy-950/80 text-gold-300">
              Restricted Area
            </span>
          )}
        </div>

        <div className="flex flex-col flex-1 p-5">
          <p className="text-xs font-semibold tracking-wide uppercase text-gold-600">
            {trek.region}
          </p>
          <h3 className="mt-1.5 font-display text-lg font-semibold text-navy-950 leading-snug">
            {trek.name}
          </h3>
          <p className="mt-2 text-sm text-stone-700 leading-relaxed line-clamp-2">
            {trek.shortDescription}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-stone-500">
            <span className="flex items-center gap-1.5">
              <Clock size={15} aria-hidden="true" />
              {trek.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Mountains size={15} aria-hidden="true" />
              {trek.maxAltitude.split(" ")[0]} {trek.maxAltitude.split(" ")[1]}
            </span>
            <span className="flex items-center gap-1.5">
              <Path size={15} aria-hidden="true" />
              {trek.region.split(" ")[0]}
            </span>
          </div>

          <div className="mt-5 pt-4 border-t border-stone-200 flex items-center justify-between">
            <div>
              <span className="text-xs text-stone-500">From</span>
              <p className="font-display text-xl font-semibold text-navy-950">
                ${trek.priceFrom.toLocaleString()}
              </p>
            </div>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-navy-900 group-hover:text-gold-600 transition-colors">
              View Trek
              <ArrowRight size={16} aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
