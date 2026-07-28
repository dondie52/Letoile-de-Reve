import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "gsap"],
  },
};

export default nextConfig;
