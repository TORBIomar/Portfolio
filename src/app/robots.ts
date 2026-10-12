import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.omartorbi.engineer/sitemap.xml",
    host: "https://www.omartorbi.engineer",
  };
}
