import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  Layout,
  LayoutDashboard,
  Wrench,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services and Pricing — CS-Web Studio",
  description:
    "Flat-fee website packages for local businesses. Starter, Standard, and Larger Builds. Optional monthly maintenance.",
};

const TIERS = [
  {
    name: "Starter",
    price: "$150",
    priceMax: "$300",
    blurb:
      "A clean, modern presence for businesses that just need to show up online.",
    icon: Layout,
    accent: "text-zinc-300 bg-white/5",
    features: [
      "1 to 5 pages",
      "Mobile optimized",
      "Contact form",
      "Delivered in 2 to 5 days",
      "Free homepage preview",
    ],
    cta: "Start a Starter site",
    highlight: false,
  },
  {
    name: "Standard",
    price: "$300",
    priceMax: "$500",
    blurb:
      "A complete site for businesses that want polish, structure, and search visibility.",
    icon: LayoutDashboard,
    accent: "text-indigo-300 bg-indigo-500/15",
    features: [
      "5 to 8 pages",
      "Better layout structure",
      "Google Maps integration",
      "Basic SEO setup",
      "Mobile optimized",
      "Contact form",
    ],
    cta: "Start a Standard site",
    highlight: true,
  },
  {
    name: "Larger Build",
    price: "$500",
    priceMax: "$800",
    blurb:
      "For businesses that need more pages, custom flows, or extra integrations.",
    icon: Sparkles,
    accent: "text-violet-300 bg-violet-500/15",
    features: [
      "8+ pages",
      "Custom interactions",
      "Booking or quote flows",
      "Full SEO setup",
      "Analytics installed",
      "Priority delivery",
    ],
    cta: "Talk through a Larger Build",
    highlight: false,
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.18),_transparent_55%)]" />
          <div className="absolute inset-0 grid-bg" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-3 reveal">
            Services
          </p>
          <h1 className="reveal text-5xl md:text-7xl font-bold tracking-tight text-gradient max-w-3xl mx-auto leading-[1.05]">
            Flat fees. Fast delivery. Real results.
          </h1>
          <p className="reveal mt-6 text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Three clear packages. No retainers, no surprise hours, no agency
            runaround.
          </p>
        </div>
      </section>

      {/* Pricing tiers */}
      <section id="pricing" className="relative pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {TIERS.map((t) => (
              <div
                key={t.name}
                className={
                  "reveal relative rounded-2xl p-7 transition-all duration-300 " +
                  (t.highlight
                    ? "border-indigo-500/40 bg-gradient-to-b from-indigo-500/[0.08] to-zinc-900/40 border shadow-2xl shadow-indigo-500/10 md:-translate-y-2"
                    : "border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700")
                }
              >
                {t.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600 text-white text-[11px] font-semibold shadow-lg shadow-indigo-500/40">
                      <Sparkles className="w-3 h-3" />
                      Most popular
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-5">
                  <div className={`inline-flex p-2 rounded-lg ${t.accent}`}>
                    <t.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-100">
                    {t.name}
                  </h3>
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100">
                    {t.price}
                  </span>
                  <span className="text-zinc-500 text-sm">to {t.priceMax}</span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  {t.blurb}
                </p>

                <Link
                  href="/contact"
                  className={
                    "group inline-flex w-full items-center justify-center gap-2 font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer " +
                    (t.highlight
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                      : "bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-100")
                  }
                >
                  {t.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <ul className="mt-7 space-y-3">
                  {t.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-zinc-300"
                    >
                      <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 shrink-0">
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Maintenance */}
          <div className="reveal mt-10 md:mt-14">
            <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-7 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-start gap-4 max-w-2xl">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-zinc-100">
                    Maintenance plans
                  </h3>
                  <p className="mt-1.5 text-sm text-zinc-400 leading-relaxed">
                    Updates, fixes, and small edits on demand. Optional after
                    launch.
                  </p>
                </div>
              </div>
              <div className="flex items-baseline gap-2 md:text-right">
                <span className="text-3xl font-bold text-zinc-100">$25</span>
                <span className="text-zinc-500 text-sm">to $75 / month</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="relative py-24 md:py-28 border-t border-zinc-800/60">
        <div className="absolute inset-0 -z-10 dot-bg opacity-40" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-3">
              What every site includes
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gradient">
              The baseline is already great.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {[
              "Mobile-first responsive design",
              "Fast load times on 4G",
              "Clean modern typography",
              "Accessible markup",
              "Hosted on Vercel",
              "Custom domain setup",
              "Contact form delivered to your inbox",
              "Modern image optimization",
              "Free homepage preview",
            ].map((item) => (
              <div
                key={item}
                className="reveal flex items-start gap-2.5 p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 text-sm text-zinc-300"
              >
                <Check
                  className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0"
                  strokeWidth={2.5}
                />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-28 border-t border-zinc-800/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="reveal text-3xl md:text-5xl font-semibold tracking-tight text-gradient">
            Not sure which one fits?
          </h2>
          <p className="reveal mt-5 text-lg text-zinc-400 max-w-xl mx-auto">
            Send a quick message. I will recommend the right package after a
            single email back and forth.
          </p>
          <div className="reveal mt-8">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 cursor-pointer"
            >
              Get a free preview
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
