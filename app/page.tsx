import { Hero } from "@/components/sections/Hero";
import { ValueProps } from "@/components/sections/ValueProps";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ScrollTunnel } from "@/components/sections/ScrollTunnel";
import { Portfolio } from "@/components/sections/Portfolio";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <HowItWorks />
      <ScrollTunnel subheading="Scroll-driven motion, mobile-first layouts, and pages built to feel as fast as they look." />
      <Portfolio />
      <CTA />
    </>
  );
}
