"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import AppFooter from "@/components/layout/footer";
import AppNav from "@/components/layout/nav";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<{
    raf: (time: number) => void;
    destroy: () => void;
    scrollTo: (target: number, options?: any) => void;
  } | null>(null);
  const rafRef = useRef<number>(0);
  const pathname = usePathname();

  useEffect(() => {
    let mounted = true;

    const initLenis = async () => {
      if (typeof window === "undefined") return;

      const { default: LenisClass } = await import("lenis");

      if (!mounted) return;

      lenisRef.current = new LenisClass({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      function raf(time: number) {
        lenisRef.current?.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      }

      rafRef.current = requestAnimationFrame((time) => raf(time));
    };

    initLenis();

    return () => {
      mounted = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenisRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    document.body.className = "antialiased";
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <body>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-text-heading text-background px-4 py-2 rounded z-50"
      >
        Skip to main content
      </a>
      <div
        className="relative font-sans max-w-2xl mx-auto antialiased"
        suppressHydrationWarning
      >
        <AppNav />

        <main
          id="main-content"
          className="px-4 sm:px-5 md:p-8 min-h-[100dvh] text-neutral-800 my-7 lg:pt-8 lg:py-20"
          role="main"
        >
          {children}
        </main>

        <AppFooter />
      </div>
    </body>
  );
}
