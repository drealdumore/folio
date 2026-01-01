import { sharedMetadata } from "@/constants/shared-meta";
import { SOCIALS } from "@/constants/social-profiles";

import React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import ClientBody from "./ClientBody";
import { PostHogProviderWrapper } from "./providers";

const geist = localFont({
  src: [
    {
      path: "../public/fonts/geist.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-geist",
  display: "swap",
});

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/satoshi.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const awsDiatype = localFont({
  src: [
    {
      path: "../public/fonts/AWSDiatype-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-aws-diatype",
  display: "swap",
});

const awsDiatypeMono = localFont({
  src: [
    {
      path: "../public/fonts/AWSDiatypeRoundedSemi-Mono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/AWSDiatypeRoundedSemi-Mono-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-aws-diatype-mono",
  display: "swap",
});
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${geist.variable} ${awsDiatype.variable} ${awsDiatypeMono.variable}`}
    >
      <head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#1a1a1a" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Samuel Isah",
              url: "https://drealdumore.vercel.app",
              image: "https://drealdumore.vercel.app/api/og",
              sameAs: [
                `https://twitter.com/${SOCIALS.twitter.username}`,
                `https://github.com/${SOCIALS.github.username}`,
                `https://linkedin.com/in/${SOCIALS.linkedin.username}`,
              ],
              jobTitle: "Full-Stack Developer",
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
              knowsAbout: [
                "React",
                "Next.js",
                "React Native",
                "TypeScript",
                "JavaScript",
                "Node.js",
                "Web Development",
                "Mobile Development",
                "UI/UX Design",
              ],
              description:
                "Full-Stack Web and Mobile Developer creating innovative applications with modern technologies.",
            }),
          }}
        />
      </head>
      <PostHogProviderWrapper>
        <ClientBody>{children}</ClientBody>
      </PostHogProviderWrapper>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(sharedMetadata.url),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  title: {
    default: sharedMetadata.title,
    template: `%s — ${sharedMetadata.title}`,
  },
  description: sharedMetadata.description,
  keywords: sharedMetadata.keywords,
  authors: [{ name: sharedMetadata.name, url: sharedMetadata.url }],
  creator: sharedMetadata.name,
  publisher: sharedMetadata.name,
  category: "Technology",
  classification: "Portfolio",
  openGraph: {
    title: {
      default: sharedMetadata.title,
      template: `%s — ${sharedMetadata.title}`,
    },
    description: sharedMetadata.description,
    type: "website",
    url: sharedMetadata.url,
    siteName: sharedMetadata.title,
    locale: "en_US",
    images: {
      url: sharedMetadata.image,
      width: 1200,
      height: 630,
      alt: sharedMetadata.title,
    },
  },
  alternates: {
    canonical: "/",
  },
  twitter: {
    card: "summary_large_image",
    site: `@${SOCIALS.twitter.username}`,
    creator: `@${SOCIALS.twitter.username}`,
    title: sharedMetadata.title,
    description: sharedMetadata.description,
    images: [sharedMetadata.image],
  },
  verification: {
    google: "google-site-verification-code",
  },
  appleWebApp: {
    capable: true,
    title: sharedMetadata.title,
    statusBarStyle: "black-translucent",
  },
  other: {
    "msapplication-TileColor": "#1a1a1a",
    "mobile-web-app-capable": "yes",
  },
};

export const viewport = {
  themeColor: "#1a1a1a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};
