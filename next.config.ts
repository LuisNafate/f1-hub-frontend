import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL ?? 'http://localhost:4000';
    return [
      {
        source: '/api/f1/:path*',
        destination: `${backendUrl}/api/f1/:path*`,
      },
    ];
  },
};

export default nextConfig;
