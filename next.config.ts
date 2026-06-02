import type { NextConfig } from "next";


const nextConfig: NextConfig = {
   images: {
    remotePatterns: [
      {
        hostname: 'image.kkday.com'
      }
    ]
  }
};

export default nextConfig;
