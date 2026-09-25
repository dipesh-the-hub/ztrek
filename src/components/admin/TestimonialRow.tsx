"use client";

import { useState } from "react";
import { Eye, EyeSlash, PencilSimple } from "@phosphor-icons/react";
import StarRating from "@/components/ui/StarRating";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import TestimonialForm from "@/components/admin/TestimonialForm";
import { updateTestimonialAction, deleteTestimonialAction, setTestimonialPublishedAction } from "@/lib/actions/testimonials";

interface TestimonialRowProps {
  testimonial: {
    id: string;
    name: string;
    location: string;
    trek: string;
    rating: number;
    quote: string;
    email?: string | null;
    published: boolean;
  };
}

export default function TestimonialRow({ testimonial }: TestimonialRowProps) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <div className="rounded-2xl border border-navy-700/30 bg-white p-5">
        <TestimonialForm
          action={updateTestimonialAction}
          defaultValues={testimonial}
          submitLabel="Save Changes"
          onSuccess={() => setEditing(false)}
        />
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="mt-3 text-xs font-semibold text-stone-500 hover:text-navy-900 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-stone-300/60 bg-white p-5 flex items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <p className="font-semibold text-navy-950">{testimonial.name}</p>
          {!testimonial.published && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-200 text-stone-600">Hidden</span>
          )}
        </div>
        <p className="text-xs text-stone-500">{[testimonial.location, testimonial.trek].filter(Boolean).join(" · ")}</p>
        {testimonial.email && (
          <a href={`mailto:${testimonial.email}`} className="text-xs text-navy-700 hover:text-gold-600 break-all">
            {testimonial.email}
          </a>
        )}
        <div className="mt-1.5"><StarRating rating={testimonial.rating} /></div>
        <p className="mt-2 text-sm text-stone-700 leading-relaxed max-w-xl">{testimonial.quote}</p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <form action={setTestimonialPublishedAction.bind(null, testimonial.id, !testimonial.published)}>
          <button
            type="submit"
            className="flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-gold-600 cursor-pointer"
          >
            {testimonial.published ? <EyeSlash size={15} aria-hidden="true" /> : <Eye size={15} aria-hidden="true" />}
            {testimonial.published ? "Hide" : "Show"}
          </button>
        </form>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-gold-600 cursor-pointer"
        >
          <PencilSimple size={15} aria-hidden="true" />
          Edit
        </button>
        <form>
          <ConfirmDeleteButton action={deleteTestimonialAction.bind(null, testimonial.id)} />
        </form>
      </div>
    </div>
  );
}
