import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      { source: "/", destination: "/index.html" },
      { source: "/about", destination: "/about.html" },
      { source: "/priorities", destination: "/priorities.html" },
      { source: "/volunteer", destination: "/volunteer.html" },
      { source: "/admin", destination: "/admin.html" }
    ];
  }
};

export default nextConfig;
