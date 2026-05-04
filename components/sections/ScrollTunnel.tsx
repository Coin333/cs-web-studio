"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  heading?: React.ReactNode;
  subheading?: string;
}

type ShapeKind = "cube" | "tetra" | "octa" | "diamond";

interface Shape {
  // Local-space vertices (will be transformed by position + rotation + scale)
  vertices: [number, number, number][];
  edges: [number, number][];
  // Position in tunnel-space. z negative = far ahead, z positive = behind camera.
  baseX: number;
  baseY: number;
  baseZ: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  rotSpeed: [number, number, number];
  scale: number;
  hue: number; // for slight color variation
  kind: ShapeKind;
}

// ---------- shape geometry ----------

function cube(): Pick<Shape, "vertices" | "edges"> {
  const v: [number, number, number][] = [
    [-1, -1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, 1, 1],
  ];
  const e: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
  ];
  return { vertices: v, edges: e };
}

function tetra(): Pick<Shape, "vertices" | "edges"> {
  const v: [number, number, number][] = [
    [1, 1, 1],
    [-1, -1, 1],
    [-1, 1, -1],
    [1, -1, -1],
  ];
  const e: [number, number][] = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
    [1, 3],
    [2, 3],
  ];
  return { vertices: v, edges: e };
}

function octa(): Pick<Shape, "vertices" | "edges"> {
  const v: [number, number, number][] = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];
  const e: [number, number][] = [
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [2, 4],
    [2, 5],
    [3, 4],
    [3, 5],
  ];
  return { vertices: v, edges: e };
}

function diamond(): Pick<Shape, "vertices" | "edges"> {
  const v: [number, number, number][] = [
    [0, 1.4, 0],
    [1, 0, 1],
    [1, 0, -1],
    [-1, 0, -1],
    [-1, 0, 1],
    [0, -1.4, 0],
  ];
  const e: [number, number][] = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 1],
    [5, 1],
    [5, 2],
    [5, 3],
    [5, 4],
  ];
  return { vertices: v, edges: e };
}

const KIND_FACTORIES: Record<
  ShapeKind,
  () => Pick<Shape, "vertices" | "edges">
> = {
  cube,
  tetra,
  octa,
  diamond,
};

// ---------- math ----------

function rotate(
  [x, y, z]: [number, number, number],
  rx: number,
  ry: number,
  rz: number,
): [number, number, number] {
  // X
  let cy = Math.cos(rx);
  let sy = Math.sin(rx);
  let y1 = y * cy - z * sy;
  let z1 = y * sy + z * cy;
  // Y
  cy = Math.cos(ry);
  sy = Math.sin(ry);
  let x1 = x * cy + z1 * sy;
  let z2 = -x * sy + z1 * cy;
  // Z
  cy = Math.cos(rz);
  sy = Math.sin(rz);
  let x2 = x1 * cy - y1 * sy;
  let y2 = x1 * sy + y1 * cy;
  return [x2, y2, z2];
}

// Deterministic PRNG so layout is identical SSR -> CSR
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildShapes(count: number): Shape[] {
  const rand = mulberry32(42);
  const kinds: ShapeKind[] = ["cube", "tetra", "octa", "diamond"];
  const shapes: Shape[] = [];

  for (let i = 0; i < count; i++) {
    const kind = kinds[Math.floor(rand() * kinds.length)];
    const geom = KIND_FACTORIES[kind]();

    // Distribute z evenly through the tunnel so something is always close
    // and something is always far, regardless of scroll position.
    const tunnelLength = 4500;
    const baseZ = -((i / count) * tunnelLength) - 200;

    // Spread X/Y outward — closer-to-center looks like it grew from middle
    const angle = rand() * Math.PI * 2;
    const radius = 80 + rand() * 380;
    const baseX = Math.cos(angle) * radius;
    const baseY = Math.sin(angle) * radius * 0.7;

    shapes.push({
      ...geom,
      baseX,
      baseY,
      baseZ,
      rotX: rand() * Math.PI * 2,
      rotY: rand() * Math.PI * 2,
      rotZ: rand() * Math.PI * 2,
      rotSpeed: [
        (rand() - 0.5) * 0.012,
        (rand() - 0.5) * 0.012,
        (rand() - 0.5) * 0.008,
      ],
      scale: 30 + rand() * 80,
      hue: rand(),
      kind,
    });
  }
  return shapes;
}

