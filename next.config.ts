import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev:true
  },
  images: {
    domains: ['images.unsplash.com'],
     remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
      },
    ]
  },
};

export default nextConfig;
