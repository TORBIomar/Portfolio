import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.omartorbi.engineer",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: "https://www.omartorbi.engineer",
          fr: "https://www.omartorbi.engineer",
        },
      },
    },
  ];
}
