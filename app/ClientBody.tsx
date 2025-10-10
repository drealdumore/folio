"use client";

import { useEffect } from "react";
import AppFooter from "@/components/layout/footer";
import AppNav from "@/components/layout/nav";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.body.className = "antialiased";
  }, []);

  return (
    <body>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-text-heading text-background px-4 py-2 rounded z-50">
        Skip to main content
      </a>
      <div
        className="relative font-sans max-w-2xl mx-auto antialiased"
        suppressHydrationWarning
      >
        <AppNav />

        <main id="main-content" className="px-4 sm:px-5 md:p-8 min-h-[100dvh] text-neutral-800 my-7 lg:pt-8 lg:py-20" role="main">
          {children}
        </main>

        <AppFooter />
      </div>

    </body>
  );
}
