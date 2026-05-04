import Image from "next/image";
import type { Project, RealScreenshot } from "@/lib/projects";

interface Props {
  project: Project;
  shot: RealScreenshot;
  className?: string;
  priority?: boolean;
}

export function ProjectScreenshot({
  project,
  shot,
  className,
  priority,
}: Props) {
  const domain = project.liveUrl?.replace(/^https?:\/\//, "") ?? project.slug;
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
          {domain}
        </div>
      </div>
      <div className="relative aspect-[16/10]">
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 800px"
          className="object-cover object-top"
          priority={priority}
        />
      </div>
    </div>
  );
}
