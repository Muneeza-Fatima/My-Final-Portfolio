import type { NextConfig } from "next";


const nextConfig: NextConfig = {

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