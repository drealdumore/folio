import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Samuel Isah - Full-Stack Developer & Mobile App Creator',
    short_name: 'Samuel Isah',
    description: 'Full-Stack Web and Mobile Developer creating innovative applications with React, Next.js, React Native, and TypeScript. Explore my portfolio of web apps, mobile projects, and development tools.',
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