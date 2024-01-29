/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "https://check-stock-size-backend.vercel.app/v1/:path*",
      },
      {
        source: "/api/v2/:path*",
        destination: "https://scraping.preferee21.workers.dev/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
