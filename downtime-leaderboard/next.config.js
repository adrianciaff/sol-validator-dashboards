/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/sol-validator-dashboards',
  assetPrefix: '/sol-validator-dashboards',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

