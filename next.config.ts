// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com', // Add this
      'images.unsplash.com',        // Agar Unsplash bhi use kar rahe ho
      // 'example.com',             // Add more if needed
    ],
  },
};

module.exports = nextConfig;
