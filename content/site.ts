export type projectType = {
  name: string;
  description: string | undefined | null;
  image?: string;
  href: string | undefined;
  tech?: string[];
};

export type ProjectStatus = "live" | "in-development" | "private" | "archived";

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
  status?: ProjectStatus;
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
  role?: string;
  type?: string;
  client?: string;
  status?: ProjectStatus;
  duration?: string;
  story?: string;
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
    projectName: "Echo",
    projectLink: "/projects/echo",
    projectDescription:
      "A reminder app that lets you set a place, then nudges you when you actually get there — useful for the errands you keep forgetting on the way home.",
    highlight: "reminders that fire where you are",
    projectType: "Personal project (Mobile app)",
    projectDate: "2025-11-01",
    image: "/projects/echo-square.png",
    technologies: [
      "TypeScript",
      "React Native",
      "Expo",
      "expo-location",
      "expo-task-manager",
      "expo-router",
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
  }
];

export const MOBILE_APPS: CaseStudy[] = [
  // 1. Melo
  {
    id: "melo",
    title: "Melo",
    sub: "Melo",
    oneLiner: "Private text chat with automatic language translation",
    role: "Product design, mobile & backend engineering",
    type: "Mobile app",
    client: "Personal project",
    story:
      "A friend and I would text in different languages. They wrote in Igbo, I wrote in English, and understanding each other meant dealing with the language barrier one message at a time. I wanted to make that feel less like work. Melo puts translation inside the conversation, so both people can chat in their preferred language and reveal the original message whenever they want.",
    year: 2026,
    builtBy: "Samuel Isah",
    website: "https://github.com/drealdumore/melo",
    heroImage: "/projects/melo-splash.png",
    intro:
      "Melo is a two-person messaging app that translates text between people who speak different languages. Each person reads messages in their preferred language and can tap to see the original text.",
    introText:
      "Instead of copying messages into a separate translation app, people can communicate inside one chat. The goal is to make translation feel like part of messaging rather than an extra step.",
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
      "The challenge was keeping conversations responsive while translation requests ran asynchronously. I also had to account for failed requests, API quotas, and connecting two people without requiring a traditional account.",
    actions: [
      {
        title: "Identity without traditional accounts",
        text: "Each device gets a UUID and a readable Melo ID, stored in AsyncStorage and synced to Supabase. I derive the conversation room ID from both participant IDs so the same pair resolves to the same room.",
      },
      {
        title: "Responsive messaging and translation",
        text: "I implemented optimistic message updates so the sender does not have to wait for the full request cycle. Translation state, retries, Supabase Realtime updates, request coalescing, in-memory caching, and echo detection help handle asynchronous processing and repeated requests.",
      },
      {
        title: "Realtime chat across 11 languages",
        text: "I used Expo Router and Supabase Realtime for the chat experience, including typing indicators, presence, and read receipts. Melo supports 11 languages, including English, Spanish, French, Arabic, Swahili, Yoruba, and Korean.",
      },
    ],
    result:
      "Melo brought messaging, translation, and realtime updates into one mobile experience. Building it helped me work through asynchronous UI states, message synchronization, and the practical limits of external translation APIs.",
    stats: [
      { value: "11", label: "languages supported" },
      { value: "Realtime", label: "chat presence and message updates" },
      { value: "No accounts", label: "device-ID-based identity" },
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
    title: "The SupaDevs",
    sub: "The SupaDevs",
    oneLiner: "A searchable library of developer resources",
    role: "Full-stack development, AI integration",
    type: "Web app",
    client: "Personal project",
    story:
      "I kept finding useful developer resources and then losing them in bookmarks, chats, and browser tabs. The SupaDevs started as my attempt to put those resources in one searchable place. I also wanted to make contributing easier, so I explored using AI to categorize submissions instead of making every contributor organize everything manually.",
    year: 2025,
    builtBy: "Samuel Isah",
    website: "https://thesupadevs.vercel.app",
    heroImage: "/projects/thesupadevs.webp",
    intro:
      "The SupaDevs is a searchable library of developer tools, UI components, APIs, tutorials, and other resources.",
    introText:
      "The platform combines resource discovery with metadata extraction and AI-assisted categorization, helping submissions become easier to browse and manage.",
    gallery: [
      {
        src: "/projects/thesupadevs.webp",
        alt: "The SupaDevs Platform",
      },
    ],
    challenge:
      "Resources come from different websites, each with its own metadata conventions. The challenge was extracting useful information consistently, organizing submissions, and giving administrators a practical way to review them.",
    actions: [
      {
        title: "Metadata extraction and fallbacks",
        text: "I built a scraper that checks Open Graph metadata first, then Twitter card data, page images, and finally the favicon. Caching, retries, and rate-limit handling help manage requests to third-party sites.",
      },
      {
        title: "AI-assisted categorization",
        text: "I integrated Groq with Llama 3.1 8B to categorize batches of submitted resources and suggest tags. The workflow also produces confidence scores to help identify classifications that may need review.",
      },
      {
        title: "Search, caching, and admin tools",
        text: "I built the site with Next.js and ISR, using five-minute revalidation for the configured pages. Admin tools support bulk approval, link checks, and resource categorization.",
      },
    ],
    result:
      "The SupaDevs combines resource discovery with automated metadata extraction and AI-assisted organization. It gave me practical experience with caching, web scraping, and integrating language models into an existing workflow.",
    stats: [
      { value: "200+", label: "resources listed" },
      { value: "5 min", label: "configured ISR revalidation" },
      { value: "AI", label: "resource categorization" },
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
    title: "VaultX",
    sub: "VaultX",
    oneLiner: "A temporary sharing API for text, code, and links",
    role: "Backend engineering, API design, documentation",
    type: "Backend / API",
    client: "Personal project",
    story:
      "Sometimes I just need to move a code snippet from my laptop to my phone. I didn't want to create an account or leave temporary information sitting around indefinitely, so I built VaultX. Expiry times, view limits, and optional passwords are part of the design rather than features added as an afterthought.",
    year: 2025,
    builtBy: "Samuel Isah",
    website: "https://github.com/drealdumore/vaultx",
    intro:
      "VaultX is a REST API for sharing text, code snippets, and links between devices without creating an account.",
    introText:
      "Shared items can have expiration times, view limits, and optional password protection. The API is designed around temporary access rather than permanent storage.",
    gallery: [],
    challenge:
      "The main challenge was managing temporary data across in-memory storage and Redis while accounting for Redis outages, server restarts, and the different guarantees each storage layer provides.",
    actions: [
      {
        title: "Hybrid in-memory and Redis storage",
        text: "I implemented reads that check in-memory storage before falling back to Redis. The fallback allows the API to continue operating when Redis is unavailable, with the explicit trade-off that memory-only data may be lost on restart.",
      },
      {
        title: "Validation and access controls",
        text: "I added Helmet security headers, bcrypt password hashing, Zod input validation, a 100 KB content limit, CORS configuration, and cleanup for expired items.",
      },
      {
        title: "Predictable API behaviour",
        text: "I standardized JSON error responses, added health-check endpoints and access tracking, and used Node.js crypto utilities to generate tokens.",
      },
    ],
    result:
      "VaultX gave me hands-on experience with API design, temporary data lifecycles, validation, and storage failure trade-offs. It also helped me think more carefully about the difference between adding security features and guaranteeing security.",
    stats: [
      { value: "0", label: "accounts required" },
      { value: "100 KB", label: "maximum clip payload" },
      { value: "Redis + memory", label: "hybrid storage strategy" },
    ],
    technologies: [
      "Node.js",
      "Express",
      "TypeScript",
      "Redis (Upstash)",
      "Helmet",
      "Zod",
      "Node.js crypto",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/drealdumore/vaultx" },
    ],
  },

  // 4. Chop Iron
  {
    id: "iron",
    title: "Chop Iron",
    sub: "Chop Iron",
    oneLiner: "An offline-first workout tracker with a Nigerian voice",
    year: 2026,
    builtBy: "Samuel Isah",
    role: "Mobile engineering",
    type: "Mobile app",
    client: "Personal project",
    story:
      "I train, forget my numbers, and sometimes struggle to stay consistent. I wanted a tracker that made logging workouts feel simple instead of turning the gym into another admin task. Chop Iron grew from that idea, with a bit of Nigerian personality thrown in because fitness apps don't all have to sound the same.",
    heroImage: "/projects/chop-iron-splash.png",
    intro:
      "Chop Iron is a workout tracker with a Nigerian voice. It includes 53 exercises, workout history, personal records, progress charts, and achievement tracking, with workout data stored locally.",
    introText:
      "The guiding question was simple: does this make it easier to record a set and understand my progress? That shaped the offline-first architecture, compact workout flows, and copy built around the phrase, 'No dull. Go chop iron.'",
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
      "Workout history has to stay consistent as records change. Streaks depend on distinct training days, personal records depend on previous sets, and achievements may need to be recalculated when a workout is edited or deleted.",
    actions: [
      {
        title: "Local-first SQLite architecture",
        text: "I used React Native, Expo, Zustand, and SQLite to store workout data locally. The database is organized across 12 tables, allowing workout logging and history access without requiring a network connection.",
      },
      {
        title: "Workout calculations and progress",
        text: "I implemented calculations for estimated one-rep max using the Epley formula, training volume, rep records, workout streaks, and achievement thresholds.",
      },
      {
        title: "Motion and product personality",
        text: "I used Reanimated for interactive bottom sheets and gestures, then carried the product's Nigerian/Pidgin voice through a dark interface designed around quick workout logging.",
      },
    ],
    result:
      "Chop Iron brings workout logging, history, and progress tracking into a local-first mobile app. It helped me work through local data consistency, derived calculations, and interaction design without making connectivity a requirement for everyday use.",
    stats: [
      { value: "53", label: "built-in exercises" },
      { value: "12", label: "SQLite tables" },
      { value: "4", label: "personal-record categories" },
      { value: "Offline-first", label: "local workout storage" },
    ],
    technologies: [
      "React Native",
      "Expo SDK",
      "TypeScript",
      "SQLite",
      "Zustand",
      "Reanimated",
      "Expo Router",
    ],
    links: [],
  },

  // 5. Crystal Glow Xquisite
  {
    id: "crystalglowxquisite",
    title: "Crystal Glow Xquisite",
    sub: "Crystalglowxquisite",
    oneLiner: "An online storefront for a skincare brand",
    role: "Frontend, checkout, store integrations",
    type: "E-commerce",
    client: "Crystal Glow Xquisite",
    year: 2026,
    builtBy: "Samuel Isah",
    website: "https://crystalglowxquisite.com/",
    heroImage: "/projects/crystalglowxquisite.png",
    story:
      "Crystal Glow Xquisite is a skincare brand I helped bring online with a custom storefront. The focus was giving customers a straightforward way to browse products, understand what was available, and move through the shopping experience on both mobile and desktop.",
    intro:
      "A custom online store for a skincare brand, featuring a product catalog, product galleries, cart interactions, checkout, and analytics.",
    introText:
      "I built the storefront around the brand's catalog and shopping flow, with responsive layouts and integrations to support the store's day-to-day operation.",
    gallery: [
      {
        src: "/projects/crystalglowxquisite.png",
        alt: "Crystal Glow Xquisite Storefront",
      },
    ],
    challenge:
      "The main challenge was keeping the catalog and cart usable across screen sizes while connecting the shopping flow to checkout and supporting services.",
    actions: [
      {
        title: "Catalog and shopping experience",
        text: "I built product filtering, responsive product galleries, cart state management, and the checkout flow using Next.js, React, and TypeScript.",
      },
      {
        title: "Data and analytics integrations",
        text: "I integrated Neon PostgreSQL for application data and PostHog for analytics, then deployed the storefront on Vercel.",
      },
    ],
    result:
      "The delivered storefront gives the brand an online destination where customers can browse its products and proceed through the shopping flow. The work covered both the customer-facing interface and supporting integrations.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React",
      "PostHog",
      "Neon PostgreSQL",
      "Vercel",
    ],
    links: [
      { label: "Live Store", url: "https://crystalglowxquisite.com/" },
    ],
  },

  // 6. KnowledgeMaster
  {
    id: "knowledgemaster",
    title: "KnowledgeMaster",
    sub: "Knowledge Master",
    oneLiner: "An online bookstore and learning-resource platform",
    role: "Frontend, backend, payments",
    type: "E-commerce",
    client: "KnowledgeMaster",
    year: 2026,
    builtBy: "Samuel Isah",
    website: "https://www.knowledgemaster.com.ng/",
    heroImage: "/projects/knowledgemaster.webp",
    story:
      "A bookstore has more to offer than a list of books. Customers also need to find the right resources and understand how delivery and school bookfairs work. I worked on KnowledgeMaster's online presence to bring its catalog and service information together in a place customers could browse without visiting a physical store first.",
    intro:
      "KnowledgeMaster is an online bookstore for textbooks, novels, and learning resources, with information about delivery and school bookfair services.",
    introText:
      "The site organizes the bookstore's offerings and makes important information about its services easier to find, especially when browsing on mobile.",
    gallery: [
      {
        src: "/projects/knowledgemaster.webp",
        alt: "KnowledgeMaster Bookstore",
      },
    ],
    challenge:
      "The challenge was organizing different kinds of books and making catalog navigation, delivery information, and school bookfair details accessible without overwhelming the interface.",
    actions: [
      {
        title: "Catalog organization and discovery",
        text: "I organized book categories and built browsing and search experiences, alongside pages explaining the bookstore's school bookfair service.",
      },
      {
        title: "Modern web platform",
        text: "I built the platform using Next.js, TypeScript, and Tailwind CSS, with Neon for data storage and PostHog for analytics. AI-related product recommendation functionality is also part of the project.",
      },
    ],
    result:
      "The website gives customers a central place to explore books, find service information, and learn about school bookfairs. It demonstrates my experience building a content-rich business website around real customer needs.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React",
      "Neon PostgreSQL",
      "PostHog",
      "AI integration",
    ],
    links: [
      {
        label: "Live Website",
        url: "https://www.knowledgemaster.com.ng/",
      },
    ],
  },

  // 7. DropEnv
  {
    id: "dropenv",
    title: "DropEnv",
    sub: "DropEnv",
    oneLiner: "Client-side encrypted sharing for environment variables",
    role: "Design, encryption",
    type: "Developer tool",
    client: "Personal project",
    duration: "Two weeks",
    story:
      "Sharing a .env file with a teammate sounds harmless until you remember what those files contain. DropEnv was my attempt to make that exchange less risky: encrypt the contents in the browser, keep the decryption key in the URL fragment, and give shared data a limited lifetime. Building it pushed me to learn the Web Crypto API beyond simply following an example.",
    year: 2025,
    builtBy: "Samuel Isah",
    website: "https://github.com/drealdumore/dropenv",
    heroImage: "/projects/dropenv.png",
    intro:
      "DropEnv is a developer tool for sharing environment variables through temporary links, with encryption performed in the browser.",
    introText:
      "Instead of sending configuration values as plain text in a chat, the tool encrypts the contents client-side before sharing them. The design keeps the decryption key in the URL fragment rather than the normal HTTP request.",
    gallery: [],
    challenge:
      "The core challenge was handling encryption and decryption in the browser while managing temporary links, expiration, and view limits. Security also required understanding exactly which parts of the data and key each component could access.",
    actions: [
      {
        title: "Browser-side AES-GCM encryption",
        text: "I used the Web Crypto API with AES-GCM to encrypt shared content in the browser. The decryption key is stored in the URL fragment, which is not included in the HTTP request sent to the server.",
      },
      {
        title: "Temporary access and expiry",
        text: "I implemented link expiration and view limits to control how long shared content remains available. These controls reduce the lifetime of a share but do not replace secure handling of the link itself.",
      },
    ],
    result:
      "DropEnv gave me practical experience with browser cryptography, temporary resource lifecycles, and the security trade-offs involved in sharing sensitive configuration data.",
    technologies: [
      "TypeScript",
      "Next.js",
      "Node.js",
      "Web Crypto API",
      "AES-GCM",
      "Tailwind CSS",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/drealdumore/dropenv" },
    ],
  },

  // 8. SAGE
  {
    id: "sage",
    title: "Sage",
    sub: "SAGE",
    oneLiner: "An AI coach for thinking through difficult conversations",
    year: 2026,
    builtBy: "Samuel Isah",
    role: "AI integration, mobile engineering",
    type: "Mobile app",
    client: "Personal project",
    duration: "Ongoing",
    story:
      "Sometimes the hardest part of a difficult conversation is working out what to say before you say it. I built SAGE as a place to think through those situations, using ideas from The 48 Laws of Power to explore different approaches. The product is still evolving, especially the part that matters most to me: making an AI conversation feel natural rather than like filling out a form.",
    heroImage: "/projects/sage-splash.png",
    intro:
      "SAGE is an AI coach for difficult conversations. Describe a situation and explore its dynamics, then generate possible responses in different tones informed by ideas from The 48 Laws of Power.",
    introText:
      "Rather than producing a single reply without context, SAGE aims to help users consider the situation and compare different ways of approaching a conversation.",
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
      "The main challenge was getting consistent, structured responses from AI services while handling rate limits, malformed output, and voice transcription failures without breaking the conversation flow.",
    actions: [
      {
        title: "API key rotation and quota recovery",
        text: "I built an eight-key rotation system that tracks exhausted keys and temporarily locks out keys that hit their quota. This gives the app a way to try another available key when a request is rate-limited.",
      },
      {
        title: "Voice input and response validation",
        text: "Voice input can use Gemini or Groq Whisper, with a fallback path. I also validate structured AI responses with Zod and handle output that does not match the expected schema.",
      },
      {
        title: "Custom mobile interactions",
        text: "I built the mobile interface with Reanimated and Gesture Handler, adding motion and haptic feedback to key interactions.",
      },
    ],
    result:
      "SAGE has helped me work through practical AI integration problems, including quota handling, structured response validation, and alternative paths for voice transcription. The product remains in development as I refine the conversation experience.",
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "Gemini API",
      "Groq Whisper",
      "Zod",
      "Reanimated",
      "Gesture Handler",
    ],
    links: [],
  },

  // 9. GPZ
  {
    id: "gpz",
    title: "GPZ",
    sub: "GPZ",
    oneLiner: "A GPA tracker and academic planning tool",
    year: 2025,
    builtBy: "Samuel Isah",
    role: "Mobile engineering, data modelling",
    type: "Mobile app",
    client: "Personal project",
    story:
      "Every semester, I found myself rebuilding the same spreadsheet to keep track of courses, grades, and academic targets. GPZ started as a way to stop doing that manually. It brings those calculations into one place and helps me see how future grades could affect my overall GPA.",
    heroImage: "/projects/gpz-splash.png",
    intro:
      "GPZ is a student-focused GPA tracker for managing semesters, courses, grades, and target academic results.",
    introText:
      "The app helps students organize their academic records and explore what grades they may need in future courses or semesters to reach a target GPA.",
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
      "Academic projections need to account for credit units, grading scales, completed courses, and future results. The challenge was to make those calculations useful without making course entry complicated.",
    actions: [
      {
        title: "Academic target calculations",
        text: "I implemented calculations to estimate the grades and credit requirements needed to reach a target GPA in future semesters.",
      },
      {
        title: "Local-first mobile architecture",
        text: "I built the app with Expo and TypeScript, using AsyncStorage for local persistence and React Query for data caching.",
      },
    ],
    result:
      "GPZ brings academic records and target-GPA planning into one mobile experience. It also gave me a practical way to work through data modelling and the calculation logic behind academic projections.",
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "AsyncStorage",
      "React Query",
    ],
    links: [],
  },

  // 10. ECHO
  {
    id: "echo",
    title: "Echo",
    sub: "ECHO",
    oneLiner: "Location-based reminders that trigger when you arrive",
    year: 2025,
    builtBy: "Samuel Isah",
    role: "Mobile engineering, background location",
    type: "Mobile app",
    client: "Personal project",
    story:
      "Some things are easy to remember at home and somehow disappear from your head when you get somewhere. I wanted a reminder app that worked around places instead of relying only on a clock. With Echo, you choose a location, attach a reminder, and let the phone handle the nudge when you arrive.",
    heroImage: "/projects/echo-hero.png",
    intro:
      "Echo is a location-based reminder app for tasks tied to a particular place. Choose a location and a radius, then configure a reminder to trigger when the device enters that area.",
    introText:
      "A reminder to buy something at a shop or complete a task on campus is more useful when it appears at the right place. Echo explores how geofencing and local notifications can support that experience without requiring a cloud account.",
    gallery: [
      { src: "/projects/echo-hero.png", alt: "Echo Map View" },
      { src: "/projects/echo-square.png", alt: "Echo Reminder List" },
    ],
    challenge:
      "Background location behaviour varies across mobile operating systems. Battery restrictions, permissions, region limits, and background execution rules all affect when a location-triggered reminder can be delivered.",
    actions: [
      {
        title: "Background location tasks and geofencing",
        text: "I used expo-task-manager and location-region monitoring to handle background location events and trigger local notifications when supported operating-system conditions are met.",
      },
      {
        title: "More efficient location lookup",
        text: "I added caching and debouncing around forward and reverse geocoding to avoid unnecessary repeated requests when searching for and selecting places.",
      },
    ],
    result:
      "Echo explores the engineering behind place-aware reminders, from background tasks to local notifications. It helped me understand the practical constraints of mobile location services and the importance of designing around them.",
    technologies: [
      "React Native",
      "Expo",
      "expo-location",
      "expo-task-manager",
      "TypeScript",
    ],
    links: [],
  },
];

