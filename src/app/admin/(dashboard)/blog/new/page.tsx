import { redirect } from "next/navigation";
import BlogPostForm from "@/components/admin/BlogPostForm";
import { createBlogPostAction } from "@/lib/actions/blog";
import { USE_DB } from "@/lib/db";

export default function NewBlogPostPage() {
  if (!USE_DB) redirect("/admin/blog");

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl font-semibold text-navy-950">New Blog Post</h1>
      <p className="mt-1 text-sm text-stone-600">Write a new trip-planning article.</p>
      <div className="mt-8">
        <BlogPostForm action={createBlogPostAction} submitLabel="Publish Post" />
      </div>
    </div>
  );
}
