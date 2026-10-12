import { MetadataRoute } from 'next'
import { META } from '@/content/site'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name:  META.title,
    short_name: META.name,
    description: META.description,
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#0a0a0a',
    theme_color: '#1a1a1a',
    categories: ['portfolio', 'developer', 'technology', 'software'],
    lang: 'en',
    scope: '/',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '16x16 32x32 48x48',
        type: 'image/x-icon',
      },
      {
        src: '/og.png',
        sizes: '1200x630',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}