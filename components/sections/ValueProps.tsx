import { Zap, Smartphone, Wallet, Target } from "lucide-react";

const VALUES = [
  {
    icon: Zap,
    title: "Fast turnaround",
    description:
      "From kickoff to live site in 2 to 5 days. No drawn-out agency timelines.",
    accent: "text-indigo-400 bg-indigo-500/10",
  },
  {
    icon: Smartphone,
    title: "Mobile-first design",
    description:
      "Designed for the screen most of your customers actually use. Pixel sharp on every device.",
    accent: "text-violet-400 bg-violet-500/10",
  },
  {
    icon: Wallet,
    title: "Small business pricing",
    description:
      "Real websites that don't cost agency money. Predictable flat fees.",
    accent: "text-emerald-400 bg-emerald-500/10",
  },
  {
    icon: Target,
    title: "Built to convert",
    description:
      "Layouts engineered to turn visitors into bookings, calls, and customers.",
    accent: "text-rose-400 bg-rose-500/10",
  },
];

export function ValueProps() {
  return (
    <section className="relative py-24 md:py-32 border-t border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16 reveal">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-3">
            Why CS-Web Studio
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gradient">
            Built like a startup. Priced like a freelancer.
          </h2>
          <p className="mt-5 text-lg text-zinc-400 leading-relaxed">
            Every site is hand-built using the same modern tools that power
            funded startups. You get the polish without the overhead.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="reveal group relative bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className={`inline-flex p-2.5 rounded-xl ${v.accent} mb-5`}>
                <v.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-100 mb-2">
                {v.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
