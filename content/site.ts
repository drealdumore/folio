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
  highlight?: string;
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
  stats?: { value: string; label: string }[];
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
      "A chat app for two people who speak different languages. Each person can write in their own language, and the other sees a translation with the original message a tap away.",
    highlight: "two people who speak different languages",
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
      "An offline workout tracker with a Nigerian voice. Log workouts from 53 exercises, track personal records across four categories, and review your training history without an internet connection.",
    highlight: "offline workout tracker",
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
      "A REST API for sharing text, code snippets, and links between devices without an account. It supports expiry times, view limits, password protection, rate limiting, and in-memory storage with Redis as a persistence layer.",
    highlight: "sharing text, code snippets, and links between devices",
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
    projectName: "DropEnv",
    projectLink: "/projects/dropenv",
    image: "/projects/dropenv.png",
    projectDescription:
      "A tool for sharing environment variables through temporary, encrypted links. Encryption happens in the browser and the decryption key stays in the URL fragment instead of being sent to the server.",
    highlight: "sharing environment variables through temporary, encrypted links",
    projectType: "Security Utility",
    projectDate: "2025-08-01",
    technologies: [
      "TypeScript",
      "Next.js",
      "Node.js",
      "Web Crypto API",
      "Tailwind CSS",
    ],
  },
  {
    projectName: "The SupaDevs",
    projectLink: "/projects/thesupadevs",
    image: "/projects/thesupadevs.webp",
    projectDescription:
      "A searchable collection of developer tools, UI components, APIs, and other resources. It includes metadata scraping, AI categorization with Groq and Llama, and an admin dashboard for managing submissions and checking links.",
    highlight: "developer tools, UI components, APIs, and other resources",
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
      "An online store for a skincare brand, with a product catalog, cart, checkout flow, and analytics.",
    highlight: "online store for a skincare brand",
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
      "An online bookstore for textbooks, novels, and learning resources, with details about delivery and school bookfair services.",
    highlight: "online bookstore for textbooks, novels, and learning resources",
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
      "An AI conversation coach for difficult situations. Describe what is happening and get an analysis of the situation, it reads the power dynamics, maps them against The 48 Laws of Power, plus draft replies in different tones. It also supports voice input.",
    highlight: "AI conversation coach for difficult situations",
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
      "A GPA tracker for students to manage semesters, courses, and grades, and work out how upcoming results could affect an academic target.",
    highlight: "GPA tracker for students",
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
      "The website for Isami Technologies, a Nigerian digital agency offering websites, online stores, chatbots, branding, and SEO services.",
    highlight: "Nigerian digital agency",
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
      "A website for Cleanup, a Kaduna-based cleaning company. It explains the company’s residential, commercial, post-construction, upholstery, and carpet cleaning services.",
    highlight: "Kaduna-based cleaning company",
    projectType: "Client / Company Website",
    projectDate: "2025-11-15",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "React"],
  },
  {
    projectName: "Deps Janitor",
    projectLink: "https://deps-janitor.vercel.app/",
    image: "/projects/deps-janitor.webp",
    projectDescription:
      "A CLI tool for finding unused npm dependencies and helping you remove packages a project no longer needs.",
    highlight: "unused npm dependencies",
    projectType: "CLI & Web Tool",
    projectDate: "2025-12-28",
    technologies: ["Node.js", "Next.js", "Tailwind CSS", "TypeScript"],
  },
  {
    projectName: "Peekr",
    projectLink: "https://peekrr.vercel.app/",
    image: "/projects/peekrr.webp",
    projectDescription:
      "A tool for taking website screenshots at different viewport sizes, useful for checking responsive layouts or preparing visuals.",
    highlight: "website screenshots at different viewport sizes",
    projectType: "Developer Utility",
    projectDate: "2025-10-01",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    projectName: "MetaScraper",
    projectLink: "https://meta-scrapper.vercel.app",
    image: "/projects/meta-scrapper.webp",
    projectDescription:
      "A small tool that reads a webpage’s title, description, Open Graph image, and other metadata from a URL.",
    highlight: "title, description, Open Graph image, and other metadata",
    projectType: "Developer Tool",
    projectDate: "2024-03-01",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    projectName: "Rivr App",
    projectLink: "https://rivr-mu.vercel.app/",
    image: "/projects/rivr-app.png",
    projectDescription:
      "A concept for connecting brands with creators for potential collaborations.",
    highlight: "connecting brands with creators",
    projectType: "Personal project",
    projectDate: "2025-03-01",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    projectName: "Olamide Tours Website (clone)",
    projectLink: "https://olamide-tour.vercel.app/",
    image: "/projects/celeb-tour.png",
    projectDescription:
      "A landing-page clone for an Olamide tour concept, with tour dates, media, and a responsive ticket-style interface.",
    highlight: "landing-page clone for an Olamide tour concept",
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
      "A small calculator for splitting costs or percentages between people. Change the amounts or participants and the totals update.",
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
      "A small browser-based shooter game controlled with the keyboard.",
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
      "A TypeScript utility for generating mock data from interfaces, so you don’t have to write every test object by hand.",
    projectType: "Developer Tool",
    projectDate: "2025-03-01",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    projectName: "Writing Pad",
    projectLink: "",
    projectinAppLink: "/writing-pad",
    projectDescription:
      "A simple writing space for quick notes and drafts.",
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
      "Melo is a two-person chat app for people who speak different languages. You write in your language, the other person receives a translation, and either person can tap to see the original message.",
    introText:
      "I wanted to make conversations between people who speak different languages feel less awkward. Switching between a messaging app and a translation tool breaks the flow, so Melo puts translation directly into the chat.",
    gallery: [
      { src: "/projects/melo-splash.png", alt: "Melo Splash Screen" },
      { src: "/projects/melo-onboarding.png", alt: "Melo Onboarding" },
      { src: "/projects/melo-onboarding-name.png", alt: "Enter Your Name" },
      { src: "/projects/melo-onboarding-avatar.png", alt: "Choose Avatar" },
      { src: "/projects/melo-onboarding-language.png", alt: "Language Selection" },
      { src: "/projects/melo-connect.png", alt: "Melo Chats List" },
      { src: "/projects/melo-id.png", alt: "Melo ID Card" },
      { src: "/projects/melo-chat.png", alt: "Melo Chat View" },
      { src: "/projects/melo-chat-id.png", alt: "Melo Chat ID" },
      { src: "/projects/melo-chat-id-2.png", alt: "Melo Chat ID Detail" },
      { src: "/projects/melo-friend-sheet.png", alt: "Add a Friend" },
      { src: "/projects/melo-profile-sheet-1.png", alt: "Profile Settings" },
      { src: "/projects/melo-profile-sheet-2.png", alt: "Profile Settings Detail" },
      { src: "/projects/melo-profile-sheet-3.png", alt: "Profile Settings Menu" },
    ],
    challenge:
      "The main challenge was keeping the chat responsive while translation happened in the background. I also needed to handle translation failures and rate limits, and let people connect without a traditional account flow.",
    actions: [
      {
        title: "Identity without traditional auth",
        text: "Each device gets a UUID and a readable Melo ID, stored in AsyncStorage and synced to Supabase. I derive the room ID from the two participant IDs so both people resolve to the same chat without signing up.",
      },
      {
        title: "Optimistic UI + translation pipeline",
        text: "The sender sees the message immediately while translation runs. I track each message’s translation state, support retries, and use Supabase Realtime to keep the chat updated. I also added request coalescing, in-memory caching, and echo detection.",
      },
      {
        title: "Realtime architecture across 11 languages",
        text: "Expo Router and Supabase Realtime handle typing indicators, presence, and read receipts. The app supports 11 languages, including English, Spanish, French, Arabic, Swahili, Yoruba, and Korean.",
      },
    ],
    result:
      "Working on Melo gave me practical experience with optimistic UI updates, realtime events, and the trade-offs involved in translating messages before delivery.",
    stats: [
      { value: "11", label: "languages supported" },
      { value: "Real-time", label: "typing, presence & read receipts" },
      { value: "No accounts", label: "device-ID identity" },
    ],
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
    oneLiner: "A searchable developer resource library with AI categorization",
    year: 2025,
    builtBy: "Samuel Isah",
    website: "https://thesupadevs.vercel.app",
    heroImage: "/projects/thesupadevs.webp",
    intro:
      "The SupaDevs is a searchable library of developer tools, UI components, APIs, and other resources, so developers can find useful things without searching across dozens of sites.",
    introText:
      "I started The SupaDevs to put useful developer resources in one place. The site includes search, automatic metadata extraction, and AI categorization to help organize submissions.",
    gallery: [
      { src: "/projects/thesupadevs.webp", alt: "The SupaDevs Platform" },
    ],
    challenge:
      "The work involved collecting resources from different websites, handling missing or inconsistent metadata, and building admin tools to review and manage submissions.",
    actions: [
      {
        title: "Intelligent metadata scraper",
        text: "I built a scraper that tries Open Graph data first, then Twitter card metadata, page images, and finally the favicon. It also uses caching, rate-limit handling, and retries.",
      },
      {
        title: "AI batch categorization with Groq & Llama",
        text: "I integrated Groq with Llama 3.1 8B to categorize batches of submitted resources and suggest tags, including a confidence score for each classification.",
      },
      {
        title: "Next.js site and admin tools",
        text: "The site uses Next.js ISR with five-minute revalidation and dynamic metadata. I also built admin tools for bulk approval, link checks, and categorization.",
      },
    ],
    result:
      "Building The SupaDevs gave me experience with Next.js caching, scraping metadata from third-party sites, and using an LLM to help organize content.",
    stats: [
      { value: "500+", label: "resources listed" },
      { value: "5 min", label: "ISR revalidation" },
      { value: "AI", label: "Groq + Llama categorization" },
    ],
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
    intro:
      "VaultX is a REST API for sharing text, code snippets, and links between devices without creating an account. Shared items can expire, have view limits, or require a password.",
    introText:
      "I wanted a simple way to move a snippet or temporary piece of text between devices without creating an account or leaving it online indefinitely.",
    gallery: [],
    challenge:
      "The main backend challenge was keeping shared items accessible while handling Redis outages and server restarts.",
    actions: [
      {
        title: "Hybrid in-memory + Redis storage architecture",
        text: "Reads check memory first and fall back to Redis when needed. I added failover so the API can continue using in-memory storage if Redis is unavailable, with the trade-off that memory-only data may not survive a restart.",
      },
      {
        title: "Security and rate limiting",
        text: "I added Helmet security headers, bcrypt password hashing, Zod input validation, a 100 KB content limit, CORS configuration, and cleanup for expired items.",
      },
      {
        title: "Consistent API design & monitoring",
        text: "I standardized JSON error responses, added health-check endpoints and access tracking, and used Node’s crypto utilities to generate tokens.",
      },
    ],
    result:
      "VaultX gave me a chance to work through backend concerns like Redis failover, validation, expiry, and predictable API errors.",
    stats: [
      { value: "0", label: "accounts required" },
      { value: "100 KB", label: "payload cap per clip" },
      { value: "Memory + Redis", label: "hybrid storage with failover" },
    ],
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
      "Chop Iron is a workout tracker with a Nigerian voice. It includes 53 exercises, tracks personal records across four categories, and stores workout history in SQLite so logging works offline.",
    introText:
      "I built Chop Iron because every fitness app I tried felt bloated with paywalls or completely sterile. None had the motivating voice I needed when lifting: 'No dull. Go chop iron.' From there, every decision answered one question: does this help me log a set faster and train harder?",
    gallery: [
      { src: "/projects/chop-iron-splash.png", alt: "Chop Iron Splash Screen" },
      { src: "/projects/chop-iron-splash-2.png", alt: "Splash Screen Alt" },
      { src: "/projects/chop-iron-onboarding-1.png", alt: "Onboarding Step 1" },
      { src: "/projects/chop-iron-onboarding-2.png", alt: "Onboarding Step 2" },
      { src: "/projects/chop-iron-onboarding-3.png", alt: "Onboarding Step 3" },
      { src: "/projects/chop-iron-onboarding-4.png", alt: "Onboarding Step 4" },
      { src: "/projects/chop-iron-onboarding-body.png", alt: "Body Type Selection" },
      { src: "/projects/chop-iron-onboarding-goal.png", alt: "Goal Selection" },
      { src: "/projects/chop-iron-index.png", alt: "Home screen with streak calendar" },
      { src: "/projects/chop-iron-index-2.png", alt: "Home screen detail" },
      { src: "/projects/chop-iron-calender.png", alt: "Calendar View" },
      { src: "/projects/chop-iron-calender-2.png", alt: "Calendar Detail" },
      { src: "/projects/chop-iron-log.png", alt: "Logging a workout" },
      { src: "/projects/chop-iron-exercises.png", alt: "Exercise library with 53 exercises" },
      { src: "/projects/chop-iron-exercise-detail.png", alt: "Exercise Detail" },
      { src: "/projects/chop-iron-exercise-detail-image.png", alt: "Exercise Demo" },
      { src: "/projects/chop-iron-exercise-push.png", alt: "Push Exercise" },
      { src: "/projects/chop-iron-exercise-shoulder.png", alt: "Shoulder Exercise" },
      { src: "/projects/chop-iron-progress.png", alt: "Progress screen with charts" },
      { src: "/projects/chop-iron-achievement.png", alt: "Achievements and milestones" },
      { src: "/projects/chop-iron-profile.png", alt: "Profile and stats overview" },
      { src: "/projects/chop-iron-profile-avatar.png", alt: "Profile Avatar" },
      { src: "/projects/chop-iron-profile-1.png", alt: "Profile Overview" },
      { src: "/projects/chop-iron-profile-2.png", alt: "Profile Details" },
      { src: "/projects/chop-iron-profile-3.png", alt: "Profile Settings" },
      { src: "/projects/chop-iron-edit-profile.png", alt: "Edit Profile" },
    ],
    challenge:
      "The tricky part was getting the calculations right. Streaks need to count distinct training days, personal records depend on workout history, and achievements should update if a workout is deleted. All of this also needs to work offline.",
    actions: [
      {
        title: "Local-first SQLite database architecture",
        text: "I used React Native, Expo, Zustand, and 12 SQLite tables to keep workout data on the device. Logging doesn’t need a network connection.",
      },
      {
        title: "Custom PR calculation & streak engine",
        text: "I wrote the history calculations for estimated one-rep max (Epley formula), training volume, rep records, streaks, and achievement thresholds.",
      },
      {
        title: "Spring-physics motion & local personality",
        text: "I used Reanimated for the bottom sheets and gestures, and gave the interface a dark look with Nigerian/Pidgin copy throughout.",
      },
    ],
    result:
      "Chop Iron helped me practise offline-first app design, local data consistency, workout calculations, and gesture-based interactions.",
    stats: [
      { value: "53", label: "exercises built in" },
      { value: "12", label: "transactional SQLite tables" },
      { value: "4", label: "PR metrics tracked" },
      { value: "100%", label: "offline, zero network" },
    ],
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
    oneLiner: "Online store for a skincare brand",
    year: 2026,
    builtBy: "Samuel Isah",
    website: "https://crystalglowxquisite.com/",
    heroImage: "/projects/crystalglowxquisite.png",
    intro:
      "An online store for a skincare brand, with a product catalog, cart, checkout flow, and analytics.",
    introText:
      "I built the storefront around the brand’s product catalog, with filtering, product images, cart interactions, checkout, and analytics.",
    gallery: [
      { src: "/projects/crystalglowxquisite.png", alt: "Crystalglowxquisite Storefront" },
    ],
    challenge:
      "The main work was making the catalog and cart usable on both mobile and desktop, and connecting the shopping flow to checkout.",
    actions: [
      {
        title: "Custom catalog & checkout flow",
        text: "Built product filtering, responsive product galleries, cart state management, and the checkout flow.",
      },
      {
        title: "Performance & analytics integration",
        text: "Integrated PostHog for analytics and Neon PostgreSQL for data storage, and deployed the site on Vercel.",
      },
    ],
    result:
      "The result is an online storefront where customers can browse the catalog and go through the checkout flow.",
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
      "An online bookstore for textbooks, novels, and learning resources, with details about delivery and school bookfair services.",
    introText:
      "I built the site to help customers browse the bookstore’s offerings and find information about delivery and school bookfair services.",
    gallery: [
      { src: "/projects/knowledgemaster.webp", alt: "Knowledge Master Bookstore" },
    ],
    challenge:
      "The focus was organizing different types of books and making the catalog and delivery information easy to find on mobile.",
    actions: [
      {
        title: "Curriculum & resource categorization",
        text: "Organized books into categories and added search and information about the school bookfair service.",
      },
      {
        title: "Next.js web platform",
        text: "Built with Next.js, TypeScript, and Tailwind CSS, with AI-related product recommendation functionality.",
      },
    ],
    result:
      "The site gives customers a place to explore books, check delivery information, and learn about school bookfair services.",
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
    heroImage: "/projects/dropenv.png",
    intro:
      "DropEnv lets you share environment variables through temporary links, with encryption handled in the browser.",
    introText:
      "Sharing `.env` secrets over Slack or chat apps exposes keys to plain text storage. DropEnv encrypts config in the client browser with ephemeral zero-knowledge storage.",
    gallery: [],
    challenge:
      "The important part was encrypting the contents before they leave the browser and controlling how long a shared link remains available.",
    actions: [
      {
        title: "Client-side AES encryption",
        text: "I used the Web Crypto API with AES-GCM. The decryption key is kept in the URL fragment rather than sent as part of the normal request to the server.",
      },
      {
        title: "Ephemeral lifecycle & auto-destruction",
        text: "Added link expiry and view limits so shared content can be removed after a set time or number of views.",
      },
    ],
    result:
      "The result is a small tool for sharing configuration data without pasting the contents directly into chat.",
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
      "SAGE is an AI coach for difficult conversations. Describe a situation and it helps you think through the dynamics, then drafts possible replies in different tones using ideas from The 48 Laws of Power.",
    introText:
      "The idea was to help people think through a difficult conversation before replying. Rather than only generating a response, SAGE considers the situation and offers a few ways to approach it.",
    gallery: [
      { src: "/projects/sage-splash.png", alt: "Sage Splash Screen" },
      { src: "/projects/sage-index.png", alt: "Sage Analysis View" },
      { src: "/projects/sage-index-listening.png", alt: "Sage Voice Input" },
      { src: "/projects/sage-coach.png", alt: "Sage Live Coach" },
      { src: "/projects/sage-conversation-1.png", alt: "Sage Conversation Simulator" },
      { src: "/projects/sage-conversation-1b.png", alt: "Sage Conversation Detail" },
      { src: "/projects/sage-conversation-2.png", alt: "Sage Conversation Follow-up" },
      { src: "/projects/sage-conversation-load.png", alt: "Sage Conversation Loading" },
      { src: "/projects/sage-learn.png", alt: "Sage Learn: The 48 Laws" },
      { src: "/projects/sage-learn-load.png", alt: "Sage Learn Loading" },
      { src: "/projects/sage-library.png", alt: "Sage Library" },
      { src: "/projects/sage-delete.png", alt: "Sage Delete Conversation" },
    ],
    challenge:
      "The challenge was getting the model to return useful, structured responses while handling rate limits and responses that did not match the expected format.",
    actions: [
      {
        title: "API key rotation & quota recovery",
        text: "I built an eight-key rotation system that tracks exhausted keys and temporarily locks out keys that hit their quota, helping the app recover when an API key is rate-limited.",
      },
      {
        title: "Dual voice engine & schema validation",
        text: "Voice input can use Gemini or Groq Whisper, with a fallback path. I also validate AI responses with Zod and handle responses that do not match the expected schema.",
      },
      {
        title: "Custom dark motion design system",
        text: "I built the interface with Reanimated and Gesture Handler, including haptic feedback for key interactions.",
      },
    ],
    result:
      "Building SAGE gave me experience handling AI API limits, validating model responses, and adding a fallback for voice transcription.",
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
      "A GPA tracker for students to manage semesters, courses, and grades, and work out how upcoming results could affect an academic target.",
    introText:
      "I wanted students to be able to check how their next semester’s grades could affect their overall GPA, rather than having to work it all out manually.",
    gallery: [
      { src: "/projects/gpz-splash.png", alt: "GPZ Splash Screen" },
      { src: "/projects/gpz-onboarding-1.png", alt: "GPZ Onboarding 1" },
      { src: "/projects/gpz-onboarding-2.png", alt: "GPZ Onboarding 2" },
      { src: "/projects/gpz-onboarding-3.png", alt: "GPZ Onboarding 3" },
      { src: "/projects/gpz-onboarding-4.png", alt: "GPZ Onboarding 4" },
      { src: "/projects/gpz-onboarding-5.png", alt: "GPZ Onboarding 5" },
      { src: "/projects/gpz-home.png", alt: "GPZ Home" },
    ],
    challenge:
      "The calculations need to account for different grading scales and estimate future results, while keeping course and grade entry straightforward.",
    actions: [
      {
        title: "Academic target calculation logic",
        text: "I added calculations to estimate the grades and credit requirements needed to reach a target GPA in future semesters.",
      },
      {
        title: "Offline-first React Native architecture",
        text: "Built with Expo and TypeScript, with AsyncStorage for local persistence and React Query for data caching.",
      },
    ],
    result:
      "GPZ brings course records, GPA calculations, and academic targets together in one place.",
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
    oneLiner: "A reminder app that can notify you when you reach a chosen location",
    year: 2025,
    builtBy: "Samuel Isah",
    website: "Coming Soon",
    heroImage: "/projects/echo-hero.png",
    intro:
      "ECHO is a reminder app for tasks tied to a place. Choose a location and a radius, and the app can send a notification when you arrive. It is designed to keep reminders on the device rather than depend on a cloud account.",
    introText:
      "Some reminders are more useful when you reach a place than at a set time. The challenge was monitoring locations in the background while working within mobile operating-system limits.",
    gallery: [
      { src: "/projects/echo-hero.png", alt: "Echo Map View" },
      { src: "/projects/echo-square.png", alt: "Echo Reminder List" },
    ],
    challenge:
      "The challenge was monitoring locations in the background while working within operating-system battery and region limits.",
    actions: [
      {
        title: "Headless task manager & local geofencing",
        text: "Used expo-task-manager to monitor location regions in the background and trigger local notifications.",
      },
      {
        title: "Offline location caching",
        text: "Added caching and debouncing around forward and reverse geocoding to avoid repeating requests unnecessarily.",
      },
    ],
    result:
      "ECHO explores how background location tasks and local notifications can support reminders without relying on a cloud service.",
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
    image: "/projects/deps-janitor.webp",
    projectDescription:
      "A CLI tool for finding unused npm dependencies and helping you remove packages a project no longer needs.",
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
      "Extract a page title, description, Open Graph image, and other metadata from a URL.",
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

/* ------------------------------------------------------------------ *
 * Site identity, copy and everything else (single source of truth).
 * ------------------------------------------------------------------ */

export const META = {
  title: "Samuel Isah | Software Developer",
  name: "Samuel Isah",
  description:
    "Samuel Isah is a software developer from Nigeria who builds web apps, mobile apps, and backend services with tools including React, Next.js, React Native, TypeScript, and Node.js.",
  og: "Web apps, mobile apps, and backend systems built to solve real problems.",
  keywords: [
    "Samuel Isah",
    "drealdumore",
    "Full-Stack Developer",
    "Web Developer",
    "Next.js SEO",
    "React Developer",
    "React Native Developer",
    "TypeScript Developer",
    "Software Engineer",
    "UI/UX Design",
    "Web Applications",
    "Performance Optimization",
    "Full-Stack Portfolio",
    "Custom Mobile Apps",
    "TypeScript and React",
    "Cross-platform Development",
  ],
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "https://drealdumore.vercel.app",
  ogImage: {
    width: 1200,
    height: 630,
    type: "image/png",
  },
  image: "/api/og",
  author: "Samuel Isah",
  creator: "Samuel Isah",
  publisher: "Samuel Isah",
  category: "Technology",
};


export const PROFILE = {
  name: "Samuel Isah",
  firstName: "Samuel",
  handle: "drealdumore",
  greeting: "Hey, I'm Samuel.",
  role: "Software Engineer",
  shortRole: "Software engineer",
  location: "Kaduna, Nigeria",
  locationNote: "Open to relocation & visa sponsorship",
  availability: "Open to work",
  tagline:
    "I build web and mobile products, work on backend systems, and enjoy turning ideas into things people can actually use.",
  about: [
    "I'm Samuel, a software engineer based in Nigeria. I build across web, mobile, and backend, mostly using TypeScript, React, Next.js, React Native, and Node.js. I like taking an idea from the rough sketch stage to something people can use.",
    "I'm also curious about what happens behind the screen: how APIs fit together, how data moves through a system, and what happens when things go wrong. I enjoy figuring out those details and finding ways to make software more reliable without making it unnecessarily complicated.",
    "Some things I've built include Melo, a chat app that helps two people communicate across different languages; DropEnv, a tool for sharing environment variables with client-side encryption; and Sage, an AI-powered communication coach. I enjoy building things that solve a real problem, even when the solution starts as a small experiment.",
    "I'm looking for a software engineering role where I can work with good people, contribute to real products, learn from other engineers, and keep getting better at my craft."
  ],
  avatar: "/avatars/avatar-smile.png",
  avatarAlt: "Samuel Isah's profile photo",
  resume: "/files/samuel-isah-resume.pdf",
  email: "samuelisah234@gmail.com",
  website: "https://drealdumore.cv",
};

export const SOCIALS = {
  twitter: {
    label: "X (Twitter)",
    username: "drealdumore",
    url: "https://twitter.com/drealdumore",
  },
  github: {
    label: "GitHub",
    username: "drealdumore",
    url: "https://github.com/drealdumore",
  },
  linkedin: {
    label: "LinkedIn",
    username: "samuel-isah",
    url: "https://www.linkedin.com/in/samuel-isah",
  },
};

export type ContactLink = { label: string; value: string; href: string };

export const CONTACTS: ContactLink[] = [
  { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { label: "Github", value: SOCIALS.github.username, href: SOCIALS.github.url },
  { label: "LinkedIn", value: SOCIALS.linkedin.username, href: SOCIALS.linkedin.url },
  { label: "X", value: SOCIALS.twitter.username, href: SOCIALS.twitter.url },
];

export type RoleArea = { title: string; detail: string };

export const OPEN_TO_ROLES: RoleArea[] = [
  {
    title: "Software Engineering",
    detail: "Full-stack product work across frontend, backend, and APIs.",
  },
  {
    title: "Mobile Engineering",
    detail: "React Native and Expo: offline-first and real-time apps.",
  },
  {
    title: "Developer Tools",
    detail: "Utilities, tools, and platforms that help other developers ship faster.",
  },
];

export const OPEN_TO_ROLES_INTRO =
  "I’m open to software engineering roles across mobile, web, and backend.";

export type NavItem = { name: string; href: string; external?: boolean };

export const HEADER_LINKS: NavItem[] = [
  { name: "Work", href: "/projects" },
  { name: "Resume", href: PROFILE.resume, external: true },
];

export const MOBILE_TABS: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Resume", href: PROFILE.resume, external: true },
];

export const NAV = {
  resume: { label: "Resume", href: PROFILE.resume, external: true },
  contact: "Contact",
  letsTalk: "Let's talk",
};

export const HERO_CTAS = {
  primary: "View my work",
  resume: "Resume",
};

export type Track = {
  title: string;
  artist?: string;
  src: string;
};

export const MUSIC = {
  label: "Play the music",
  tracks: [
    {
      title: "Butterfly Effect",
      src: "/audio/butterfly-effect.mp3",
    },
    {
      title: "HUMBLE.",
      src: "/audio/humble.mp3",
    },
    {
      title: "Antidote",
      src: "/audio/antidote.mp3",
    },
    {
      title: "Antisocial",
      src: "/audio/antisocial.mp3",
    },
    {
      title: "Money Trees",
      src: "/audio/money-trees.mp3",
    },
    {
      title: "United In Grief",
      src: "/audio/united-in-grief.mp3",
    },
    {
      title: "One More Hour",
      src: "/audio/one-more-hour.mp3",
    },
    {
      title: "Pterodactyl",
      src: "/audio/pterodactyl.mp3",
    },
  ] as Track[],
};

export const SECTIONS = {
  about: { title: "About" },
  projects: { title: "Projects", viewAll: "See all projects" },
  experience: { title: "Experience" },
  skills: { title: "Skills" },
  roles: { title: "Open to roles" },
  sideProjects: { title: "Side Projects" },
  repos: {
    title: "Some of my code",
    subtitle: "A few projects you can explore on GitHub.",
    stayTuned: "More projects coming soon.",
  },
  performance: { title: "Performance" },
  contact: { title: "Contact" },
  projectsPage: {
    title: "Projects",
    subtitle:
      "A few web, mobile, and developer-tool projects I’ve been working on.",
    description:
      "Projects by Samuel Isah, including web apps, mobile apps, and developer tools built with React, Next.js, React Native, and TypeScript.",
  },
};

export const CASE_STUDY_LABELS = {
  year: "Year",
  challenge: "Challenge",
  action: "Action",
  result: "Result",
  notFound: "Project not found",
  overview: "Overview",
  gallery: "Gallery",
  stack: "Stack",
  platform: "Platform",
  link: "Link",
  visitSite: "Visit Site",
  viewCode: "View Code",
  previous: "Previous",
  next: "Next",
  onThisPage: "On this page",
};

export const CONTACT_FORM = {
  intro:
    "Have a role in mind or need help with a project? Send me a message.",
  namePlaceholder: "Your Name",
  emailPlaceholder: "Where can I reach you back?",
  messagePlaceholder: "What’s on your mind?",
  submit: "Send Message",
  sending: "Sending...",
  sent: "Message Sent!",
  error: "Failed to send message. Please try again.",
  service: "General Inquiry",
  organization: "",
};

export const NOT_FOUND = {
  heading: "404 — Lost in the code.",
  line1: "Well, this page doesn't exist.",
  line2:
    "Funny how the web keeps getting smaller, yet things still disappear. Pages, ideas, half-finished thoughts. Even HTML comments, where we used to leave notes for our future selves. Maybe some things are better left behind. This page, though? Probably just a broken link.",
};

export type Experience = {
  title: string;
  company: string;
  description: string[];
  duration: string;
  durationAlt: string;
  stack?: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    title: "Mobile Developer",
    company: "Campus Buddy",
    description: [
      "Build and maintain mobile app features with React Native and Expo.",
      "Work on app performance, offline support, and screen flows.",
      "Work with teammates and stakeholders to turn product requirements into working features.",
    ],
    duration: "January 2025 - 2026",
    durationAlt: "01 / 2025 until 2026",
    stack: ["React Native", "Expo", "TypeScript", "Zustand", "SQLite", "Motion", "AI"],
  },
  {
    title: "Front-End Developer",
    company: "NodePair",
    description: [
      "Build and improve user-facing features with React and Next.js.",
      "Create reusable components and help keep the interface responsive and consistent.",
    ],
    duration: "April 2024 - 2026",
    durationAlt: "04 / 2024 until 2026",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "AI"],
  },
  {
    title: "Full-Stack Developer",
    company: "Freelance",
    description: [
      "Build websites, online stores, mobile apps, and custom tools for clients.",
      "Work across the interface, APIs, database, and deployment, then make changes based on client feedback.",
    ],
    duration: "April 2021 - 2024",
    durationAlt: "04 / 2021 until 2024",
    stack: ["Angular", "Next.js", "React", "TypeScript", "JavaScript", "React Native", "Node.js", "MongoDB", "Drizzle ORM", "Express","PostgreSQL", "Firebase","Payment APIs", "AI", "Framer Motion", "Redis", "Redux"],
  },
];

