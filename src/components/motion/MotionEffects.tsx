"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One client island that powers the site's pointer and scroll effects through
 * data attributes, so the sections themselves can stay server components:
 *
 *   data-reveal        fade/slide in when scrolled into view
 *   data-curtain       clip-path wipe in when scrolled into view
 *   data-magnetic      button drifts toward the cursor
 *   data-glow          sets --mx/--my for a glow that follows the cursor
 *   data-tilt          3D tilt toward the cursor, sets --gx/--gy for the glare
 *   data-parallax-root children with data-depth follow the cursor
 *
 * Pointer effects only run on devices with a precise hovering pointer, and
 * nothing runs when the visitor prefers reduced motion.
 */
export default function MotionEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    // Only hide what is still below the first screen, so the page is complete at rest.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.remove("tv-pending");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.querySelectorAll<HTMLElement>("[data-reveal], [data-curtain]").forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add("tv-pending");
        observer.observe(el);
      }
    });

    if (!finePointer) return () => observer.disconnect();

    let magnet: HTMLElement | null = null;
    let tilt: HTMLElement | null = null;

    function releaseMagnet() {
      if (magnet) magnet.style.transform = "";
      magnet = null;
    }
    function releaseTilt() {
      if (!tilt) return;
      tilt.classList.remove("is-tilting");
      tilt.style.setProperty("--rx", "0deg");
      tilt.style.setProperty("--ry", "0deg");
      tilt = null;
    }

    function onPointerMove(e: PointerEvent) {
      const target = e.target instanceof Element ? e.target : null;

      const m = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (m !== magnet) releaseMagnet();
      if (m) {
        magnet = m;
        const r = m.getBoundingClientRect();
        m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      }

      const t = target?.closest<HTMLElement>("[data-tilt]") ?? null;
      if (t !== tilt) releaseTilt();
      if (t) {
        tilt = t;
        const r = t.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        t.classList.add("is-tilting");
        t.style.setProperty("--ry", `${(px - 0.5) * 12}deg`);
        t.style.setProperty("--rx", `${(0.5 - py) * 10}deg`);
        t.style.setProperty("--gx", `${px * 100}%`);
        t.style.setProperty("--gy", `${py * 100}%`);
      }

      const g = target?.closest<HTMLElement>("[data-glow]");
      if (g) {
        const r = g.getBoundingClientRect();
        g.style.setProperty("--mx", `${e.clientX - r.left}px`);
        g.style.setProperty("--my", `${e.clientY - r.top}px`);
      }

      const p = target?.closest<HTMLElement>("[data-parallax-root]");
      if (p) {
        const cx = e.clientX / window.innerWidth - 0.5;
        const cy = e.clientY / window.innerHeight - 0.5;
        p.querySelectorAll<HTMLElement>("[data-depth]").forEach((el) => {
          const depth = Number(el.dataset.depth);
          el.style.setProperty("--tx", `${cx * depth}px`);
          el.style.setProperty("--ty", `${cy * depth}px`);
        });
      }
    }

    function onPointerLeaveWindow() {
      releaseMagnet();
      releaseTilt();
    }

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeaveWindow);
    return () => {
      observer.disconnect();
      document.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeaveWindow);
      releaseMagnet();
      releaseTilt();
    };
  }, [pathname]);

  return null;
}
