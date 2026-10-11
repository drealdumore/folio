export type projectType = {
  name: string;
  description: string | undefined | null;
  image?: string;
  href: string | undefined;
  tech?: string[];
};

export interface ProjectCardProps {
  projectName: string | undefined | null;
  image?: string;
  mobileScreens?: string[];
  projectLink: string;
  projectDescription: string | undefined | null;
  projectType: string | undefined | null;
  projectDate: string;
  technologies: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  sub: string;
  oneLiner?: string;
  year: number | string;
  builtBy: string;
  website?: string;
  heroImage?: string;
  intro: string;
  introText?: string;
  gallery?: { src: string; alt: string }[];
  challenge: string;
  actions: {
    title: string;
    text: string;
  }[];
  result: string;
  technologies?: string[];
  links: {
    label: string;
    url: string;
  }[];
}

export const ALLPROJECTS: ProjectCardProps[] = [
  {
    projectName: "Melo",
    projectLink: "/projects/melo",
    projectDescription:
      "Private one-to-one chat for people who speak different languages. You write in your language; the other person reads in theirs. Messages are translated before delivery, with original text one tap away.",
    projectType: "Personal project (Mobile app)",
    projectDate: "2026-01-01",
    technologies: [
      "Expo SDK",
      "React Native",
      "TypeScript",
      "Supabase Realtime",
      "AsyncStorage",
      "expo-router",
    ],
    mobileScreens: [
      "/projects/melo-onboarding.png",
      "/projects/melo-profile-sheet-1.png",
      "/projects/melo-chat.png",
    ],
  },
  {
    projectName: "Chop Iron",
    projectLink: "/projects/iron",
    projectDescription:
      "Offline-first bodybuilding / fitness progress tracker with a Nigerian voice. Logs workouts from 53 exercises, detects personal records across four categories, and turns training history into streaks, achievements, and analytics — even with no internet.",
    projectType: "Personal project (Mobile app)",
    projectDate: "2026-01-01",
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "SQLite",
      "Zustand",
      "Reanimated",
      "expo-router",
    ],
    mobileScreens: [
      "/projects/chop-iron-splash-2.png",
      "/projects/chop-iron-index.png",
      "/projects/chop-iron-achievement.png",
    ],
  },
  {
    projectName: "VaultX",
    projectLink: "/projects/vaultx",
    projectDescription:
      "Lightweight, production-ready REST API for sharing text, code snippets, and links across devices. No accounts required. Features hybrid in-memory + Redis storage, rate limiting, expiry times, view limits, password protection, and burn-after-reading.",
    projectType: "API / Backend System",
    projectDate: "2025-12-01",
    technologies: [
      "Node.js",
      "Express",
      "TypeScript",
      "Redis",
      "Helmet",
      "Zod",
    ],
  },
  {
    projectName: "The SupaDevs",
    projectLink: "/projects/thesupadevs",
    image: "/projects/thesupadevs.webp",
    projectDescription:
      "Open-source curated library of 1000+ developer tools, UI components, APIs, and resources. Features smart search, AI-powered categorization (Groq + Llama), metadata scraping, admin dashboard with bulk actions, broken-link detection, and strong SEO & performance optimization.",
    projectType: "Web Platform / Developer Tool",
    projectDate: "2025-12-11",
    technologies: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Framer Motion",
      "Groq AI",
      "Cheerio",
      "ISR",
    ],
  },
  {
    projectName: "Crystalglowxquisite: Skincare Boutique",
    projectLink: "https://crystalglowxquisite.com/",
    image: "/projects/crystalglowxquisite.png",
    projectDescription:
      "Full e-commerce storefront for a premium skincare brand — custom checkout, product catalog, and analytics built from the ground up.",
    projectType: "Client / E-commerce",
    projectDate: "2026-01-20",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React",
      "Vercel Deployment",
      "Posthog",
      "Neon",
    ],
  },
  {
    projectName: "Knowledge Master",
    projectLink: "https://www.knowledgemaster.com.ng/",
    image: "/projects/knowledgemaster.webp",
    projectDescription:
      "E-commerce platform for a bookstore (textbooks, novels, educational resources, school bookfair services) with nationwide delivery information.",
    projectType: "Client / E-commerce Website",
    projectDate: "2026-10-01",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React",
      "Vercel Deployment",
      "Posthog",
      "Neon",
      "AI-integration",
    ],
  },
  {
    projectName: "SAGE",
    projectLink: "/projects/sage",
    projectDescription:
      "An AI strategist for hard conversations. Describe the situation, and it reads the power dynamics, maps them against The 48 Laws of Power, and drafts your reply in eight different tones with voice input and key rotation.",
    projectType: "Personal project (Mobile app)",
    projectDate: "2026-01-01",
    technologies: [
      "TypeScript",
      "React Native",
      "Expo",
      "Gemini API",
      "Groq Whisper",
      "Zod",
      "Reanimated",
    ],
    mobileScreens: [
      "/projects/sage-index.png",
      "/projects/sage-coach.png",
      "/projects/sage-conversation-1.png",
    ],
  },
  {
    projectName: "GPZ",
    projectLink: "/projects/gpz",
    projectDescription:
      "GPZ is a GPA tracker and academic planner for students. It helps students manage semesters, courses, grades, and set academic goals with a modern, intuitive interface.",
    projectType: "Personal project (Mobile app)",
    projectDate: "2025-01-01",
    technologies: [
      "TypeScript",
      "React Native",
      "Expo",
      "expo-router",
      "AsyncStorage",
      "react-query",
    ],
    mobileScreens: [
      "/projects/gpz-onboarding-1.png",
      "/projects/gpz-onboarding-2.png",
      "/projects/gpz-onboarding-3.png",
      "/projects/gpz-onboarding-4.png",
      "/projects/gpz-onboarding-5.png",
      "/projects/gpz-home.png",
    ],
  },
  {
    projectName: "Isami Technologies",
    projectLink: "https://isamitechnologies.com.ng/",
    image: "/projects/isamitechnologies.png",
    projectDescription:
      "Official website for Isami Technologies, a Nigerian digital agency offering web development, e-commerce, AI chatbots, UI/UX & branding, and SEO services across Nigeria.",
    projectType: "Client / Company Website",
    projectDate: "2025-12-01",
    technologies: [
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "React",
      "AI-integration",
    ],
  },
  {
    projectName: "Cleanup: Cleaning Services Website",
    projectLink: "https://cleanup.com.ng/",
    image: "/projects/cleanup.png",
    projectDescription:
      "Website for Cleanup — a professional cleaning services company based in Kaduna, offering services like residential & commercial cleaning, post-construction cleanup, upholstery & carpet cleaning, hotel/restaurant cleaning, pest control, and 24/7 support.",
    projectType: "Client / Company Website",
    projectDate: "2025-11-15",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "React"],
  },
  {
    projectName: "Peekr",
    projectLink: "https://peekrr.vercel.app/",
    image: "/projects/peekrr.webp",
    projectDescription:
      "Responsive website snapshot and screenshot generator. Perfect for developers, designers, and marketers who want clean visuals across multiple viewport sizes.",
    projectType: "Developer Utility",
    projectDate: "2025-10-01",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    projectName: "MetaScraper",
    projectLink: "https://meta-scrapper.vercel.app",
    image: "/projects/meta-scrapper.webp",
    projectDescription:
      "Extract and retrieve title, description, OG image, and metadata from any URL instantly.",
    projectType: "Developer Tool",
    projectDate: "2024-03-01",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    projectName: "Rivr App",
    projectLink: "https://rivr-mu.vercel.app/",
    image: "/projects/rivr-app.png",
    projectDescription:
      "Empower your brand through authentic creator collaborations. Connect with trusted creators to amplify your message and drive results.",
    projectType: "Personal project",
    projectDate: "2025-03-01",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    projectName: "Olamide Tours Website (clone)",
    projectLink: "https://olamide-tour.vercel.app/",
    image: "/projects/celeb-tour.png",
    projectDescription:
      "Experience Olamide live in Toronto! Concert tour landing page clone featuring responsive ticketing interface, tour dates, and media showcases.",
    projectType: "Personal project",
    projectDate: "2025-10-01",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
];

