import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Quote,
  Sparkles,
  Tag,
} from "lucide-react";
import { getProject, getAdjacentProjects, PROJECTS } from "@/lib/projects";
import { MockScreen } from "@/components/MockScreen";
import { ProjectScreenshot } from "@/components/ProjectScreenshot";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found" };
  return {
    title: `${project.name} — CS Web Studio`,
    description: project.blurb,
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: `radial-gradient(ellipse at top, ${project.primary}33, transparent 55%)`,
            }}
          />
          <div className="absolute inset-0 grid-bg" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all work
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="flex items-center flex-wrap gap-2 mb-5">
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
                  style={{
                    background: `${project.primary}22`,
                    color: project.text,
                    border: `1px solid ${project.primary}55`,
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background:
                        project.status === "Live project"
                          ? "#34d399"
                          : project.bullet,
                    }}
                  />
                  {project.status}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-zinc-500">
                  <Tag className="w-3 h-3" />
                  {project.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-zinc-500">
                  <MapPin className="w-3 h-3" />
                  {project.location}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-zinc-500">
                  <Calendar className="w-3 h-3" />
                  Built in {project.timeline}
                </span>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-indigo-300 hover:text-indigo-200"
                  >
                    Visit live site
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gradient leading-[1.05]">
                {project.name}
              </h1>
              <p className="mt-5 text-xl md:text-2xl text-zinc-200 leading-snug">
                {project.tagline}
              </p>
              <p className="mt-5 text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl">
                {project.blurb}
              </p>

              {/* Metrics */}
              <div className="mt-10 grid grid-cols-3 gap-3 max-w-lg">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4"
                  >
                    <div className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-100">
                      {m.value}
                    </div>
                    <div className="text-[11px] text-zinc-500 mt-0.5 uppercase tracking-wider">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {project.story && (
                <div className="mt-10 rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.04] p-6 md:p-7 max-w-2xl">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-indigo-300" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
                      First client
                    </span>
                  </div>
                  <p className="text-zinc-200 leading-relaxed">
                    {project.story}
                  </p>
                </div>
              )}
            </div>

            <div className="lg:col-span-5 lg:sticky lg:top-24">
              {project.screenshots && project.screenshots[0] ? (
                <ProjectScreenshot
                  project={project}
                  shot={project.screenshots[0]}
                  priority
                />
              ) : (
                <MockScreen project={project} screen={project.screens[0]} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Body: problem / approach / outcome */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { label: "The problem", body: project.problem, color: "#fb7185" },
              {
                label: "The approach",
                body: project.approach,
                color: project.primary,
              },
              { label: "The outcome", body: project.outcome, color: "#34d399" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-7"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: s.color }}
                  />
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    {s.label}
                  </span>
                </div>
                <p className="text-base text-zinc-300 leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights + screens */}
      <section className="relative py-16 md:py-24 border-t border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-3">
                What is in the build
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gradient mb-6">
                Page-level highlights.
              </h2>
              <ul className="space-y-3">
                {project.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 text-sm text-zinc-300"
                  >
                    <CheckCircle2
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: project.primary }}
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-8 border-t border-zinc-800">
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                  Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-zinc-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                  Package
                </div>
                <Link
                  href={`/services#pricing`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-200 border border-indigo-500/30 text-sm font-medium hover:bg-indigo-500/15 transition-colors"
                >
                  {project.package} package
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              {project.screenshots && project.screenshots.length > 1
                ? project.screenshots.slice(1).map((shot) => (
                    <div key={shot.src}>
                      <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                        {shot.label}
                      </div>
                      <ProjectScreenshot project={project} shot={shot} />
                    </div>
                  ))
                : project.screens.slice(1).map((screen, i) => (
                    <div key={i}>
                      <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                        {screen.label}
                      </div>
                      <MockScreen project={project} screen={screen} />
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      {project.quote && (
        <section className="relative py-16 md:py-20 border-t border-zinc-800/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Quote
              className="w-8 h-8 mx-auto mb-5"
              style={{ color: project.primary }}
            />
            <blockquote className="text-2xl md:text-3xl font-medium text-zinc-100 leading-snug">
              &ldquo;{project.quote.text}&rdquo;
            </blockquote>
            <div className="mt-5 text-sm text-zinc-500">
              {project.quote.attribution}
            </div>
          </div>
        </section>
      )}

      {/* Adjacent navigation */}
      {(prev || next) && (
        <section className="relative py-16 md:py-20 border-t border-zinc-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prev && (
                <Link
                  href={`/work/${prev.slug}`}
                  className="group rounded-2xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 p-6 transition-colors"
                >
                  <div className="text-xs uppercase tracking-wider text-zinc-500 mb-2 inline-flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3" />
                    Previous
                  </div>
                  <div className="text-lg font-semibold text-zinc-100 group-hover:text-white">
                    {prev.name}
                  </div>
                  <div className="text-sm text-zinc-400 mt-1">
                    {prev.tagline}
                  </div>
                </Link>
              )}
              {next && (
                <Link
                  href={`/work/${next.slug}`}
                  className="group rounded-2xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 p-6 transition-colors text-right"
                >
                  <div className="text-xs uppercase tracking-wider text-zinc-500 mb-2 inline-flex items-center gap-1">
                    Next
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  <div className="text-lg font-semibold text-zinc-100 group-hover:text-white">
                    {next.name}
                  </div>
                  <div className="text-sm text-zinc-400 mt-1">
                    {next.tagline}
                  </div>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative py-20 md:py-24 border-t border-zinc-800/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gradient">
            Want a build like this?
          </h2>
          <p className="mt-5 text-lg text-zinc-400">
            Free homepage preview within 24 hours. Decide afterward.
          </p>
          <div className="mt-8">
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
