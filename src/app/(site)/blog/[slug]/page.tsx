import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarBlank, Clock, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/ui/Container";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/data/blog";

export const revalidate = 3600;

export async function generateStaticParams() {
  const blogPosts = await getAllBlogPosts();
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getBlogPostBySlug(slug), getAllBlogPosts()]);
  if (!post) notFound();

  const more = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <article className="section-y">
      <Container className="max-w-3xl mx-auto">
        <nav aria-label="Breadcrumb" className="text-sm text-stone-500">
          <Link href="/blog" className="hover:text-gold-600">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-navy-950">{post.title}</span>
        </nav>

        <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-gold-600">
          {post.category}
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-navy-950 text-balance">
          {post.title}
        </h1>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-stone-500">
          <span>{post.author}</span>
          <span className="flex items-center gap-1.5">
            <CalendarBlank size={16} aria-hidden="true" />
            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={16} aria-hidden="true" />
            {post.readTime}
          </span>
        </div>

        <div className="relative mt-8 aspect-[16/9] rounded-2xl overflow-hidden bg-stone-200">
          <Image src={post.coverImage} alt="" fill sizes="768px" className="object-cover" priority />
        </div>

        <div className="mt-10 prose-content max-w-none">
          {post.content.map((block, i) => {
            if (block.type === "heading") {
              return (
                <h2 key={i} className="font-display text-2xl font-semibold text-navy-950 mt-10 mb-4">
                  {block.text}
                </h2>
              );
            }
            if (block.type === "list") {
              return (
                <ul key={i} className="mt-4 space-y-2.5 list-disc pl-5 text-stone-700">
                  {block.items.map((item, j) => (
                    <li key={j} className="leading-relaxed">{item}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="mt-4 text-stone-700 leading-relaxed">
                {block.text}
              </p>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl bg-navy-950 p-8 text-center">
          <h2 className="font-display text-xl font-semibold text-white">
            Ready to start planning your Nepal trek?
          </h2>
          <p className="mt-2 text-sm text-white/75">
            Tell us your dates and fitness level — our Kathmandu team will reply within 24 hours.
          </p>
          <Link
            href="/plan-your-trek"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 hover:bg-gold-400 transition-colors min-h-11"
          >
            Start Your Trip Planner
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        {more.length > 0 && (
          <div className="mt-16 border-t border-stone-300/60 pt-10">
            <h2 className="font-display text-xl font-semibold text-navy-950">More from the journal</h2>
            <ul className="mt-6 space-y-4">
              {more.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="group flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-navy-900 group-hover:text-gold-600 transition-colors">
                      {p.title}
                    </span>
                    <ArrowRight size={16} className="shrink-0 text-stone-400 group-hover:text-gold-600 transition-colors" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </article>
  );
}
