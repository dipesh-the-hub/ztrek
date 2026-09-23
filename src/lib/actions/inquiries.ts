"use server";

import { revalidatePath } from "next/cache";
import { prisma, USE_DB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export interface InquiryInput {
  variant: string;
  name: string;
  email: string;
  phone?: string;
  trek?: string;
  dates?: string;
  groupSize?: string;
  message: string;
}

/** Called from the public trip-planner / contact forms. Best-effort — never throws to the client. */
export async function submitInquiryAction(input: InquiryInput) {
  if (!USE_DB) return { ok: true, persisted: false };
  try {
    await prisma.inquiry.create({
      data: {
        variant: input.variant,
        name: input.name,
        email: input.email,
        phone: input.phone || null,
        trek: input.trek || null,
        dates: input.dates || null,
        groupSize: input.groupSize || null,
        message: input.message,
      },
    });
    revalidatePath("/admin/inquiries");
    return { ok: true, persisted: true };
  } catch {
    return { ok: true, persisted: false };
  }
}

const VALID_STATUSES = ["NEW", "CONTACTED", "BOOKED", "CLOSED"] as const;

export async function updateInquiryStatusAction(id: string, status: string) {
  await requireAdmin();
  if (!USE_DB) return;
  if (!VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])) {
    throw new Error("Invalid status");
  }
  await prisma.inquiry.update({
    where: { id },
    data: { status: status as (typeof VALID_STATUSES)[number] },
  });
  revalidatePath("/admin/inquiries");
}

export async function deleteInquiryAction(id: string) {
  await requireAdmin();
  if (!USE_DB) return;
  await prisma.inquiry.delete({ where: { id } });
  revalidatePath("/admin/inquiries");
}
