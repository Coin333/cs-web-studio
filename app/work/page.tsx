import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, MapPin } from "lucide-react";
import { PROJECTS } from "@/lib/projects";
import { MockScreen } from "@/components/MockScreen";

export const metadata: Metadata = {
  title: "Work — CS-Web Studio",
  description:
    "Recent and concept projects: auto detailers, barbershops, cafes, tutors, gyms, and trades. See how each site converts visitors into customers.",
};

const CATEGORIES = [
  "All",
  "Local service",
  "Barbershop",
  "Cafe",
  "Tutoring",
  "Gym",
  "Trades",
];

export default function WorkPage() {
  return (
    <>
      {/* Header */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.16),_transparent_55%)]" />
          <div className="absolute inset-0 grid-bg" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="reveal text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-3">
            Work
          </p>
          <h1 className="reveal text-5xl md:text-7xl font-bold tracking-tight text-gradient max-w-4xl leading-[1.05]">
            Concept directions across
            <br className="hidden sm:inline" /> local industries.
          </h1>
          <p className="reveal mt-6 text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Six concept builds for the kinds of local businesses I work with
            most. Every case study covers the problem, the approach, and the
            outcome.
          </p>

          <div className="reveal mt-10 flex flex-wrap items-center gap-2">
            {CATEGORIES.map((c, i) => (
              <span
                key={c}
                className={
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors " +
                  (i === 0
                    ? "bg-indigo-500/15 text-indigo-200 border-indigo-500/30"
                    : "bg-white/5 text-zinc-300 border-white/10")
                }
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured live project */}
      <section className="relative pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {(() => {
            const featured = PROJECTS[0];
            return (
              <Link
                href={`/work/${featured.slug}`}
                className="reveal group relative block overflow-hidden rounded-3xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 transition-colors"
              >
                <div className="grid md:grid-cols-5 gap-0">
                  <div className="md:col-span-3 p-6 md:p-10 lg:p-12 flex flex-col">
                    <div className="flex items-center gap-2 mb-5">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
                        style={{
                          background: `${featured.primary}22`,
                          color: featured.text,
                          border: `1px solid ${featured.primary}55`,
                        }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: featured.bullet }}
                        />
                        Featured
                      </span>
                      <span className="text-xs text-zinc-500 inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {featured.location}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100">
                      {featured.name}
                    </h2>
                    <p className="mt-3 text-lg text-zinc-300">
                      {featured.tagline}
                    </p>
                    <p className="mt-3 text-sm text-zinc-400 leading-relaxed max-w-md">
                      {featured.blurb}
                    </p>

                    <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
                      {featured.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3"
                        >
                          <div className="text-xl font-bold tracking-tight text-zinc-100">
                            {m.value}
                          </div>
                          <div className="text-[11px] text-zinc-500 mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto pt-8 inline-flex items-center gap-2 text-sm font-medium text-indigo-300 group-hover:text-indigo-200">
                      Read the case study
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                  <div className="md:col-span-2 relative p-6 md:p-8 flex items-center">
                    <div
                      className="absolute inset-0 opacity-50"
                      style={{
                        background: `linear-gradient(135deg, ${featured.primary}22, transparent 60%)`,
                      }}
                    />
                    <div className="relative w-full">
                      <MockScreen
                        project={featured}
                        screen={featured.screens[0]}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })()}
        </div>
      </section>

      {/* Project grid */}
      <section className="relative pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {PROJECTS.slice(1).map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="reveal group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${p.accent}`}
                  />
                  <div className="absolute inset-0 grid-bg opacity-40" />
                  <div className="absolute inset-6">
                    <MockScreen project={p} screen={p.screens[0]} />
                  </div>
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950/80 backdrop-blur border border-white/10 text-[11px] font-medium text-zinc-200">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: p.bullet }}
                    />
                    {p.status}
                  </div>
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-950/80 backdrop-blur border border-white/10 text-[11px] font-medium text-zinc-300">
                    <p.icon className="w-3 h-3" />
                    {p.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-zinc-100">
                        {p.name}
                      </h3>
                      <p className="mt-1.5 text-sm text-zinc-400 leading-relaxed">
                        {p.tagline}
                      </p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-indigo-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/5 border border-white/10 text-zinc-300">
                      {p.package}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/5 border border-white/10 text-zinc-300">
                      {p.timeline}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/5 border border-white/10 text-zinc-400">
                      <MapPin className="w-3 h-3" />
                      {p.location}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-24 border-t border-zinc-800/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="reveal text-3xl md:text-5xl font-semibold tracking-tight text-gradient">
            Want one of these for your business?
          </h2>
          <p className="reveal mt-5 text-lg text-zinc-400">
            Send a few details and you will see a custom homepage preview within
            24 hours.
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