export const EDUCATION = [
  {
    title: "Bachelor's Degree in Statistics",
    subTitle: "Ahmadu Bello University, Nigeria",
    date: "Present",
    description: "Studying statistics, including data analysis and quantitative methods.",
  },
  {
    title: "Diploma Degree in Computer Science",
    subTitle: "Petroleum Training Institute Nigeria",
    date: "2021",
    description: "Coursework in computer science and software development.",
  },
];

export type Repo = {
  name?: string;
  url?: string;
  desc?: string;
};

export const REPOS: Repo[] = [
  {
    name: "melo",
    url: "https://github.com/drealdumore/melo/",
    desc: "Private one-to-one chat for people who speak different languages. Messages are translated automatically before delivery with real-time indicators and device-based Melo IDs.",
  },
  {
    name: "thesupadevs",
    url: "https://github.com/drealdumore/thesupadevs/",
    desc: "Open-source curated library of 500+ developer tools, UI components, APIs, and resources with AI categorization, metadata scraping, and an admin dashboard.",
  },
  {
    name: "vaultx",
    url: "https://github.com/drealdumore/vaultx/",
    desc: "A lightweight REST API for sharing text, code snippets, and links across devices. Built with hybrid in-memory + Redis storage, rate limiting, expiry, and burn-after-reading.",
  },
  {
    name: "deps-janitor",
    url: "https://github.com/drealdumore/deps-janitor/",
    desc: "Interactive CLI and utility that finds and safely removes unused npm dependencies to keep JavaScript and Node.js projects clean and lightweight.",
  },
  {
    name: "falso-api",
    url: "https://github.com/drealdumore/falso-api/",
    desc: "TypeScript-powered mock data generator that produces realistic JSON data from user-defined interfaces. Ideal for seeding databases and testing APIs.",
  },
  {
    name: "auth-api",
    url: "https://github.com/drealdumore/auth-api/",
    desc: "A secure authentication API built with Node.js and Express, featuring JWT-based authentication, refresh token rotation, and role-based access control.",
  },
];

