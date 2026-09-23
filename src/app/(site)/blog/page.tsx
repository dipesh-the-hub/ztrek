import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { getAllBlogPosts } from "@/lib/data/blog";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Trekking Guides & Trail Notes",
  description:
    "Practical guides on Nepal trekking costs, permits, best seasons, altitude sickness and choosing a trekking agency — written by TrekVibe Nepal.",
};

export default async function BlogIndexPage() {
  const blogPosts = await getAllBlogPosts();
  return (
    <div className="section-y">
      <Container>
        <SectionHeading
          eyebrow="The Journal"
          title="Trip-planning guides & trail notes"
          description="No-fluff articles on costs, permits, seasons and safety, written by the team that runs these treks in Kathmandu."
        />

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl overflow-hidden border border-stone-300/60 bg-white hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-200">
                <Image
                  src={post.coverImage}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                  {post.category} · {post.readTime}
                </p>
                <h2 className="mt-2 font-display text-lg font-semibold text-navy-950 leading-snug">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-stone-700 leading-relaxed line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <span className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-navy-900 group-hover:text-gold-600 transition-colors">
                  Read Article
                  <ArrowRight size={16} aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
