import type { NextConfig } from "next";

const nextConfig: NextConfig = { 
  images: {
    domains: [
      "images.pexels.com",
      "i.pinimg.com",
      "ylzposuphnhqsvybpgao.supabase.co"
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow any HTTPS host (optional, for dynamic sources)
      },
    ],
    loader: "default", // keep default loader; you can switch to "custom" if needed
  },
  reactStrictMode: true, // optional, recommended
  swcMinify: true,      // optional, recommended
};

export default nextConfig;
