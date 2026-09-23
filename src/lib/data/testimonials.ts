import { prisma, USE_DB } from "@/lib/db";
import { testimonials as staticTestimonials, type Testimonial } from "@/lib/testimonials";

export async function getAllTestimonials(): Promise<Testimonial[]> {
  if (!USE_DB) return staticTestimonials;
  const rows = await prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
  return rows.map((r) => ({
    name: r.name,
    location: r.location,
    trek: r.trek,
    rating: r.rating,
    quote: r.quote,
  }));
}

export async function getAllTestimonialsForAdmin() {
  if (!USE_DB) {
    return staticTestimonials.map((t, i) => ({ ...t, id: String(i), published: true }));
  }
  return prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
}