export type SkillCategory = { category: string; skills: string[] };

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Frontend & Mobile",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "React Native",
      "Expo",
      "Tailwind CSS",
    ],
  },
  {
    category: "Backend & APIs",
    skills: [
      "Node.js",
      "Express",
      "Supabase",
      "PostgreSQL",
      "Redis",
      "Prisma",
      "Drizzle",
      "GoLang",
      "MongoDB",
      "MySQL"
    ],
  },
  {
    category: "Other & Patterns",
    skills: [
      "Git",
    //   "Real-time systems",
    //   "Offline-first patterns",
    //   "AI tooling integration",
    //   "Performance & SEO optimization",
    ],
  }
];

export type FeaturedProject = {
  name: string;
  highlight?: string;
  highlightLabel?: string;
  image?: string;
  mobileScreens?: string[];
  href: string;
  descriptionBefore?: string;
  descriptionAfter?: string;
  tags?: string[];
  year?: string;
};

export type FeaturedGroup = { label: string; projects: FeaturedProject[] };

export const FEATURED_GROUPS: FeaturedGroup[] = [
  {
    label: "Products I've shipped",
    projects: [
      {
        name: "Melo",
        descriptionBefore:
          "A chat app for people who speak different languages: ",
        highlight: "translates messages before delivery",
        descriptionAfter:
          ". The original message is still available, and the chat includes typing indicators and presence.",
        mobileScreens: [
          "/projects/melo-onboarding.png",
          "/projects/melo-onboarding-language.png",
          "/projects/melo-connect.png",
          "/projects/melo-chat.png",
          "/projects/melo-id.png",
          "/projects/melo-profile-sheet-1.png",
        ],
        href: "/projects/melo",
        tags: ["React Native", "Expo", "Supabase Realtime", "AI"],
        year: "2026",
      },
      {
        name: "Chop Iron",
        descriptionBefore:
          "An offline workout tracker with a Nigerian voice: ",
        highlight: "logs 53 exercises and detects personal records",
        descriptionAfter:
          ". Workout history is stored locally in SQLite.",
        mobileScreens: [
          "/projects/chop-iron-splash-2.png",
          "/projects/chop-iron-index.png",
          "/projects/chop-iron-log.png",
          "/projects/chop-iron-progress.png",
          "/projects/chop-iron-achievement.png",
          "/projects/chop-iron-calender.png",
        ],
        href: "/projects/iron",
        tags: ["React Native", "SQLite", "Offline-first"],
        year: "2026",
      },
      {
        name: "The SupaDevs",
        descriptionBefore:
          "A searchable collection of developer tools, UI components, and APIs: ",
        highlight: "search, AI categorization, and metadata scraping",
        descriptionAfter:
          ", plus an admin dashboard for managing resources.",
        image: "/projects/thesupadevs.webp",
        href: "/projects/thesupadevs",
        tags: ["Next.js", "Supabase", "AI", "PostgreSQL"],
        year: "2025",
      },
      {
        name: "VaultX",
        descriptionBefore:
          "A REST API for sharing text, code snippets, and links between devices, ",
        highlight: "hybrid in-memory + Redis storage",
        descriptionAfter:
          " with password protection, view limits, and expiry settings.",
        href: "/projects/vaultx",
        tags: ["Node.js", "Redis", "REST API"],
        year: "2025",
      },
    ],
  },
  {
    label: "Client work",
    projects: [
      {
        name: "Crystalglowxquisite",
        descriptionBefore:
          "An online store for a skincare brand, with ",
        highlight: "a catalog, checkout, and analytics",
        descriptionAfter: ".",
        image: "/projects/crystalglowxquisite.png",
        href: "https://crystalglowxquisite.com/",
        tags: ["Next.js", "E-commerce", "Analytics"],
        year: "2026",
      },
      {
        name: "Knowledge Master",
        descriptionBefore:
          "An online bookstore for textbooks, novels, and ",
        highlight: "educational resources, plus school bookfair services",
        descriptionAfter: ", with nationwide delivery information.",
        image: "/projects/knowledgemaster.webp",
        href: "https://www.knowledgemaster.com.ng/",
        tags: ["Next.js", "E-commerce"],
        year: "2026",
      },
    ],
  },
];

