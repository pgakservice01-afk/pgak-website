/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The scrollytelling canvas + animations are the focus; don't let lint warnings
  // block a production build. Type-checking still runs.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
