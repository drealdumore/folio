import { MetadataRoute } from "next";
import { META, MOBILE_APPS } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = META.url;
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = MOBILE_APPS.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...routes, ...caseStudyRoutes];
}
