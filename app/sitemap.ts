import { MetadataRoute } from 'next'
import { MOBILE_APPS, SHORTPROJECTS } from '@/content/projects'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://drealdumore.vercel.app'
  
  // Static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  // Dynamic project routes
  const projectRoutes = MOBILE_APPS.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Short project routes (if they have internal links)
  const shortProjectRoutes = SHORTPROJECTS
    .filter(project => project.projectinAppLink)
    .map((project) => ({
      url: `${baseUrl}${project.projectinAppLink}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  return [...routes, ...projectRoutes, ...shortProjectRoutes]
}