export const SHORTPROJECTS = [
  {
    projectName: "Percentage Calculator / Cost Splitter",
    projectLink: "https://percentage-calcc.vercel.app/",
    projectinAppLink: "/percentage-calc",
    projectDescription:
      "Easily divide any total amount among individuals, with the option to add more participants and see real-time updates for precise cost sharing.",
    projectType: "Utility",
    projectDate: "2024-03-01",
    technologies: [
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "number-flow",
    ],
  },
  {
    projectName: "Mini Shooter Game",
    projectLink: "",
    projectinAppLink: "/shooter-game",
    projectDescription:
      "Experience the thrill of the mini shooter game, designed for fun and excitement with keyboard controls.",
    projectType: "Mini Game",
    projectDate: "2024-03-01",
    technologies: [
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "use-keys-bindings",
      "usehooks-ts",
    ],
  },
  {
    projectName: "Falso - Mock Data Generator",
    projectLink: "https://github.com/drealdumore/falso-api/",
    projectinAppLink: "/falso",
    projectDescription:
      "Generate type-safe mock data directly from your TypeScript interfaces.",
    projectType: "Developer Tool",
    projectDate: "2025-03-01",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    projectName: "Writing Pad",
    projectLink: "",
    projectinAppLink: "/writing-pad",
    projectDescription:
      "Minimal distraction-free writing space for notes and quick ideation.",
    projectType: "Utility",
    projectDate: "2025-05-05",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS"],
  },
];

