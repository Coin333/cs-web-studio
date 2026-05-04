"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if (!els.length) return;

    // Anything already in or near the viewport: reveal immediately so
    // navigating to a page does not leave above-the-fold content invisible.
    const winH = window.innerHeight;
    const toObserve: HTMLElement[] = [];
    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < winH * 0.95) {
        el.classList.add("visible");
      } else {
        toObserve.push(el);
      }
    });

    if (!toObserve.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    toObserve.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);
}
