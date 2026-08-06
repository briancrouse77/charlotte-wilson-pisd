import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/index.html",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/about.html",
        permanent: true,
      },
      {
        source: "/priorities",
        destination: "/priorities.html",
        permanent: true,
      },
      {
        source: "/volunteer",
        destination: "/volunteer.html",
        permanent: true,
      },
      {
        source: "/admin",
        destination: "/admin.html",
        permanent: true,
      },
      {
        source: "/social",
        destination: "/social.html",
        permanent: true,
      }
    ];
  }
};

export default nextConfig;
