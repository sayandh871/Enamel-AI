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
       {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev", 
      },
    ]
  },
};

export default nextConfig;
