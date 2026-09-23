"use client";

import { Suspense, useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { loginAction, type LoginState } from "@/lib/actions/auth";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/admin";

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/images/brand/logo.webp"
            alt="TrekVibe Nepal"
            width={56}
            height={56}
            className="h-14 w-14 rounded-full"
          />
          <h1 className="mt-4 font-display text-xl font-semibold text-white">
            TrekVibe Nepal Admin
          </h1>
        </div>

        <form action={formAction} className="rounded-2xl bg-white p-6 sm:p-8 space-y-5">
          <input type="hidden" name="next" value={next} />
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-navy-950 mb-1.5">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              autoFocus
              className="w-full min-h-11 rounded-lg border border-stone-300 px-4 py-2.5 text-sm text-navy-950 focus:outline-2 focus:outline-offset-1 focus:outline-navy-700"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-navy-950 mb-1.5">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full min-h-11 rounded-lg border border-stone-300 px-4 py-2.5 text-sm text-navy-950 focus:outline-2 focus:outline-offset-1 focus:outline-navy-700"
            />
          </div>

          {state.error && (
            <p className="text-sm text-danger" role="alert">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full min-h-11 rounded-full bg-gold-500 px-6 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400 transition-colors cursor-pointer disabled:opacity-60"
          >
            {pending ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
