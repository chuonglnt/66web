/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "3001",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "web-ec013.web.app",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "web-ec013.firebaseapp.com",
        port: "",
        pathname: "/**",
      },
    ],
    unoptimized: false,
  },
};
module.exports = nextConfig;