export const WEB_TOOLS = [
  {
    projectName: "Deps Janitor",
    projectLink: "https://deps-janitor.vercel.app/",
    image: "/projects/deps-janitor.webp",
    projectDescription:
      "Find unused npm dependencies and clean up your project with an interactive CLI and web interface.",
    projectType: "CLI & Web Tool",
    projectDate: "2025-12-28",
    technologies: ["Node.js", "Next.js", "Tailwind CSS", "TypeScript"],
  },
  {
    projectName: "Peekr",
    projectLink: "https://peekrr.vercel.app/",
    image: "/projects/peekrr.webp",
    projectDescription:
      "Preview how a website looks across different viewport sizes with a responsive screenshot tool.",
    projectType: "Developer Utility",
    projectDate: "2025-12-15",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
  },
  {
    projectName: "MetaScraper",
    projectLink: "https://meta-scrapper.vercel.app/",
    image: "/projects/meta-scrapper.webp",
    projectDescription:
      "Pull page titles, descriptions, Open Graph images, and other metadata from a URL.",
    projectType: "Web Utility",
    projectDate: "2025-11-20",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript", "Lucide React"],
  },
  {
    projectName: "VaultX",
    projectLink: "https://github.com/drealdumore/vaultx/",
    projectDescription:
      "A REST API for temporary text, code, and link sharing, with expiry, view limits, and optional password protection.",
    projectType: "REST API",
    projectDate: "2025-12-01",
    technologies: ["TypeScript", "Node.js", "Express", "Redis"],
  },
  {
    projectName: "Falso API",
    projectLink: "https://github.com/drealdumore/falso-api/",
    projectDescription:
      "Generate mock JSON data from TypeScript interfaces for testing APIs and seeding databases.",
    projectType: "Developer Tool",
    projectDate: "2025-03-01",
    technologies: ["TypeScript", "Node.js"],
  },
  {
    projectName: "DropEnv",
    projectLink: "https://github.com/drealdumore/dropenv/",
    projectDescription:
      "Share environment variables in encrypted form between teammates or devices without pasting secrets into chats.",
    projectType: "Security Utility",
    projectDate: "2025-08-01",
    technologies: ["TypeScript", "Next.js", "Web Crypto API"],
  },
];

