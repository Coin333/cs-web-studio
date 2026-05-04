"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  framePrefix: string; // e.g. "/scrub-frames/frame_"
  frameCount: number;
  frameDigits?: number;
  frameExt?: string;
  width: number; // intrinsic frame width (for canvas back buffer)
  height: number; // intrinsic frame height
  heading?: React.ReactNode;
  subheading?: string;
}

export function ScrollScrubFrames({
  framePrefix,
  frameCount,
  frameDigits = 4,
  frameExt = "jpg",
  width,
  height,
  heading,
  subheading,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const drawnFrameRef = useRef(-1);
  const rafRef = useRef<number | null>(null);
  const [loaded, setLoaded] = useState(0);

  // Preload frames
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(frameCount);
    let cancelled = false;
    let count = 0;

    for (let i = 0; i < frameCount; i++) {
      const num = String(i + 1).padStart(frameDigits, "0");
      const img = new window.Image();
      img.decoding = "async";
      img.src = `${framePrefix}${num}.${frameExt}`;
      img.onload = () => {
        if (cancelled) return;
        count++;
        setLoaded(count);
        // Redraw the current target frame as soon as it becomes available
        if (i === Math.round(targetFrameRef.current)) {
          drawnFrameRef.current = -1; // force redraw
        }
      };
      images[i] = img;
    }
    imagesRef.current = images;
    return () => {
      cancelled = true;
    };
  }, [framePrefix, frameCount, frameDigits, frameExt]);

  // Scroll-driven drawing loop
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Sharp rendering on retina
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const drawFrame = (frame: number) => {
      const idx = Math.max(0, Math.min(frameCount - 1, frame));
      const img = imagesRef.current[idx];
      if (!img || !img.complete || img.naturalWidth === 0) {
        // Fall back to nearest available frame
        for (let off = 1; off < frameCount; off++) {
          const a = imagesRef.current[idx - off];
          const b = imagesRef.current[idx + off];
          if (a && a.complete && a.naturalWidth > 0) {
            ctx.drawImage(a, 0, 0, width, height);
            return;
          }
          if (b && b.complete && b.naturalWidth > 0) {
            ctx.drawImage(b, 0, 0, width, height);
            return;
          }
        }
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
    };

    const tick = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      // Lerp toward target for buttery smoothing
      const next = current + (target - current) * 0.18;
      currentFrameRef.current = next;

      const rounded = Math.round(next);
      if (rounded !== drawnFrameRef.current) {
        drawFrame(rounded);
        drawnFrameRef.current = rounded;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const update = () => {
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));
      targetFrameRef.current = progress * (frameCount - 1);
    };

    update();
    drawFrame(0);
    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [frameCount, width, height]);

  const loadProgress = Math.round((loaded / frameCount) * 100);
  const ready = loaded >= Math.min(8, frameCount);

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-zinc-800/60"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover", display: "block" }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(10,10,10,0.35),_transparent_45%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-transparent to-zinc-950/85" />

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
          <div className="absolute inset-0 bg-zinc-950 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-1 w-40 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-indigo-500 transition-all duration-150"
                  style={{ width: `${Math.max(loadProgress, 5)}%` }}
                />
              </div>
              <div className="text-xs text-zinc-500">
                Loading {loadProgress}%
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
