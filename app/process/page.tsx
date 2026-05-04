import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  MessageSquare,
  PenTool,
  Code2,
  Rocket,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Process — CS Web Studio",
  description:
    "How CS Web Studio ships a website in 2 to 5 days. From the first email to a live launch, with the free homepage preview built in.",
};

const PHASES = [
  {
    n: "01",
    icon: MessageSquare,
    day: "Day 0",
    title: "Quick intake",
    body: "You send a few details: business name, what you sell, who your customer is, and any sites you like the look of. Takes about 5 minutes.",
    deliverables: [
      "Intake form filled out",
      "Existing assets shared (logo, photos, copy if any)",
    ],
  },
  {
    n: "02",
    icon: PenTool,
    day: "Day 1",
    title: "Free homepage preview",
    body: "Within 24 hours, you receive a custom homepage design built specifically for your business. No template. No charge. You decide if you want to move forward.",
    deliverables: [
      "Live preview link",
      "Mobile + desktop view",
      "Two revision rounds included",
    ],
  },
  {
    n: "03",
    icon: Code2,
    day: "Days 2 to 4",
    title: "Build out the full site",
    body: "Once approved, the rest of the pages are built out using the same design system. I check in once a day with progress and questions.",
    deliverables: [
      "All pages built",
      "Mobile-first responsive",
      "Forms wired up",
      "Analytics installed (Standard +)",
    ],
  },
  {
    n: "04",
    icon: ShieldCheck,
    day: "Day 4",
    title: "Quality pass",
    body: "Every page checked on phone, tablet, and desktop. Forms tested. Speed verified. Accessibility passes. Search metadata in place.",
    deliverables: [
      "Mobile + desktop QA",
      "Form delivery tested",
      "Lighthouse 95+",
      "Search metadata + sitemap",
    ],
  },
  {
    n: "05",
    icon: Rocket,
    day: "Day 5",
    title: "Launch",
    body: "Domain pointed at the new site. SSL on. Google Business Profile updated. Site goes live and you get a quick walkthrough so you can edit content yourself later.",
    deliverables: [
      "Custom domain live",
      "SSL + redirects configured",
      "Walkthrough video",
      "Edit instructions",
    ],
  },
];

export default function ProcessPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.16),_transparent_55%)]" />
          <div className="absolute inset-0 grid-bg" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="reveal text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-3">
            Process
          </p>
          <h1 className="reveal text-5xl md:text-7xl font-bold tracking-tight text-gradient leading-[1.05] max-w-4xl">
            From first email to live site
            <br className="hidden sm:inline" /> in five days.
          </h1>
          <p className="reveal mt-6 text-lg text-zinc-400 max-w-2xl leading-relaxed">
            One person, one timeline, one fixed price. Here is exactly what
            happens between the day you reach out and the day your site goes
            live.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="relative border-l border-zinc-800 ml-3">
            {PHASES.map((p, i) => (
              <li key={p.n} className="relative pl-8 md:pl-12 pb-12 last:pb-0">
                <div className="absolute -left-[13px] top-1 flex items-center justify-center h-6 w-6 rounded-full bg-zinc-950 border-2 border-indigo-500 shadow-lg shadow-indigo-500/30">
                  <span className="text-[10px] font-bold text-indigo-300">
                    {p.n}
                  </span>
                </div>

                <div className="reveal rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-7 hover:border-zinc-700 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="hidden md:flex p-2.5 rounded-xl bg-indigo-500/10 text-indigo-300 shrink-0">
                      <p.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/15 text-indigo-200 border border-indigo-500/30">
                          {p.day}
                        </span>
                        <h3 className="text-xl font-semibold text-zinc-100">
                          {p.title}
                        </h3>
                      </div>
                      <p className="text-zinc-400 leading-relaxed">{p.body}</p>

                      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {p.deliverables.map((d) => (
                          <div
                            key={d}
                            className="flex items-start gap-2 text-sm text-zinc-300"
                          >
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
                            {d}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What you provide vs what I handle */}
      <section className="relative py-16 md:py-24 border-t border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-8">
              <h3 className="text-2xl font-semibold text-zinc-100 mb-2">
                What I handle
              </h3>
              <p className="text-sm text-zinc-400 mb-5">
                Everything technical. You stay focused on your business.
              </p>
              <ul className="space-y-2.5">
                {[
                  "Design + layout",
                  "Frontend build",
                  "Hosting + custom domain setup",
                  "SSL certificates",
                  "Mobile + desktop QA",
                  "Search metadata + sitemap",
                  "Analytics installation",
                  "Form-to-email wiring",
                ].map((x) => (
                  <li
                    key={x}
                    className="flex items-start gap-2.5 text-sm text-zinc-200"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-8">
              <h3 className="text-2xl font-semibold text-zinc-100 mb-2">
                What you provide
              </h3>
              <p className="text-sm text-zinc-400 mb-5">
                The minimum needed to make the site about your business, not a
                template.
              </p>
              <ul className="space-y-2.5">
                {[
                  "Business name + a short description",
                  "Logo (or I can make a simple one)",
                  "A few photos if you have them",
                  "Services or menu list",
                  "Contact info + hours",
                  "Where you want form replies sent",
                ].map((x) => (
                  <li
                    key={x}
                    className="flex items-start gap-2.5 text-sm text-zinc-200"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA + FAQ pointer */}
      <section className="relative py-16 md:py-24 border-t border-zinc-800/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gradient">
            Ready to start the clock?
          </h2>
          <p className="mt-5 text-lg text-zinc-400">
            Free homepage preview within 24 hours. Pay nothing if it is not
            right for you.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 cursor-pointer"
            >
              Start a project
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-100 font-medium px-6 py-3 rounded-xl transition-all duration-200 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              Read the FAQ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
