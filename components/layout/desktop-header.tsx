"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const LINKS = [
  { name: "Work", href: "/projects" },
  { name: "Resume", href: "/files/samuel-isah-resume.pdf", external: true },
];

export default function DesktopHeader() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 hidden justify-center pt-3 md:flex">
      <div
        className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/10 bg-[#141414]/70 p-1.5 pl-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        style={{ width: "min(629px, 100vw - 44px)" }}
      >
        <Link href="/" className="group flex items-center gap-2 pr-1">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-display text-[15px] leading-none text-white transition-opacity duration-200 group-hover:opacity-80">
            Samuel Isah
          </span>
        </Link>

        <span className="h-4 w-px bg-white/10" />

        <nav className="ml-auto flex items-center gap-1" aria-label="Main navigation">
          {LINKS.map(({ name, href, external }) => {
            const active = !external && isActive(href);
            return (
              <Link
                key={name}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors duration-200 select-none",
                  active ? "text-white" : "text-zinc-400 hover:text-zinc-100"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="desktop-nav-active-pill"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 38,
                      mass: 0.8,
                    }}
                    className="absolute inset-0 rounded-full bg-white/10"
                  />
                )}
                <span className="relative z-10">{name}</span>
              </Link>
            );
          })}

          <a
            href="mailto:samuelisah234@gmail.com"
            className="ml-1 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold text-[#141414] transition-transform duration-200 hover:scale-[1.03] active:scale-95"
          >
            Let&apos;s talk
          </a>
        </nav>
      </div>
    </header>
  );
}
