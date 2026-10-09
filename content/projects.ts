type projectType = {
  name: string | any;
  description: string | undefined | null;
  image: string | any;
  href: string | undefined;
  tech?: string[];
};

interface ProjectCardProps {
  projectName: string | undefined | null;
  image?: string;
  mobileScreens?: string[];
  projectLink: string | any;
  projectDescription: string | undefined | null;
  projectType: string | undefined | null;
  projectDate: string | any;
  technologies: string[];
}

export const ALLPROJECTS: ProjectCardProps[] = [
  {
    projectName: "Melo",
    projectLink: "/projects/melo",
    projectDescription:
      "A private, two-person chat that translates every message before delivery. You write in your language, they read in theirs — one room, two languages, no copy-pasting.",
    projectType: "Personal project (Mobile app)",
    projectDate: "2026-01-01",
    technologies: [
      "TypeScript",
      "React Native",
      "Expo",
      "Supabase",
      "expo-router",
    ],
    mobileScreens: [
      "/projects/melo-onboarding.png",
      "/projects/melo-profile-sheet-1.png",
      "/projects/melo-chat.png",
    ],
  },
  {
    projectName: "Crystalglowxquisite: Skincare Boutique",
    projectLink: "https://crystalglowxquisite.com/",
    image: "/projects/crystalglowxquisite.png",
    projectDescription: "Premium skincare boutique website.",
    projectType: "E-commerce ",
    projectDate: "2026-01-20",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React",
      "Vercel Deployment",
      "Posthog",
      "Neon",
      "Python",
    ],
  },
  {
    projectName: "Knowledge Master",
    projectLink: "https://www.knowledgemaster.com.ng/",
    image: "/projects/knowledgemaster.webp",
    projectDescription:
      "An e-commerce website for a bookstore, featuring textbooks, novels, educational resources, product listings, book categories, and school bookfair services, with nationwide delivery information.",
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
      "Python",
      "AI-integration",
    ],
  },

  {
    projectName: "The SupaDevs: Developer Library",
    projectLink: "https://thesupadevs.vercel.app/",
    image: "/projects/thesupadevs.webp",
    projectDescription:
      "A curated web library of developer tools, UI components, APIs, and resources designed to help developers find quality assets quickly without searching all over the web. It serves as a central ‘shelf’ for useful dev resources and encourages community contributions.",
    projectType: "Web Platform / Tools Library",
    projectDate: "2025-12-11",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React",
      "Vercel Deployment",
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
    projectName: "Olamide Tours Website (clone)",
    projectLink: "https://olamide-tour.vercel.app/",
    image: "/projects/celeb-tour.png",
    projectDescription:
      "Experience Olamide live in Toronto! Get tickets for the electrifying concert tour featuring Nigeria's biggest Afrobeats star at Rebel and Queen Elizabeth Theatre.",
    projectType: "Personal project",
    projectDate: "2025-10-01",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  },

  // {
  //   projectName: "Echo",
  //   projectLink: "/projects/echo",
  //   projectDescription:
  //     "minimalist, offline-first reminder app that triggers based on where you are, not just when. With geofencing and a clean UI, it helps you remember things exactly when you arrive at the right place.",
  //   projectType: "Personal project (Mobile app)",
  //   projectDate: "2025-03-01",
  //   technologies: [
  //     "TypeScript",
  //     "React-native",
  //     "expo",
  //     "react-native animated",
  //     "maps api",
  //   ],
  //   mobileScreens: [
  //     "/projects/echo-hero.png",
  //     "/projects/echo-square.png",
  //   ],
  // },

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
    projectName: "Rivr App",
    projectLink: "https://rivr-mu.vercel.app/",
    image: "/projects/rivr-app.png",
    projectDescription:
      "Empower Your Brand Through Authentic Creator Collaborations. Connect with trusted creators to amplify your message and drive results.",
    projectType: "Personal project",
    projectDate: "2025-03-01",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  },

  {
    projectName: "MetaScraper",
    projectLink: "https://meta-scrapper.vercel.app",
    image: "/projects/meta-scrapper.webp",
    projectDescription:
      "Easily extract and retrieve metadata from any website, including the title, OG image, and description.",
    projectType: "Personal project",
    projectDate: "2024-03-01",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  },

  // {
  //   projectName: "Write it",
  //   projectLink: "https://writee-it.vercel.app",
  //   projectDescription:
  //     "Craft Your Unique Sayings and Watch Them change to perfect handwritting.",
  //   projectType: "Personal project",
  //   projectDate: "2023-12-15",
  //   technologies: ["Angular", "Tailwind CSS", "TypeScript"],
  // },
  // {
  //   projectName: "Minimalist",
  //   projectLink: "https://minimal-list.vercel.app",
  //   image: "/projects/minimalist.png",
  //   projectDescription: "Simple, no-auth task manager.",
  //   projectType: "Personal project",
  //   projectDate: "2024-11-12",
  //   technologies: [
  //     "TypeScript",
  //     "Next.js",
  //     "Tailwind CSS",
  //     "Framer Motion",
  //     "Supabase",
  //     "Local storage",
  //   ],
  // },
  {
    projectName: "SAGE",
    projectLink: "/projects/sage",
    projectDescription:
      "An AI strategist for hard conversations. Describe the situation, and it reads the power dynamics, maps them against The 48 Laws of Power, and drafts your reply in eight different tones.",
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
    projectName: "Chop Iron",
    projectLink: "/projects/iron",
    projectDescription:
      "Offline-first bodybuilding tracker with a Nigerian voice. Logs workouts from 53 exercises, detects PRs across four categories, and turns training history into streaks, achievements, and analytics.",
    projectType: "Personal project (Mobile app)",
    projectDate: "2026-01-01",
    technologies: [
      "TypeScript",
      "React Native",
      "Expo",
      "SQLite",
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
    projectName: "Peekr",
    projectLink: "https://peekrr.vercel.app/",
    image: "/projects/peekrr.webp",
    projectDescription:
      "Peekr lets you capture and preview websites instantly — from full-page screenshots to responsive snapshots. Perfect for developers, designers, and marketers who want clean visuals of any webpage.",
    projectType: "Personal project",
    projectDate: "2025-10-01",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  // {
  //   projectName: "Thank You Card Generator",
  //   image: "/projects/cardd-generatorr.webp",
  //   projectLink: "https://cardd-generatorr.vercel.app/",
  //   projectDescription: "Create beautiful personalized thank you cards.",
  //   projectType: "Task",
  //   projectDate: "2025-11-01",
  //   technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  // },
];

export const SHORTPROJECTS = [
  {
    projectName: "Percentage Calculator",
    projectLink: "https://percentage-calcc.vercel.app/",
    projectinAppLink: "/percentage-calc",
    projectDescription:
      "Easily divide any total amount among individuals, with the option to add more participants and see real-time updates for precise cost sharing.",
    projectType: "Short project",
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
      "Experience the thrill of the mini shooter game, designed for fun and excitement",
    projectType: "Short project",
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
    projectName: "Falso - Mock data generator",
    projectLink: "",
    projectinAppLink: "/falso",
    projectDescription:
      "Generate type-safe mock data directly from your TypeScript interfaces",
    projectType: "Short project",
    projectDate: "2025-03-01",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    projectName: "Writing Pad",
    projectLink: "",
    projectinAppLink: "/writing-pad",
    projectDescription:
      "Generate type-safe mock data directly from your TypeScript interfaces",
    projectType: "Short project",
    projectDate: "2025-05-05",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS"],
  },
];

export const MOBILE_APPS = [
  
  {
  id: "echo",
  title: "Projects",
  sub: "ECHO",
  year: 2025,
  builtBy: "Samuel Isah",
  website: "Coming Soon",
  heroImage: "/projects/echo-hero.png",
  intro:
    "ECHO is a minimalist, offline-first reminder app that fires based on where you are, not just when. Drop a pin, set a radius, and ECHO nudges you the moment you arrive — no account, no signal required.",
  introText:
    "I don't forget tasks because of when they matter — I forget them because of where. “Pick this up when you get to campus.” “Remind her when you're at her place.” Time-based reminders never had an answer for that, so I built ECHO: a location-first reminder app that surfaces the right task at the right place, whether or not I'm online.",
  gallery: [
    { src: "/projects/echo-hero.png", alt: "Echo Map View" },
    { src: "/projects/echo-square.png", alt: "Echo Reminder List" },
  ],
  challenge:
    "Most reminders are built around clocks, but half of real life is tied to places — and the moment you pass that place, the reminder is useless. Building ECHO meant making location sensing work reliably in the background, where operating systems aggressively fight to save battery, and where platform limits quietly break naive implementations.",
  actions: [
    {
      title: "Building for myself",
      text: "I started ECHO to fix my own habit of forgetting location-based tasks — walking past the pharmacy and remembering two stops later. The goal was a clean, intuitive, offline-first tool that just works when I'm there: no account, no setup friction, no cloud dependency.",
    },
    {
      title: "Technical foundations",
      text: "ECHO is built with React Native and Expo (SDK 54) — one codebase for iOS and Android. Geofencing runs on expo-location's region monitoring backed by a headless expo-task-manager task, so reminders still fire when the app is closed. Notifications are local, delivered through expo-notifications with action buttons you can act on from the lock screen. Everything persists offline in AsyncStorage, with a NetInfo-driven banner when connectivity drops. React Navigation 7 handles the stack and tabs, and the minimalist UI is set in Archivo and Bricolage.",
    },
    {
      title: "Problems while building",
      text: "The hardest part was background reliability. iOS only allows 20 monitored regions per app, so ECHO caps active reminders at 20 and syncs geofences from a single source of truth — using a dirty-check signature and a serialized promise chain to kill race conditions when reminders change in quick succession. The background task has to hold its promise open until all side effects complete, or the OS tears it down mid-work. Search was another fight: reverse-geocoding every keystroke was slow and rate-limited, so ECHO debounces forward geocoding while you type and only reverse-geocodes the pin you actually tap. All of it had to balance accuracy against battery, which meant testing on real devices instead of trusting the simulator.",
    },
  ],
  result:
    "ECHO ships the full loop: search or drop a pin, set a radius from 50 to 1,000 meters, pick an icon and color, and get an actionable notification on arrival — with repeat reminders, saved locations, and an offline-first store underneath. Reminders stay accurate in the background without draining the battery, everything works with no connection, and the codebase is covered by unit tests with TypeScript checking. It's the app I reach for when I need to remember something where, not when — and the foundation is clean enough to grow on.",
  links: [
    { label: "Echo", url: "#" },
    { label: "GitHub", url: "#" },
  ],
},

  {
    id: "gpz",
    title: "Projects",
    sub: "GPZ",
    year: 2025,
    builtBy: "Samuel Isah",
    website: "Coming Soon",
    heroImage: "/projects/gpz-splash.png",
    intro:
      "GPZ is a GPA tracker and academic planner for students. It helps students manage semesters, courses, grades, and set academic goals with a modern, intuitive interface.",
    introText:
      "My main struggle as a student was not knowing what GPA I needed next semester to reach my target, or whether I was really on track. That problem inspired GPZ — an app that calculates targets, tracks progress, and turns GPA tracking into a motivating experience.",
    gallery: [
      { src: "/projects/gpz-onboarding-1.png", alt: "GPZ Onboarding 1" },
      { src: "/projects/gpz-onboarding-2.png", alt: "GPZ Onboarding 2" },
      { src: "/projects/gpz-onboarding-3.png", alt: "GPZ Onboarding 3" },
      { src: "/projects/gpz-onboarding-4.png", alt: "GPZ Onboarding 4" },
      { src: "/projects/gpz-onboarding-5.png", alt: "GPZ Onboarding 5" },
      { src: "/projects/gpz-home.png", alt: "GPZ Home" },
    ],
    challenge:
      "Traditional GPA calculators only give you numbers for past semesters. But students need more: guidance for the future. The challenge was building a system that could project, calculate, and show what’s required to reach academic goals.",
    actions: [
      {
        title: "Building from a personal problem",
        text: "I built GPZ because I often wondered: 'What GPA do I need next semester to hit my target?' and 'Am I on track, or slipping behind?' This app turned that frustration into a solution not just for me, but for other students.",
      },
      {
        title: "Technical foundations",
        text: "GPZ is built with React Native + Expo (TypeScript) for cross-platform support. It uses expo-router for navigation, AsyncStorage for offline persistence, react-query for data management, and custom hooks/context for GPA logic. Constants handle multiple grading systems (4.0 & 5.0), themes, and motivational quotes.",
      },
      {
        title: "Challenges while building",
        text: "The hardest part was designing the GPA target logic — calculating what grades are needed across credits and semesters. Supporting both 4.0 and 5.0 grading systems also required careful utility design. Finally, balancing detailed data entry with a clean, modern UI took several iterations.",
      },
    ],
    result:
      "GPZ makes GPA tracking practical and motivating. It shows students where they stand, what they need to do next semester, and keeps them inspired with progress tracking and quotes. The app is offline-first, lightweight, and designed for clarity and control.",
    links: [
      { label: "GPZ", url: "#" },
      { label: "GitHub", url: "#" },
    ],
  },

  {
    id: "ratecheck",
    title: "Projects",
    sub: "Rate Check",
    year: 2025,
    builtBy: "Samuel Isah",
    website: "Coming Soon",
    heroImage: "/projects/chop-iron-splash.png",
    intro:
      "Rate Check is an app that allows users to convert and compare both forex currencies and cryptocurrencies in real time, with continuously updated prices.",
    introText:
      "With constant market fluctuations, I wanted a tool that not only converts forex currencies but also includes crypto rates. Rate Check provides live price updates and comparison features to help users make informed decisions quickly.",
    gallery: [
      { src: "/projects/chop-iron-splash.png", alt: "Rate Check Dashboard" },
      { src: "/projects/chop-iron-splash.png", alt: "Currency and Crypto Conversion" },
      { src: "/projects/chop-iron-splash.png", alt: "Rate Comparison View" },
    ],
    challenge:
      "The challenge was integrating multiple APIs to provide accurate, real-time rates for both traditional currencies and a growing list of cryptocurrencies, while maintaining a smooth user experience.",
    actions: [
      {
        title: "Unified Forex & Crypto conversion",
        text: "Built a seamless converter that handles both traditional forex currencies and cryptocurrencies, bridging the gap between two fast-moving markets in a single app.",
      },
      {
        title: "Real-time price updates",
        text: "Implemented WebSocket connections and polling strategies to keep exchange rates and crypto prices updated live without performance lag.",
      },
      {
        title: "Comparison tools",
        text: "Designed a feature allowing users to compare conversion rates side-by-side, helping users spot the best rates instantly.",
      },
    ],
    result:
      "Rate Check empowers users with real-time, reliable data for both forex and crypto markets. The app’s clean interface and live updates make currency and crypto conversion simple and trustworthy.",
    links: [
      { label: "Rate Check", url: "#" },
      { label: "GitHub", url: "#" },
    ],
  },

  //sage
  {
    id: "sage",
    title: "Projects",
    sub: "SAGE",
    year: 2026,
    builtBy: "Samuel Isah",
    website: "Coming Soon",
    heroImage: "/projects/sage-splash.png",
    intro:
      "SAGE is an AI strategist for the conversations you're dreading. Describe the situation — a raise you need to ask for, a message you've been avoiding for a week — and it reads the power dynamics, maps what's happening against The 48 Laws of Power, and drafts your reply in eight different tones.",
    introText:
      "I didn't build Sage to ship an AI app. I built it because I kept losing the same kind of conversation: I'd send the honest, emotionally transparent message, then find out later what the other person was actually doing. Then I read The 48 Laws of Power and realised I'd been running Law 3 — Conceal Your Intentions — exactly backwards, over and over. I wanted something that checked my decisions against the laws before I hit send. Not a chatbot that agrees with me. A strategist that tells me I'm about to be outplayed.",
    gallery: [
      { src: "/projects/sage-splash.png", alt: "Sage Splash Screen" },
      { src: "/projects/sage-index.png", alt: "Sage Analysis View" },
      { src: "/projects/sage-index-listening.png", alt: "Sage Voice Input" },
      { src: "/projects/sage-coach.png", alt: "Sage Live Coach" },
      { src: "/projects/sage-conversation-1.png", alt: "Sage Conversation Simulator" },
      { src: "/projects/sage-conversation-1b.png", alt: "Sage Conversation Detail" },
      { src: "/projects/sage-conversation-2.png", alt: "Sage Conversation Follow-up" },
      { src: "/projects/sage-conversation-load.png", alt: "Loading Analysis" },
      { src: "/projects/sage-learn.png", alt: "Sage Learn — The 48 Laws" },
      { src: "/projects/sage-learn-load.png", alt: "Learn Loading State" },
      { src: "/projects/sage-library.png", alt: "Sage Library" },
      { src: "/projects/sage-delete.png", alt: "Delete Confirmation" },
    ],
    challenge:
      "Advice is cheap and generic. The hard part is getting a model to reason about one specific, messy human situation and return something structured enough to act on — hidden motivations, who holds leverage, which laws apply, what to actually say — without hallucinating the parts a reader can go and check.",
    actions: [
      {
        title: "Building for myself",
        text: "Sage is the only project I've built that already had a user before it had a name — me. I was running my own conversations through it while it was still a text field and a prompt. Every feature exists because I needed it mid-argument: the live coach that reads the other person's message, the simulator that rehearses how they might respond, the journal that reviews how a conversation actually went.",
      },
      {
        title: "Technical foundations",
        text: "React Native + Expo with Expo Router and TypeScript. The AI layer talks to Gemini over raw REST instead of an SDK, wrapped in an 8-key rotation system that marks dead keys and locks the quota window when the free tier runs dry. Voice input runs two transcription engines — Gemini's native audio understanding first, Groq Whisper as failover — picked specifically so a rate limit on one doesn't take the whole feature down. Every AI response is validated against a zod schema where each field degrades to a safe default rather than failing the payload. State persists to AsyncStorage behind a single context provider. The UI is a custom dark design system — my own colour, spacing, type and motion tokens — built on Reanimated and Gesture Handler.",
      },
      {
        title: "Problems while building",
        text: "Three shaped the app. First, free-tier rate limits are constant, and one API key made the product feel broken — so I built key rotation with dead-slot tracking and a 60-second quota lock that stops requests entirely instead of hammering the API and digging the hole deeper. Second, the model kept citing the wrong laws, numbering its own list instead of the book, so I stopped trusting it: every law title is scored against a keyword index of all 48, and a weak match falls back to a generic label rather than asserting a false citation. Third, structured output fails partially, not completely — so every schema field carries a default, and one missing array collapses a section instead of blanking the screen.",
      },
    ],
    result:
      "Sage turned a book I'd read twice into something I use before every hard conversation. It's taught me more about shipping AI than anything else I've built: the prompt is the easy part, and everything that makes it feel reliable — key rotation, schema defaults, citation checks — is ordinary engineering wrapped around an unreliable component. It's also the most personal thing I've made, because the first user was me.",
    links: [
      { label: "Sage", url: "#" },
      { label: "GitHub", url: "#" },
    ],
  },

  //meelo
{
  id: "melo",
  title: "Projects",
  sub: "MELO",
  year: 2026,
  builtBy: "Samuel Isah",
  website: "Coming Soon",
  heroImage: "/projects/melo-splash.png",
  intro:
    "Melo is a private, two-person chat that translates every message before it is delivered. You write in your language, the person you're talking to reads in theirs — one room, two languages, no copy-pasting.",
  introText:
    "Talking to someone who reads in a different language meant the same dance for every message: type, copy, switch apps, paste, translate, switch back — and hope the tone survived. That tax on every single message is why I built Melo: a room for two where the translation happens before delivery, and each side just sees the conversation in their own language.",
  gallery: [
    { src: "/projects/melo-splash.png", alt: "Melo Splash Screen" },
    { src: "/projects/melo-onboarding.png", alt: "Melo Onboarding" },
    { src: "/projects/melo-onboarding-name.png", alt: "Enter Your Name" },
    { src: "/projects/melo-onboarding-avatar.png", alt: "Choose Avatar" },
    { src: "/projects/melo-onboarding-language.png", alt: "Language Selection" },
    { src: "/projects/melo-connect.png", alt: "Melo Chats List" },
    { src: "/projects/melo-id.png", alt: "Melo ID Card" },
    { src: "/projects/melo-chat-id.png", alt: "Chat ID View" },
    { src: "/projects/melo-chat-id-2.png", alt: "Chat ID Detail" },
    { src: "/projects/melo-chat.png", alt: "Melo Chat View" },
    { src: "/projects/melo-friend-sheet.png", alt: "Add a Friend" },
    { src: "/projects/melo-profile-sheet-1.png", alt: "Profile Settings 1" },
    { src: "/projects/melo-profile-sheet-2.png", alt: "Profile Settings 2" },
    { src: "/projects/melo-profile-sheet-3.png", alt: "Profile Settings 3" },
  ],
  challenge:
    "Chat apps don't translate, and translators aren't conversations. Doing it manually meant leaving the chat, losing context, and guessing at tone — and both people paid that cost on every message.",
  actions: [
    {
      title: "Building for myself",
      text: "Melo exists for conversations I was actually having — the kind where the other person reads in a different language. The goal was a chat that feels as light as texting a close friend, where translation is invisible infrastructure instead of an extra step.",
    },
    {
      title: "Technical foundations",
      text: "Melo is built with React Native + Expo (Expo Router) and Supabase. Every send runs a translate-before-insert pipeline: the message is translated into the recipient's reading language, with per-message status tracking, a bounded cache, in-flight request coalescing, timeouts, and retries. Three realtime channels drive messages, typing, presence, and the chats list, and rooms are derived from the two Melo IDs so both people always land in the same room.",
    },
    {
      title: "Problems while building",
      text: "The translation endpoint lies: on failure it returns your input unchanged, so success and failure look identical — and it rate-limits with an instant 429. I built an echo detector so messages that needed no translation don't get reported as errors, plus a retry pause and request coalescing so a chatty app doesn't throttle itself. Identity was its own puzzle: there are no passwords, and the Melo ID is the only credential, so it had to be readable out loud, collision-safe, and recoverable on a new phone.",
    },
  ],
  result:
    "Melo makes cross-language conversation feel like ordinary texting: you write in your language, they read in theirs, and the translation disappears into the delivery. It's realtime, lightweight, and built with scalability in mind for future features.",
  links: [
    { label: "Melo", url: "#" },
    { label: "GitHub", url: "#" },
  ],
},

//iron
{
  id: "iron",
  title: "Projects",
  sub: "CHOP IRON",
  year: 2026,
  builtBy: "Samuel Isah",
  website: "Coming Soon",
  heroImage: "/projects/chop-iron-splash.png",
  intro:
    "Chop Iron is an offline-first bodybuilding tracker with a Nigerian voice. It logs workouts from a built-in library of 53 exercises, detects personal records across four categories — weight, reps, volume and estimated 1RM — and turns training history into streaks, achievements, progress photos and analytics. No account, no server, no subscription: everything lives in a local SQLite database, wrapped in a spring-physics motion system and written in fluent pidgin. No dull. Go chop iron.",
  introText:
    "I built Chop Iron because every fitness app I tried felt like it was built for someone else. Some were bloated with social feeds and paywalls; the rest were sterile — perfectly functional, completely soulless. None of them sounded like the voice I actually need when training is the last thing on my mind. So the voice became the starting point: 'No dull. Go chop iron.' From there, every decision answered one question — does this help me log a set faster and train harder? I designed around the only moment that matters: standing in the gym, phone in one hand, picking up exactly where the last session ended.",
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
    { src: "/projects/chop-iron-index-2.png", alt: "Home screen alternative view" },
    { src: "/projects/chop-iron-calender.png", alt: "Calendar View" },
    { src: "/projects/chop-iron-calender-2.png", alt: "Calendar Detail" },
    { src: "/projects/chop-iron-log.png", alt: "Logging a workout" },
    { src: "/projects/chop-iron-exercises.png", alt: "Exercise library with 53 exercises" },
    { src: "/projects/chop-iron-exercise-push.png", alt: "Push Exercises" },
    { src: "/projects/chop-iron-exercise-shoulder.png", alt: "Shoulder Exercises" },
    { src: "/projects/chop-iron-exercise-detail.png", alt: "Exercise Detail" },
    { src: "/projects/chop-iron-exercise-detail-image.png", alt: "Exercise with Image" },
    { src: "/projects/chop-iron-progress.png", alt: "Progress screen with charts" },
    { src: "/projects/chop-iron-achievement.png", alt: "Achievements and milestones" },
    { src: "/projects/chop-iron-profile.png", alt: "Profile and stats overview" },
    { src: "/projects/chop-iron-profile-1.png", alt: "Profile Detail 1" },
    { src: "/projects/chop-iron-profile-2.png", alt: "Profile Detail 2" },
    { src: "/projects/chop-iron-profile-3.png", alt: "Profile Detail 3" },
    { src: "/projects/chop-iron-profile-avatar.png", alt: "Avatar Selection" },
    { src: "/projects/chop-iron-edit-profile.png", alt: "Edit Profile" },
  ],
  challenge:
    "On the surface, fitness tracking is a solved problem — every app can log a set. The real challenge was making the data underneath honest while keeping the surface effortless. A streak can't count workouts; it has to count consecutive distinct calendar days, and survive the awkward cases — training twice in a day, or missing today but training yesterday. A personal record isn't one number: a single set can break a weight PR, a rep PR, a volume PR or an estimated-1RM PR, and detecting them correctly means replaying every workout in chronological order. Achievements can't just unlock — when a workout is deleted, the app re-checks every threshold and re-locks what no longer qualifies. And all of it had to feel alive: offline-first on SQLite, 60fps motion, with a personality that makes the app a training partner, not a spreadsheet.",
  actions: [
    {
      title: "Building for myself",
      text: "Chop Iron wasn't a portfolio exercise — it was the app I wanted on my own phone, which gave every decision a strict test: does this help me log a set faster or train harder? The pidgin copy isn't decoration; 'Omo, you never log anything o' hits different from 'No workouts found.' The dark theme and yellow accent were tuned for a dim gym, bottom trays put every action under my thumb, and even the animations have jobs — spring-loaded progress bars and streak celebrations exist to make progress feel physical. Using my own app every session became the review that matters most.",
    },
    {
      title: "Technical foundations",
      text: "Built with Expo 54 and React Native 0.81 in TypeScript, with Expo Router handling file-based navigation across four tabs and a stack of modal flows. State lives in a single Zustand store over an expo-sqlite database — 12 tables covering workouts, sets, PR history, photos, achievements and profile, written transactionally in WAL mode. The PR engine is custom: it walks workout history chronologically, computes Epley estimated 1RM and tracks four record types per exercise, with bodyweight sets handled as a special case. The 53-exercise library ships with illustrations that download once and cache offline to the device. All motion runs on Reanimated 4 shared values — trays, sliding pills, directional tab transitions — with Lottie powering the streak flame and confetti marking celebrations.",
    },
    {
      title: "Problems while building",
      text: "iOS only presents one native modal at a time, and I learned that the hard way: an achievement popup and a PR toast firing after the same workout meant one silently swallowed the other. The fix was a queue — achievements, streak celebrations and PR toasts all funnel through pending state in the store and present in strict order. Gestures fought animations too, with tray dismissals and spring entrances competing for the same transform until I separated what the gesture owns from what the animation owns. I even built a shared-element morph — the workout icon flying into the detail screen — then removed it when the complexity outweighed the payoff. Adding weight data is easy; making streaks and achievements honest is not. That's where trust in a tracker is won or lost.",
    },
  ],
  result:
    "Chop Iron is the app I actually open every session — the only review that matters. Five days, from empty repo to complete offline-first product: full workout logging, a four-type PR engine, streak celebrations, achievements with a sense of humour, progress photos, weight and muscle-group analytics, and a motion system that makes the whole thing feel alive. Beyond the features, it became my proving ground for offline-first architecture, gesture design and building software with a voice — lessons I carry into everything I build next.",
  links: [
    { label: "Iron", url: "#" },
    { label: "GitHub", url: "#" },
  ],
}

];

