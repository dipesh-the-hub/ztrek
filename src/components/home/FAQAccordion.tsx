"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import type { FaqItem } from "@/lib/faqs";

export default function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-stone-300/60 border-t border-b border-stone-300/60">
      {items.map((item, i) => {
        const open = openIndex === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;
        return (
          <div key={i}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer min-h-11"
              >
                <span className="font-display text-base sm:text-lg font-semibold text-navy-950">
                  {item.q}
                </span>
                <CaretDown
                  size={20}
                  aria-hidden="true"
                  className={`shrink-0 text-gold-600 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className="pb-5 pr-8"
            >
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
