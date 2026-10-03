import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

const routes = [
  { path: "", priority: 1, changeFrequency: "monthly" },
  { path: "/work", priority: 0.8, changeFrequency: "monthly" },
  { path: "/work/demo-projects", priority: 0.8, changeFrequency: "monthly" },
  { path: "/work/client-work", priority: 0.8, changeFrequency: "yearly" },
  { path: "/work/internship", priority: 0.7, changeFrequency: "yearly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
