/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["gym-management-system.s3.us-west-1.amazonaws.com", "s.gravatar.com"],
  },
};

module.exports = nextConfig;
