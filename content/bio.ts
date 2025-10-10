export const bioData = {
  name: "Samuel Isah",
  avatar: "https://github.com/drealdumore.png",
  jobTitle: "Full Stack Software Developer",
  website: "https://drealdumore.vercel.app",
  about:
    "Experienced Software Developer with expertise in fullstack development, SEO and UX design. Committed to delivering high-quality projects and collaborating effectively in team environments.",
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
        title: "Lead Mobile Developer at Campus Buddy",
        subTitle: "Remote",
        date: "2025 - Present",
        description:
          "Took charge of building and launching Campus Buddy’s mobile app from scratch: planning features, crafting the UI, wiring up APIs, and making sure it runs smooth on every device. Worked hand-in-hand with the team and stakeholders to turn ideas into a clean, fast, and user-friendly app students actually love to use.",
      },
      {
        title: "Front End Developer at NodePair",
        subTitle: "Remote",
        date: "2024",
        description:
          "Enhancing the company's visual identity by refining the user interface and developing versatile, sustainable user experiences.",
      },
      {
        title: "Freelance Full Stack Developer",
        subTitle: "Remote",
        date: "2021 - 2024",
        description:
          "Designed and implemented scalable web applications by integrating front-end interfaces with back-end services, ensuring seamless user experiences and robust functionality.",
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
        // date: "2024 - Present",
        description: "Specialize on statistical analysis and data science.",
      },
      {
        title: "Diploma Degree in Computer Science",
        subTitle: "Petroleum Training Institute Nigeria",
        date: "2021",
        // date: "2021 - 2023",
        description: "Specialize in software development.",
      },
    ],
  },
];

export const LOCATION = "Kaduna, Nigeria";
