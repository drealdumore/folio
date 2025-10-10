# Samuel Isah Portfolio

<br>
<br>

  <h3 align="center">Samuel Isah | Software Developer</h3>

  <p align="center">
    Personal portfolio website showcasing projects and experience.
    <br />
    <a href="https://drealdumore.vercel.app"><strong>Visit Site →</strong></a>
    <br />
   
  </p>

A modern, responsive portfolio website built with Next.js 14, featuring smooth animations, dark theme, and a clean design. Showcases projects, experience, and provides contact functionality.

## Overview

- `/` — Home page with introduction and featured projects
- `/about` — About me, experience, and skills
- `/contact` — Contact form with email integration
- `/projects` — Portfolio projects showcase
- `/projects/[id]` — Individual project details
- `/api/email` — Contact form email API
- `/api/og` — Dynamic Open Graph image generation

## Running Locally

1. Clone the repository:
```bash
git clone https://github.com/Drealdumore/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
pnpm install
# or npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Fill in the required environment variables for email functionality.

4. Start the development server:
```bash
pnpm dev
# Server runs on http://localhost:3001
```

## Performance Optimizations

This portfolio implements several performance optimizations:

**Image Optimization:**
- AVIF and WebP format support
- Responsive image sizing
- Lazy loading with Next.js Image component

**Code Optimization:**
- Package import optimization for analytics and UI libraries
- Tree shaking and code splitting
- GPU-accelerated CSS animations

**Loading Performance:**
- Resource preloading for critical assets
- Font display swap for better loading
- Optimized middleware for security headers

**Monitoring:**
- Web Vitals tracking
- Performance hooks for optimization
- Vercel Analytics integration

## Tech Stack

**Framework & Core:**
- [Next.js 14](https://nextjs.org) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [React 18](https://react.dev/) - UI library

**Styling & Animation:**
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [Geist Font](https://vercel.com/font) - Typography
- Custom fonts (Cal Sans, BDO Grotesk, Instrument Serif, Fira Code)

**Email & Communication:**
- [Resend](https://resend.com/) - Email API
- [React Email](https://react.email/) - Email templates

**Performance & Optimization:**
- [Sharp](https://sharp.pixelplumbing.com/) - Image optimization
- [Vercel Analytics](https://vercel.com/analytics) - Performance monitoring
- Custom performance hooks and components
- Optimized package imports and code splitting

**Development:**
- [PostCSS](https://postcss.org/) - CSS processing
- [TypeScript](https://www.typescriptlang.org/) - Type checking

**Deployment:**
- [Vercel](https://vercel.com) - Hosting and deployment

## Features

- **Responsive Design** - Works seamlessly across all devices
- **Dark Theme** - Elegant dark color scheme with optimized CSS
- **Performance Optimized** - Lighthouse score improvements with:
  - AVIF/WebP image formats
  - Optimized package imports
  - GPU-accelerated animations
  - Resource preloading
  - Security headers via middleware
- **Contact Form** - Integrated email functionality with Resend
- **Project Showcase** - Dynamic project cards with detailed views
- **SEO Optimized** - Meta tags, sitemap, robots.txt, and Open Graph
- **Accessibility** - Skip links, semantic HTML, and ARIA labels
- **Type Safe** - Full TypeScript implementation
- **Web Vitals** - Performance monitoring and optimization

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Email Configuration
RECEIVER_MAIL_ADDRESS=your_email@example.com
RESEND_API_KEY=your_resend_api_key

# Rate Limiting
MAX_REQUESTS=10
RATE_LIMIT_WINDOW=3600000
```

## Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── (pages)/           # Route groups
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── performance/       # Performance optimization components
│   ├── layout/           # Layout components
│   └── design/           # UI components
├── content/              # Content and data
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── motion/               # Animation components
├── public/               # Static assets
└── utils/                # Helper functions
```

## License

1. Feel free to take inspiration from this code.
2. Avoid directly copying it, please.
3. Crediting the author is appreciated.

No complicated licensing. Be kind and help others learn.
