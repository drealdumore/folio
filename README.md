# Samuel Isah Portfolio

A modern, responsive portfolio website built with Next.js 14, featuring smooth animations, dark theme, and clean design. Showcases projects, experience, and mobile app development.

## Routes

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
git clone https://github.com/Drealdumore/folio.git
cd folio
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Add your email configuration:
```env
RECEIVER_MAIL_ADDRESS=your_email@example.com
RESEND_API_KEY=your_resend_api_key
```

4. Start the development server:
```bash
pnpm dev
# Server runs on http://localhost:3001
```

## Features

- **Responsive Design** — Works seamlessly across all devices
- **Dark Theme** — Elegant dark color scheme with custom animations
- **Contact Form** — Integrated email functionality with Resend
- **Project Showcase** — Dynamic project cards with detailed views
- **Mobile App Projects** — Dedicated sections for React Native apps (Echo, GPZ)
- **SEO Optimized** — Meta tags, sitemap, robots.txt, and Open Graph
- **Performance Optimized** — Sharp image optimization and custom fonts
- **Type Safe** — Full TypeScript implementation
- **Custom Animations** — Tailwind CSS keyframes 

## Tech Stack

**Framework & Core:**
- [Next.js 14](https://nextjs.org) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [React 18](https://react.dev/) - UI library

**Styling & Fonts:**
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [Geist](https://vercel.com/font) - Modern font family
- Google Fonts (Newsreader, Josefin Sans)
- Custom fonts (BDO Grotesk, Cal Sans, Instrument Serif, Fira Code)

**Email & Communication:**
- [Resend](https://resend.com/) - Email API
- [React Email](https://react.email/) - Email templates

**Performance & Optimization:**
- [Sharp](https://sharp.pixelplumbing.com/) - Image optimization
- [Vercel Analytics](https://vercel.com/analytics) - Performance monitoring
- Custom performance hooks

**Development:**
- [PostCSS](https://postcss.org/) - CSS processing
- [TypeScript](https://www.typescriptlang.org/) - Type checking

**Deployment:**
- [Vercel](https://vercel.com) - Hosting and deployment

## Project Structure

```
folio/
├── app/                    # Next.js App Router
│   ├── (pages)/           # Route groups
│   │   ├── (home)/        # Home page components
│   │   ├── about/         # About page
│   │   ├── contact/       # Contact form
│   │   └── projects/      # Projects showcase
│   ├── api/               # API routes
│   │   ├── email/         # Contact form handler
│   │   └── og/            # Open Graph images
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── cards/            # Project cards
│   ├── design/           # UI components
│   └── layout/           # Layout components
├── constants/            # App constants
├── content/              # Content and data
├── emails/               # Email templates
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── motion/               # Animation components
├── public/               # Static assets
│   ├── avatars/          # Profile images
│   ├── fonts/            # Custom fonts
│   ├── projects/         # Project images
│   └── icons/            # SVG icons
└── utils/                # Helper functions
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Email Configuration
RECEIVER_MAIL_ADDRESS=your_email@example.com
RESEND_API_KEY=your_resend_api_key
```

## Scripts

```bash
# Development
pnpm dev              # Start dev server on port 3001

# Build
pnpm build            # Production build
pnpm build:analyze    # Build with bundle analysis

# Other
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm email            # Email development
pnpm format           # Format with Prettier
```

## License

1. Feel free to take inspiration from this code.
2. Avoid directly copying it, please.
3. Crediting the author is appreciated.

No complicated licensing. Be kind and help others learn.
