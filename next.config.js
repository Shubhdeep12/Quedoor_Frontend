/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    reactStrictMode: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
}

module.exports = nextConfig
