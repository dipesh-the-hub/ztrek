"use client";

import Image from "next/image";
import { useState } from "react";

// Survives client-side navigation, so the intro only plays on a full page load.
let hasPlayed = false;

/** Logo + "Namaste" for about a second, then the navy screen lifts away. */
export default function IntroCurtain() {
  const [show, setShow] = useState(() => !hasPlayed);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className="tv-intro fixed inset-0 z-[100] grid place-items-center bg-navy-950 pointer-events-none"
      onAnimationEnd={(e) => {
        if (e.target !== e.currentTarget) return;
        hasPlayed = true;
        setShow(false);
      }}
    >
      <div className="grid justify-items-center gap-4">
        <Image
          src="/images/brand/logo.webp"
          alt=""
          width={84}
          height={84}
          preload
          className="tv-intro-logo h-21 w-21 rounded-full"
        />
        <p className="tv-intro-word font-display text-2xl text-gold-300 tracking-wide">Namaste</p>
      </div>
    </div>
  );
}
