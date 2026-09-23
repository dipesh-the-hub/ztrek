import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import NavPopover from "@/components/layout/NavPopover";
import type { RegionGroup } from "@/components/layout/Navbar";

export default function TreksMegaMenu({
  regionGroups,
  light,
}: {
  regionGroups: RegionGroup[];
  light?: boolean;
}) {
  return (
    <NavPopover label="Treks & Regions" light={light} panelClassName="w-[min(90vw,880px)] -translate-x-[38%]">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
        {regionGroups.map((group) => (
          <div key={group.slug}>
            <Link
              href={`/treks?region=${group.slug}`}
              className="text-sm font-semibold text-navy-950 hover:text-gold-600 transition-colors"
            >
              {group.label}
            </Link>
            <p className="mt-1 text-xs text-stone-500 leading-relaxed">{group.blurb}</p>
            <ul className="mt-3 space-y-2">
              {group.treks.map((trek) => (
                <li key={trek.slug}>
                  <Link
                    href={`/treks/${trek.slug}`}
                    className="text-sm text-stone-700 hover:text-gold-600 transition-colors"
                  >
                    {trek.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-5 border-t border-stone-200 flex items-center justify-between">
        <p className="text-xs text-stone-500">12 curated routes across 6 regions of Nepal</p>
        <Link
          href="/treks"
          className="flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-gold-600 transition-colors"
        >
          View All Treks
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </NavPopover>
  );
}
