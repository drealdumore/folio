export type Repo = {
  name?: string;
  url?: string;
  desc?: string;
};

export const REPOS: Repo[] = [
  {
    name: "auth-api",
    url: "https://github.com/drealdumore/auth-api/",
    desc: "A secure authentication API built with Node.js and Express, featuring user registration, login, email verification, and password recovery. Implements JWT-based authentication, refresh token rotation, and role-based access control for scalable user management.",
  },
  {
    name: "hostel-management-system",
    url: "https://github.com/drealdumore/hms/",
    desc: "Backend system for managing hostels, rooms, and users with complete CRUD operations. Includes authentication, booking workflows, and email notifications. Designed with modular controllers and middleware for clean, maintainable architecture.",
  },
  {
    name: "vaultx",
    url: "https://github.com/drealdumore/vaultx/",
    desc: "A lightweight REST API that allows users to securely share and retrieve text snippets, links, or notes across devices. Supports temporary storage with configurable expiry, view limits, and burn-after-reading functionality — built for simplicity and privacy.",
  },
  
  {
    name: "falso-api",
    url: "https://github.com/drealdumore/falso-api/",
    desc: "TypeScript-powered mock data generator that produces realistic JSON data from user-defined interfaces. Ideal for seeding databases or testing APIs without external dependencies.",
  },
  
];
