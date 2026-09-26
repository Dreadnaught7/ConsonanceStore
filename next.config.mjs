/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  basePath: "/store",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