export const MOBILE_APPS: CaseStudy[] = [
  // 1. Melo
  {
    id: "melo",
    title: "Projects",
    sub: "Melo",
    oneLiner: "Private real-time chat with automatic language translation",
    year: 2026,
    builtBy: "Samuel Isah",
    website: "https://github.com/drealdumore/melo",
    heroImage: "/projects/melo-splash.png",
    intro:
      "A mobile-first, two-person chat app where you write in your language and the other person reads in theirs — no copy-pasting required. Every message is translated automatically before delivery while keeping the original one tap away.",
    introText:
      "Friends and family who speak different languages often struggle with real-time conversation. Existing translation tools interrupt the flow, and most messaging apps treat translation as an afterthought. Melo eliminates that tax: you type in your language, they receive it in theirs, and communication flows naturally.",
    gallery: [
      { src: "/projects/melo-splash.png", alt: "Melo Splash Screen" },
      { src: "/projects/melo-onboarding.png", alt: "Melo Onboarding" },
      { src: "/projects/melo-onboarding-name.png", alt: "Enter Your Name" },
      { src: "/projects/melo-onboarding-avatar.png", alt: "Choose Avatar" },
      { src: "/projects/melo-onboarding-language.png", alt: "Language Selection" },
      { src: "/projects/melo-connect.png", alt: "Melo Chats List" },
      { src: "/projects/melo-id.png", alt: "Melo ID Card" },
      { src: "/projects/melo-chat.png", alt: "Melo Chat View" },
      { src: "/projects/melo-friend-sheet.png", alt: "Add a Friend" },
      { src: "/projects/melo-profile-sheet-1.png", alt: "Profile Settings" },
    ],
    challenge:
      "Chat apps don't translate natively, and translation apps aren't conversation tools. The challenge was building an instant optimistic UI where translation happens asynchronously without stuttering the chat, handling translation endpoint rate limits and silent failures, and creating frictionless identity without passwords.",
    actions: [
      {
        title: "Identity without traditional auth",
        text: "Generated a unique device UUID and human-readable Melo ID stored in AsyncStorage and synced to Supabase. Room IDs are computed deterministically from participant ID pairs so both users always connect to the exact same room with zero signup friction.",
      },
      {
        title: "Optimistic UI + translation pipeline",
        text: "Messages appear instantly on the sender's screen. The translation pipeline handles per-message status tracking (pending → translated / skipped / failed + retry) over Supabase Realtime, with in-flight request coalescing, bounded in-memory caching, and echo detection.",
      },
      {
        title: "Realtime architecture across 11 languages",
        text: "Built with Expo Router and Supabase Realtime channels handling live typing indicators, presence, and read receipts. Supports 11 languages including English, Spanish, French, German, Simplified Chinese, Arabic, Portuguese, Hindi, Swahili, Yoruba, and Korean.",
      },
    ],
    result:
      "Building Melo taught me how to architect real-time systems, design resilient optimistic update pipelines, and handle the practical trade-offs of client-side translation. It turns cross-language communication into ordinary, effortless texting.",
    technologies: [
      "Expo SDK 57",
      "React Native",
      "Expo Router",
      "TypeScript",
      "Supabase (Postgres + Realtime)",
      "AsyncStorage",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/drealdumore/melo" },
    ],
  },

  // 2. The SupaDevs
  {
    id: "thesupadevs",
    title: "Projects",
    sub: "The SupaDevs",
    oneLiner: "Curated developer resources platform with AI-powered categorization",
    year: 2025,
    builtBy: "Samuel Isah",
    website: "https://thesupadevs.vercel.app",
    heroImage: "/projects/thesupadevs.webp",
    intro:
      "An open-source library of 1000+ developer tools, UI components, APIs, and resources — designed so developers can find quality assets quickly without endless searching.",
    introText:
      "Developers waste significant time hunting for good tools, components, and learning resources across scattered websites, Twitter threads, and newsletters. The SupaDevs provides a fast, centralized hub with smart search, automatic metadata scraping, and AI categorization.",
    gallery: [
      { src: "/projects/thesupadevs.webp", alt: "The SupaDevs Platform" },
    ],
    challenge:
      "Curating and structuring thousands of dynamic resources, scraping rich metadata from diverse and malformed websites reliably, and delivering an instant admin dashboard with bulk editing while preserving top-tier Core Web Vitals.",
    actions: [
      {
        title: "Intelligent metadata scraper",
        text: "Built a custom multi-source fallback scraper (OG image → Twitter card → first body image → favicon fallback) with in-memory caching, rate-limit handling, and retry logic to extract metadata cleanly.",
      },
      {
        title: "AI batch categorization with Groq & Llama",
        text: "Integrated Groq AI (Llama 3.1 8B) for batch classifying submitted developer resources into hierarchical categories with confidence scoring and automated tagging.",
      },
      {
        title: "High-performance Next.js 15 & Admin suite",
        text: "Architected with ISR (5-minute revalidation), dynamic SEO metadata, Open Graph generation, Core Web Vitals monitoring, and a comprehensive admin suite for bulk approval, link validation, and categorization.",
      },
    ],
    result:
      "The SupaDevs serves as a fast, community-driven resource hub. Building it deepened my expertise in production-grade Next.js caching, server-side scraping pipelines, and practical LLM integration for automated content workflows.",
    technologies: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Supabase",
      "Framer Motion",
      "Groq AI",
      "Cheerio + Axios",
      "ISR",
    ],
    links: [
      { label: "Live Demo", url: "https://thesupadevs.vercel.app" },
      { label: "GitHub", url: "https://github.com/drealdumore/thesupadevs" },
    ],
  },

  // 3. VaultX
  {
    id: "vaultx",
    title: "Projects",
    sub: "VaultX",
    oneLiner: "Cross-device temporary sharing API",
    year: 2025,
    builtBy: "Samuel Isah",
    website: "https://github.com/drealdumore/vaultx",
    heroImage: "/projects/metascraper.png",
    intro:
      "A lightweight, production-ready REST API for sharing text, code snippets, and links across devices — with expiry, view limits, password protection, and burn-after-reading.",
    introText:
      "Copying something on your phone and needing it on your laptop (or sharing a temporary secret) is still awkwardly friction-heavy. Most solutions require accounts or permanent storage. VaultX is a zero-account, secure sharing service built for speed and privacy.",
    gallery: [],
    challenge:
      "Architecting a backend service that operates with near-zero latency, persists data safely across server restarts, and gracefully tolerates Redis outages without dropping clip retrieval for active users.",
    actions: [
      {
        title: "Hybrid in-memory + Redis storage architecture",
        text: "Designed a memory-first architecture where reads check in-memory cache first, fall back to Redis for persistence, and restore to memory on demand. Built automatic failover so the API runs seamlessly even without Redis.",
      },
      {
        title: "Production security & rate limiting",
        text: "Implemented Helmet security headers, password hashing with bcrypt, strict input validation, content size caps (100 KB), CORS configuration, and automatic background cleanup jobs for expired secrets.",
      },
      {
        title: "Consistent API design & monitoring",
        text: "Structured uniform JSON error responses, detailed health check endpoints, clip access analytics, and token generation via crypto.",
      },
    ],
    result:
      "VaultX reinforced my focus on API reliability, graceful degradation, and the vital difference between a local prototype and a resilient, production-ready backend service.",
    technologies: [
      "Node.js",
      "Express",
      "TypeScript",
      "Redis (Upstash)",
      "Helmet",
      "Zod",
      "crypto",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/drealdumore/vaultx" },
    ],
  },

  // 4. Chop Iron
  {
    id: "iron",
    title: "Projects",
    sub: "Chop Iron",
    oneLiner: "Offline-first fitness / bodybuilding progress tracker",
    year: 2026,
    builtBy: "Samuel Isah",
    website: "Coming Soon",
    heroImage: "/projects/chop-iron-splash.png",
    intro:
      "An offline-first bodybuilding tracker with a Nigerian voice. Logs workouts from a built-in library of 53 exercises, detects personal records across four categories — weight, reps, volume, and estimated 1RM — and turns training history into streaks, achievements, and analytics. No account, no server, no subscription: everything lives in a local SQLite database.",
    introText:
      "I built Chop Iron because every fitness app I tried felt bloated with paywalls or completely sterile. None had the motivating voice I needed when lifting: 'No dull. Go chop iron.' From there, every decision answered one question: does this help me log a set faster and train harder?",
    gallery: [
      { src: "/projects/chop-iron-splash.png", alt: "Chop Iron Splash Screen" },
      { src: "/projects/chop-iron-splash-2.png", alt: "Splash Screen Alt" },
      { src: "/projects/chop-iron-onboarding-1.png", alt: "Onboarding Step 1" },
      { src: "/projects/chop-iron-onboarding-2.png", alt: "Onboarding Step 2" },
      { src: "/projects/chop-iron-onboarding-body.png", alt: "Body Type Selection" },
      { src: "/projects/chop-iron-index.png", alt: "Home screen with streak calendar" },
      { src: "/projects/chop-iron-calender.png", alt: "Calendar View" },
      { src: "/projects/chop-iron-log.png", alt: "Logging a workout" },
      { src: "/projects/chop-iron-exercises.png", alt: "Exercise library with 53 exercises" },
      { src: "/projects/chop-iron-progress.png", alt: "Progress screen with charts" },
      { src: "/projects/chop-iron-achievement.png", alt: "Achievements and milestones" },
      { src: "/projects/chop-iron-profile.png", alt: "Profile and stats overview" },
    ],
    challenge:
      "The real challenge was making the data honest while keeping logging frictionless. Streaks must count consecutive distinct days; personal records must accurately evaluate four metric types chronologically; achievements must re-lock if a workout is deleted; and the entire UI must stay at 60fps offline.",
    actions: [
      {
        title: "Local-first SQLite database architecture",
        text: "Built on React Native and Expo with a single Zustand store over 12 transactional SQLite tables in WAL mode. Zero network dependency ensures instantaneous logging anywhere.",
      },
      {
        title: "Custom PR calculation & streak engine",
        text: "Engineered a chronological workout history evaluator that computes Epley 1RM, volume, and rep PRs. Includes dynamic achievement threshold evaluation and streak calculation.",
      },
      {
        title: "Spring-physics motion & local personality",
        text: "Built bottom trays, fluid gestures, and spring-loaded animations using Reanimated 4 tokens, dark-mode styling tuned for gym environments, and fluent pidgin copy that gives the app an authentic training voice.",
      },
    ],
    result:
      "Chop Iron became my proving ground for offline-first architecture, local data integrity, gesture interaction design, and creating software with distinctive personality.",
    technologies: [
      "React Native",
      "Expo SDK",
      "TypeScript",
      "SQLite",
      "Zustand",
      "Reanimated",
      "expo-router",
    ],
    links: [
      { label: "Chop Iron", url: "#" },
    ],
  },

  // 5. Crystalglowxquisite
  {
    id: "crystalglowxquisite",
    title: "Projects",
    sub: "Crystalglowxquisite",
    oneLiner: "Full e-commerce storefront for a premium skincare brand",
    year: 2026,
    builtBy: "Samuel Isah",
    website: "https://crystalglowxquisite.com/",
    heroImage: "/projects/crystalglowxquisite.png",
    intro:
      "Full e-commerce storefront for a premium skincare brand — custom checkout, product catalog, and analytics built from the ground up.",
    introText:
      "Designed and developed a modern luxury shopping experience tailored to skincare enthusiasts, complete with fluid cart drawer interactions, detailed product categorization, and high-performance page loads.",
    gallery: [
      { src: "/projects/crystalglowxquisite.png", alt: "Crystalglowxquisite Storefront" },
    ],
    challenge:
      "Creating an elegant, ultra-responsive storefront that maintains sub-second page transitions, smooth cart state synchronization, and reliable checkout handling across mobile and desktop.",
    actions: [
      {
        title: "Custom catalog & checkout flow",
        text: "Built dynamic product filtering, responsive image galleries, real-time cart state management, and an intuitive checkout experience.",
      },
      {
        title: "Performance & analytics integration",
        text: "Integrated PostHog for detailed user interaction analytics, Neon PostgreSQL for resilient data storage, and edge caching on Vercel.",
      },
    ],
    result:
      "Launched a polished e-commerce platform that boosted brand credibility and streamlined customer purchasing flow.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React",
      "Posthog",
      "Neon",
      "Vercel",
    ],
    links: [
      { label: "Live Store", url: "https://crystalglowxquisite.com/" },
    ],
  },

  // 6. Knowledge Master
  {
    id: "knowledgemaster",
    title: "Projects",
    sub: "Knowledge Master",
    oneLiner: "E-commerce platform for a nationwide bookstore",
    year: 2026,
    builtBy: "Samuel Isah",
    website: "https://www.knowledgemaster.com.ng/",
    heroImage: "/projects/knowledgemaster.webp",
    intro:
      "E-commerce platform for a bookstore (textbooks, novels, educational resources, school bookfair services) with nationwide delivery information.",
    introText:
      "Built a comprehensive digital bookstore serving students, educators, and schools across Nigeria with an extensive educational catalog and transparent shipping logistics.",
    gallery: [
      { src: "/projects/knowledgemaster.webp", alt: "Knowledge Master Bookstore" },
    ],
    challenge:
      "Structuring extensive inventory across varying school curriculums, handling multifaceted nationwide delivery tiers, and ensuring fast browsing on mobile devices.",
    actions: [
      {
        title: "Curriculum & resource categorization",
        text: "Designed intuitive category drill-downs, search indexing, and promotional bookfair service booking workflows.",
      },
      {
        title: "Modern Next.js web platform",
        text: "Engineered with Next.js, TypeScript, and Tailwind CSS with AI-assisted product recommendation utilities.",
      },
    ],
    result:
      "Delivered a dependable educational bookstore platform supporting nationwide deliveries and school partnership requests.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React",
      "Neon",
      "Posthog",
      "AI-integration",
    ],
    links: [
      { label: "Live Website", url: "https://www.knowledgemaster.com.ng/" },
    ],
  },

  // 7. DropEnv
  {
    id: "dropenv",
    title: "Projects",
    sub: "DropEnv",
    oneLiner: "Encrypted environment-variable sharing tool",
    year: 2025,
    builtBy: "Samuel Isah",
    website: "https://github.com/drealdumore/dropenv",
    heroImage: "/projects/metascraper.png",
    intro:
      "Encrypted environment-variable sharing tool — a practical utility for safely passing sensitive config between teammates or devices.",
    introText:
      "Sharing `.env` secrets over Slack or chat apps exposes keys to plain text storage. DropEnv encrypts config in the client browser with ephemeral zero-knowledge storage.",
    gallery: [],
    challenge:
      "Guaranteeing zero-knowledge security so that server logs never receive unencrypted credentials, combined with one-time view and expiration triggers.",
    actions: [
      {
        title: "Client-side AES encryption",
        text: "Implemented Web Crypto API AES-GCM encryption where secret keys reside exclusively in the URL hash fragment.",
      },
      {
        title: "Ephemeral lifecycle & auto-destruction",
        text: "Designed self-destructing links with configurable timers and view counters.",
      },
    ],
    result:
      "Built a secure, friction-free secret sharing tool for developer teams.",
    technologies: [
      "TypeScript",
      "Next.js",
      "Node.js",
      "Web Crypto API",
      "Tailwind CSS",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/drealdumore/dropenv" },
    ],
  },

  // 8. SAGE
  {
    id: "sage",
    title: "Projects",
    sub: "SAGE",
    oneLiner: "AI strategist for difficult conversations mapped against The 48 Laws of Power",
    year: 2026,
    builtBy: "Samuel Isah",
    website: "Coming Soon",
    heroImage: "/projects/sage-splash.png",
    intro:
      "SAGE is an AI strategist for the conversations you're dreading. Describe the situation — a raise you need to ask for, a conflict you've been avoiding — and it reads the power dynamics, maps what's happening against The 48 Laws of Power, and drafts your reply in eight different tones.",
    introText:
      "I didn't build Sage to ship an AI app. I built it because I kept losing the same kind of conversation. I wanted something that checked my decisions against the laws before I hit send — not a chatbot that agrees with me, but a strategist that highlights hidden leverage.",
    gallery: [
      { src: "/projects/sage-splash.png", alt: "Sage Splash Screen" },
      { src: "/projects/sage-index.png", alt: "Sage Analysis View" },
      { src: "/projects/sage-index-listening.png", alt: "Sage Voice Input" },
      { src: "/projects/sage-coach.png", alt: "Sage Live Coach" },
      { src: "/projects/sage-conversation-1.png", alt: "Sage Conversation Simulator" },
      { src: "/projects/sage-conversation-1b.png", alt: "Sage Conversation Detail" },
      { src: "/projects/sage-conversation-2.png", alt: "Sage Conversation Follow-up" },
      { src: "/projects/sage-learn.png", alt: "Sage Learn — The 48 Laws" },
      { src: "/projects/sage-library.png", alt: "Sage Library" },
    ],
    challenge:
      "Getting an LLM to reason about messy human situations and return reliable structured outputs without hallucinating laws or breaking under API rate limits.",
    actions: [
      {
        title: "API key rotation & quota recovery",
        text: "Built an 8-key rotation mechanism with dead-slot tracking and quota lockouts to prevent rate limit downtime on free tiers.",
      },
      {
        title: "Dual voice engine & schema validation",
        text: "Implemented dual voice transcription (Gemini audio + Groq Whisper failover) and strict Zod validation with safe schema fallbacks.",
      },
      {
        title: "Custom dark motion design system",
        text: "Created a bespoke design system with Reanimated, Gesture Handler, and tactile haptic feedback.",
      },
    ],
    result:
      "Sage turned theoretical strategy into a practical daily tool, proving how defensive engineering and schema validation make AI systems genuinely reliable.",
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "Gemini API",
      "Groq Whisper",
      "Zod",
      "Reanimated",
    ],
    links: [
      { label: "Sage", url: "#" },
    ],
  },

  // 9. GPZ
  {
    id: "gpz",
    title: "Projects",
    sub: "GPZ",
    oneLiner: "GPA tracker and academic planner for students",
    year: 2025,
    builtBy: "Samuel Isah",
    website: "Coming Soon",
    heroImage: "/projects/gpz-splash.png",
    intro:
      "GPZ is a GPA tracker and academic planner for students. It helps students manage semesters, courses, grades, and set academic goals with a modern, intuitive interface.",
    introText:
      "Students often struggle to know what GPA they need next semester to hit their target degree classification. GPZ turns GPA projection into a clear, actionable roadmap.",
    gallery: [
      { src: "/projects/gpz-onboarding-1.png", alt: "GPZ Onboarding 1" },
      { src: "/projects/gpz-onboarding-2.png", alt: "GPZ Onboarding 2" },
      { src: "/projects/gpz-onboarding-3.png", alt: "GPZ Onboarding 3" },
      { src: "/projects/gpz-home.png", alt: "GPZ Home" },
    ],
    challenge:
      "Supporting multiple grading systems (4.0 and 5.0 scales) with forward-projecting target algorithms while keeping data entry fast and completely offline.",
    actions: [
      {
        title: "Academic target calculation logic",
        text: "Engineered algorithms that calculate exact credit requirements and required grades across upcoming semesters.",
      },
      {
        title: "Offline-first React Native architecture",
        text: "Built with Expo, TypeScript, AsyncStorage persistence, and React Query data caching.",
      },
    ],
    result:
      "Created an intuitive academic assistant that helps students take control of their grades.",
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "AsyncStorage",
      "react-query",
    ],
    links: [
      { label: "GPZ", url: "#" },
    ],
  },

  // 10. ECHO
  {
    id: "echo",
    title: "Projects",
    sub: "ECHO",
    oneLiner: "Location-first offline reminder app",
    year: 2025,
    builtBy: "Samuel Isah",
    website: "Coming Soon",
    heroImage: "/projects/echo-hero.png",
    intro:
      "ECHO is a minimalist, offline-first reminder app that fires based on where you are, not just when. Drop a pin, set a radius, and ECHO nudges you the moment you arrive — no account, no signal required.",
    introText:
      "Time-based reminders fail when tasks depend on location. ECHO triggers notifications right when you arrive at specific geofences without draining battery.",
    gallery: [
      { src: "/projects/echo-hero.png", alt: "Echo Map View" },
      { src: "/projects/echo-square.png", alt: "Echo Reminder List" },
    ],
    challenge:
      "Reliable background geofencing within OS battery conservation restrictions and region limits.",
    actions: [
      {
        title: "Headless task manager & local geofencing",
        text: "Configured background region monitoring with expo-task-manager and local notifications.",
      },
      {
        title: "Offline location caching",
        text: "Optimized forward and reverse geocoding with debounced caching to reduce battery consumption.",
      },
    ],
    result:
      "Delivered a dependable location reminder app that operates seamlessly without cloud dependencies.",
    technologies: [
      "React Native",
      "Expo",
      "expo-location",
      "expo-task-manager",
      "TypeScript",
    ],
    links: [
      { label: "Echo", url: "#" },
    ],
  },
];