export const WEB_TOOLS = [
  {
    projectName: "Deps Janitor",
    projectLink: "https://deps-janitor.vercel.app/",
    image: "/projects/deps-janitor.png",
    projectDescription:
      "Finds and removes unused npm dependencies to keep JavaScript and Node.js projects clean and lightweight.",
    projectType: "CLI & Web Tool",
    projectDate: "2025-12-28",
    technologies: ["Node.js", "Next.js", "Tailwind CSS", "shadcn/ui"],
  },
  {
    projectName: "Peekr",
    projectLink: "https://peekrr.vercel.app/",
    image: "/projects/peekrr.png",
    projectDescription:
      "Generates responsive website snapshots so developers and designers can preview how a site looks across different screen sizes.",
    projectType: "Developer Utility",
    projectDate: "2025-12-15",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "shadcn/ui"],
  },
  {
    projectName: "MetaScraper",
    projectLink: "https://meta-scrapper.vercel.app/",
    image: "/projects/metascraper.png",
    projectDescription:
      "Extracts website metadata including titles, descriptions, Open Graph images, and other useful page information.",
    projectType: "Web Utility",
    projectDate: "2025-11-20",
    technologies: ["Next.js", "Tailwind CSS", "Lucide React", "shadcn/ui"],
  },
  {
    projectName: "VaultX",
    projectLink: "https://github.com/drealdumore/vaultx/",
    projectDescription:
      "A lightweight API for sharing text, links, and notes across devices with expiry times, view limits, and burn-after-reading support.",
    projectType: "REST API",
    projectDate: "",
    technologies: ["TypeScript", "Node.js"],
  },
  {
    projectName: "Falso API",
    projectLink: "https://github.com/drealdumore/falso-api/",
    projectDescription:
      "A TypeScript mock data generator that turns user-defined interfaces into realistic JSON for API testing and database seeding.",
    projectType: "Developer Tool",
    projectDate: "",
    technologies: ["TypeScript", "Node.js"],
  },
];
