import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { FaqItem } from "@/components/FaqItem";

export const metadata: Metadata = {
  title: "FAQ — CS-Web Studio",
  description:
    "Common questions about pricing, timelines, edits, hosting, and what is actually included with each website package.",
};

const GROUPS = [
  {
    title: "Pricing and packages",
    items: [
      {
        q: "What does a typical site cost?",
        a: (
          <p>
            Most sites land between $200 and $500. Starter is $200 to $300 for a
            small site (1 to 4 pages). Standard is $300 to $500 for most local
            businesses. Premium starts at $500 for sites with custom flows like
            booking or quoting.
          </p>
        ),
      },
      {
        q: "Why is it so much less than an agency?",
        a: (
          <p>
            Agencies have project managers, designers, developers, and account
            executives all charging hours for one site. I am one person using
            modern tooling, so the cost is just me and the time. The site
            quality is the same; the overhead is not.
          </p>
        ),
      },
      {
        q: "Are there ongoing fees?",
        a: (
          <p>
            Hosting on Vercel is free at your scale. Domain renewal is around
            $12 a year, paid directly to the registrar. Optional maintenance is
            $25 to $75 per month if you want me on call for edits.
          </p>
        ),
      },
      {
        q: "How do I pay?",
        a: (
          <p>
            50 percent up front to start the build, 50 percent on launch. I
            invoice through Stripe; cards and bank transfer both work.
          </p>
        ),
      },
    ],
  },
  {
    title: "Timeline and process",
    items: [
      {
        q: "How fast can I actually have a site?",
        a: (
          <p>
            Most Starter sites ship in 2 to 3 days from approval. Standard sites
            usually ship in 4 days. Premium sites with bookings or custom flows
            take about 5 days. The 24-hour homepage preview is free and not
            counted in the build clock.
          </p>
        ),
      },
      {
        q: "What is the free preview exactly?",
        a: (
          <p>
            A real, custom homepage built specifically for your business. Mobile
            and desktop. Live URL you can click around. No template, no
            placeholder content, no charge. If you do not move forward, that is
            the end of it.
          </p>
        ),
      },
      {
        q: "How many revisions are included?",
        a: (
          <p>
            Two rounds during the preview phase, plus minor copy and image
            tweaks during the build. Anything beyond that is billed at $50 an
            hour, but it almost never comes up.
          </p>
        ),
      },
    ],
  },
  {
    title: "Editing and ownership",
    items: [
      {
        q: "Can I edit the site myself later?",
        a: (
          <p>
            Yes. Content is in plain Markdown or simple JSON files I show you
            during the walkthrough. Most owners can update hours, services, and
            copy in a few minutes without touching code.
          </p>
        ),
      },
      {
        q: "Do I own the code?",
        a: (
          <p>
            Yes. The site is your property. I push the code to a GitHub repo you
            own, deployed to your Vercel account. No vendor lock-in.
          </p>
        ),
      },
      {
        q: "What if I want to add pages later?",
        a: (
          <p>
            Either pick up a maintenance plan for ongoing edits, or pay per page
            (typically $50 to $100 each, depending on complexity).
          </p>
        ),
      },
    ],
  },
  {
    title: "Tech and hosting",
    items: [
      {
        q: "What is the site built with?",
        a: (
          <p>
            Next.js for the frontend, Tailwind for styling, deployed to Vercel.
            Same stack used by funded startups. It is fast, reliable, and free
            to host at small-business traffic.
          </p>
        ),
      },
      {
        q: "Will my site work on phones?",
        a: (
          <p>
            Yes. Every site is built mobile-first, since most local-business
            traffic comes from a phone. Tablet and desktop layouts get the same
            level of polish.
          </p>
        ),
      },
      {
        q: "What about SEO?",
        a: (
          <p>
            Standard sites get baseline SEO setup: page titles, meta
            descriptions, sitemap, structured data, and Google Business Profile
            wiring. Premium adds keyword strategy and more thorough on-page
            optimization. Aggressive ongoing SEO work is its own service.
          </p>
        ),
      },
      {
        q: "Can I keep my existing domain?",
        a: (
          <p>
            Yes. I will walk you through pointing your existing domain at the
            new site so the transition is seamless and your email keeps working.
          </p>
        ),
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.16),_transparent_55%)]" />
          <div className="absolute inset-0 grid-bg" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="reveal text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-3">
            FAQ
          </p>
          <h1 className="reveal text-5xl md:text-7xl font-bold tracking-tight text-gradient leading-[1.05]">
            Answers, minus the runaround.
          </h1>
          <p className="reveal mt-6 text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Pricing, timelines, ownership, edits, hosting. The questions
            everyone asks, answered straight.
          </p>
        </div>
      </section>

      {/* Groups */}
      <section className="relative pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {GROUPS.map((group) => (
            <div key={group.title}>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-5">
                {group.title}
              </h2>
              <div className="space-y-3">
                {group.items.map((item, i) => (
                  <FaqItem
                    key={item.q}
                    question={item.q}
                    answer={item.a}
                    defaultOpen={
                      i === 0 && group.title === "Pricing and packages"
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 md:py-24 border-t border-zinc-800/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.18),_transparent_55%)]" />
            </div>
            <MessageCircle className="w-8 h-8 mx-auto text-indigo-400 mb-4" />
            <h2 className="text-2xl md:text-3xl font-semibold text-zinc-100">
              Question not answered?
            </h2>
            <p className="mt-3 text-zinc-400 max-w-md mx-auto">
              Send a quick email. You will hear back the same day, usually
              within a couple of hours.
            </p>
            <div className="mt-6">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 cursor-pointer"
              >
                Ask a question
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
