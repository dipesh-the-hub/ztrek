import Link from "next/link";
import { Mountains, Newspaper, ChatCircleText, UsersThree, Envelope, Star } from "@phosphor-icons/react/dist/ssr";
import { USE_DB, prisma } from "@/lib/db";
import { getAllTreksForAdmin } from "@/lib/data/treks";
import { getAllBlogPostsForAdmin } from "@/lib/data/blog";
import { getAllTestimonialsForAdmin } from "@/lib/data/testimonials";
import { getAllGuidesForAdmin } from "@/lib/data/guides";

export default async function AdminDashboardPage() {
  const [treks, posts, testimonials, guides, newInquiries, pendingReviews] = await Promise.all([
    getAllTreksForAdmin(),
    getAllBlogPostsForAdmin(),
    getAllTestimonialsForAdmin(),
    getAllGuidesForAdmin(),
    USE_DB ? prisma.inquiry.count({ where: { status: "NEW" } }) : Promise.resolve(0),
    USE_DB ? prisma.testimonial.count({ where: { published: false, email: { not: null } } }) : Promise.resolve(0),
  ]);

  const cards = [
    { label: "Treks", count: treks.length, href: "/admin/treks", icon: Mountains },
    { label: "Blog Posts", count: posts.length, href: "/admin/blog", icon: Newspaper },
    { label: "Testimonials", count: testimonials.length, href: "/admin/testimonials", icon: ChatCircleText },
    { label: "Guides", count: guides.length, href: "/admin/guides", icon: UsersThree },
    { label: "New Inquiries", count: newInquiries, href: "/admin/inquiries", icon: Envelope, highlight: newInquiries > 0 },
    { label: "Reviews to Approve", count: pendingReviews, href: "/admin/testimonials", icon: Star, highlight: pendingReviews > 0 },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-950">Dashboard</h1>
      <p className="mt-1 text-sm text-stone-600">
        {USE_DB ? "Connected to your database." : "Running on static demo content — connect a database to enable editing."}
      </p>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map(({ label, count, href, icon: Icon, highlight }) => (
          <Link
            key={label}
            href={href}
            className={`rounded-2xl border p-6 hover:shadow-md transition-shadow ${
              highlight ? "border-gold-500 bg-gold-100" : "border-stone-300/60 bg-white"
            }`}
          >
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-navy-950 text-gold-400">
              <Icon size={20} aria-hidden="true" />
            </div>
            <p className="mt-4 font-display text-3xl font-semibold text-navy-950">{count}</p>
            <p className="mt-1 text-sm text-stone-600">{label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
