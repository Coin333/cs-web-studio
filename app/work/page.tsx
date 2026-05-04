import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, MapPin } from "lucide-react";
import { PROJECTS } from "@/lib/projects";
import { MockScreen } from "@/components/MockScreen";
import { ProjectScreenshot } from "@/components/ProjectScreenshot";

export const metadata: Metadata = {
  title: "Work — CS Web Studio",
  description:
    "Real client work shipped by CS Web Studio. Live project: SGV Christian Club Collective.",
};

export default function WorkPage() {
  const featured = PROJECTS[0];
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
            One real project.
            <br className="hidden sm:inline" /> Many more coming.
          </h1>
          <p className="reveal mt-6 text-lg text-zinc-400 max-w-2xl leading-relaxed">
            CS Web Studio is a young practice. The portfolio is intentionally
            small and honest: every site listed here is real, shipped, and
            visitable on the open web.
          </p>
        </div>
      </section>

      {/* Featured project */}
      <section className="relative pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal group relative overflow-hidden rounded-3xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 transition-colors">
            <div className="grid md:grid-cols-5 gap-0">
              <div className="md:col-span-3 p-6 md:p-10 lg:p-12 flex flex-col">
                <div className="flex items-center flex-wrap gap-2 mb-5">
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
                    style={{
                      background: `${featured.primary}22`,
                      color: featured.text,
                      border: `1px solid ${featured.primary}55`,
                    }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {featured.status}
                  </span>
                  <span className="text-xs text-zinc-500 inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {featured.location}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100">
                  {featured.name}
                </h2>
                <p className="mt-3 text-lg text-zinc-300">{featured.tagline}</p>
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

                <div className="mt-auto pt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/work/${featured.slug}`}
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 cursor-pointer text-sm"
                  >
                    Read the case study
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  {featured.liveUrl && (
                    <a
                      href={featured.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-100 font-medium px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer text-sm"
                    >
                      Visit live site
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
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
                  {featured.screenshots && featured.screenshots[0] ? (
                    <ProjectScreenshot
                      project={featured}
                      shot={featured.screenshots[0]}
                      priority
                    />
                  ) : (
                    <MockScreen
                      project={featured}
                      screen={featured.screens[0]}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking-the-next-build CTA, leans into the small-portfolio honesty */}
      <section className="relative py-20 md:py-24 border-t border-zinc-800/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="reveal text-3xl md:text-5xl font-semibold tracking-tight text-gradient">
            Be the next case study.
          </h2>
          <p className="reveal mt-5 text-lg text-zinc-400 max-w-xl mx-auto">
            The portfolio is small on purpose. Every project that gets added
            went live for a real client. Get in touch and yours could be next.
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
