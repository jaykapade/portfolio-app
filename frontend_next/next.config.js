/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow images from any remote source (for Sanity CDN image URLs)
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // Suppress React strict mode double-invocations which can conflict with some framer-motion animations
  reactStrictMode: false,
};

module.exports = nextConfig;
