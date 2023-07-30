/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GRAPHQL_URI: process.env.GRAPHQL_URI,
    DATABASE_URL: process.env.DATABASE_URL,
  },
};
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});
/** @type {import('next').NextConfig} */

module.exports = withPWA(nextConfig);
