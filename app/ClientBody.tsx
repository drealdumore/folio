"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import AppFooter from "@/components/layout/footer";
import MobileNav from "@/components/layout/mobile-nav";
import DesktopHeader from "@/components/layout/desktop-header";
import MusicToggle from "@/components/layout/music-toggle";
import { ProgressiveBlur } from "@/components/blur";
import { preloadAppImages } from "@/lib/prefetch";

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

  // Preload every app image once the initial render is done.
  useEffect(() => {
    const start = () => preloadAppImages();
    if (document.readyState === "complete") {
      const idle = requestIdleCallback(() => preloadAppImages());
      return () => cancelIdleCallback(idle);
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
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
      <DesktopHeader />
      <div
        style={{
          width: "min(629px, 100vw - 44px)",
          margin: "0 auto",
          padding: "0 0 88px",
        }}
        suppressHydrationWarning
      >
        <main id="main-content" className="my-7 md:pt-20 lg:pb-20" role="main">
          {children}
        </main>

        <AppFooter />
        <MobileNav />
        <MusicToggle />
        <ProgressiveBlur
          position="bottom"
          height="8vh"
          className="fixed z-[40]"
        />
      </div>
      <Analytics />
    </body>
  );
}
