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
    desc: "Open-source curated library of 1000+ developer tools, UI components, APIs, and resources with AI-assisted categorization, metadata scraping, and an admin dashboard.",
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
