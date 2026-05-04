import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RevealProvider } from "@/components/RevealProvider";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Fast, modern websites for local businesses`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Solo web development practice that ships fast, mobile-first websites for local businesses in 2 to 5 days. Affordable. Modern. Built to convert.",
  keywords: [
    "web design",
    "local business website",
    "freelance web developer",
    "Next.js",
    "small business website",
  ],
  openGraph: {
    title: SITE_NAME,
    description: SITE_TAGLINE,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_TAGLINE,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-zinc-950 text-zinc-100">
        <SmoothScrollProvider>
          <RevealProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </RevealProvider>
        </SmoothScrollProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
