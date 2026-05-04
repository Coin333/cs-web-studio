import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-24 md:py-32 border-t border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/40 p-10 md:p-16">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(99,102,241,0.25),_transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(167,139,250,0.18),_transparent_60%)]" />
            <div className="absolute inset-0 grid-bg opacity-50" />
          </div>

          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gradient">
              Want a modern website for your business?
            </h2>
            <p className="mt-5 text-lg text-zinc-400 leading-relaxed">
              Send a few details and get a custom homepage preview within 24
              hours. Free, no commitment.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/30 cursor-pointer"
              >
                Get a free preview
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/services#pricing"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-100 font-medium px-6 py-3 rounded-xl transition-all duration-200 cursor-pointer"
              >
                See pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
