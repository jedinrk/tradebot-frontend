/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY,
    SOCKET_URL: process.env.SOCKET_URL,
  },
};

module.exports = nextConfig;
