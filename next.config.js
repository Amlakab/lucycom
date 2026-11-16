/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracing: false,
  experimental: {
    //appDir: true,
  },
  images: {
    domains: [],
  },
  // Enable React strict mode
  reactStrictMode: true,
}

module.exports = nextConfig
