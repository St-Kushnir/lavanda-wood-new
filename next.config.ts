import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "holzbaurustikal.de",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
