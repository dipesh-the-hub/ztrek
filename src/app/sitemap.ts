import type { MetadataRoute } from "next";
import { getAllTreks } from "@/lib/data/treks";
import { getAllBlogPosts } from "@/lib/data/blog";

const BASE_URL = "https://trekvibenepal.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [treks, blogPosts] = await Promise.all([getAllTreks(), getAllBlogPosts()]);

  const staticPages = [
    "",
    "/treks",
    "/about",
    "/blog",
    "/plan-your-trek",
    "/contact",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const trekPages = treks.map((t) => ({
    url: `${BASE_URL}/treks/${t.slug}`,
    lastModified: new Date(),
  }));

  const blogPages = blogPosts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  return [...staticPages, ...trekPages, ...blogPages];
}
