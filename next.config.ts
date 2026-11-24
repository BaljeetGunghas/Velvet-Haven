import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "res.cloudinary.com", // ✅ Allow Cloudinary images
      "images.unsplash.com", // ✅ Allow Unsplash images for hero
    ],
    // Use unoptimized images for Netlify deployment where sharp may not be available
    unoptimized: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
