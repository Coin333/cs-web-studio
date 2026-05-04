import { Hero } from "@/components/sections/Hero";
import { ValueProps } from "@/components/sections/ValueProps";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ScrollScrubFrames } from "@/components/sections/ScrollScrubFrames";
import { Portfolio } from "@/components/sections/Portfolio";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <HowItWorks />
      <ScrollScrubFrames
        framePrefix="/scrub-frames/frame_"
        frameCount={358}
        width={1024}
        height={576}
        subheading="Scroll-driven motion, mobile-first layouts, and pages tuned to convert. The same techniques Apple uses, applied to your local business."
      />
      <Portfolio />
      <CTA />
    </>
  );
}
