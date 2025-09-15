import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  // Make sure there are no rewrites
  async rewrites() {
    return [];
  },

  // Make sure there are no redirects
  async redirects() {
    return [];
  },
};

export default nextConfig;