export const META = {
  title: "Samuel Isah — Software Engineer",
  name: "Samuel Isah",
  description:
    "I'm Samuel Isah, a software engineer from Nigeria building web apps, mobile products, and backend systems with TypeScript, React, Next.js, and Node.js.",
  og: "Web apps, mobile products, and backend systems built to solve real problems.",
  keywords: [
    "Samuel Isah",
    "drealdumore",
    "Software Engineer",
    "Full-Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "React Native Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Web Applications",
    "Mobile App Development",
    "Backend Development",
    "Full-Stack Portfolio",
    "Cross-platform Development",
  ],
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "https://drealdumore.cv",
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
  availability: "Open to work",
  tagline:
    "I build web and mobile products, work on backend systems, and turn ideas into things people can actually use.",
  about: [
    "I'm Samuel. I build things for the web and phones, usually in TypeScript, usually because there's a problem I want to solve.",
    "I'm drawn to the parts people don't always see: making an app work without a reliable connection, figuring out why a request takes four seconds instead of forty milliseconds, or making a screen feel faster without adding more to it. That's where a lot of the real work happens.",
    "I've built Melo, a chat app that translates messages between people who speak different languages; Chop Iron, an offline-first workout tracker; DropEnv, an encrypted environment-variable sharing tool; and VaultX, an API for sharing temporary snippets between devices. Most started with a problem I wanted to solve for myself.",
    "I'm open to software engineering opportunities where I can keep learning, work with good engineers, and ship useful products. If you'd like to work together, my email is at the bottom of the page.",
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

export const FOOTER_LINKS: NavItem[] = [
  { name: "Work", href: "/projects" },
];

export const MOBILE_TABS: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/projects" },
  { name: "Résumé", href: PROFILE.resume, external: true },
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

export const GREETINGS = {
  morning: "Good morning, I'm Samuel.",
  afternoon: "Good afternoon, I'm Samuel.",
  evening: "Good evening, I'm Samuel.",
  night: "Hey, I'm Samuel.",
} as const;

export type Track = {
  title: string;
  artist?: string;
  src: string;
};

export const MUSIC = {
  label: "Play the music",
  tracks: [
    {
      title: "Mentally",
      src: "/audio/asake-mentally.mp3",
    },
    {
      title: "Billionaire Club",
      src: "/audio/billionaire-club.mp3",
    },
    {
      title: "Authentic",
      src: "/audio/gunna-authentic.mp3",
    },
    {
      title: "Skybox",
      src: "/audio/gunna-skybox.mp3",
    },
    {
      title: "Heavy Frown",
      src: "/audio/gunna-heavy-frown.mp3",
    },
    {
      title: "Yosemite",
      src: "/audio/yosemite.mp3",
    },
    {
      title: "Money Right",
      src: "/audio/money-right.mp3",
    },
    {
      title: "High Noon",
      src: "/audio/high-noon.mp3",
    },
    {
      title: "Bandana",
      src: "/audio/fireboy-bandana.mp3",
    },
    {
      title: "Monalisa (Remix)",
      src: "/audio/lojay-monalisa.mp3",
    },
    {
      title: "Nonstop",
      src: "/audio/drake-nonstop.mp3",
    },
    {
      title: "City Boys",
      src: "/audio/burna-boy-city-boys.mp3",
    },
    {
      title: "I'm Upset",
      src: "/audio/im-upset.mp3",
    },
    {
      title: "Hate It Or Love It",
      src: "/audio/hate-it-or-love-it.mp3",
    },
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
  education: { title: "Education" },
  skills: { title: "Skills" },
  roles: { title: "Open to roles" },
  sideProjects: { title: "Side projects" },
  
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
      "Web apps, mobile products, and small tools built to solve real problems.",
    description:
      "Explore Samuel Isah's software projects, from React and Next.js applications to React Native apps, backend APIs, and developer utilities.",
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
  type: "Type",
  client: "Client",
  role: "My role",
  why: "Why I built it",
  live: "Live",
  inDevelopment: "In development",
  notReleased: "Not released yet",
  private: "Private",
  archived: "Archived",
  notAvailable: "Not available yet",
  notAvailableHint:
    "This one is still in the workshop..",
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
      "Develop mobile app features with React Native, Expo, and TypeScript.",
      "Work on app performance, offline data handling, and navigation flows.",
      "Collaborate with teammates to turn product requirements into working features.",
    ],
    duration: "January 2025 - 2026",
    durationAlt: "01 / 2025 until 2026",
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Zustand",
      "SQLite",
    ],
  },
  {
    title: "Front-End Developer",
    company: "NodePair",
    description: [
      "Develop user-facing features with React and Next.js.",
      "Build reusable components and improve responsive layouts and interface consistency.",
    ],
    duration: "April 2024 - 2026",
    durationAlt: "04 / 2024 until 2026",
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    title: "Full-Stack Developer",
    company: "Freelance",
    description: [
      "Build websites, online stores, mobile apps, and custom tools for clients.",
      "Work across frontend interfaces, APIs, databases, and deployment, then iterate based on client feedback.",
    ],
     duration: "April 2021 - 2024",
    durationAlt: "04 / 2021 until 2024",
    stack: [
      "Angular",
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "React Native",
      "Node.js",
      "MongoDB",
      "Drizzle ORM",
      "Express",
      "PostgreSQL",
      "Firebase",
      "Payment APIs",
      "Framer Motion",
      "Redis",
      "Redux",
    ],
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
    desc: "A private one-to-one chat app that translates text messages between people who speak different languages, with device-based Melo IDs and realtime chat updates.",
  },
  {
    name: "thesupadevs",
    url: "https://github.com/drealdumore/thesupadevs/",
    desc: "A searchable library of developer tools, UI components, APIs, and resources, with metadata extraction, AI-assisted categorization, and admin tools.",
  },
  {
    name: "vaultx",
    url: "https://github.com/drealdumore/vaultx/",
    desc: "A REST API for temporary text, code, and link sharing, with expiry, view limits, optional password protection, and Redis-backed storage.",
  },
  {
    name: "deps-janitor",
    url: "https://github.com/drealdumore/deps-janitor/",
    desc: "A CLI and web utility for finding unused npm dependencies and helping developers clean up their projects.",
  },
  {
    name: "falso-api",
    url: "https://github.com/drealdumore/falso-api/",
    desc: "A TypeScript mock-data generator for creating JSON fixtures from interfaces, useful for testing and database seeding.",
  },
  {
    name: "auth-api",
    url: "https://github.com/drealdumore/auth-api/",
    desc: "A Node.js and Express authentication API with JWT authentication, refresh-token rotation, and role-based access control.",
  },
];


