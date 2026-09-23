"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { createSessionToken, setSessionCookie, clearSessionCookie } from "@/lib/auth";

export interface LoginState {
  error?: string;
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !adminPasswordHash) {
    return { error: "Admin login is not configured yet. Set ADMIN_EMAIL and ADMIN_PASSWORD_HASH." };
  }

  if (email !== adminEmail) {
    return { error: "Invalid email or password." };
  }

  const valid = await bcrypt.compare(password, adminPasswordHash);
  if (!valid) {
    return { error: "Invalid email or password." };
  }

  const token = await createSessionToken(email);
  await setSessionCookie(token);
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/admin/login");
}
