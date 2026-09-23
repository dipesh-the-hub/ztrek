import Link from "next/link";
import { Plus, PencilSimple } from "@phosphor-icons/react/dist/ssr";
import { getAllBlogPostsForAdmin } from "@/lib/data/blog";
import { deleteBlogPostAction } from "@/lib/actions/blog";
import { USE_DB } from "@/lib/db";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import { LinkButton } from "@/components/ui/Button";

export default async function AdminBlogPage() {
  const posts = await getAllBlogPostsForAdmin();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy-950">Blog Posts</h1>
          <p className="mt-1 text-sm text-stone-600">{posts.length} articles.</p>
        </div>
        {USE_DB && (
          <LinkButton href="/admin/blog/new" size="md">
            <Plus size={16} aria-hidden="true" />
            New Post
          </LinkButton>
        )}
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-stone-300/60 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-200 text-left text-xs text-stone-500 uppercase tracking-wide">
              <th className="px-5 py-3 font-semibold">Title</th>
              <th className="px-5 py-3 font-semibold">Category</th>
              <th className="px-5 py-3 font-semibold">Date</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-stone-100 last:border-0">
                <td className="px-5 py-3.5 font-medium text-navy-950">{post.title}</td>
                <td className="px-5 py-3.5 text-stone-600">{post.category}</td>
                <td className="px-5 py-3.5 text-stone-600">{post.date}</td>
                <td className="px-5 py-3.5">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      post.published ? "bg-success/10 text-success" : "bg-stone-200 text-stone-600"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-4">
                    {USE_DB ? (
                      <>
                        <Link
                          href={`/admin/blog/${post.id}`}
                          className="flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-gold-600"
                        >
                          <PencilSimple size={15} aria-hidden="true" />
                          Edit
                        </Link>
                        <form>
                          <ConfirmDeleteButton
                            action={deleteBlogPostAction.bind(null, post.id)}
                            confirmMessage={`Delete "${post.title}"? This can't be undone.`}
                          />
                        </form>
                      </>
                    ) : (
                      <Link href={`/blog/${post.slug}`} className="text-sm text-stone-500 hover:text-gold-600">
                        View
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