export const WEB_TOOLS = [
  {
    projectName: "Deps Janitor",
    projectLink: "https://deps-janitor.vercel.app/",
    image: "/projects/deps-janitor.png",
    projectDescription:
      "Interactive CLI that finds and safely removes unused npm dependencies to keep projects clean and lightweight.",
    projectType: "CLI & Web Tool",
    projectDate: "2025-12-28",
    technologies: ["Node.js", "Next.js", "Tailwind CSS", "TypeScript"],
  },
  {
    projectName: "Peekr",
    projectLink: "https://peekrr.vercel.app/",
    image: "/projects/peekrr.webp",
    projectDescription:
      "Responsive website snapshot and screenshot generator for previewing designs across viewport sizes.",
    projectType: "Developer Utility",
    projectDate: "2025-12-15",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
  },
  {
    projectName: "MetaScraper",
    projectLink: "https://meta-scrapper.vercel.app/",
    image: "/projects/meta-scrapper.webp",
    projectDescription:
      "Extract title, description, OG image, and metadata from any URL instantly.",
    projectType: "Web Utility",
    projectDate: "2025-11-20",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript", "Lucide React"],
  },
  {
    projectName: "VaultX",
    projectLink: "https://github.com/drealdumore/vaultx/",
    projectDescription:
      "Lightweight API for sharing text, code snippets, and links across devices with expiry and burn-after-reading.",
    projectType: "REST API",
    projectDate: "2025-12-01",
    technologies: ["TypeScript", "Node.js", "Express", "Redis"],
  },
  {
    projectName: "Falso API",
    projectLink: "https://github.com/drealdumore/falso-api/",
    projectDescription:
      "TypeScript mock data generator that turns interfaces into realistic JSON for testing and database seeding.",
    projectType: "Developer Tool",
    projectDate: "2025-03-01",
    technologies: ["TypeScript", "Node.js"],
  },
  {
    projectName: "DropEnv",
    projectLink: "https://github.com/drealdumore/dropenv/",
    projectDescription:
      "Encrypted environment-variable sharing tool for safely passing sensitive config between teammates or devices.",
    projectType: "Security Utility",
    projectDate: "2025-08-01",
    technologies: ["TypeScript", "Next.js", "Web Crypto API"],
  },
  {
    projectName: "Split Cost / Percentage Calculator",
    projectLink: "https://percentage-calcc.vercel.app/",
    projectDescription:
      "Real-time cost splitter and percentage calculator for group expense sharing.",
    projectType: "Web Utility",
    projectDate: "2024-03-01",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "number-flow"],
  },
  {
    projectName: "Writing Pad",
    projectLink: "",
    projectDescription:
      "Minimal distraction-free writing pad for focused drafting.",
    projectType: "Utility",
    projectDate: "2025-05-05",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS"],
  },
];
