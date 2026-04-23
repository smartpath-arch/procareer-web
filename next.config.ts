import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  output: "standalone", // Required for Docker deployment
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "core.smartpath.id",
        pathname: "/uploads/**",
      },
    ],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
