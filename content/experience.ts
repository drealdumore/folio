type Experience = {
  title: string;
  company: string;
  description: string[];
  duration: string;
  durationAlt: string;
};

export const EXPERIENCE: Experience[] = [
  {
    title: "Mobile Developer",
    company: "Campus Buddy",
    description: [
      "Building and maintaining mobile features with React Native / Expo.",
      "Owned mobile features end-to-end, optimizing app performance, offline reliability, and screen transitions.",
      "Collaborated directly with stakeholders to align product requirements with high-quality technical implementation.",
    ],
    duration: "January 2025 - Present",
    durationAlt: "01 / 2025 until Now",
  },

  {
    title: "Front-end Developer",
    company: "NodePair",
    description: [
      "Developing and iterating on front-end interfaces and user-facing features.",
      "Refining UI architecture and component systems to deliver responsive, accessible user experiences.",
    ],
    duration: "April 2024 - Present",
    durationAlt: "04 / 2024 until Now",
  },

  {
    title: "Full-Stack Developer",
    company: "Freelance",
    description: [
      "Delivered complete web and mobile solutions for clients, including e-commerce storefronts, business websites, and custom tools.",
      "Handled everything from UI implementation and backend APIs to deployment, schema design, and iteration based on user feedback.",
    ],
    duration: "April 2021 - 2024",
    durationAlt: "04 / 2021 until 2024",
  },
];
