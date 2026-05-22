"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import AppFooter from "@/components/layout/footer";
import AppNav from "@/components/layout/nav";
import { ProgressiveBlur } from "@/components/blur";

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
      <div
        style={{
          width: "100%",
          maxWidth: "710px",
          padding: "0px 24px 16px",
          margin: "0px auto",
        }}
        suppressHydrationWarning
      >
        <AppNav />

        <main
          id="main-content"
          className="my-7 lg:pt-8 lg:py-20"
          role="main"
        >
          {children}
        </main>

        <AppFooter />
      <ProgressiveBlur position="bottom" height="8vh" className="fixed z-[50]" />
      </div>
      <Analytics />
    </body>
  );
}
