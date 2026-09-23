import { notFound, redirect } from "next/navigation";
import BlogPostForm from "@/components/admin/BlogPostForm";
import { getBlogPostByIdForAdmin } from "@/lib/data/blog";
import { updateBlogPostAction } from "@/lib/actions/blog";
import { USE_DB } from "@/lib/db";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!USE_DB) redirect("/admin/blog");

  const { id } = await params;
  const post = await getBlogPostByIdForAdmin(id);
  if (!post) notFound();

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl font-semibold text-navy-950">Edit Blog Post</h1>
      <p className="mt-1 text-sm text-stone-600">{post.title}</p>
      <div className="mt-8">
        <BlogPostForm action={updateBlogPostAction} defaultValues={post} submitLabel="Save Changes" />
      </div>
    </div>
  );
}
