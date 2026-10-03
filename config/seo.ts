import type { Metadata } from "next";

import { siteConfig } from "./site";

const shareImage = { url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.title };

// Full metadata for an inner page. Next.js replaces (not merges) a parent's
// openGraph/twitter objects, so each page needs the complete set — including
// the share image — or link previews lose it.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: path,
      title: fullTitle,
      description,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [shareImage.url],
    },
  };
}
