import { Users, type LucideIcon } from "lucide-react";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface MockScreen {
  kind: "hero" | "menu" | "booking" | "trust" | "pricing" | "service";
  label: string;
}

export interface RealScreenshot {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
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
  liveUrl?: string;
  // Visual theme
  accent: string;
  bullet: string;
  primary: string;
  primarySoft: string;
  surface: string;
  text: string;
  // Synthetic mock screens (used when no real screenshots are available)
  screens: MockScreen[];
  // Real screenshots (preferred when present)
  screenshots?: RealScreenshot[];
  // Quote (real, with permission only)
  quote?: { text: string; attribution: string };
  // Story: how this client came to work with the studio
  story?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "sgv-christian-club-collective",
    name: "SGV Christian Club Collective",
    category: "Nonprofit / community",
    location: "San Gabriel Valley, CA",
    status: "Live project",
    tagline: "20 schools. One collective. One website.",
    blurb:
      "A regional network of high school Christian clubs across the San Gabriel Valley needed a single home on the web. Built the site end to end, designed the visual system, and shipped a multi-page Next.js build with a focused RSVP funnel for their flagship event.",
    problem:
      "The collective spans 20 high schools, dozens of student leaders, churches, and a flagship gathering called Everything Night. Before the site, all of that lived in scattered Instagrams and group chats. New students had no way to find their campus club, parents had no way to verify it was real, and the org had nowhere to send a curious freshman.",
    approach:
      "Built around a single calm message: One mission, every campus. The home page tees up the three pillars (Connection, Welcoming, Real faith), then surfaces the flagship event with a date-anchored RSVP CTA, then lists every campus club with its own card. Light navy + sky-blue palette to feel inviting, not corporate. Mobile-first, since every student lands from a phone.",
    outcome:
      "One URL students can share. RSVP for Everything Night funneled through a single date-anchored CTA. Per-campus club pages so a freshman from any of the 20 schools can find their club in two taps. Site doubles as the hub for leadership, partner churches, and event archives.",
    metrics: [
      { label: "Schools represented", value: "20" },
      { label: "Top-level pages", value: "8" },
      { label: "Mobile-first", value: "100%" },
    ],
    highlights: [
      "8-page Next.js site (Home, About, Events, Everything Night, Clubs, Leadership, Churches, Contact)",
      "Per-campus club pages so students can find their school in one tap",
      "Date-anchored RSVP CTA in the navbar driving the flagship event",
      "Three-pillar value section: Connection, Welcoming, Real faith",
      "Custom navy + sky-blue palette with calm, trust-led typography",
      "Open Graph image for clean link previews when students share it",
      "Sitewide preserved-aspect images for fast LCP on mobile",
    ],
    stack: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
    timeline: "A couple of weekends",
    package: "Premium",
    icon: Users,
    liveUrl: "https://sgvc.cc",
    accent: "from-sky-500/30 to-indigo-500/15",
    bullet: "#38bdf8",
    primary: "#0ea5e9",
    primarySoft: "#0c4a6e",
    surface: "#06121d",
    text: "#e0f2fe",
    screens: [
      { kind: "hero", label: "Homepage hero" },
      { kind: "menu", label: "Clubs grid (20 schools)" },
      { kind: "trust", label: "RSVP funnel" },
    ],
    screenshots: [
      {
        src: "/work/sgvc/homepage.webp",
        alt: "SGV Christian Club Collective homepage hero with the headline Christian clubs. One valley. One mission.",
        label: "Homepage hero",
        width: 1600,
        height: 838,
      },
      {
        src: "/work/sgvc/club-grid.webp",
        alt: "Clubs page listing high schools with logos, locations, and Instagram handles.",
        label: "Per-campus clubs grid",
        width: 1600,
        height: 838,
      },
      {
        src: "/work/sgvc/rsvp-funnel.webp",
        alt: "Everything Night flagship event page with date, time, location, and RSVP button.",
        label: "Everything Night RSVP funnel",
        width: 1600,
        height: 838,
      },
    ],
    quote: undefined,
    story:
      "First real client project. The collective needed a serious site fast, and I built it for them across a couple of weekends. It is now the org's primary public presence and the funnel for their flagship gathering. The bar this project set, calm visual system, real CTAs, fast mobile, is the bar every CS Web Studio site is held to.",
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  const prev = i > 0 ? PROJECTS[i - 1] : undefined;
  const next = i < PROJECTS.length - 1 ? PROJECTS[i + 1] : undefined;
  return { prev, next };
}
