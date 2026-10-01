
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/layout/navbar";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { InteractiveLayer } from "@/components/interactive/InteractiveLayer";

// Geist for headings and body, Geist Mono for code and labels.
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const code = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-code",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  icons: {
    icon: "/icon.png",
  },

  keywords: siteConfig.keywords,

  authors: [
    {
      name: siteConfig.author.name,
    },
  ],

  creator: siteConfig.author.name,

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${code.variable} grain overflow-x-clip bg-noir text-ink`}>
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

