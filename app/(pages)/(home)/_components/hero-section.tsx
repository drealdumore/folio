"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";

import { SmallPing } from "@/components/design/ping";
import { AnimatedSection } from "@/components/layout/animated-section";
import { useWebHaptics } from "web-haptics/react";

import { motion } from "framer-motion";

// ==========================================
// ELITE MAGNETIC MICRO-INTERACTION ENGINE
// ==========================================
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

// ==========================================
// INTERACTIVE FLIP AVATAR OVERLAY
// ==========================================
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

      // Reset magnetic offsets on opening sequence
      containerRef.current.style.setProperty("--mx", "0px");
      containerRef.current.style.setProperty("--my", "0px");

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
            "translate3d(calc(-50% + var(--mx, 0px)), calc(-50% + var(--my, 0px)), 0) scale(1)";

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

    // Smoothly clear magnetic variables so layout handles return trajectory accurately
    containerRef.current.style.setProperty("--mx", "0px");
    containerRef.current.style.setProperty("--my", "0px");

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

  // Raw inline performance variable tracking
  const handleAvatarMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { clientX, clientY } = e;
    const { width, height, left, top } =
      containerRef.current.getBoundingClientRect();

    const mx = (clientX - (left + width / 2)) * 0.8;
    const my = (clientY - (top + height / 2)) * 0.8;

    containerRef.current.style.setProperty("--mx", `${mx}px`);
    containerRef.current.style.setProperty("--my", `${my}px`);
    containerRef.current.style.transition = "none"; // Eliminates lag during manual track hooks
  };

  const handleAvatarMouseLeave = () => {
    if (!containerRef.current) return;

    // Smooth return transition curve
    containerRef.current.style.transition =
      "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)";
    containerRef.current.style.setProperty("--mx", "0px");
    containerRef.current.style.setProperty("--my", "0px");
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

      {/* Morph Layout Frame Node with Native Variables */}
      <div
        ref={containerRef}
        onClick={handleClose}
        onMouseMove={handleAvatarMouseMove}
        onMouseLeave={handleAvatarMouseLeave}
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
    document.body,
  );
};

const Header = () => {
  const { trigger } = useWebHaptics();
  const [isOpen, setIsOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
  const originAvatarRef = useRef<HTMLDivElement>(null);

  const avatarSrc = "/avatars/avatar-smile.png";
  const avatarAlt = "Samuel Isah's profile photo";

  const handleAvatarClick = () => {
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
              <Magnetic strength={0.4}>
                <div
                  ref={originAvatarRef}
                  className="max-w-[130px] w-full flex-shrink-0 mb-8 cursor-pointer"
                  onClick={handleAvatarClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleAvatarClick();
                    }
                  }}
                  style={{ opacity: isOpen ? 0 : 1 }}
                >
                  <Image
                    src={avatarSrc}
                    className="tw-shadow aspect-square rounded-full bg-[#dcdcdc] transition-transform duration-500 hover:scale-105 size-[55px]"
                    alt={avatarAlt}
                    height={100}
                    width={100}
                    priority
                  />
                </div>
              </Magnetic>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="flex items-center gap-x-3 mb-4">
                <p className="font-medium items-center gap-2 hidden md:flex text-text-normal text-[14px]">
                  Current Status:
                </p>

                <Link
                  href="mailto:samuelisah234@gmail.com"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="flex items-center justify-center gap-1.5"
                  onClick={() => trigger("medium")}
                >
                  <SmallPing />
                  <div className="relative cursor-pointer overflow-hidden">
                    <div className="group text-text-normal text-[14px]">
                      <span className="group-hover:-translate-y-full font-medium items-center text-emerald-700 flex flex-col transition-all duration-500 ease-slow">
                        Available for work
                        <span className="invisible h-0">Reach out</span>
                      </span>
                      <span className="group-hover:-translate-y-full absolute top-full flex items-center transition-all duration-500 ease-slow">
                        Reach out
                        <MailIcon />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="max-w-3xl">
                <h1
                  className="text-[20px] font-medium mt-6 text-text-heading"
                  style={{ fontFamily: "Gabarito" }}
                >
                  Hi, I&apos;m Samuel Isah
                </h1>
                <p
                  className="text-text-normal text-[15px] mt-2 md:mt-4 max-w-xl opacity-80"
                  role="text"
                >
                  Software Developer crafting fast, minimal web & mobile
                  experiences with care for the tiny details that make big
                  differences.
                </p>
              </div>
            </AnimatedSection>
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

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="ml-1 size-4"
  >
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);
