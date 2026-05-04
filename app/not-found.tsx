import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.12),_transparent_60%)]" />
        <div className="absolute inset-0 grid-bg" />
      </div>

      <div className="text-center max-w-md">
        <div className="text-7xl md:text-8xl font-bold tracking-tight text-gradient-accent mb-4">
          404
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-zinc-100 mb-3">
          Page not found
        </h1>
        <p className="text-zinc-400 mb-8">
          The page you are looking for moved or never existed.
        </p>
        <Link
          href="/"
          className="group inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Back home
        </Link>
      </div>
    </section>
  );
}
