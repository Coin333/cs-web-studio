import Link from "next/link";
import { Github, Mail, Twitter } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-zinc-800/60 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-zinc-400 max-w-sm leading-relaxed">
              Fast, modern websites for local businesses. Built in days, not
              weeks.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <a
                href="mailto:hello@cswebstudio.com"
                aria-label="Email"
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
              Studio
            </h3>
            <ul className="space-y-2.5">
              <FooterLink href="/services">Services</FooterLink>
              <FooterLink href="/services#pricing">Pricing</FooterLink>
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5">
              <FooterLink href="/work">Work</FooterLink>
              <FooterLink href="/process">Process</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/contact">Free preview</FooterLink>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-zinc-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-zinc-500">
            &copy; {year} CS-Web Studio. All rights reserved.
          </p>
          <p className="text-xs text-zinc-500">
            Built with Next.js, Tailwind, and Vercel.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-zinc-400 hover:text-white transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}
