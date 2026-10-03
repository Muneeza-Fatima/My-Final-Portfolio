import type { NextConfig } from "next";


const nextConfig: NextConfig = {

  // Optional separate build folder (local testing only); defaults to .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",

  reactStrictMode: true,

  devIndicators: false,


  images: {

    unoptimized: true,

    formats: [
      "image/avif",
      "image/webp",
    ],

    remotePatterns: [],

  },


  experimental: {

    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
    ],

  },


  compiler: {

    removeConsole:
      process.env.NODE_ENV === "production",

  },

};


export default nextConfig;