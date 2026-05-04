import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RevealProvider } from "@/components/RevealProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CS-Web Studio — Fast, modern websites for local businesses",
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
    title: "CS-Web Studio",
    description:
      "Fast, modern websites for local businesses. Built in days, not weeks.",
    type: "website",
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
        <RevealProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </RevealProvider>
      </body>
    </html>
  );
}
