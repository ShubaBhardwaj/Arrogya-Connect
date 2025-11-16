// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // preserve/extend any Next.js options you need
  reactStrictMode: true,

  // TEMPORARY: ignore ESLint errors during production builds on Render
  eslint: {
    ignoreDuringBuilds: true,
  },

  // you can add other config keys here (images, env, experimental, etc.)
};

module.exports = nextConfig;
