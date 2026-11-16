import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "res.cloudinary.com", // ✅ Allow Cloudinary images
      "images.unsplash.com", // ✅ Allow Unsplash images for hero
    ],
  },
};

export default nextConfig;
