import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 828, 1080, 1200, 1440, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
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
  // Міграція зі старого сайту: легасі мовні префікси віддаємо на корінь (єдиний URL).
  async redirects() {
    return [
      { source: "/ua", destination: "/", permanent: true },
      { source: "/ua/:path*", destination: "/", permanent: true },
      { source: "/ru", destination: "/", permanent: true },
      { source: "/ru/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
