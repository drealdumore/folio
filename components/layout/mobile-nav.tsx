"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { useWebHaptics } from "web-haptics/react";
import { cn } from "@/lib/utils";
import { SOCIALS } from "@/constants/social-profiles";

const TABS = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Resume", href: "/files/samuel-isah-resume.pdf", external: true },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { trigger } = useWebHaptics();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const copyTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const close = useCallback(() => {
    try {
      trigger("light");
    } catch {}
    setIsOpen(false);
  }, [trigger]);

  const copyEmail = useCallback(() => {
    const email = "samuelisah234@gmail.com";
    void navigator.clipboard?.writeText(email);
    setCopied(true);
    try {
      trigger("success");
    } catch {}
    clearTimeout(copyTimeout.current);
    copyTimeout.current = setTimeout(() => setCopied(false), 2400);
  }, [trigger]);

  useEffect(() => () => clearTimeout(copyTimeout.current), []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    window.addEventListener("keydown", handleKey);
    window.addEventListener("mousedown", handleClick);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("mousedown", handleClick);
    };
  }, [isOpen, close]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Dim backdrop overlay on open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] pointer-events-auto md:hidden"
          />
        )}
      </AnimatePresence>

      <MotionConfig transition={{ type: "spring", stiffness: 450, damping: 35, mass: 0.8 }}>
        <nav className="fixed inset-x-0 bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] z-50 flex justify-center md:hidden pointer-events-none px-4">
          <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/10 bg-[#141414]/90 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            {TABS.map((tab) => {
              const active = !tab.external && isActive(tab.href);
              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  target={tab.external ? "_blank" : undefined}
                  rel={tab.external ? "noopener noreferrer" : undefined}
                  onClick={() => {
                    try {
                      trigger("selection");
                    } catch {}
                    if (tab.href === pathname) {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={cn(
                    "relative px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200 select-none",
                    active ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="mobile-nav-active-pill"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 38,
                        mass: 0.8,
                      }}
                      className="absolute inset-0 rounded-full bg-white/15 shadow-inner"
                    />
                  )}
                  <span className="relative z-10">{tab.name}</span>
                </Link>
              );
            })}

            {/* Morphing Contact Button / Dialog */}
            <div ref={containerRef} className="relative flex items-center">
              {/* Invisible footprint spacer inside the pill */}
              <div className="h-[29px] px-3.5 text-[13px] font-medium invisible select-none pointer-events-none flex items-center">
                Contact
              </div>

              <motion.div
                layout
                aria-label={isOpen ? "Contact" : undefined}
                role={isOpen ? "dialog" : undefined}
                className={cn(
                  "overflow-hidden border border-white/10 bg-[#181818] text-white shadow-2xl transition-[background-color,border-color] duration-150",
                  isOpen
                    ? "fixed inset-x-0 bottom-24 mx-auto w-[290px] max-w-[calc(100vw-2rem)] p-2 z-50 backdrop-blur-2xl"
                    : "absolute right-0 bottom-0 top-0 flex items-center hover:bg-white/10"
                )}
                style={{
                  borderRadius: isOpen ? 16 : 9999,
                }}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="panel"
                      layout="position"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.12 }}
                      className="p-1"
                    >
                      <div className="flex items-center justify-between mb-3 px-1">
                        <span className="text-[13px] font-semibold text-zinc-200">Contact</span>
                        <button
                          type="button"
                          onClick={close}
                          aria-label="Close contact dialog"
                          className="size-6 flex items-center justify-center rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        {/* Left Column: Social Links */}
                        <div className="flex flex-col gap-1">
                          <a
                            href={SOCIALS.twitter.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              try {
                                trigger("selection");
                              } catch {}
                            }}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors text-zinc-300 hover:text-white text-[12px] font-medium"
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-zinc-400 shrink-0"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                              <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                              <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                            </svg>
                            <span>X (Twitter)</span>
                          </a>

                          <a
                            href={SOCIALS.github.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              try {
                                trigger("selection");
                              } catch {}
                            }}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors text-zinc-300 hover:text-white text-[12px] font-medium"
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-zinc-400 shrink-0"
                            >
                              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                              <path d="M9 18c-4.51 2-5-2-7-2" />
                            </svg>
                            <span>GitHub</span>
                          </a>

                          <a
                            href={SOCIALS.linkedin.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              try {
                                trigger("selection");
                              } catch {}
                            }}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors text-zinc-300 hover:text-white text-[12px] font-medium"
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-zinc-400 shrink-0"
                            >
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2a2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                              <rect width="4" height="12" x="2" y="9" />
                              <circle cx="4" cy="4" r="2" />
                            </svg>
                            <span>LinkedIn</span>
                          </a>
                        </div>

                        {/* Right Column: Featured Copy Email Card */}
                        <button
                          type="button"
                          onClick={copyEmail}
                          aria-label={copied ? "Email copied" : "Copy email"}
                          className="flex flex-col justify-between rounded-xl bg-white/5 p-3 text-left hover:bg-white/10 transition-colors cursor-pointer border border-white/5"
                        >
                          <div className="flex items-center justify-between w-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-zinc-400"
                            >
                              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </svg>
                            {copied && (
                              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                                ✓
                              </span>
                            )}
                          </div>
                          <div className="mt-4">
                            <AnimatePresence mode="wait" initial={false}>
                              <motion.span
                                key={copied ? "copied" : "copy"}
                                initial={{ opacity: 0, y: 3 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -3 }}
                                transition={{ duration: 0.15 }}
                                className="block text-[12px] font-medium text-zinc-200"
                              >
                                {copied ? "Email Copied!" : "Copy Email"}
                              </motion.span>
                            </AnimatePresence>
                            <span className="block text-[10px] text-zinc-500 truncate mt-0.5">
                              samuelisah234@gmail.com
                            </span>
                          </div>
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.button
                      type="button"
                      key="button"
                      layout="position"
                      onClick={() => {
                        try {
                          trigger("selection");
                        } catch {}
                        setIsOpen(true);
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                      className="h-full px-3.5 py-1.5 text-[13px] font-medium leading-none text-zinc-400 hover:text-white whitespace-nowrap flex items-center cursor-pointer select-none rounded-full"
                    >
                      Contact
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </nav>
      </MotionConfig>
    </>
  );
}
