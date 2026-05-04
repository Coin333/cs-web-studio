"use client";
import { useState } from "react";
import { ArrowRight, Check, Loader2, AlertCircle } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      business: String(formData.get("business") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("error");
      setErrorMsg("Please fill in your name, email, and a short message.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Try again.");
      }
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unknown error.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center">
        <div className="mx-auto inline-flex p-3 rounded-2xl bg-emerald-500/15 text-emerald-300 mb-4">
          <Check className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-semibold text-zinc-100 mb-2">
          Message received.
        </h3>
        <p className="text-zinc-400 max-w-sm mx-auto">
          You will hear back within 24 hours with a custom homepage preview or a
          quick clarifying question.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-8 space-y-5"
      noValidate
    >
      <Field label="Your name" id="name" required>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 w-full"
          placeholder="Jane Doe"
        />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Business name" id="business">
          <input
            id="business"
            name="business"
            type="text"
            className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 w-full"
            placeholder="Northside Barber Co."
          />
        </Field>
        <Field label="Email" id="email" required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 w-full"
            placeholder="you@example.com"
          />
        </Field>
      </div>

      <Field label="Existing website (optional)" id="website">
        <input
          id="website"
          name="website"
          type="url"
          className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 w-full"
          placeholder="https://your-current-site.com"
        />
      </Field>

      <Field label="What do you want from the site?" id="message" required>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 w-full resize-none"
          placeholder="A few sentences about your business and what the site should help customers do."
        />
      </Field>

      {status === "error" && (
        <div className="flex items-start gap-2 text-sm text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          {errorMsg || "Something went wrong. Try again."}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group inline-flex w-full items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 cursor-pointer"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending
          </>
        ) : (
          <>
            Get my free preview
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>

      <p className="text-xs text-zinc-500 text-center">
        Replies typically within 24 hours. No spam, no follow-up sequences.
      </p>
    </form>
  );
}

function Field({
  label,
  id,
  required,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-zinc-300 mb-1.5"
      >
        {label}
        {required && <span className="text-indigo-400 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
