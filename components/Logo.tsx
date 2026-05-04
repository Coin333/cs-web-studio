import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-2 ${className ?? ""}`}
    >
      <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30">
        <span className="text-[11px] font-bold tracking-tight text-white">
          CS
        </span>
        <span className="absolute inset-0 rounded-lg ring-1 ring-white/10" />
      </span>
      <span className="font-semibold tracking-tight text-zinc-100">
        CS Web<span className="text-zinc-500"> Studio</span>
      </span>
    </Link>
  );
}
