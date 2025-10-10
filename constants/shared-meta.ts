export const sharedMetadata = {
  title: "Samuel Isah | Software Developer",
  name: "Samuel Isah",
  description:
    "I'm Samuel Isah, a Full-Stack Web and Mobile Developer interested in developing innovative applications that exceed expectations on all platforms and creating beautiful and functional interfaces.",
  og: "Full-Stack Web and Mobile Developer.",
  keywords: [
    "Samuel Isah",
    "Portfolio",
    "Creative Software Developer",
    "samuel isah",
    "drealdumore",
    "software developer",
    "fullstack developer",
    "web developer",
    "mobile developer",
    "software engineer",
    "frontend developer",
    "backend developer",
  ],
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://drealdumore.vercel.app",
  ogImage: {
    width: 1200,
    height: 630,
    type: "image/png",
  },
  image: "/og.png",
};