export type SideProject = { name: string; href?: string };

export const SIDE_PROJECTS: SideProject[] = [
  {
    name: "Deps Janitor: Interactive CLI that finds and safely removes unused npm dependencies",
    href: "https://deps-janitor.vercel.app/",
  },
  {
    name: "Peekr: Responsive website snapshot & screenshot generator",
    href: "https://peekrr.vercel.app/",
  },
  {
    name: "MetaScraper: Extract title, description, OG image & metadata from any URL",
    href: "https://meta-scrapper.vercel.app/",
  },
  {
    name: "VaultX: Lightweight API for sharing text, code, and links across devices",
    href: "https://github.com/drealdumore/vaultx/",
  },
  {
    name: "Falso API: TypeScript mock data generator from interfaces",
    href: "https://github.com/drealdumore/falso-api/",
  },
  {
    name: "DropEnv: Encrypted environment-variable sharing tool",
    href: "https://github.com/drealdumore/dropenv/",
  },
  {
    name: "Split Cost: Real-time group cost splitter and percentage calculator",
    href: "https://percentage-calcc.vercel.app/",
  },
  { name: "Writing Pad: Minimal distraction-free writing space" },
  {
    name: "Olamide Tour: Concert tour landing page clone",
    href: "https://olamide-tour.vercel.app/",
  },
];
