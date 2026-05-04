import type { Metadata } from "next";
import { Mail, Clock, ShieldCheck, Instagram } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — CS Web Studio",
  description:
    "Send a few details about your business and get a free homepage preview within 24 hours.",
};

const POINTS = [
  {
    icon: Clock,
    title: "24-hour reply",
    body: "You hear back within a day with a preview or a quick clarifying question.",
  },
  {
    icon: ShieldCheck,
    title: "No commitment",
    body: "The first homepage preview is free. Pay only if you want to ship the full site.",
  },
  {
    icon: Mail,
    title: "Direct line",
    body: "You email me, not a sales rep. One person handles everything end to end.",
  },
];

export default function ContactPage() {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.16),_transparent_55%)]" />
        <div className="absolute inset-0 grid-bg" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="reveal text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-3">
              Contact
            </p>
            <h1 className="reveal text-4xl md:text-6xl font-bold tracking-tight text-gradient leading-[1.05]">
              Free homepage preview within 24 hours.
            </h1>
            <p className="reveal mt-6 text-lg text-zinc-400 leading-relaxed max-w-md">
              Tell me about your business. I will reply with a custom homepage
              design you can actually look at before deciding anything.
            </p>

            <div className="mt-10 space-y-4">
              {POINTS.map((p) => (
                <div
                  key={p.title}
                  className="reveal flex items-start gap-3 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800"
                >
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
                    <p.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-zinc-100">
                      {p.title}
                    </div>
                    <div className="text-sm text-zinc-400 leading-relaxed">
                      {p.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 reveal flex flex-col gap-2 text-sm text-zinc-500">
              <div>
                Prefer email?{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-zinc-200 hover:text-white underline underline-offset-4 decoration-zinc-700 hover:decoration-indigo-400 transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div>
                On Instagram?{" "}
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-200 hover:text-white underline underline-offset-4 decoration-zinc-700 hover:decoration-indigo-400 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />@{INSTAGRAM_HANDLE}
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 reveal">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
