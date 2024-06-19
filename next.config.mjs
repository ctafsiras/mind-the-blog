/** @type {import('next').NextConfig} */
// add config to add external image

const nextConfig = {
  images: {
    domains: ["daisyui.com", "picsum.photos"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
