"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HEADER_LINKS, NAV, PROFILE } from "@/content/site";

const LINKS = HEADER_LINKS;

export default function DesktopHeader() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    lastY.current = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;

        if (Math.abs(delta) > 4) {
          if (y > 140 && delta > 0) {
            setHidden(true);
          } else if (delta < 0) {
            setHidden(false);
          }
          lastY.current = y;
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 hidden justify-center pt-3 md:flex">
      <div
        className={cn(
          "flex items-center gap-3 transition-[transform,opacity] duration-300 ease-out",
          hidden
            ? "pointer-events-none -translate-y-[130%] opacity-0"
            : "pointer-events-auto translate-y-0 opacity-100"
        )}
        style={{ width: "min(720px, 100vw - 44px)" }}
      >
        {/* Left: brand */}
        <div className="flex flex-1 items-center">
          <Link
            href="/"
            aria-label={`${PROFILE.name} — Home`}
            className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-[#141414]/40 py-1 pl-1 pr-1 lg:pr-3 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-2xl backdrop-saturate-150"
          >
            <span className="relative flex h-7 w-7 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10 transition-transform duration-200 group-hover:scale-105">
              <Image
                src={PROFILE.avatar}
                alt={PROFILE.avatarAlt}
                fill
                sizes="28px"
                className="object-cover"
              />
            </span>
            <span className="hidden font-display text-[15px] leading-none text-white transition-opacity duration-200 group-hover:opacity-80 lg:block">
              {PROFILE.name}
            </span>
          </Link>
        </div>

        {/* Center: nav pill */}
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-[#141414]/40 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-2xl backdrop-saturate-150 glass-nav">
            {LINKS.map(({ name, href, external }) => {
              const active = !external && isActive(href);
              return (
                <li key={name} className="shrink-0">
                  <Link
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className={cn(
                      "relative block rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200 select-none",
                      active
                        ? "text-emerald-400"
                        : "text-zinc-400 hover:text-emerald-400"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="desktop-nav-active-underline"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 38,
                          mass: 0.8,
                        }}
                        className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-emerald-400/0 via-emerald-400/40 to-emerald-400/0"
                      />
                    )}
                    <span className="relative z-10">{name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right: CTA */}
        <div className="flex flex-1 justify-end">
          <a
            href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-[13px] font-semibold text-[#141414] transition-transform duration-200 hover:scale-[1.03] active:scale-95"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            {NAV.letsTalk}
          </a>
        </div>
      </div>
    </header>
  );
}