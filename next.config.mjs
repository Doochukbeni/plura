/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploadthing.com",
        pathname: "**",
      },
      { protocol: "https", hostname: "img.clerk.com", pathname: "**" },
      { protocol: "https", hostname: "files.stripe.com", pathname: "**" },
      { protocol: "https", hostname: "utfs.io", pathname: "**" },
      { protocol: "https", hostname: "subdomain", pathname: "**" },
    ],
    // domains: [
    //   "uploadthing.com",
    //   "utfs.io",
    //   "img.clerk.com",
    //   "subdomain",
    //   "files.stripe.com",
    // ],
  },
  reactStrictMode: false,
};

export default nextConfig;
