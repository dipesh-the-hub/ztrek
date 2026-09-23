"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma, USE_DB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { parseContentBlocks } from "@/lib/content-format";

function parseLines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function buildPostData(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    coverImage: String(formData.get("coverImage") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    author: String(formData.get("author") ?? "TrekVibe Nepal Team").trim(),
    date: new Date(String(formData.get("date") ?? new Date().toISOString().slice(0, 10))),
    readTime: String(formData.get("readTime") ?? "5 min read").trim(),
    keywords: parseLines(formData.get("keywords")),
    content: parseContentBlocks(String(formData.get("content") ?? "")),
    published: formData.get("published") === "on",
  };
}

export async function createBlogPostAction(_prevState: unknown, formData: FormData) {
  await requireAdmin();
  if (!USE_DB) return { error: "No database connected." };

  const data = buildPostData(formData);
  if (!data.slug || !data.title) return { error: "Slug and title are required." };

  try {
    await prisma.blogPost.create({ data });
  } catch {
    return { error: "Could not create post — the slug may already be in use." };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/blog");
}

export async function updateBlogPostAction(_prevState: unknown, formData: FormData) {
  await requireAdmin();
  if (!USE_DB) return { error: "No database connected." };

  const id = String(formData.get("id") ?? "");
  const data = buildPostData(formData);
  if (!data.slug || !data.title) return { error: "Slug and title are required." };

  try {
    await prisma.blogPost.update({ where: { id }, data });
  } catch {
    return { error: "Could not update post." };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  revalidatePath("/");
  redirect("/admin/blog");
}

export async function deleteBlogPostAction(id: string) {
  await requireAdmin();
  if (!USE_DB) return;
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
}
