"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";

import { SmallPing } from "@/components/design/ping";
import { AvatarTip } from "@/components/design/avatar-tip";
import { AnimatedSection } from "@/components/layout/animated-section";
import { useWebHaptics } from "web-haptics/react";

import { motion } from "framer-motion";

interface MagneticProps {
  children: React.ReactElement;
  strength?: number;
}

function Magnetic({ children, strength = 0.5 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current!.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

interface AvatarOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRect: DOMRect | null;
  imageSrc: string;
  imageAlt: string;
}

const AvatarOverlay: React.FC<AvatarOverlayProps> = ({
  isOpen,
  onClose,
  triggerRect,
  imageSrc,
  imageAlt,
}) => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (
      isOpen &&
      triggerRect &&
      containerRef.current &&
      backdropRef.current &&
      navRef.current &&
      closeBtnRef.current
    ) {
      document.body.style.overflow = "hidden";

      const vW = window.innerWidth;
      const vH = window.innerHeight;
      const centerX = vW / 2;
      const centerY = vH / 2;

      const originX = triggerRect.left + triggerRect.width / 2;
      const originY = triggerRect.top + triggerRect.height / 2;

      const dx = originX - centerX;
      const dy = originY - centerY;
      const startScale = triggerRect.width / 250;

      // 1. Hard reset to inverted state immediately (No layout transition)
      containerRef.current.style.transition = "none";
      containerRef.current.style.transform = `translate3d(calc(-50% + ${dx}px), calc(-50% + ${dy}px), 0) scale(${startScale})`;

      backdropRef.current.style.transition = "none";
      backdropRef.current.style.opacity = "0";
      backdropRef.current.style.backdropFilter = "blur(0px)";

      navRef.current.style.transition = "none";
      navRef.current.style.opacity = "0";
      navRef.current.style.transform = "translate3d(-50%, 15px, 0)";

      closeBtnRef.current.style.transition = "none";
      closeBtnRef.current.style.opacity = "0";

      // 2. Force layout paint calculation
      containerRef.current.getBoundingClientRect();

      // 3. Double frame pass to execute hardware-accelerated transitions
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (
            !containerRef.current ||
            !backdropRef.current ||
            !navRef.current ||
            !closeBtnRef.current
          )
            return;

          const transformCurve =
            "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)";
          const opacityCurve =
            "opacity 0.2s linear, backdrop-filter 0.2s linear";

          containerRef.current.style.transition = transformCurve;
          containerRef.current.style.transform =
            "translate3d(-50%, -50%, 0) scale(1)";

          backdropRef.current.style.transition = opacityCurve;
          backdropRef.current.style.opacity = "1";
          backdropRef.current.style.backdropFilter = "blur(12px)";

          navRef.current.style.transition =
            "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s linear";
          navRef.current.style.opacity = "1";
          navRef.current.style.transform = "translate3d(-50%, 0, 0)";

          closeBtnRef.current.style.transition = "opacity 0.2s linear";
          closeBtnRef.current.style.opacity = "1";
        });
      });
    }
  }, [isOpen, triggerRect]);

  const handleClose = () => {
    if (
      !triggerRect ||
      !containerRef.current ||
      !backdropRef.current ||
      !navRef.current ||
      !closeBtnRef.current
    ) {
      onClose();
      return;
    }

    const vW = window.innerWidth;
    const vH = window.innerHeight;
    const centerX = vW / 2;
    const centerY = vH / 2;

    const originX = triggerRect.left + triggerRect.width / 2;
    const originY = triggerRect.top + triggerRect.height / 2;

    const dx = originX - centerX;
    const dy = originY - centerY;
    const startScale = triggerRect.width / 250;

    const exitCurve = "transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)";
    const exitOpacity = "opacity 0.15s linear, backdrop-filter 0.15s linear";

    containerRef.current.style.transition = exitCurve;
    containerRef.current.style.transform = `translate3d(calc(-50% + ${dx}px), calc(-50% + ${dy}px), 0) scale(${startScale})`;

    backdropRef.current.style.transition = exitOpacity;
    backdropRef.current.style.opacity = "0";
    backdropRef.current.style.backdropFilter = "blur(0px)";

    navRef.current.style.transition =
      "transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.15s linear";
    navRef.current.style.opacity = "0";
    navRef.current.style.transform = "translate3d(-50%, 10px, 0)";

    closeBtnRef.current.style.opacity = "0";

    setTimeout(() => {
      document.body.style.overflow = "";
      onClose();
    }, 220);
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999]" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/50 origin-center will-change-[opacity,backdrop-filter]"
        onClick={handleClose}
      />

      {/* Dismiss Control */}
      <div className="absolute top-8 left-8 md:left-12 z-10">
        <button
          ref={closeBtnRef}
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white border border-white/5 shadow-sm"
          aria-label="Dismiss View"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Morphing image frame */}
      <div
        ref={containerRef}
        onClick={handleClose}
        className="fixed top-1/2 left-1/2 w-[250px] h-[250px] rounded-full overflow-hidden bg-[#dcdcdc] shadow-2xl cursor-zoom-out select-none touch-action-none will-change-transform"
        style={{
          transformOrigin: "center center",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={250}
          height={250}
          className="w-full h-full object-cover pointer-events-none select-none grayscale contrast-[1.05]"
          priority
          unoptimized
        />
      </div>

      {/* Persistent Nav Menu with Integrated Magnetic Elements */}
      <nav
        ref={navRef}
        onClick={(e) => e.stopPropagation()}
        className="fixed bottom-12 left-1/2 flex items-center justify-center px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg will-change-[transform,opacity]"
      >
        <div className="flex gap-6 py-1 cursor-pointer">
          <Magnetic strength={0.25}>
            <Link
              target="_blank"
              className="text-zinc-400 cursor-pointer hover:text-text-normal transition-all duration-300 flex items-center justify-center p-1"
              href="https://twitter.com/drealdumore"
              aria-label="Follow Samuel Isah on Twitter"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
              </svg>
            </Link>
          </Magnetic>

          <Magnetic strength={0.25}>
            <Link
              target="_blank"
              className="text-zinc-400 cursor-pointer hover:text-text-normal transition-all duration-300 flex items-center justify-center p-1"
              href="https://www.linkedin.com/in/samuel-isah"
              aria-label="Connect with Samuel Isah on LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2a2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6M2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </g>
              </svg>
            </Link>
          </Magnetic>

          <Magnetic strength={0.25}>
            <Link
              target="_blank"
              className="text-zinc-400 cursor-pointer hover:text-text-normal transition-all duration-300 flex items-center justify-center p-1"
              href="https://github.com/drealdumore"
              aria-label="View Samuel Isah's GitHub profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-github"
                aria-hidden="true"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
            </Link>
          </Magnetic>

          <Magnetic strength={0.25}>
            <Link
              target="_blank"
              className="text-zinc-400 cursor-pointer hover:text-text-normal transition-all duration-300 flex items-center justify-center p-1"
              href="mailto:samuelisah234@gmail.com"
              aria-label="Send an email to Samuel Isah"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-mail"
                aria-hidden="true"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </Link>
          </Magnetic>
        </div>
      </nav>
    </div>,
    document.body
  );
};

