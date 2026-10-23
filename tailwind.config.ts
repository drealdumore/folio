import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

/**
 * Colour scales are driven by CSS custom properties so the whole site can
 * re-theme at runtime (see `app/globals.css`). Every value is an RGB channel
 * triplet so Tailwind's `/opacity` modifiers keep working.
 */
const zinc = {
  50: "rgb(var(--zinc-50) / <alpha-value>)",
  100: "rgb(var(--zinc-100) / <alpha-value>)",
  200: "rgb(var(--zinc-200) / <alpha-value>)",
  300: "rgb(var(--zinc-300) / <alpha-value>)",
  400: "rgb(var(--zinc-400) / <alpha-value>)",
  500: "rgb(var(--zinc-500) / <alpha-value>)",
  600: "rgb(var(--zinc-600) / <alpha-value>)",
  700: "rgb(var(--zinc-700) / <alpha-value>)",
  800: "rgb(var(--zinc-800) / <alpha-value>)",
  900: "rgb(var(--zinc-900) / <alpha-value>)",
  950: "rgb(var(--zinc-950) / <alpha-value>)",
} satisfies Record<number, string>;

const neutral = {
  50: "rgb(var(--neutral-50) / <alpha-value>)",
  100: "rgb(var(--neutral-100) / <alpha-value>)",
  200: "rgb(var(--neutral-200) / <alpha-value>)",
  300: "rgb(var(--neutral-300) / <alpha-value>)",
  400: "rgb(var(--neutral-400) / <alpha-value>)",
  500: "rgb(var(--neutral-500) / <alpha-value>)",
  600: "rgb(var(--neutral-600) / <alpha-value>)",
  700: "rgb(var(--neutral-700) / <alpha-value>)",
  800: "rgb(var(--neutral-800) / <alpha-value>)",
  900: "rgb(var(--neutral-900) / <alpha-value>)",
  950: "rgb(var(--neutral-950) / <alpha-value>)",
} satisfies Record<number, string>;

const config: Config = {
  darkMode: ["class"],
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
    extend: {
      colors: {
        background: "rgb(var(--bg-page) / <alpha-value>)",
        surface: "rgb(var(--bg-surface) / <alpha-value>)",
        foreground: "rgb(var(--text-heading) / <alpha-value>)",
        text: {
          normal: "rgb(var(--text-normal) / <alpha-value>)",
          heading: "rgb(var(--text-heading) / <alpha-value>)",
          inverse: "rgb(var(--text-inverse) / <alpha-value>)",
          muted: "rgb(var(--text-muted) / <alpha-value>)",
        },
        zinc,
        neutral,
        gray: {
          "200": "rgb(var(--zinc-200) / <alpha-value>)",
        },
        systemRed: "#ff5f57",
        systemYellow: "#febb2e",
        systemGreen: "#5FC454",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
          foreground: "rgb(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--card) / <alpha-value>)",
          foreground: "rgb(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "rgb(var(--popover) / <alpha-value>)",
          foreground: "rgb(var(--popover-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          foreground: "rgb(var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive) / <alpha-value>)",
          foreground: "rgb(var(--destructive-foreground) / <alpha-value>)",
        },
        border: "rgb(var(--border) / <alpha-value>)",
        input: "rgb(var(--input) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
        heading: ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
        display: [
          '"Grotesque"',
          '"Cabinet Grotesk"',
          '"Gabarito"',
          ...defaultTheme.fontFamily.sans,
        ],
        hand: ['"Handwriting"', "cursive"],
        aws: ['"Geist"', ...defaultTheme.fontFamily.sans],
        mono: [...defaultTheme.fontFamily.mono],
      },
      keyframes: {
        reveal: {
          "0%": {
            opacity: "0",
            filter: "brightness(1) blur(15px)",
            scale: "1.0125",
          },
          "10%": {
            opacity: "1",
            filter: "brightness(1.25) blur(10px)",
          },
          "100%": {
            opacity: "1",
            filter: "brightness(1) blur(0)",
            scale: "1",
          },
        },
        tilt: {
          "0%, 50%, 100%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(0.5deg)",
          },
          "75%": {
            transform: "rotate(-0.5deg)",
          },
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
        marquee: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-50%)",
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "200% 0",
          },
          "100%": {
            backgroundPosition: "-200% 0",
          },
        },
        "pulse-ring": {
          "0%": {
            transform: "scale(0.85)",
            opacity: "0.7",
          },
          "80%, 100%": {
            transform: "scale(1.6)",
            opacity: "0",
          },
        },
      },
      animation: {
        tilt: "tilt 10s infinite linear",
        reveal: "reveal 10s infinite linear",
        blob: "blob 7s infinite",
        marquee: "marquee 32s linear infinite",
        shimmer: "shimmer 2.4s linear infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionTimingFunction: {
        "out-quint": "cubic-bezier(0.23, 1, 0.32, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
