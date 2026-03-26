import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    esmExternals: true,
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  reactStrictMode: true,
  sassOptions: {
    additionalData: ``,
    includePaths: [path.join(__dirname, 'src')],
  },
  images: {
    remotePatterns: [
      {
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), camera=(self), microphone=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
