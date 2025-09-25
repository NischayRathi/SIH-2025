import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   eslint: {
    // 🚀 This tells Vercel/Next.js not to fail the build on ESLint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
