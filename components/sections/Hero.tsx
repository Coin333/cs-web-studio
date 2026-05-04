import Link from "next/link";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.18),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(167,139,250,0.10),_transparent_60%)]" />
        <div className="absolute inset-0 grid-bg" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-xs font-medium text-zinc-300 mb-8 reveal">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Now booking April projects
            <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <h1 className="reveal text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            <span className="text-gradient">Modern websites</span>
            <br />
            for local businesses{" "}
            <span className="text-gradient-accent">that convert.</span>
          </h1>

          <p className="reveal mt-7 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Fast, mobile-first sites built in 2 to 5 days. Skip the agency price
            tag. Get a homepage preview before you pay a cent.
          </p>

          <div className="reveal mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 cursor-pointer"
            >
              Get a free preview
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#work"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-100 font-medium px-6 py-3 rounded-xl transition-all duration-200 cursor-pointer"
            >
              View work
            </Link>
          </div>

          <div className="reveal mt-14 flex items-center justify-center gap-6 text-xs text-zinc-500">
            <span className="inline-flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-indigo-400" />2 to 5 day
              turnaround
            </span>
            <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-zinc-700" />
            <span className="hidden sm:inline-flex items-center gap-1.5">
              No retainer required
            </span>
            <span className="hidden md:inline-block h-1 w-1 rounded-full bg-zinc-700" />
            <span className="hidden md:inline-flex items-center gap-1.5">
              Free homepage preview
            </span>
          </div>
        </div>

        {/* Hero browser mock */}
        <div className="reveal mt-20 max-w-5xl mx-auto">
          <div className="browser-frame">
            <div className="browser-bar">
              <span className="browser-dot bg-red-500/80" />
              <span className="browser-dot bg-yellow-500/80" />
              <span className="browser-dot bg-emerald-500/80" />
              <div className="ml-3 flex-1 h-6 rounded-md bg-zinc-900/60 border border-white/5 px-3 flex items-center text-[11px] text-zinc-500">
                cswebstudio.com
              </div>
            </div>
            <div className="relative aspect-[16/9] bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900">
              <div className="absolute inset-0 grid-bg opacity-60" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(99,102,241,0.18),_transparent_55%)]" />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-full max-w-3xl">
                  <div className="h-3 w-24 rounded-full bg-white/10 mb-4" />
                  <div className="h-9 md:h-12 w-3/4 rounded-md bg-gradient-to-r from-zinc-200/90 to-zinc-400/40 mb-3" />
                  <div className="h-9 md:h-12 w-1/2 rounded-md bg-gradient-to-r from-indigo-400/70 to-violet-400/40 mb-6" />
                  <div className="h-3 w-full rounded-full bg-white/5 mb-2" />
                  <div className="h-3 w-5/6 rounded-full bg-white/5 mb-2" />
                  <div className="h-3 w-2/3 rounded-full bg-white/5 mb-8" />
                  <div className="flex gap-3">
                    <div className="h-10 w-32 rounded-xl bg-indigo-500 shadow-lg shadow-indigo-500/30" />
                    <div className="h-10 w-28 rounded-xl bg-white/5 border border-white/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Floating stat cards */}
          <div className="hidden md:block">
            <div className="absolute hidden md:flex left-4 lg:left-12 -translate-y-32 items-center gap-3 rounded-xl bg-zinc-900/90 backdrop-blur border border-white/10 px-4 py-3 shadow-xl">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Zap className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <div className="text-xs text-zinc-500">Avg. delivery</div>
                <div className="text-sm font-semibold">3.2 days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
