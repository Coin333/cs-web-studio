import type { Project, MockScreen as MockScreenSpec } from "@/lib/projects";

interface Props {
  project: Project;
  screen: MockScreenSpec;
  className?: string;
}

export function MockScreen({ project, screen, className }: Props) {
  return (
    <div
      className={"browser-frame relative overflow-hidden " + (className ?? "")}
      style={{ background: project.surface }}
    >
      <div
        className="browser-bar"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <span className="browser-dot bg-red-500/70" />
        <span className="browser-dot bg-yellow-500/70" />
        <span className="browser-dot bg-emerald-500/70" />
        <div
          className="ml-3 flex-1 h-6 rounded-md flex items-center px-3 text-[10px]"
          style={{
            background: "rgba(255,255,255,0.04)",
            color: project.text,
          }}
        >
          {project.slug}.com
        </div>
      </div>

      <div className="relative aspect-[16/10]">
        {/* Subtle gradient backdrop using project accent */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background: `radial-gradient(ellipse at top right, ${project.primary}40, transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 grid-bg opacity-30" />

        <div className="relative h-full p-5 md:p-6">
          {renderScreen(screen.kind, project)}
        </div>
      </div>
    </div>
  );
}

function renderScreen(kind: MockScreenSpec["kind"], p: Project) {
  switch (kind) {
    case "hero":
      return <HeroScreen p={p} />;
    case "menu":
      return <MenuScreen p={p} />;
    case "booking":
      return <BookingScreen p={p} />;
    case "trust":
      return <TrustScreen p={p} />;
    case "pricing":
      return <PricingScreen p={p} />;
    case "service":
      return <ServiceScreen p={p} />;
  }
}

function Pill({ p, children }: { p: Project; children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium"
      style={{
        background: `${p.primary}22`,
        color: p.text,
        border: `1px solid ${p.primary}55`,
      }}
    >
      <span
        className="h-1 w-1 rounded-full"
        style={{ background: p.primary }}
      />
      {children}
    </span>
  );
}

function Bar({
  width,
  height = 8,
  color,
  opacity = 1,
}: {
  width: string;
  height?: number;
  color?: string;
  opacity?: number;
}) {
  return (
    <div
      className="rounded-full"
      style={{
        width,
        height,
        background: color ?? "rgba(255,255,255,0.12)",
        opacity,
      }}
    />
  );
}

function Btn({
  p,
  primary,
  width = 90,
}: {
  p: Project;
  primary?: boolean;
  width?: number;
}) {
  return (
    <div
      className="rounded-md"
      style={{
        width,
        height: 22,
        background: primary ? p.primary : "rgba(255,255,255,0.08)",
        border: primary ? "none" : "1px solid rgba(255,255,255,0.12)",
        boxShadow: primary ? `0 6px 18px ${p.primary}55` : "none",
      }}
    />
  );
}

function HeroScreen({ p }: { p: Project }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded" style={{ background: p.primary }} />
          <Bar width="60px" height={6} color={p.text} opacity={0.7} />
        </div>
        <div className="flex items-center gap-2">
          <Bar width="40px" height={5} opacity={0.5} />
          <Bar width="40px" height={5} opacity={0.5} />
          <Bar width="40px" height={5} opacity={0.5} />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-[80%]">
        <Pill p={p}>{p.category}</Pill>
        <div className="mt-3 space-y-2">
          <div
            className="h-4 md:h-5 rounded"
            style={{
              width: "85%",
              background: p.text,
              opacity: 0.9,
            }}
          />
          <div
            className="h-4 md:h-5 rounded"
            style={{
              width: "60%",
              background: p.primary,
            }}
          />
        </div>
        <div className="mt-3 space-y-1.5">
          <Bar width="92%" height={4} opacity={0.4} />
          <Bar width="78%" height={4} opacity={0.4} />
        </div>
        <div className="mt-4 flex gap-2">
          <Btn p={p} primary />
          <Btn p={p} width={70} />
        </div>
      </div>
    </div>
  );
}

function MenuScreen({ p }: { p: Project }) {
  return (
    <div className="h-full flex flex-col">
      <Bar width="80px" height={6} color={p.text} opacity={0.7} />
      <Bar width="140px" height={10} color={p.primary} />
      <div className="mt-3 grid grid-cols-3 gap-2 flex-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-md p-2 flex flex-col gap-1.5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="h-8 rounded"
              style={{
                background:
                  i % 2 === 0 ? `${p.primary}33` : `${p.primarySoft}80`,
              }}
            />
            <Bar width="80%" height={4} color={p.text} opacity={0.7} />
            <Bar width="50%" height={3} opacity={0.4} />
          </div>
        ))}
      </div>
    </div>
  );
}

function BookingScreen({ p }: { p: Project }) {
  return (
    <div className="h-full flex gap-3">
      <div className="flex-1 flex flex-col gap-2">
        <Bar width="80px" height={5} opacity={0.5} />
        <div
          className="rounded-md p-2 flex flex-col gap-1.5"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Bar width="60%" height={4} color={p.text} opacity={0.8} />
          <Bar width="40%" height={3} opacity={0.4} />
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded text-center"
              style={{
                background:
                  i === 5
                    ? p.primary
                    : i % 3 === 0
                      ? "rgba(255,255,255,0.07)"
                      : "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            />
          ))}
        </div>
      </div>
      <div
        className="w-32 rounded-md p-3 flex flex-col gap-2"
        style={{
          background: `${p.primary}1a`,
          border: `1px solid ${p.primary}55`,
        }}
      >
        <Bar width="60%" height={5} color={p.primary} />
        <Bar width="80%" height={3} opacity={0.5} />
        <Bar width="50%" height={3} opacity={0.4} />
        <div className="flex-1" />
        <Btn p={p} primary width={100} />
      </div>
    </div>
  );
}

function TrustScreen({ p }: { p: Project }) {
  return (
    <div className="h-full flex flex-col">
      <Pill p={p}>Trusted by</Pill>
      <div className="mt-3 grid grid-cols-3 gap-2 flex-1">
        {[
          { v: "98%", l: "approval rate" },
          { v: "200+", l: "students taught" },
          { v: "4.9", l: "rating" },
        ].map((s) => (
          <div
            key={s.l}
            className="rounded-md p-2 flex flex-col justify-center"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="text-lg font-bold" style={{ color: p.primary }}>
              {s.v}
            </div>
            <div
              className="text-[8px] uppercase tracking-wider"
              style={{ color: p.text, opacity: 0.5 }}
            >
              {s.l}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-1.5">
        <Bar width="92%" height={4} opacity={0.4} />
        <Bar width="78%" height={4} opacity={0.4} />
      </div>
    </div>
  );
}

function PricingScreen({ p }: { p: Project }) {
  return (
    <div className="h-full flex gap-2">
      {[
        { name: "Lite", price: "$49", featured: false },
        { name: "Standard", price: "$99", featured: true },
        { name: "Pro", price: "$199", featured: false },
      ].map((t) => (
        <div
          key={t.name}
          className="flex-1 rounded-md p-3 flex flex-col gap-2"
          style={{
            background: t.featured
              ? `${p.primary}1a`
              : "rgba(255,255,255,0.03)",
            border: t.featured
              ? `1px solid ${p.primary}66`
              : "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            className="text-[10px] font-semibold"
            style={{
              color: t.featured ? p.primary : p.text,
              opacity: t.featured ? 1 : 0.7,
            }}
          >
            {t.name}
          </div>
          <div className="text-lg font-bold" style={{ color: p.text }}>
            {t.price}
          </div>
          <div className="space-y-1 flex-1">
            <Bar width="80%" height={3} opacity={0.4} />
            <Bar width="60%" height={3} opacity={0.4} />
            <Bar width="70%" height={3} opacity={0.4} />
          </div>
          <Btn
            p={p}
            primary={t.featured}
            width={Math.floor(Math.random() * 0) + 80}
          />
        </div>
      ))}
    </div>
  );
}

function ServiceScreen({ p }: { p: Project }) {
  return (
    <div className="h-full flex flex-col gap-2">
      <Bar width="100px" height={5} color={p.primary} />
      <Bar width="180px" height={10} color={p.text} opacity={0.85} />
      <div className="grid grid-cols-2 gap-2 flex-1 mt-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-md p-2.5 flex flex-col gap-1.5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center justify-between">
              <Bar width="50%" height={4} color={p.text} opacity={0.8} />
              <div
                className="h-3 w-8 rounded-sm"
                style={{ background: p.primary, opacity: 0.85 }}
              />
            </div>
            <Bar width="80%" height={3} opacity={0.4} />
            <Bar width="60%" height={3} opacity={0.4} />
          </div>
        ))}
      </div>
    </div>
  );
}
