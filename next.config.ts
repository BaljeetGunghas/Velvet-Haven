import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "res.cloudinary.com", // ✅ Allow Cloudinary images
      "images.unsplash.com", // ✅ Allow Unsplash images for hero
    ],
    // Always use unoptimized images to avoid sharp dependency issues
    // This is necessary for Netlify deployment where sharp module is not available
    unoptimized: true,
  },
};

export default nextConfig;
