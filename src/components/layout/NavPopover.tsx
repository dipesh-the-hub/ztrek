"use client";

import { useEffect, useId, useRef, useState, ReactNode } from "react";
import { CaretDown } from "@phosphor-icons/react";

interface NavPopoverProps {
  label: string;
  active?: boolean;
  light?: boolean;
  panelClassName?: string;
  children: ReactNode;
}

export default function NavPopover({
  label,
  active,
  light,
  panelClassName,
  children,
}: NavPopoverProps) {
  const [open, setOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  function openNow() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpen(true);
  }

  function closeSoon() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(() => setOpen(false), 150);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 text-sm font-semibold transition-colors cursor-pointer ${
          active
            ? light
              ? "text-gold-400"
              : "text-gold-600"
            : light
              ? "text-white hover:text-gold-300"
              : "text-navy-900 hover:text-gold-600"
        }`}
      >
        {label}
        <CaretDown
          size={14}
          aria-hidden="true"
          className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          id={panelId}
          className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 ${panelClassName ?? ""}`}
        >
          <div className="rounded-2xl border border-stone-300/60 bg-white shadow-xl p-5">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
