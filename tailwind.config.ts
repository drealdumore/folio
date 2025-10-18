import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./motion/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    screens: {
      ...defaultTheme.screens,
    },

    // screens: {
    // xs: "350px",
    //   desktop: { max: "75em" },
    //   laptop: { max: "64em" },
    //   tablet: { max: "56.25em" },
    //   mobile: { max: "37.5em" },
    // },
    extend: {
      colors: {
        background: "#1a1a1a",
        text: {
          normal: "#f0f0f0",
          heading: "#ffffff",
        },
        gray: {
          200: "#dcdcdc",
        },
        systemRed: "#ff5f57",
        systemYellow: "#febb2e",
        systemGreen: "#5FC454",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist)", ...defaultTheme.fontFamily.sans],
        heading: ["var(--font-satoshi)", ...defaultTheme.fontFamily.sans],
      },

      keyframes: {
        reveal: {
          "0%": {
            opacity: "0",
            filter: "brightness(1) blur(15px)",
            scale: "1.0125",
          },
          "10%": { opacity: "1", filter: "brightness(1.25) blur(10px)" },
          "100%": { opacity: "1", filter: "brightness(1) blur(0)", scale: "1" },
        },
        tilt: {
          "0%, 50%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(0.5deg)" },
          "75%": { transform: "rotate(-0.5deg)" },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
      animation: {
        tilt: "tilt 10s infinite linear",
        reveal: "reveal 10s infinite linear",
        blob: "blob 7s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
