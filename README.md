# Samuel Isah Portfolio

A high-performance, premium portfolio website built with Next.js 14, React 18, and TypeScript. This project showcases a deep focus on design aesthetics, smooth interactions, and modern web standards.

## 🚀 Key Features

- **Premium Design System** — Built with HSL-tailored colors, glassmorphism, and a sleek dark mode.
- **Advanced Animations** — Powered by **Framer Motion** and **Lenis** for buttery-smooth scrolling and micro-interactions.
- **React 19 Ready** — Optimized with the new **React Compiler** and **Inline CSS** for superior performance metrics (FCP/LCP).
- **Zoneless-Ready** — Migrated to **OnPush** change detection patterns.
- **SEO & Socials** — Dynamic Open Graph images, full metadata coverage, and automated sitemap generation.
- **Analytics Proxy** — Cloaked Vercel Analytics/Speed Insights to bypass ad-blockers for accurate data.
- **Type-Safe Forms** — Contact form with **Resend** integration and client-side validation.
- **Content Security Policy** — Robust CSP headers for modern web protection.

## 🛠️ Tech Stack

### Frontend Core
- **Next.js 14 (App Router)** — Framework
- **React 18 / Compiler** — UI Library
- **TypeScript** — Language
- **Lenis** — Smooth Scrolling

### Styling & Motion
- **Tailwind CSS** — Utility Styler
- **Framer Motion** — Animation Engine
- **Geist & Satoshi** — Custom Typography
- **AWS Diatype** — Branding Fonts

### Infrastructure
- **Resend** — Email Delivery
- **Vercel Analytics** — Performance/Tracking
- **PostHog** — Product Analytics
- **MetadataBase / robots.txt** — SEO

## 📂 Project Structure

```bash
folio/
├── app/                  # Next.js App Router (PPR Ready)
│   ├── (home)/           # Landing page with hero, work, and tech stack
│   ├── chat/             # AI-clone chat interface
│   ├── projects/         # Case studies and project list
│   └── api/              # Secure Resend and Analytics endpoints
├── components/           # Atomic Design System
│   ├── cards/            # Project and Repo cards
│   ├── design/           # Headings, Buttons, and UI tokens
│   └── layout/           # Shared Nav & Footer components
├── content/              # Centralized data for projects and skills
├── motion/               # Shared Framer Motion transitions
└── public/               # Optimized static assets and fonts
```

## 🏁 Running Locally

1. **Clone & Enter**:
   ```bash
   git clone https://github.com/drealdumore/folio.git
   cd folio
   ```

2. **Install**:
   ```bash
   pnpm install
   ```

3. **Configure Environment**:
   Create a `.env.local` based on `.env.example`:
   ```env
   RESEND_API_KEY=re_xxx
   RECEIVER_MAIL_ADDRESS=you@example.com
   ```

4. **Launch**:
   ```bash
   pnpm dev
   ```
   Open `http://localhost:3001` to view the app.

## 📈 Performance & Security

This portfolio is tuned for production:
- **Immutable Caching**: Long-term cache headers for assets.
- **Strict Headers**: X-Frame-Options, X-Content-Type-Options, and Referrer-Policy.
- **Bundle Optimization**: Tree-shaking and optimized package imports for framer-motion and lenis.

## 📝 License

Designed and developed by **Samuel Isah**.  
Feel free to use this as inspiration. Attributions are greatly appreciated.

---
*Built with ❤️ in the middle of the night.*
