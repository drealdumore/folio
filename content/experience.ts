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
      "Spearheaded the design, development, and deployment of the company's mobile application, overseeing the entire lifecycle from concept to release.",
      "Managed feature planning, task delegation, and code reviews, ensuring adherence to best practices and delivery timelines.",
      "Collaborated directly with stakeholders to align product vision with user needs, translating business goals into high-quality technical solutions.",
      "Implemented modern UI/UX patterns, optimized app performance, and integrated essential APIs to deliver a seamless, engaging user experience.",
    ],
    duration: "January 2025 - Ongoing",
    durationAlt: "01 / 2025 until Now",
  },

  {
    title: "Front-end Developer",
    company: "NodePair",
    description: [
      "Enhancing the company's visual identity by refining the user interface and developing versatile, sustainable user experiences.",
    ],
    duration: "April 2024 - Ongoing",
    durationAlt: "04 / 2024 until Now",
  },

  {
    title: "Full Stack Developer",
    company: "Freelance",
    description: [
      "Designed and implemented scalable web applications by integrating front-end interfaces with back-end services, ensuring seamless user experiences and robust functionality.",
      "Collaborated closely with cross-functional teams to optimize performance, improve security, and deploy new features, contributing to the overall growth and efficiency of the client’s digital presence.",
    ],
    duration: "April 2021 - 2024",
    durationAlt: "04 / 2021 until 2024",
  },
];
