import type { Metadata } from "next";
import localFont from "next/font/local";
import { SEO } from "@/config/pricingContent";
import "./globals.css";

const outfit = localFont({
  src: [
    { path: "../fonts/outfit-latin-wght-normal.woff2", weight: "100 900", style: "normal" },
    { path: "../fonts/outfit-latin-ext-wght-normal.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-outfit",
  display: "swap",
});

const montserrat = localFont({
  src: [
    { path: "../fonts/montserrat-latin-wght-normal.woff2", weight: "100 900", style: "normal" },
    {
      path: "../fonts/montserrat-latin-ext-wght-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: SEO.title,
  description: SEO.description,
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    locale: "it_IT",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" className={`${outfit.variable} ${montserrat.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
