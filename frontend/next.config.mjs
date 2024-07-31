/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: 'anonymous',
  env: {
    BACKEND_ENDPOINT: process.env.BACKEND_ENDPOINT,
  },
};

export default nextConfig;
