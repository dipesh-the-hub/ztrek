import { prisma, USE_DB } from "@/lib/db";
import { updateInquiryStatusAction, deleteInquiryAction } from "@/lib/actions/inquiries";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";

const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-gold-100 text-gold-600",
  CONTACTED: "bg-navy-100 text-navy-700",
  BOOKED: "bg-success/10 text-success",
  CLOSED: "bg-stone-200 text-stone-600",
};

export default async function AdminInquiriesPage() {
  const inquiries = USE_DB
    ? await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } })
    : [];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-950">Inquiries</h1>
      <p className="mt-1 text-sm text-stone-600">
        Trip planner and contact form submissions, newest first.
      </p>

      {!USE_DB && (
        <p className="mt-6 text-sm text-stone-600">
          Connect a database to start collecting inquiries here.
        </p>
      )}

      {USE_DB && inquiries.length === 0 && (
        <p className="mt-6 text-sm text-stone-600">No inquiries yet.</p>
      )}

      <div className="mt-6 space-y-4">
        {inquiries.map((inquiry) => (
          <div key={inquiry.id} className="rounded-2xl border border-stone-300/60 bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-navy-950">{inquiry.name}</p>
                <p className="text-sm text-stone-600">
                  <a href={`mailto:${inquiry.email}`} className="hover:text-gold-600">{inquiry.email}</a>
                  {inquiry.phone && <> · {inquiry.phone}</>}
                </p>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[inquiry.status]}`}>
                {inquiry.status}
              </span>
            </div>

            <dl className="mt-3 grid sm:grid-cols-3 gap-3 text-sm">
              {inquiry.trek && (
                <div>
                  <dt className="text-xs text-stone-500">Trek</dt>
                  <dd className="text-navy-950">{inquiry.trek}</dd>
                </div>
              )}
              {inquiry.dates && (
                <div>
                  <dt className="text-xs text-stone-500">Dates</dt>
                  <dd className="text-navy-950">{inquiry.dates}</dd>
                </div>
              )}
              {inquiry.groupSize && (
                <div>
                  <dt className="text-xs text-stone-500">Group size</dt>
                  <dd className="text-navy-950">{inquiry.groupSize}</dd>
                </div>
              )}
            </dl>

            <p className="mt-3 text-sm text-stone-700 leading-relaxed whitespace-pre-wrap">{inquiry.message}</p>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-200">
              <p className="text-xs text-stone-500">
                {inquiry.variant} · {inquiry.createdAt.toLocaleString()}
              </p>
              <div className="flex items-center gap-3">
                <StatusForm id={inquiry.id} status={inquiry.status} />
                <form>
                  <ConfirmDeleteButton action={deleteInquiryAction.bind(null, inquiry.id)} />
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusForm({ id, status }: { id: string; status: string }) {
  async function action(formData: FormData) {
    "use server";
    await updateInquiryStatusAction(id, String(formData.get("status")));
  }

  return (
    <form action={action} className="flex items-center gap-2">
      <select
        name="status"
        defaultValue={status}
        className="text-xs font-semibold rounded-full border border-stone-300 px-3 py-1.5 cursor-pointer"
      >
        <option value="NEW">New</option>
        <option value="CONTACTED">Contacted</option>
        <option value="BOOKED">Booked</option>
        <option value="CLOSED">Closed</option>
      </select>
      <button
        type="submit"
        className="text-xs font-semibold text-navy-900 hover:text-gold-600 cursor-pointer"
      >
        Update
      </button>
    </form>
  );
}
