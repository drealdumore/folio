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

## Tech Stack

**Framework & Core:**
- [Next.js 14](https://nextjs.org) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [React 18](https://react.dev/) - UI library

**Styling & Animation:**
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Smooth animations
- [Geist Font](https://vercel.com/font) - Typography
- Custom fonts (Cal Sans, Instrument Serif, Fira Code)

**Email & Communication:**
- [Resend](https://resend.com/) - Email API
- [React Email](https://react.email/) - Email templates
- [EmailJS](https://www.emailjs.com/) - Client-side email

**State & Utils:**
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [Lenis](https://lenis.studiofreight.com/) - Smooth scrolling
- [Canvas Confetti](https://www.kirilv.com/canvas-confetti/) - Celebrations

**Development:**
- [Prettier](https://prettier.io/) - Code formatting
- [ESLint](https://eslint.org/) - Code linting

**Deployment:**
- [Vercel](https://vercel.com) - Hosting and deployment
- [Vercel Analytics](https://vercel.com/analytics) - Performance monitoring

## Features

- **Responsive Design** - Works seamlessly across all devices
- **Dark Theme** - Elegant dark color scheme with custom animations
- **Smooth Animations** - Powered by Framer Motion for fluid interactions
- **Contact Form** - Integrated email functionality with validation
- **Project Showcase** - Dynamic project cards with detailed views
- **SEO Optimized** - Meta tags, Open Graph, and Twitter cards
- **Performance** - Optimized images, fonts, and lazy loading
- **Type Safe** - Full TypeScript implementation

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PRIVATE_EMAILJS_USER_ID=your_emailjs_user_id
NEXT_PUBLIC_EMAILJS_USER_ID=your_public_emailjs_user_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
MAX_REQUESTS=10
RATE_LIMIT_WINDOW=3600000
RECEIVER_MAIL_ADDRESS=your_email@example.com
RESEND_API_KEY=your_resend_api_key
```

## License

1. Feel free to take inspiration from this code.
2. Avoid directly copying it, please.
3. Crediting the author is appreciated.

No complicated licensing. Be kind and help others learn.
