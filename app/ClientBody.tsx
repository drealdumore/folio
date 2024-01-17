"use client";

import { Analytics } from "@vercel/analytics/next";
import { useEffect } from "react";
import AppFooter from "@/components/layout/footer";
import AppNav from "@/components/layout/nav";
import Lenis from "lenis";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.body.className = "antialiased";

    const lenis = new Lenis({ autoRaf: true });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <body>
      <div
        className="relative font-sans max-w-2xl mx-auto antialiased"
        suppressHydrationWarning
      >
        <AppNav />

        <main className="px-4 sm:px-5 md:p-8 min-h-[100dvh] text-neutral-800  my-7 lg:pt-8 lg:py-20">
          {children}
        </main>

        <AppFooter />
      </div>
      <Analytics />
    </body>
  );
}
