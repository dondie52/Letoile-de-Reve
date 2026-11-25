import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://letoiledereve.com/refund-cancellation-policy/",
      lastModified: new Date("2026-11-25"),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: "https://letoiledereve.com/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
