"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  framePrefix: string;
  frameCount: number;
  frameDigits?: number;
  frameExt?: string;
  width: number;
  height: number;
  heading?: React.ReactNode;
  subheading?: string;
}

// Inverse-smoothstep: shallow slope at t=0.5, steep at t=0 and t=1.
// Creates a dwell midway through the scrub — scroll progresses more
// slowly through the middle so the user can see what's happening.
// Endpoints: f(0)=0, f(1)=1. Symmetric around 0.5.
function midwayDwell(t: number): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  // Adds a sine bump so derivative is high at edges, low in middle.
  return t + (Math.sin(2 * Math.PI * t) / (2 * Math.PI)) * 0.55;
}

// Edge fade: 0 inside the section, ramps to 1 at the very top/bottom
// so the canvas fades out rather than abruptly un-pinning.
function edgeFade(progress: number, fadeZone = 0.06): number {
  if (progress < fadeZone) return progress / fadeZone;
  if (progress > 1 - fadeZone) return (1 - progress) / fadeZone;
  return 1;
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
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastMoveRef = useRef(0);
  const opacityRef = useRef(0);
  const [loaded, setLoaded] = useState(0);
  const [allReady, setAllReady] = useState(false);

  // Preload + decode + GPU pre-warm
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(frameCount);
    let cancelled = false;
    let count = 0;

    // Scratch canvas for GPU pre-warm — drawing each image once forces
    // the browser to decode and upload it to texture memory, eliminating
    // first-paint stutter when we scroll into view.
    const scratch = document.createElement("canvas");
    scratch.width = width;
    scratch.height = height;
    const sctx = scratch.getContext("2d", { alpha: false });

    const tick = () => {
      if (cancelled) return;
      count++;
      setLoaded(count);
      if (count >= frameCount) setAllReady(true);
    };

    for (let i = 0; i < frameCount; i++) {
      const num = String(i + 1).padStart(frameDigits, "0");
      const img = new window.Image();
      img.decoding = "async";
      img.src = `${framePrefix}${num}.${frameExt}`;

      const finish = () => {
        if (cancelled) return;
        // Pre-warm: draw once to scratch canvas to force GPU upload
        if (sctx && img.complete && img.naturalWidth > 0) {
          try {
            sctx.drawImage(img, 0, 0, width, height);
          } catch {
            // ignore
          }
        }
        tick();
      };

      // onload + scratch-canvas draw inside finish() forces decode +
      // GPU texture upload, which is what eliminates first-paint stutter.
      img.onload = finish;
      // Fire-and-forget decode() to encourage early background decoding.
      img.decode?.().catch(() => {});
      images[i] = img;
    }
    imagesRef.current = images;
    return () => {
      cancelled = true;
    };
  }, [framePrefix, frameCount, frameDigits, frameExt, width, height]);

  // Drawing + scroll-tracking loop
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Retina-sharp canvas
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const drawAt = (frameFloat: number) => {
      const lower = Math.max(
        0,
        Math.min(frameCount - 1, Math.floor(frameFloat)),
      );
      const upper = Math.min(frameCount - 1, lower + 1);
      const t = frameFloat - lower;

      const imgA = imagesRef.current[lower];
      const imgB = imagesRef.current[upper];
      const aReady = imgA && imgA.complete && imgA.naturalWidth > 0;
      const bReady = imgB && imgB.complete && imgB.naturalWidth > 0;
      if (!aReady && !bReady) return;

      ctx.globalAlpha = 1;
      if (aReady) {
        ctx.drawImage(imgA, 0, 0, width, height);
      } else if (bReady) {
        ctx.drawImage(imgB, 0, 0, width, height);
        return;
      }

      // Sub-frame cross-fade
      if (bReady && upper !== lower && t > 0.001) {
        ctx.globalAlpha = t;
        ctx.drawImage(imgB, 0, 0, width, height);
        ctx.globalAlpha = 1;
      }
    };

    const computeTarget = () => {
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const rawProgress = Math.min(
        1,
        Math.max(0, -rect.top / Math.max(1, total)),
      );

      // Apply midway-dwell easing
      const eased = midwayDwell(rawProgress);
      targetRef.current = eased * (frameCount - 1);

      // Section-edge fade for the canvas itself
      const fade = edgeFade(rawProgress, 0.05);
      // Don't update lastMove if scroll didn't actually change target
      lastMoveRef.current = performance.now();

      return fade;
    };

    let targetOpacity = computeTarget();

    const tick = () => {
      const target = targetRef.current;
      const current = currentRef.current;
      const delta = target - current;
      const absDelta = Math.abs(delta);

      // Adaptive lerp: tighter than before because Lenis already smooths.
      // Snap when very close to avoid sub-pixel jitter.
      let next = current;
      if (absDelta < 0.0008) {
        next = target;
      } else {
        const factor = Math.min(0.45, 0.22 + absDelta * 0.04);
        next = current + delta * factor;
      }
      currentRef.current = next;
      drawAt(next);

      // Animate canvas opacity toward target (smooth fade in/out at edges)
      const opacityDelta = targetOpacity - opacityRef.current;
      opacityRef.current += opacityDelta * 0.2;
      canvas.style.opacity = String(opacityRef.current);

      rafRef.current = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      targetOpacity = computeTarget();
    };

    targetOpacity = computeTarget();
    drawAt(0);
    canvas.style.opacity = "0";
    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [frameCount, width, height]);

  const loadProgress = Math.round((loaded / frameCount) * 100);

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-zinc-800/60"
      // Longer scroll runway = smoother per-pixel frame change
      style={{ height: "450vh" }}
    >
      <div
        ref={wrapRef}
        className="sticky top-0 h-screen overflow-hidden bg-zinc-950"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{
            objectFit: "cover",
            display: "block",
            opacity: 0,
            willChange: "opacity",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(10,10,10,0.35),_transparent_45%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-transparent to-zinc-950/85 pointer-events-none" />

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-20 md:pb-32 pointer-events-none">
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

        {!allReady && (
          <div className="absolute inset-0 bg-zinc-950 flex items-center justify-center z-10">
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
