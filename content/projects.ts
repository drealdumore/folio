type projectType = {
  name: string | any;
  description: string | undefined | null;
  image: string | any;
  href: string | undefined;
  tech?: string[];
};

interface ProjectCardProps {
  projectName: string | undefined | null;
  image?: string | any;
  projectLink: string | any;
  projectDescription: string | undefined | null;
  projectType: string | undefined | null;
  projectDate: string | any;
  technologies: string[];
}

export const ALLPROJECTS: ProjectCardProps[] = [
  {
    projectName: "Isami Technologies – Corporate Website",
    projectLink: "https://isamitechnologies.com.ng/",
    image: "/projects/isamitechnologies.png",
    projectDescription:
      "Official website for Isami Technologies — a Nigerian digital agency offering web development, e-commerce, AI chatbots, UI/UX & branding, and SEO services across Nigeria.",
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
    projectName: "Cleanup – Cleaning Services Website",
    projectLink: "https://cleanup.com.ng/",
    image: "/projects/cleanup.png",
    projectDescription:
      "Website for Cleanup — a professional cleaning services company based in Kaduna, offering services like residential & commercial cleaning, post-construction cleanup, upholstery & carpet cleaning, hotel/restaurant cleaning, pest control, and 24/7 support.",
    projectType: "Client / Company Website",
    projectDate: "2025-11-15",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "React"],
  },
  {
    projectName: "Olamide - Tours Website (clone)",
    projectLink: "https://olamide-tour.vercel.app/",
    image: "/projects/celeb-tour.png",
    projectDescription:
      "Experience Olamide live in Toronto! Get tickets for the electrifying concert tour featuring Nigeria's biggest Afrobeats star at Rebel and Queen Elizabeth Theatre.",
    projectType: "Personal project",
    projectDate: "2025-10-01",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  },

  {
    projectName: "Echo",
    projectLink: "/projects/echo",
    projectDescription:
      "minimalist, offline-first reminder app that triggers based on where you are, not just when. With geofencing and a clean UI, it helps you remember things exactly when you arrive at the right place.",
    projectType: "Personal project (Mobile app)",
    projectDate: "2025-03-01",
    technologies: [
      "TypeScript",
      "React-native",
      "expo",
      "react-native animated",
      "maps api",
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

  // {
  //   projectName: "MetaScraper",
  //   projectLink: "https://meta-scrapper.vercel.app",
  //   projectDescription:
  //     "Easily extract and retrieve metadata from any website, including the title, OG image, and description.",
  //   projectType: "Personal project",
  //   projectDate: "2024-03-01",
  //   technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  // },

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
  // {
  //   projectName: "Peekr",
  //   projectLink: "https://peekrr.vercel.app/",
  //   projectDescription:
  //     "Peekr lets you capture and preview websites instantly — from full-page screenshots to responsive snapshots. Perfect for developers, designers, and marketers who want clean visuals of any webpage.",
  //   projectType: "Personal project",
  //   projectDate: "2025-10-01",
  //   technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  // },
  // {
  //   projectName: "Thank You Card Generator",
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

export const PROJECTS: projectType[] = [
  {
    name: "MetaScraper",
    href: "https://meta-scrapper.vercel.app",
    image: "/projects/metascraper.png",
    description:
      "Easily extract and retrieve metadata from any website, including the title, OG image, and description.",
    tech: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    name: "Write it",
    href: "https://writee-it.vercel.app/",
    image: "/projects/writeit.png",
    description:
      " Craft Your Unique Sayings and Watch Them change to perfect handwritting",
    tech: ["Angular", "Tailwind CSS", "TypeScript"],
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
    heroImage: "/projects/echo-square.png",
    intro:
      "ECHO is a minimalist, offline-first reminder app that triggers based on where you are, not just when. With geofencing and a clean UI, it helps you remember things exactly when you arrive at the right place.",
    introText:
      "I often forget tasks not because of when, but because of where — like “Pick up something when you get to school” or “Remind her when you’re at her place.” Traditional reminders don’t solve this, so I built Echo: an app that reminds you exactly at the location you need it.",
    gallery: [
      { src: "/projects/echo-square.png", alt: "Echo Map View" },
      { src: "/projects/echo-square.png", alt: "Echo Reminder List" },
      { src: "/projects/echo-square.png", alt: "Echo Notification Preview" },
    ],
    challenge:
      "Regular reminders only work with time. But many real-life tasks depend on place. Forgetting to do things when arriving somewhere was the problem Echo set out to solve.",
    actions: [
      {
        title: "Building for myself",
        text: "I started Echo to fix my own habit of forgetting location-based tasks. The goal was a clean, intuitive, offline-first solution that just works when I’m there.",
      },
      {
        title: "Technical foundations",
        text: "Echo is built with React Native + Expo for cross-platform support. It uses expo-location and expo-task-manager for geofencing, AsyncStorage for local persistence, and expo-notifications for push alerts. The design follows a minimalist aesthetic with clear typography and simple navigation.",
      },
      {
        title: "Problems while building",
        text: "One of the biggest challenges was handling background location updates reliably across iOS and Android. Testing geofencing in simulators also required creative workarounds. Another challenge was optimizing battery usage while keeping reminders accurate.",
      },
    ],
    result:
      "Echo provides peace of mind for everyday tasks — reminding you at the right place, right time. It simplifies routines, reduces forgetfulness, and adds clarity to daily life. The app is lightweight, offline-first, and built with scalability in mind for future features.",
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
    heroImage: "/projects/rate-check.png",
    intro:
      "Rate Check is an app that allows users to convert and compare both forex currencies and cryptocurrencies in real time, with continuously updated prices.",
    introText:
      "With constant market fluctuations, I wanted a tool that not only converts forex currencies but also includes crypto rates. Rate Check provides live price updates and comparison features to help users make informed decisions quickly.",
    gallery: [
      { src: "/projects/rate-check.png", alt: "Rate Check Dashboard" },
      {
        src: "/projects/rate-check-convert.png",
        alt: "Currency and Crypto Conversion",
      },
      { src: "/projects/rate-check-compare.png", alt: "Rate Comparison View" },
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
];
