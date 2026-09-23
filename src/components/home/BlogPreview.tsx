import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { getAllBlogPosts } from "@/lib/data/blog";

export default async function BlogPreview() {
  const blogPosts = await getAllBlogPosts();
  const latest = blogPosts.slice(0, 3);

  return (
    <section className="section-y bg-white">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="From the Journal"
            title="Trip-planning guides &amp; trail notes"
            description="Practical, no-fluff articles on costs, permits, seasons and safety — written by the team that runs these treks."
          />
          <LinkButton href="/blog" variant="ghost" className="hidden sm:inline-flex">
            Visit the Blog
          </LinkButton>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {latest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl overflow-hidden border border-stone-300/60 bg-cream hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-200">
                <Image
                  src={post.coverImage}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                  {post.category}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-navy-950 leading-snug">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-stone-700 leading-relaxed line-clamp-2 flex-1">
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
    </section>
  );
}
