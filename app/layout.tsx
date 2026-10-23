import { META as sharedMetadata, PROFILE, SOCIALS } from "@/content/site";

import React from "react";
import type { Metadata, Viewport } from "next";

import "./globals.css";
import ClientBody from "./ClientBody";
import { PostHogProviderWrapper } from "./providers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#1a1a1a" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: PROFILE.name,
              alternateName: PROFILE.handle,
              url: sharedMetadata.url,
              image: `${sharedMetadata.url}/api/og`,
              sameAs: [
                `https://twitter.com/${SOCIALS.twitter.username}`,
                `https://github.com/${SOCIALS.github.username}`,
                `https://linkedin.com/in/${SOCIALS.linkedin.username}`,
              ],
              jobTitle: PROFILE.role,
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
              knowsAbout: [
                "React",
                "Next.js",
                "React Native",
                "TypeScript",
                "Node.js",
                "Web Development",
                "Mobile Development",
                "UI/UX Design",
              ],
              description: sharedMetadata.description,
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: sharedMetadata.title,
              url: sharedMetadata.url,
              author: {
                "@type": "Person",
                name: PROFILE.name,
              },
              description: sharedMetadata.description,
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
    template: `%s | ${PROFILE.name}`,
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
      template: `%s | ${PROFILE.name}`,
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
    canonical: sharedMetadata.url,
  },
  twitter: {
    card: "summary_large_image",
    site: `@${SOCIALS.twitter.username}`,
    creator: `@${SOCIALS.twitter.username}`,
    title: sharedMetadata.title,
    description: sharedMetadata.description,
    images: [`${sharedMetadata.url}${sharedMetadata.image}`],
  },
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
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
