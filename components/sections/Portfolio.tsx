import {
  ArrowUpRight,
  Scissors,
  UtensilsCrossed,
  GraduationCap,
  Briefcase,
} from "lucide-react";

const PROJECTS = [
  {
    label: "Live Project",
    title: "Local Business Website",
    blurb: "Outdated brochure site to a modern conversion-focused homepage.",
    accent: "from-indigo-500/30 to-violet-500/10",
    icon: Briefcase,
    metric: "+38% inquiries",
    bullet: "#818cf8",
    real: true,
  },
  {
    label: "Concept",
    title: "Northside Barber Co.",
    blurb:
      "Booking-first redesign with online scheduling and modern brand polish.",
    accent: "from-amber-500/25 to-rose-500/10",
    icon: Scissors,
    metric: "Online bookings 24/7",
    bullet: "#fbbf24",
    real: false,
  },
  {
    label: "Concept",
    title: "Casa Verde Cafe",
    blurb: "Menu-led design with a one-tap mobile order flow front and center.",
    accent: "from-emerald-500/25 to-teal-500/10",
    icon: UtensilsCrossed,
    metric: "Mobile-first ordering",
    bullet: "#34d399",
    real: false,
  },
  {
    label: "Concept",
    title: "Mira Tutoring",
    blurb:
      "Trust-led layout with simple inquiry funnel and credibility markers.",
    accent: "from-sky-500/25 to-indigo-500/10",
    icon: GraduationCap,
    metric: "Trust-led inquiry funnel",
    bullet: "#38bdf8",
    real: false,
  },
];

export function Portfolio() {
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
              Real sites. Real results.
            </h2>
            <p className="mt-5 text-lg text-zinc-400 leading-relaxed">
              A live build plus three concept directions for the kinds of local
              businesses I work with most often.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {PROJECTS.map((p) => (
            <article
              key={p.title}
              className="reveal group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-all duration-300"
            >
              {/* visual */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${p.accent}`}
                />
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="absolute inset-6 rounded-xl bg-zinc-950/60 backdrop-blur-sm border border-white/5 flex flex-col p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-red-500/70" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <p.icon className="w-6 h-6 text-zinc-200" />
                      </div>
                      <div className="h-3 w-32 rounded-full bg-white/15" />
                      <div className="h-2 w-44 rounded-full bg-white/10" />
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950/80 backdrop-blur border border-white/10 text-[11px] font-medium text-zinc-200">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: p.bullet }}
                  />
                  {p.label}
                </div>
              </div>

              {/* meta */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-100">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                      {p.blurb}
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-indigo-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-zinc-300 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  {p.metric}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
