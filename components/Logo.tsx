import Link from "next/link";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-2.5 ${className ?? ""}`}
    >
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden bg-white shadow-md shadow-black/30 ring-1 ring-white/10">
        <Image
          src="/logo-icon.png"
          alt="CS Web Studio logo"
          width={64}
          height={64}
          priority
          className="h-full w-full object-contain"
        />
      </span>
      <span className="font-semibold tracking-tight text-zinc-100">
        CS Web<span className="text-zinc-500"> Studio</span>
      </span>
    </Link>
  );
}