const Header = () => {
  const { trigger } = useWebHaptics();
  const [isOpen, setIsOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
  const originAvatarRef = useRef<HTMLDivElement>(null);

  const [showTip, setShowTip] = useState(false);
  const tipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const avatarSrc = "/avatars/avatar-smile.png";
  const avatarAlt = "Samuel Isah's profile photo";

  const dismissAvatarTip = useCallback(() => {
    if (tipTimerRef.current) {
      clearTimeout(tipTimerRef.current);
      tipTimerRef.current = null;
    }
    setShowTip(false);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const AVATAR_TIP_KEY = "folio:avatar-tip";

    let seen = false;
    try {
      seen = window.localStorage.getItem(AVATAR_TIP_KEY) === "1";
    } catch {
      /* noop */
    }
    if (seen) return;

    tipTimerRef.current = setTimeout(() => {
      setShowTip(true);
      try {
        window.localStorage.setItem(AVATAR_TIP_KEY, "1");
      } catch {
        /* noop */
      }
    }, 900);

    return () => {
      if (tipTimerRef.current) clearTimeout(tipTimerRef.current);
    };
  }, []);

  const handleAvatarClick = () => {
    dismissAvatarTip();
    if (originAvatarRef.current) {
      setTriggerRect(originAvatarRef.current.getBoundingClientRect());
    }
    trigger("light");
    setIsOpen(true);
  };

  return (
    <>
      <section>
        <div className="flex flex-col items-center justify-start md:gap-24 gap-16 w-full lg:justify-between lg:flex-row">
          <div className="flex flex-col lg:h-2/6 h-2/5 max-lg:w-full max-lg:flex">
            <AnimatedSection>
              <Magnetic strength={0.1}>
                <div
                  ref={originAvatarRef}
                  className="relative max-w-[130px] w-full flex-shrink-0 mb-8 cursor-pointer"
                  onClick={handleAvatarClick}
                  role="button"
                  tabIndex={0}
                  aria-label="View profile photo"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleAvatarClick();
                    }
                  }}
                  style={{ opacity: isOpen ? 0 : 1 }}
                >
                  <span className="group relative inline-flex">
                    <Image
                      src={avatarSrc}
                      className="tw-shadow aspect-square rounded-full bg-[#dcdcdc] transition-transform duration-500 hover:scale-105 size-[55px]"
                      alt={avatarAlt}
                      height={100}
                      width={100}
                      priority
                    />
{/*                     
                    <span
                      className={`pointer-events-none absolute top-1/2 left-[calc(100%+10px)] -translate-y-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#2b2b2b] px-2 py-1 text-xs font-medium text-text-normal shadow-md transition-all duration-200 ${
                        showTip
                          ? "opacity-0"
                          : "opacity-0 translate-x-1 group-hover:translate-x-0 group-hover:opacity-100"
                      }`}
                      role="tooltip"
                      aria-hidden="true"
                    >
                      View photo
                    </span> */}
                  </span>
                </div>
              </Magnetic>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>

            <div className="flex flex-col items-start gap-2">
  <h1 className="text-[22px] leading-[1.3] font-semibold tracking-[-0.02em] text-white lg:text-[28px]">
    Hey, I&apos;m Samuel Isah.
  </h1>
  <h1 className="text-xl leading-[1.3] tracking-[-0.02em] text-white lg:text-[26px] font-medium">
    Software Developer
  </h1>

  <div className="mt-1 flex items-center gap-1.5">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
    </span> 
    <span className="text-[13px] text-emerald-500 font-medium">Open to work</span>
  </div>

  <div className="mt-4 flex flex-col gap-4 text-[15px] leading-[1.65] text-zinc-400">

    <p>
      I build and Ship Web &amp; Mobile products across AI, developer tools,
      automation, and everyday problems worth solving.
    </p>

    <p>
      I&apos;m a Software Developer who enjoys taking ideas from “this could be useful” to something people can actually use. from React Native apps and AI-powered tools
      to backend systems and infrastructure.
    </p>

    <p>
      I&apos;ve built include{" "}
      <span className="text-white">Melo</span>, a private
      one-to-one chat app with real-time language translation,{" "}
      <span className="text-white">DropEnv</span>, an encrypted
      environment-variable sharing tool, and{" "}
      <span className="text-white">Chop Iron</span>, an offline-first
      fitness progress tracker.
    </p>

    <p>
      I work mainly with TypeScript, React Native, Expo, Node.js, Next.js, and Supabase, with a growing focus on backend systems, AI, developer tools and Automation.
    </p>
    <p>
     Currently looking for opportunities to work with ambitious teams and build useful products.
    </p>

    <p>
      You can find me on{" "}
      <a
        href="https://x.com/drealdumore"
        target="_blank"
        rel="noopener noreferrer"
        data-track="contact"
        data-target="X"
        className="text-white link-underline"
      >
        X
      </a>
      {" "}or check out my{" "}
      <a
        href="https://drealdumore.cv"
        target="_blank"
        rel="noopener noreferrer"
        data-track="contact"
        data-target="Portfolio"
        className="text-white link-underline"
      >
        projects
      </a>.
    </p>

  </div>
</div>
            </AnimatedSection>


            {/* <AnimatedSection delay={0.2}>
              <div className="flex items-center gap-x-3 mb-4">
                <Link
                  href="mailto:samuelisah234@gmail.com"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-500/15"
                  onClick={() => trigger("medium")}
                  aria-label="Available for work. Contact Samuel by email."
                >
                  <SmallPing />
                  <span>Available for work</span>
                  <span aria-hidden="true" className="text-emerald-400/60">·</span>
                  <span>Reach out</span>
                </Link>
              </div>
            </AnimatedSection> */}
  
          </div>
        </div>
      </section>

      <AvatarOverlay
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        triggerRect={triggerRect}
        imageSrc={avatarSrc}
        imageAlt={avatarAlt}
      />
    </>
  );
};

export default Header;
