import {
  Scissors,
  UtensilsCrossed,
  GraduationCap,
  Briefcase,
  Dumbbell,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectSection {
  heading: string;
  body: string;
}

export interface MockScreen {
  kind: "hero" | "menu" | "booking" | "trust" | "pricing" | "service";
  label: string;
}

export interface Project {
  slug: string;
  name: string;
  category: string;
  location: string;
  status: "Live project" | "Concept";
  tagline: string;
  blurb: string;
  problem: string;
  approach: string;
  outcome: string;
  metrics: ProjectMetric[];
  highlights: string[];
  stack: string[];
  timeline: string;
  package: "Starter" | "Standard" | "Premium";
  icon: LucideIcon;
  // Visual theme
  accent: string; // gradient classes
  bullet: string; // hex
  primary: string; // hex (mock CTA)
  primarySoft: string; // hex (mock secondary)
  surface: string; // hex (mock surface)
  text: string; // hex (mock text)
  // Mock screens to render
  screens: MockScreen[];
  // Quote
  quote?: { text: string; attribution: string };
}

export const PROJECTS: Project[] = [
  {
    slug: "harbor-auto-detailing",
    name: "Harbor Auto Detailing",
    category: "Local service",
    location: "Coastal markets",
    status: "Concept",
    tagline: "From a Facebook page to a real booking pipeline.",
    blurb:
      "Concept build for an auto detailer running everything off social posts and word of mouth. A 5-page site with online booking and instant quote requests.",
    problem:
      "Customers have no way to see services or pricing without sending a DM. The owner answers the same five questions every day, and most leads go cold before quoting.",
    approach:
      "Service-led layout with packages priced clearly, a booking flow that pre-qualifies the vehicle, and an SMS-friendly quote request form. Built mobile-first, since 80% of detail leads come from a phone.",
    outcome:
      "Quote requests move from DMs to a structured form. The owner replies in batches once a day instead of all day. Self-serve booking surfaces on Google search and Maps.",
    metrics: [
      { label: "Pages", value: "5" },
      { label: "Mobile-first", value: "100%" },
      { label: "Inquiry funnel", value: "Structured" },
    ],
    highlights: [
      "Service packages with transparent pricing",
      "Online booking with vehicle pre-qualifier",
      "Quote form with photo upload",
      "Google Business Profile wired in",
      "Local SEO setup",
    ],
    stack: ["Next.js", "Tailwind", "Vercel", "Resend"],
    timeline: "4 days",
    package: "Standard",
    icon: Briefcase,
    accent: "from-indigo-500/30 to-violet-500/15",
    bullet: "#818cf8",
    primary: "#4f46e5",
    primarySoft: "#312e81",
    surface: "#0b0b14",
    text: "#e4e4e7",
    screens: [
      { kind: "hero", label: "Homepage hero" },
      { kind: "service", label: "Service packages" },
      { kind: "booking", label: "Booking flow" },
    ],
  },
  {
    slug: "northside-barber-co",
    name: "Northside Barber Co.",
    category: "Barbershop",
    location: "Brooklyn, NY",
    status: "Concept",
    tagline: "A booking-first redesign for a busy two-chair shop.",
    blurb:
      "Concept rebuild for a barbershop running on text-message bookings. Online scheduling, barber bios, and a service menu front and center.",
    problem:
      "The current site is a one-pager from 2014 with a phone number and an outdated schedule. The shop loses bookings to a competitor's instant scheduling page two blocks away.",
    approach:
      "Lead with a sticky 'Book now' CTA that opens an instant scheduling modal. Each barber gets a card with availability, specialties, and a sample-cut gallery. Service menu doubles as a price list, indexed for SEO.",
    outcome:
      "Walk-ins still walk in. Regulars and first-timers can book in two taps. Search now ranks the shop for 'barber near me' phrases the old site never targeted.",
    metrics: [
      { label: "Booking time", value: "Under 30s" },
      { label: "Mobile-first", value: "100%" },
      { label: "Pages", value: "6" },
    ],
    highlights: [
      "Instant scheduling integration",
      "Per-barber availability and specialties",
      "Service + price list optimized for local SEO",
      "Sticky booking CTA on every page",
      "Gallery of finished cuts",
    ],
    stack: ["Next.js", "Tailwind", "Cal.com", "Vercel"],
    timeline: "3 days",
    package: "Standard",
    icon: Scissors,
    accent: "from-amber-500/25 to-rose-500/15",
    bullet: "#fbbf24",
    primary: "#f59e0b",
    primarySoft: "#7c2d12",
    surface: "#120b08",
    text: "#fef3c7",
    screens: [
      { kind: "hero", label: "Booking-first hero" },
      { kind: "menu", label: "Service menu" },
      { kind: "booking", label: "Instant scheduling" },
    ],
  },
  {
    slug: "casa-verde-cafe",
    name: "Casa Verde Cafe",
    category: "Cafe",
    location: "Austin, TX",
    status: "Concept",
    tagline: "Menu-first, mobile-ordering forward.",
    blurb:
      "A neighborhood cafe site built around the menu and a one-tap mobile ordering flow. Photography-led, scannable, fast.",
    problem:
      "Most cafes hide their menu behind a PDF or a Square link. Visitors bounce because they can't tell what's actually served. Tap-to-order is buried.",
    approach:
      "Menu lives on the homepage, organized by category and time of day. Each item links to a one-tap order flow. Hours and address are sticky in the header, since that is what 70% of visitors actually came for.",
    outcome:
      "Hours, menu, order. Three clicks max from any screen. The site reads more like a Notion doc than a brochure, which is the point.",
    metrics: [
      { label: "Pages", value: "4" },
      { label: "Time-to-order", value: "Under 1 min" },
      { label: "PageSpeed", value: "98" },
    ],
    highlights: [
      "Live menu pulled from a single source",
      "One-tap mobile ordering",
      "Sticky hours + address",
      "Photography-led food cards",
      "Google Maps + directions",
    ],
    stack: ["Next.js", "Tailwind", "Square", "Vercel"],
    timeline: "3 days",
    package: "Standard",
    icon: UtensilsCrossed,
    accent: "from-emerald-500/25 to-teal-500/15",
    bullet: "#34d399",
    primary: "#10b981",
    primarySoft: "#064e3b",
    surface: "#06120e",
    text: "#d1fae5",
    screens: [
      { kind: "hero", label: "Hero with hours" },
      { kind: "menu", label: "Menu grid" },
      { kind: "service", label: "One-tap order" },
    ],
  },
  {
    slug: "mira-tutoring",
    name: "Mira Tutoring",
    category: "Tutoring",
    location: "San Diego, CA",
    status: "Concept",
    tagline: "Trust-led layout. Simple inquiry funnel.",
    blurb:
      "Concept for a math and SAT tutor. Designed around credibility markers, parent reassurance, and a low-friction inquiry form.",
    problem:
      "Tutoring is a trust purchase. Most tutor sites are heavy on stock photos and light on proof. Parents bounce when they cannot quickly find credentials, results, and pricing.",
    approach:
      "Lead with student outcomes (score gains, college acceptances), then credentials, then a 3-field inquiry form. Pricing is visible. Sample lesson clip embedded above the fold.",
    outcome:
      "Parents land, see credibility in the first 4 seconds, and inquire without scrolling for an email address. Inquiry form pre-qualifies grade level and subject.",
    metrics: [
      { label: "Inquiry fields", value: "3" },
      { label: "Time to credibility", value: "Under 4s" },
      { label: "Pages", value: "5" },
    ],
    highlights: [
      "Outcomes section above the fold",
      "Embedded sample lesson clip",
      "Grade + subject pre-qualifier",
      "Transparent pricing",
      "Parent-focused FAQ",
    ],
    stack: ["Next.js", "Tailwind", "Vercel", "Resend"],
    timeline: "3 days",
    package: "Standard",
    icon: GraduationCap,
    accent: "from-sky-500/25 to-indigo-500/15",
    bullet: "#38bdf8",
    primary: "#0284c7",
    primarySoft: "#0c4a6e",
    surface: "#08111a",
    text: "#e0f2fe",
    screens: [
      { kind: "trust", label: "Outcomes-led hero" },
      { kind: "pricing", label: "Pricing card" },
      { kind: "service", label: "Inquiry funnel" },
    ],
  },
  {
    slug: "ironworks-fitness",
    name: "Ironworks Fitness",
    category: "Gym",
    location: "Denver, CO",
    status: "Concept",
    tagline: "Membership funnel for a strength-focused gym.",
    blurb:
      "A landing page concept for a small strength-and-conditioning gym. Membership tiers, free intro week, and a clear path from curious to walked-in.",
    problem:
      "Gym sites are usually gallery walls of equipment. They do not answer the only two questions visitors have: what does it cost and how do I try it?",
    approach:
      "Three-tier membership card grid front and center. Free intro week CTA on every screen. Coach bios, schedule, and a 60-second video tour that scrubs as you scroll.",
    outcome:
      "Visitors see pricing, see the gym, and book a free week without scrolling for an answer. Owner gets pre-qualified leads instead of casual browsers.",
    metrics: [
      { label: "Membership tiers", value: "3" },
      { label: "Free intro CTA", value: "Every page" },
      { label: "Pages", value: "6" },
    ],
    highlights: [
      "Membership tier comparison",
      "Free intro week funnel",
      "Coach bios + schedule",
      "Scroll-scrubbed gym tour video",
      "Class booking integration",
    ],
    stack: ["Next.js", "Tailwind", "Cal.com", "Vercel"],
    timeline: "4 days",
    package: "Premium",
    icon: Dumbbell,
    accent: "from-rose-500/25 to-orange-500/15",
    bullet: "#fb7185",
    primary: "#e11d48",
    primarySoft: "#881337",
    surface: "#130809",
    text: "#ffe4e6",
    screens: [
      { kind: "hero", label: "Membership-led hero" },
      { kind: "pricing", label: "Tier cards" },
      { kind: "booking", label: "Free week funnel" },
    ],
  },
  {
    slug: "ridgeline-plumbing",
    name: "Ridgeline Plumbing",
    category: "Trades",
    location: "Boise, ID",
    status: "Concept",
    tagline: "Click-to-call first. Quotes in two taps.",
    blurb:
      "Concept site for a residential plumber. Built for emergency searches: phone number above the fold, service area mapped, response time visible.",
    problem:
      "When a pipe bursts, no one wants to read about your company values. Plumbing sites need to surface a phone number and a response time within a second.",
    approach:
      "Click-to-call sticky button on mobile. Above the fold: phone number, current response time, service radius map. Service list with flat-fee pricing where possible.",
    outcome:
      "Emergency callers convert in one tap. Non-emergency leads can request a quote with photos. The site does in 5 seconds what most plumbing sites take 5 minutes to do.",
    metrics: [
      { label: "Tap-to-call", value: "1 tap" },
      { label: "Service radius", value: "Mapped" },
      { label: "Pages", value: "5" },
    ],
    highlights: [
      "Sticky click-to-call on mobile",
      "Live response-time indicator",
      "Service area map",
      "Flat-fee service catalog",
      "Photo-upload quote requests",
    ],
    stack: ["Next.js", "Tailwind", "Vercel", "Twilio"],
    timeline: "3 days",
    package: "Standard",
    icon: Wrench,
    accent: "from-zinc-400/20 to-blue-500/15",
    bullet: "#94a3b8",
    primary: "#2563eb",
    primarySoft: "#1e3a8a",
    surface: "#0a0f1a",
    text: "#e0e7ff",
    screens: [
      { kind: "hero", label: "Emergency-first hero" },
      { kind: "service", label: "Service catalog" },
      { kind: "trust", label: "Response time + map" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  const prev = i > 0 ? PROJECTS[i - 1] : PROJECTS[PROJECTS.length - 1];
  const next = i < PROJECTS.length - 1 ? PROJECTS[i + 1] : PROJECTS[0];
  return { prev, next };
}