// ---------- component ----------

export function ScrollTunnel({ heading, subheading }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    const sizeCanvas = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    sizeCanvas();

    const shapes = buildShapes(28);
    const FOV = 600; // perspective: bigger = flatter, smaller = more dramatic
    let scrollProgress = 0; // 0..1
    let smoothedProgress = 0;
    let opacity = 0;
    let raf = 0;

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      scrollProgress = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));
    };

    const draw = () => {
      // Smooth scroll progress so flick scrolls don't jolt
      smoothedProgress += (scrollProgress - smoothedProgress) * 0.12;

      // Edge fade so section enters/exits gracefully
      const fade =
        smoothedProgress < 0.06
          ? smoothedProgress / 0.06
          : smoothedProgress > 0.94
            ? (1 - smoothedProgress) / 0.06
            : 1;
      opacity += (fade - opacity) * 0.18;

      // How far the camera has flown forward through the tunnel.
      // baseZ is negative (ahead). cameraZ moves negative -> positive,
      // meaning shapes pass the camera and disappear behind.
      const cameraZ = smoothedProgress * 4200;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Sort shapes by depth so far ones draw first, near ones on top
      const sorted = shapes
        .map((s) => ({
          shape: s,
          z: -(s.baseZ + cameraZ), // distance from camera (positive = ahead)
        }))
        .sort((a, b) => b.z - a.z);

      for (const { shape, z } of sorted) {
        // If shape is behind camera or extremely far, skip
        if (z < 5 || z > 5500) continue;

        // Update rotations (continuous spin)
        shape.rotX += shape.rotSpeed[0];
        shape.rotY += shape.rotSpeed[1];
        shape.rotZ += shape.rotSpeed[2];

        // Project each vertex
        const projected: [number, number][] = [];
        for (const v of shape.vertices) {
          const [rx, ry, rz] = rotate(v, shape.rotX, shape.rotY, shape.rotZ);
          const wx = rx * shape.scale + shape.baseX;
          const wy = ry * shape.scale + shape.baseY;
          const wz = rz * shape.scale + shape.baseZ + cameraZ;
          // Perspective divide: nearer shapes appear larger and farther from center
          const perspZ = -wz; // wz is negative when ahead
          if (perspZ <= 1) {
            projected.push([cx, cy]);
            continue;
          }
          const sx = cx + (wx * FOV) / perspZ;
          const sy = cy + (wy * FOV) / perspZ;
          projected.push([sx, sy]);
        }

        // Depth-based opacity + line width
        // Far away: faint. Mid distance: full intensity. Up close: fade out.
        const near = 80;
        const peak = 800;
        const far = 4000;
        let alpha = 1;
        if (z < peak) {
          alpha = Math.max(0, (z - near) / (peak - near));
        } else if (z > peak) {
          alpha = Math.max(0, 1 - (z - peak) / (far - peak));
        }
        alpha = Math.pow(alpha, 0.7) * opacity;

        // Color: indigo accent for ~1/3, zinc-200 for the rest
        const accent = shape.hue > 0.65;
        const baseColor = accent
          ? "129, 140, 248" // indigo-400 rgb
          : "228, 228, 231"; // zinc-200 rgb

        ctx.strokeStyle = `rgba(${baseColor}, ${alpha})`;
        ctx.lineWidth = Math.max(0.6, Math.min(1.6, 800 / z));
        ctx.lineJoin = "round";
        ctx.lineCap = "round";

        for (const [a, b] of shape.edges) {
          const [ax, ay] = projected[a];
          const [bx, by] = projected[b];
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const onScroll = () => updateProgress();
    const onResize = () => {
      sizeCanvas();
      updateProgress();
    };

    updateProgress();
    smoothedProgress = scrollProgress;
    setReady(true);
    raf = requestAnimationFrame(draw);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-zinc-800/60 bg-zinc-950"
      style={{ height: "350vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Backdrop atmosphere */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(99,102,241,0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, rgba(167,139,250,0.08) 0%, transparent 50%)",
          }}
        />
        <div className="absolute inset-0 dot-bg opacity-40" />

        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ display: "block" }}
        />

        {/* Soft vignette so shapes near edges fade into the page */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(10,10,10,0.7) 100%)",
          }}
        />

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

        {!ready && (
          <div className="absolute inset-0 bg-zinc-950 flex items-center justify-center" />
        )}
      </div>
    </section>
  );
}
