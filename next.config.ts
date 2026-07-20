import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Adding a custom webpack config forces Next.js to fall back to Webpack
  // instead of using Turbopack, which fixes the Windows UNC path issue.
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
