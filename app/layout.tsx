import { sharedMetadata } from "@/constants/shared-meta";
import { SOCIALS } from "@/constants/social-profiles";

import React from "react";
import type { Metadata } from "next";
import { Newsreader, Josefin_Sans } from "next/font/google";

import "./globals.css";
import ClientBody from "./ClientBody";

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  adjustFontFallback: false,
});

const josefin = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-josefin',
  display: 'swap',
  adjustFontFallback: false,
});


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${josefin.variable}`}
    >
      <head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#1a1a1a" />
      </head>
      <ClientBody>{children}</ClientBody>
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
    },
  },
  title: {
    default: sharedMetadata.title,
    template: `%s — ${sharedMetadata.title}`,
  },
  description: sharedMetadata.description,
  keywords: sharedMetadata.keywords,
  openGraph: {
    title: {
      default: sharedMetadata.title,
      template: `%s — ${sharedMetadata.title}`,
    },
    description: sharedMetadata.description,
    type: "website",
    url: sharedMetadata.url,
    siteName: sharedMetadata.title,
    locale: "en_IE",
    images: sharedMetadata.image,
    // images: sharedMetadata.url + "/api/og",
  },
  alternates: {
    canonical: "/",
  },
  twitter: {
    card: "summary_large_image",
    site: `@${SOCIALS.twitter.username}`,
    creator: `@${SOCIALS.twitter.username}`,
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
