const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withPlugins = require('next-compose-plugins');

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  }
}

module.exports = withPlugins(
  [
    [withBundleAnalyzer],
  ],
  nextConfig,
);
