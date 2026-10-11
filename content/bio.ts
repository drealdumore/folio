export const bioData = {
  name: "Samuel Isah",
  avatar: "https://github.com/drealdumore.png",
  jobTitle: "Full-Stack Web & Mobile Developer",
  website: "https://drealdumore.vercel.app",
  about:
    "I’m a self-taught full-stack and mobile developer based in Nigeria with 4+ years of experience building and shipping products end-to-end. My strongest work sits at the intersection of mobile (React Native + Expo), modern web (Next.js + TypeScript), and backend systems (Node.js, Supabase, PostgreSQL, Redis). I enjoy solving practical problems — real-time communication, offline-first experiences, developer tooling, and automation.",
  contacts: [
    {
      label: "Email",
      value: "samuelisah234@gmail.com",
      href: "mailto:samuelisah234@gmail.com",
    },
    {
      label: "Github",
      value: "drealdumore",
      href: "https://github.com/drealdumore",
    },
    {
      label: "LinkedIn",
      value: "samuel-isah",
      href: "https://www.linkedin.com/in/samuel-isah",
    },
    {
      label: "X",
      value: "drealdumore",
      href: "https://x.com/drealdumore",
    },
  ],
};

export type ProfileDataProps = {
  title: string;
  items: {
    title: string;
    subTitle?: string;
    date?: string;
    description: string;
  }[];
};

export const profileData = [
  {
    title: "Work Experience",
    items: [
      {
        title: "Mobile Developer at Campus Buddy",
        subTitle: "Remote",
        date: "January 2025 - Present",
        description:
          "Building and maintaining mobile features with React Native / Expo. Owned core features end-to-end, optimizing app performance, offline reliability, and screen transitions.",
      },
      {
        title: "Front-end Developer at NodePair",
        subTitle: "Remote",
        date: "April 2024 - Present",
        description:
          "Developing and iterating on front-end interfaces and user-facing features with modern React, TypeScript, and responsive component design.",
      },
      {
        title: "Full-Stack Developer at Freelance",
        subTitle: "Remote",
        date: "April 2021 - 2024",
        description:
          "Delivered complete web and mobile solutions for clients, including e-commerce storefronts, business websites, and custom tools. Handled everything from UI implementation and backend APIs to deployment and iteration based on feedback.",
      },
    ],
  },

  {
    title: "Education",
    items: [
      {
        title: "Bachelor's Degree in Statistics",
        subTitle: "Ahmadu Bello University, Nigeria",
        date: "Present",
        description: "Specializing in statistical analysis and data science.",
      },
      {
        title: "Diploma Degree in Computer Science",
        subTitle: "Petroleum Training Institute Nigeria",
        date: "2021",
        description: "Specializing in software development.",
      },
    ],
  },
];

export const LOCATION = "Kaduna, Nigeria (Open to relocation & visa sponsorship)";
