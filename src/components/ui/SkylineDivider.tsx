interface SkylineDividerProps {
  className?: string;
  /** Tailwind text-color class controlling the silhouette color (uses currentColor fill). */
  colorClassName?: string;
}

/**
 * Decorative Nepal skyline silhouette — mountains, trekkers, a stupa, a pagoda
 * temple, a deer and a paraglider — used as a recurring motif across
 * dark-background sections (Hero, Reviews, closing CTA).
 */
export default function SkylineDivider({ className, colorClassName = "text-gold-500" }: SkylineDividerProps) {
  return (
    <div
      className={`pointer-events-none select-none w-full ${colorClassName} ${className ?? ""}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="xMidYMax slice"
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="currentColor">
          {/* rolling ground base uniting every element */}
          <path d="M0,168 C140,150 260,162 380,150 C500,138 620,150 740,146 C860,142 980,152 1100,142 C1220,132 1340,148 1440,138 L1440,200 L0,200 Z" opacity="0.9" />

          {/* mountains, far left */}
          <path d="M-10,158 L55,68 L95,108 L145,36 L200,118 L245,92 L262,158 Z" />

          {/* two trekkers climbing the slope */}
          <g transform="translate(78,118)">
            <circle cx="0" cy="0" r="4.2" />
            <path d="M-4,6 C-4,16 -2,24 -3,32 L1,32 C2,24 2,18 3,14 C4,18 5,24 6,32 L10,32 C9,22 8,14 6,6 Z" />
            <path d="M4,4 L13,-2 L14,1 L6,7 Z" />
          </g>
          <g transform="translate(100,128) scale(0.85)">
            <circle cx="0" cy="0" r="4.2" />
            <path d="M-4,6 C-4,16 -2,24 -3,32 L1,32 C2,24 2,18 3,14 C4,18 5,24 6,32 L10,32 C9,22 8,14 6,6 Z" />
            <path d="M-4,4 L-13,-1 L-13,2 L-5,7 Z" />
          </g>

          {/* tree */}
          <g transform="translate(300,150)">
            <circle cx="-6" cy="-38" r="12" />
            <circle cx="7" cy="-42" r="14" />
            <circle cx="16" cy="-32" r="11" />
            <rect x="3" y="-16" width="6" height="18" />
          </g>

          {/* stupa */}
          <g transform="translate(420,150)">
            <rect x="-26" y="-14" width="52" height="14" />
            <path d="M-22,-14 C-22,-34 22,-34 22,-14 Z" />
            <rect x="-3" y="-46" width="6" height="14" />
            <polygon points="0,-70 -7,-46 7,-46" />
            <rect x="-1.5" y="-74" width="3" height="6" />
          </g>

          {/* pagoda temple */}
          <g transform="translate(600,150)">
            <rect x="-14" y="-20" width="28" height="20" />
            <polygon points="-30,-20 30,-20 20,-32 -20,-32" />
            <rect x="-9" y="-46" width="18" height="14" />
            <polygon points="-20,-46 20,-46 13,-56 -13,-56" />
            <rect x="-4" y="-66" width="8" height="10" />
            <polygon points="-11,-66 11,-66 0,-76" />
          </g>

          {/* deer */}
          <g transform="translate(760,158)">
            <ellipse cx="0" cy="-14" rx="16" ry="9" />
            <rect x="-13" y="-8" width="3.4" height="14" />
            <rect x="-5" y="-8" width="3.4" height="14" />
            <rect x="4" y="-8" width="3.4" height="14" />
            <rect x="11" y="-8" width="3.4" height="14" />
            <circle cx="17" cy="-24" r="6" />
            <path d="M20,-29 L26,-38 L24,-38 L19,-31 Z" />
            <path d="M22,-28 L30,-33 L29,-31 L23,-27 Z" />
          </g>

          {/* small bushes / grass */}
          <g transform="translate(840,164)">
            <circle cx="0" cy="0" r="6" />
            <circle cx="10" cy="2" r="4.5" />
            <circle cx="-9" cy="2" r="4.5" />
          </g>

          {/* second, smaller tree */}
          <g transform="translate(940,152)">
            <circle cx="0" cy="-24" r="10" />
            <rect x="-2.5" y="-14" width="5" height="14" />
          </g>

          {/* paraglider, up in the sky */}
          <g transform="translate(1120,70)">
            <path d="M-34,0 C-20,-16 20,-16 34,0 C20,-6 -20,-6 -34,0 Z" />
            <path d="M-30,1 L-4,20 M30,1 L4,20 M0,-4 L0,20" stroke="currentColor" strokeWidth="1.4" fill="none" />
            <circle cx="0" cy="24" r="4" />
            <path d="M-3,27 C-3,34 -1,38 -2,42 L1,42 C2,38 2,35 2,42 L5,42 C4,37 3,34 3,27 Z" />
          </g>

          {/* birds */}
          <path d="M1220,40 C1224,36 1228,36 1231,40 C1234,36 1238,36 1242,40 C1238,39 1235,41 1231,44 C1227,41 1224,39 1220,40 Z" />
          <path d="M1260,58 C1263,55 1266,55 1268,58 C1270,55 1273,55 1276,58 C1273,57 1271,58 1268,61 C1265,58 1263,57 1260,58 Z" />

          {/* distant hills, right side */}
          <path d="M1180,158 L1240,110 L1300,150 L1360,100 L1440,150 L1440,158 Z" opacity="0.55" />
        </g>
      </svg>
    </div>
  );
}
