"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  poster?: string;
  heading?: React.ReactNode;
  subheading?: string;
}

export function ScrollScrubVideo({ src, poster, heading, subheading }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const targetTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    video.pause();
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";

    const onMeta = () => setReady(true);
    if (video.readyState >= 1) setReady(true);
    else video.addEventListener("loadedmetadata", onMeta);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      if (video.duration && !Number.isNaN(video.duration)) {
        const eased = lerp(video.currentTime, targetTimeRef.current, 0.15);
        if (Math.abs(eased - video.currentTime) > 0.005) {
          video.currentTime = eased;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const update = () => {
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));
      if (video.duration) {
        targetTimeRef.current = progress * video.duration;
      }
    };

    update();
    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      video.removeEventListener("loadedmetadata", onMeta);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-zinc-800/60"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(10,10,10,0.4),_transparent_40%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-transparent to-zinc-950/80" />

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-20 md:pb-32">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-3">
              Built for impact
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.05]">
              {heading ?? (
                <>
                  Sites that move with{" "}
                  <span className="text-gradient-accent">your customers.</span>
                </>
              )}
            </h2>
            {subheading && (
              <p className="mt-5 text-lg text-zinc-300 max-w-xl leading-relaxed">
                {subheading}
              </p>
            )}
          </div>
        </div>

        {!ready && (
          <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
            <div className="h-2 w-32 rounded-full bg-zinc-800 overflow-hidden">
              <div className="h-full w-1/3 bg-indigo-500/70 animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
