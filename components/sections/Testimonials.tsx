import { Quote } from "lucide-react";

const QUOTES = [
  {
    quote:
      "Clean, fast, and exactly what I needed. Customers actually call now instead of bouncing.",
    name: "Local business owner",
    role: "Service shop, Dallas TX",
  },
  {
    quote:
      "Helped me get more online inquiries within a week. The mobile site is what closed it.",
    name: "Studio owner",
    role: "Tutoring practice",
  },
  {
    quote:
      "Three days from first message to live site. The price was the easy part.",
    name: "Cafe operator",
    role: "Cafe, Austin TX",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32 border-t border-zinc-800/60">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.08),_transparent_60%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 reveal">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-3">
            What clients say
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gradient">
            Words from people the work was for.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {QUOTES.map((q, i) => (
            <figure
              key={q.name + i}
              className="reveal relative bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 transition-colors duration-200"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Quote className="w-6 h-6 text-indigo-400/70 mb-4" />
              <blockquote className="text-base text-zinc-200 leading-relaxed">
                {q.quote}
              </blockquote>
              <figcaption className="mt-6 pt-6 border-t border-zinc-800/80 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500/40 to-violet-500/30 border border-white/10 flex items-center justify-center text-xs font-semibold text-zinc-200">
                  {q.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-medium text-zinc-100">
                    {q.name}
                  </div>
                  <div className="text-xs text-zinc-500">{q.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
