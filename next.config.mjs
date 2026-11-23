/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // pg is a native-style Node driver: keep it out of the webpack server bundle
  experimental: { serverComponentsExternalPackages: ['pg'] },
  images: {
    domains: ['cdn.openai.com', 'images.unsplash.com'],
  },
};

export default nextConfig;

