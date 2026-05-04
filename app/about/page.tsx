import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Compass,
  Gauge,
  HandHeart,
  Layers,
  Sparkles,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About — CS Web Studio",
  description:
    "CS Web Studio is a solo practice run by Colin Sweeney. Fast, modern websites for local businesses, built without agency overhead.",
};

const PRINCIPLES = [
  {
    icon: Gauge,
    title: "Speed beats committee",
    body: "Solo means no scoping calls, no account managers, no waiting on a designer. Decisions ship the same day.",
  },
  {
    icon: Layers,
    title: "Modern tools, lower cost",
    body: "Next.js, Tailwind, Vercel. The same stack used by funded startups, run lean enough to price for a small business.",
  },
  {
    icon: HandHeart,
    title: "Real outcomes, not deliverables",
    body: "The site is the means, not the goal. The goal is more bookings, more calls, more customers in the door.",
  },
  {
    icon: Compass,
    title: "Honest scope",
    body: "If your business does not need a 12-page site, I will tell you. Smaller and shipped beats large and stuck.",
  },
];

const STACK = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Vercel",
  "Lucide",
  "Inter",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.16),_transparent_55%)]" />
          <div className="absolute inset-0 grid-bg" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="reveal text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-3">
            About the studio
          </p>
          <h1 className="reveal text-5xl md:text-7xl font-bold tracking-tight text-gradient leading-[1.05]">
            Built by hand,
            <br />
            shipped in days.
          </h1>
          <p className="reveal mt-7 text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl">
            CS Web Studio is a solo web development practice run by Colin
            Sweeney. The studio exists to put modern, fast, beautifully built
            websites in the hands of small businesses, at prices that make sense
            for the kind of customer who walks past their door.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="relative py-16 md:py-24 border-t border-zinc-800/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <div className="md:sticky md:top-28">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-5">
                  <Sparkles className="w-3.5 h-3.5" />
                  The story
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gradient">
                  Colin Sweeney.
                </h2>
                <p className="mt-3 text-zinc-400 text-sm">
                  Founder + sole builder
                </p>
              </div>
            </div>
            <div className="md:col-span-8 space-y-5 text-zinc-300 leading-relaxed">
              <p>
                The first website I designed went up about two years ago. It was
                small. The layout was rough. The copy was worse. But the feeling
                of clicking publish and watching it work, that was the thing
                that stuck.
              </p>
              <p>
                Most local businesses do not need an agency. They need something
                that looks like it belongs in 2026, loads in under a second, and
                tells a customer what to do next. After helping friends and
                family with quick sites here and there, it became obvious that
                the gap between &ldquo;a real working modern website&rdquo; and
                &ldquo;something a small business can actually afford&rdquo; was
                wider than it should be.
              </p>
              <p>
                CS Web Studio is the answer to that gap. One person. Modern
                tools. Honest pricing. Sites built the way a startup would build
                them, sold at a price a barbershop or a tutor or a cafe can pay
                without flinching.
              </p>
              <p>
                The first real client was a regional nonprofit, the SGV
                Christian Club Collective. I built the site over a couple of
                weekends. It taught me what every project since has been
                measured against: ship fast, keep it calm, make every CTA do
                real work.
              </p>
              <p className="text-zinc-200 font-medium">
                That is the bar. Every site after this one is held to it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stat strip */}
      <section className="relative py-12 border-y border-zinc-800/60 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: "2 to 5", label: "day delivery" },
              { value: "$200+", label: "starter pricing" },
              { value: "100%", label: "mobile-first" },
              { value: "1", label: "person you talk to" },
            ].map((s) => (
              <div key={s.label} className="reveal text-center md:text-left">
                <div className="text-3xl md:text-4xl font-bold tracking-tight text-gradient-accent">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-zinc-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal max-w-2xl mb-14">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-3">
              Principles
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gradient">
              How the studio operates.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {PRINCIPLES.map((p) => (
              <div
                key={p.title}
                className="reveal group bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-7 transition-colors duration-200"
              >
                <div className="inline-flex p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 mb-5">
                  <p.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-100 mb-2">
                  {p.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="relative py-24 md:py-28 border-t border-zinc-800/60">
        <div className="absolute inset-0 -z-10 dot-bg opacity-40" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal flex items-start md:items-center gap-3 mb-10">
            <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-300">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-1">
                Stack
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-100">
                Modern tools that ship faster than custom themes.
              </h2>
            </div>
          </div>

          <div className="reveal flex flex-wrap gap-2">
            {STACK.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-200"
              >
                <Star className="w-3 h-3 text-indigo-400" />
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-28 border-t border-zinc-800/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="reveal text-3xl md:text-5xl font-semibold tracking-tight text-gradient">
            Ready to see what your site could look like?
          </h2>
          <p className="reveal mt-5 text-lg text-zinc-400">
            Free homepage preview within 24 hours. Decide afterward.
          </p>
          <div className="reveal mt-8">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 cursor-pointer"
            >
              Start a project
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
