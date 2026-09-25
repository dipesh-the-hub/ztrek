import { getAllTestimonialsForAdmin } from "@/lib/data/testimonials";
import { createTestimonialAction } from "@/lib/actions/testimonials";
import { USE_DB } from "@/lib/db";
import TestimonialRow from "@/components/admin/TestimonialRow";
import TestimonialForm from "@/components/admin/TestimonialForm";

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonialsForAdmin();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-950">Testimonials</h1>
      <p className="mt-1 text-sm text-stone-600">
        Guest reviews shown on the homepage and the Reviews page. Reviews guests write on the site wait here until you approve them.
      </p>

      <div className="mt-8 space-y-4">
        {testimonials.map((t) => (
          <TestimonialRow key={t.id} testimonial={t} />
        ))}
      </div>

      {USE_DB && (
        <div className="mt-10 rounded-2xl border border-dashed border-stone-300 bg-white p-5">
          <h2 className="font-display text-lg font-semibold text-navy-950">Add a testimonial</h2>
          <div className="mt-4">
            <TestimonialForm action={createTestimonialAction} submitLabel="Add Testimonial" />
          </div>
        </div>
      )}
    </div>
  );
}
