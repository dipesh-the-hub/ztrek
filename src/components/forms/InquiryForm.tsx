"use client";

import { useState, FormEvent } from "react";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import type { Trek } from "@/lib/treks";
import { Button } from "@/components/ui/Button";
import { submitInquiryAction } from "@/lib/actions/inquiries";
import { FORM_ENDPOINT } from "@/lib/formEndpoint";

type Status = "idle" | "submitting" | "success" | "error";

interface InquiryFormProps {
  variant?: "trip-planner" | "contact";
  defaultTrek?: string;
  treks: Trek[];
}

export default function InquiryForm({
  variant = "trip-planner",
  defaultTrek,
  treks,
}: InquiryFormProps) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      variant,
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      trek: String(formData.get("trek") ?? ""),
      dates: String(formData.get("dates") ?? ""),
      groupSize: String(formData.get("groupSize") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    const [emailResult] = await Promise.allSettled([
      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      }),
      submitInquiryAction(payload),
    ]);

    if (emailResult.status === "fulfilled" && emailResult.value.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-success/30 bg-success/10 p-8 text-center">
        <CheckCircle size={40} weight="fill" className="mx-auto text-success" aria-hidden="true" />
        <h3 className="mt-4 font-display text-xl font-semibold text-navy-950">
          Thank you — message sent!
        </h3>
        <p className="mt-2 text-sm text-stone-700">
          Our Kathmandu team will get back to you within 24 hours. You can
          also reach us directly on WhatsApp for a faster reply.
        </p>
        <Button
          type="button"
          variant="ghost"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="hidden" name="_subject" value={`New ${variant === "trip-planner" ? "trip planner" : "contact"} inquiry — TrekVibe Nepal`} />
      <input type="hidden" name="_captcha" value="false" />
      {/* Honeypot field to deter basic spam bots */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-navy-950 mb-1.5">
            Full name <span className="text-danger">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full min-h-11 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-navy-950 focus:outline-2 focus:outline-offset-1 focus:outline-navy-700"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-navy-950 mb-1.5">
            Email <span className="text-danger">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full min-h-11 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-navy-950 focus:outline-2 focus:outline-offset-1 focus:outline-navy-700"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-navy-950 mb-1.5">
            Phone / WhatsApp
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="w-full min-h-11 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-navy-950 focus:outline-2 focus:outline-offset-1 focus:outline-navy-700"
          />
        </div>

        {variant === "trip-planner" && (
          <div>
            <label htmlFor="trek" className="block text-sm font-semibold text-navy-950 mb-1.5">
              Trek of interest
            </label>
            <select
              id="trek"
              name="trek"
              defaultValue={defaultTrek ?? ""}
              className="w-full min-h-11 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-navy-950 focus:outline-2 focus:outline-offset-1 focus:outline-navy-700"
            >
              <option value="">Not sure yet — recommend one</option>
              {treks.map((t) => (
                <option key={t.slug} value={t.name}>
                  {t.name}
                </option>
              ))}
              <option value="Custom / combined itinerary">Custom / combined itinerary</option>
            </select>
          </div>
        )}
      </div>

      {variant === "trip-planner" && (
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="dates" className="block text-sm font-semibold text-navy-950 mb-1.5">
              Preferred travel dates
            </label>
            <input
              id="dates"
              name="dates"
              type="text"
              placeholder="e.g. Late March 2027, flexible"
              className="w-full min-h-11 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-navy-950 focus:outline-2 focus:outline-offset-1 focus:outline-navy-700"
            />
          </div>
          <div>
            <label htmlFor="groupSize" className="block text-sm font-semibold text-navy-950 mb-1.5">
              Group size
            </label>
            <input
              id="groupSize"
              name="groupSize"
              type="text"
              placeholder="e.g. 2 people"
              className="w-full min-h-11 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-navy-950 focus:outline-2 focus:outline-offset-1 focus:outline-navy-700"
            />
          </div>
        </div>
      )}

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-navy-950 mb-1.5">
          {variant === "trip-planner"
            ? "Tell us about your fitness level, experience and travel style"
            : "Message"}{" "}
          <span className="text-danger">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-navy-950 focus:outline-2 focus:outline-offset-1 focus:outline-navy-700"
        />
      </div>

      {status === "error" && (
        <p className="flex items-center gap-2 text-sm text-danger">
          <WarningCircle size={18} aria-hidden="true" />
          Something went wrong sending your message. Please try again, or
          message us directly on WhatsApp.
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? "Sending…" : "Send Inquiry"}
      </Button>
    </form>
  );
}
