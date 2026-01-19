import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // ✅ Local backend (127.0.0.1)
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },

      // ✅ Local backend (localhost)
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },

      // ✅ Production media domain
      {
        protocol: "https",
        hostname: "media.collegeinfonepal.com",
        pathname: "/**",
      },

      // ✅ Production entrance base domain
      {
        protocol: "https",
        hostname: "entrancebase.collegeinfonepal.com",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
