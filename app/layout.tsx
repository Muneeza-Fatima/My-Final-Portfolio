
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Marcellus } from "next/font/google";

import "./globals.css";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { contactEmail, socials } from "@/data/socials";
import { Navbar } from "@/components/layout/navbar";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { InteractiveLayer } from "@/components/interactive/InteractiveLayer";

// Geist for headings and body, Geist Mono for code and labels.
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

// Elegant accent face for the highlighted words in section headings.
const accent = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-accent",
});

const code = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-code",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0e0f12",
  colorScheme: "light",
};

// Structured data so search engines understand who the site is about.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.author.name,
  jobTitle: siteConfig.author.jobTitle,
  url: siteConfig.url,
  email: `mailto:${contactEmail}`,
  address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
  knowsAbout: ["React", "Next.js", "Tailwind CSS", "UI/UX Design", "SaaS Development", "AI Chatbots"],
  sameAs: socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${accent.variable} ${code.variable} grain overflow-x-clip bg-noir text-ink`}>
        <script
          type="application/ld+json"
          // JSON-LD must be inlined as a raw string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        <Providers>
          <InteractiveLayer />
          <ScrollProgress />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

