/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.openai.com', 'images.unsplash.com'],
  },
};

export default nextConfig;
