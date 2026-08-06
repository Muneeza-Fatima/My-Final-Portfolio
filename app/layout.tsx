import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/layout/navbar";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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

    <html
      lang="en"
      suppressHydrationWarning
    >

      <body
        className={`
          ${inter.variable}
          overflow-x-hidden
        `}
      >

        <Providers>

          <Navbar />

          {children}

        </Providers>


      </body>


    </html>

  );

}