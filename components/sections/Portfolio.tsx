import Link from "next/link";
import { ArrowUpRight, ArrowRight, MapPin } from "lucide-react";
import { PROJECTS } from "@/lib/projects";
import { MockScreen } from "@/components/MockScreen";

export function Portfolio() {
  const featured = PROJECTS.slice(0, 4);

  return (
    <section
      id="work"
      className="relative py-24 md:py-32 border-t border-zinc-800/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 reveal">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-3">
              Recent work
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gradient">
              Real builds. Real outcomes.
            </h2>
            <p className="mt-5 text-lg text-zinc-400 leading-relaxed">
              One live project plus concept directions for the kinds of local
              businesses I work with most. Each case study covers the problem,
              approach, and outcome.
            </p>
          </div>
          <Link
            href="/work"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
          >
            View all work
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {featured.map((p) => (
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
                    style={{
                      background:
                        p.status === "Live project" ? "#34d399" : p.bullet,
                    }}
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
                    <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                      {p.tagline}
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-indigo-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/5 border border-white/10 text-zinc-300">
                    <span className="h-1 w-1 rounded-full bg-indigo-400" />
                    {p.metrics[0].value}
                    <span className="text-zinc-500">{p.metrics[0].label}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/5 border border-white/10 text-zinc-400">
                    <MapPin className="w-3 h-3" />
                    {p.location}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
          >
            View all work
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
