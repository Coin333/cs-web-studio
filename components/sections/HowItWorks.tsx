import { Send, Eye, Rocket } from "lucide-react";

const STEPS = [
  {
    n: "01",
    icon: Send,
    title: "Send your business info",
    description:
      "A few simple details about your business, your customers, and what you want the site to do.",
  },
  {
    n: "02",
    icon: Eye,
    title: "Get a free homepage preview",
    description:
      "Within 24 hours, you receive a full custom homepage design. No commitment. No charge.",
  },
  {
    n: "03",
    icon: Rocket,
    title: "Approve and ship",
    description:
      "Like what you see? I build out the full site and ship it live, usually within 2 to 5 days.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="process"
      className="relative py-24 md:py-32 border-t border-zinc-800/60"
    >
      <div className="absolute inset-0 -z-10 dot-bg opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-3">
            How it works
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gradient">
            Three steps. Zero friction.
          </h2>
        </div>

        <div className="relative">
          {/* connector line */}
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 relative">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className="reveal text-center"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/10 blur-xl" />
                  <div className="relative w-24 h-24 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    <s.icon className="w-9 h-9 text-indigo-400" />
                  </div>
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center h-7 w-7 rounded-full bg-indigo-500 text-white text-[11px] font-bold shadow-lg shadow-indigo-500/40">
                    {s.n}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-zinc-100 mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-xs mx-auto">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
