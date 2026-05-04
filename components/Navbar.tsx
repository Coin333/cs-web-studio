"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { useScrollNav } from "@/hooks/useScrollNav";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const visible = useScrollNav();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800/50"
        style={{
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.3s ease, opacity 0.3s ease",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Logo />

            <div className="hidden md:flex items-center gap-1">
              {NAV.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-sm rounded-lg transition-colors",
                      active
                        ? "text-white bg-white/5"
                        : "text-zinc-400 hover:text-white hover:bg-white/5",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 cursor-pointer"
              >
                Get a Free Preview
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <button
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 text-zinc-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-zinc-800/60 bg-zinc-950/95 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm rounded-lg text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-1.5 bg-indigo-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl"
              >
                Get a Free Preview
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </nav>

      <div className="progress-bar" />
    </>
  );
}
