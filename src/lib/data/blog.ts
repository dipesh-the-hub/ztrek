import { prisma, USE_DB } from "@/lib/db";
import { blogPosts as staticBlogPosts, type BlogPost, type ContentBlock } from "@/lib/blog";
import type { BlogPost as PrismaBlogPost } from "@/generated/prisma/client";

function mapDbPost(row: PrismaBlogPost): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    coverImage: row.coverImage,
    category: row.category,
    author: row.author,
    date: row.date.toISOString().slice(0, 10),
    readTime: row.readTime,
    keywords: row.keywords as unknown as string[],
    content: row.content as unknown as ContentBlock[],
  };
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!USE_DB) return staticBlogPosts;
  const rows = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
  });
  return rows.map(mapDbPost);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  if (!USE_DB) return staticBlogPosts.find((p) => p.slug === slug);
  const row = await prisma.blogPost.findUnique({ where: { slug } });
  return row ? mapDbPost(row) : undefined;
}

export async function getAllBlogPostsForAdmin(): Promise<(BlogPost & { id: string; published: boolean })[]> {
  if (!USE_DB) return staticBlogPosts.map((p) => ({ ...p, id: p.slug, published: true }));
  const rows = await prisma.blogPost.findMany({ orderBy: { date: "desc" } });
  return rows.map((row) => ({ ...mapDbPost(row), id: row.id, published: row.published }));
}

export async function getBlogPostByIdForAdmin(id: string) {
  if (!USE_DB) {
    const p = staticBlogPosts.find((x) => x.slug === id);
    return p ? { ...p, id: p.slug, published: true } : null;
  }
  const row = await prisma.blogPost.findUnique({ where: { id } });
  return row ? { ...mapDbPost(row), id: row.id, published: row.published } : null;
}
