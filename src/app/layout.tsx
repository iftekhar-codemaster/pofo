import type { Metadata, Viewport } from "next";
import {
  Anton,
  Instrument_Serif,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from "next/font/google";
import { HERO_META } from "@/data/portfolio";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--gf-display",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--gf-serif",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--gf-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--gf-mono",
  display: "swap",
});

function getMetadataBase(): URL | undefined {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.CONTEXT === "production"
      ? process.env.URL
      : process.env.DEPLOY_PRIME_URL || process.env.URL) ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined) ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

  if (!siteUrl) return undefined;

  try {
    return new URL(siteUrl);
  } catch {
    return undefined;
  }
}

const SITE_TITLE = "IFTEKHAR.WORK — Portfolio 2026";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: SITE_TITLE,
  description: HERO_META.pitch,
  openGraph: {
    title: SITE_TITLE,
    description: HERO_META.pitch,
    type: "website",
    siteName: "IFTEKHAR.WORK",
    images: [
      {
        url: HERO_META.monolithImg,
        width: 896,
        height: 1200,
        alt: HERO_META.monolithAlt,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: HERO_META.pitch,
    images: [
      {
        url: HERO_META.monolithImg,
        alt: HERO_META.monolithAlt,
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${instrumentSerif.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="smooth-active">{children}</body>
    </html>
  );
}