export type SkillCategory = { category: string; skills: string[] };

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Frontend & Mobile",
    skills: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "React Native",
      "Expo",
      "Angular",
      "Tailwind CSS",
    ],
  },
  {
    category: "Backend & APIs",
    skills: [
      "Node.js",
      "Express",
      "Go",
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Supabase",
      "Redis",
      "Prisma",
      "Drizzle ORM",
    ],
  },
  {
    category: "Tools & Practices",
    skills: ["Git", "GitHub", "Vercel", "Docker", "CI/CD", "Testing", "Debugging"],
  },
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
  status?: ProjectStatus;
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
        highlight: "messages are translated automatically",
        descriptionAfter:
          ". People can still view the original text, with typing indicators and presence in the chat.",
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
          "A workout tracker with a Nigerian voice: ",
        highlight: "53 exercises, workout history, and personal records",
        descriptionAfter:
          ". Your workout data stays on your device, so you can log sessions offline.",
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
          "A searchable library of developer resources: ",
        highlight: "metadata extraction and AI-assisted categorization",
        descriptionAfter:
          ", with admin tools for reviewing and managing submissions.",
        image: "/projects/thesupadevs.webp",
        href: "/projects/thesupadevs",
        tags: ["Next.js", "Supabase", "AI", "PostgreSQL"],
        year: "2025",
      },
      {
        name: "VaultX",
        descriptionBefore:
          "A REST API for temporary text, code, and link sharing, with ",
        highlight: "expiry, view limits, and optional password protection",
        descriptionAfter:
          " Built with a hybrid Redis and in-memory storage strategy.",
        href: "/projects/vaultx",
        tags: ["Node.js", "Redis", "REST API"],
        year: "2025",
      },
      {
        name: "Echo",
        descriptionBefore:
          "A reminder app tied to places instead of times: ",
        highlight: "get reminded when you arrive",
        descriptionAfter:
          ". Designed around location-based reminders and local notifications.",
        image: "/projects/echo-square.png",
        href: "/projects/echo",
        tags: ["React Native", "expo-location", "Notifications"],
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
          "A skincare brand's online store, with ",
        highlight: "product browsing, cart, checkout and analytics",
        descriptionAfter: ", alongside analytics integrations.",
        image: "/projects/crystalglowxquisite.png",
        href: "https://crystalglowxquisite.com/",
        tags: ["Next.js", "E-commerce", "Analytics"],
        year: "2026",
      },
      {
        name: "Knowledge Master",
        descriptionBefore:
          "An online bookstore for textbooks, novels, and ",
        highlight: "educational resources, and school bookfair services",
        descriptionAfter: ", with delivery information available on the site.",
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
    name: "Deps Janitor — Find and remove unused npm dependencies",
    href: "https://deps-janitor.vercel.app/",
  },
  {
    name: "Peekr — Preview websites across viewport sizes",
    href: "https://peekrr.vercel.app/",
  },
  {
    name: "MetaScraper — Extract webpage metadata from a URL",
    href: "https://meta-scrapper.vercel.app/",
  },
  {
    name: "VaultX — Temporary text, code, and link sharing API",
    href: "https://github.com/drealdumore/vaultx/",
  },
  {
    name: "Falso API — Generate mock JSON from TypeScript interfaces",
    href: "https://github.com/drealdumore/falso-api/",
  },
  {
    name: "DropEnv — Encrypted environment-variable sharing",
    href: "https://github.com/drealdumore/dropenv/",
  },
  {
    name: "Split Cost — Group expense and percentage calculator",
    href: "https://percentage-calcc.vercel.app/",
  },
  {
    name: "Olamide Tour — Concert tour landing page",
    href: "https://olamide-tour.vercel.app/",
  },
];
