import { Metadata } from 'next'
import { sharedMetadata } from '@/constants/shared-meta'

export function generateMetadata({
  title,
  description,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
}: {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
}): Metadata {
  const metaTitle = title ? `${title} — ${sharedMetadata.name}` : sharedMetadata.title
  const metaDescription = description || sharedMetadata.description
  const metaImage = image || sharedMetadata.image
  const metaUrl = url ? `${sharedMetadata.url}${url}` : sharedMetadata.url

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type,
      url: metaUrl,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      publishedTime,
      modifiedTime,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
    },
    alternates: {
      canonical: url || '/',
    },
  }
}

export function generateProjectStructuredData(project: {
  name: string
  description: string
  url?: string
  image?: string
  technologies: string[]
  dateCreated?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.name,
    description: project.description,
    url: project.url,
    image: project.image,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web Browser',
    programmingLanguage: project.technologies,
    author: {
      '@type': 'Person',
      name: 'Samuel Isah',
      url: 'https://drealdumore.vercel.app',
    },
    dateCreated: project.dateCreated,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${sharedMetadata.url}${item.url}`,
    })),
  }
}