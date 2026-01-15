export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/dashboard",
          "/api",
          "/auth",
        ],
      },
    ],
    sitemap: "https://entrance.collegeinfonepal.com/sitemap.xml",
  }
}
