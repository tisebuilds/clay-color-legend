import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Home dir has a stray package-lock.json; pin root to this project.
    root: process.cwd(),
  },
};

export default nextConfig;
