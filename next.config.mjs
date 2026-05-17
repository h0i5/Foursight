/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  images: {
    localPatterns: [
      {
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
