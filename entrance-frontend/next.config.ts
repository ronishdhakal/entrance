import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Local backend (127.0.0.1)
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },

      // Local backend (localhost)
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },

      // 🔁 Add production backend when deployed
      // {
      //   protocol: "https",
      //   hostname: "api.collegeinfonepal.com",
      //   pathname: "/media/**",
      // },
    ],
  },
};

export default nextConfig;
