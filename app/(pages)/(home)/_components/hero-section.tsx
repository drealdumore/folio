"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";

import { AnimatedSection } from "@/components/layout/animated-section";
import { ArrowIcon } from "@/components/design/arrow-icon";
import { LiveClock } from "@/components/design/live-clock";
import { useWebHaptics } from "web-haptics/react";
import {
  COMPANIES,
  CompanyLink,
  HERO_CTAS,
  GREETINGS,
  PROFILE,
  SOCIALS,
} from "@/content/site";

import { motion } from "framer-motion";

/** Picks a greeting based on the visitor's local clock. */
function useTimeGreeting() {
  const [greeting, setGreeting] = useState(PROFILE.greeting);

  useEffect(() => {
    const compute = () => {
      const hour = new Date().getHours();
      setGreeting(
        hour < 5
          ? GREETINGS.night
          : hour < 12
            ? GREETINGS.morning
            : hour < 18
              ? GREETINGS.afternoon
              : GREETINGS.evening,
      );
    };
    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, []);

  return greeting;
}

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

type IconProps = { size?: number };

const GitHubIcon = ({ size = 14 }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedInIcon = ({ size = 14 }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2a2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6" />
    <circle cx="4" cy="4" r="2" />
    <path d="M2 9h4v12H2z" />
  </svg>
);

const XIcon = ({ size = 14 }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 512 512"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
  </svg>
);

const MailIcon = ({ size = 14 }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const ResumeIcon = ({ size = 14 }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M8 13h8M8 17h5" />
  </svg>
);

const ArrowUpRightIcon = ({ size = 14 }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

function CompanyMention({ company }: { company: CompanyLink }) {
  const content = (
    <>
      <span
        aria-hidden="true"
        className="inline-flex size-[17px] shrink-0 items-center justify-center rounded-[4px] text-[7px] font-bold tracking-tight text-white"
        style={{
          backgroundImage: `linear-gradient(135deg, ${company.accent[0]}, ${company.accent[1]})`,
        }}
      >
        {company.initials}
      </span>
      <span>{company.name}</span>
    </>
  );

  const triggerClassName =
    "inline-flex items-center gap-1 font-medium text-text-heading decoration-zinc-500 underline-offset-4 transition-colors hover:underline focus-visible:underline";

  return (
    <span className="group/company relative inline-flex whitespace-nowrap">
      {company.href ? (
        <Link
          href={company.href}
          target="_blank"
          rel="noopener noreferrer"
          className={triggerClassName}
        >
          {content}
        </Link>
      ) : (
        <span className={triggerClassName}>{content}</span>
      )}

      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 hidden w-64 origin-bottom -translate-x-1/2 translate-y-1 scale-95 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 opacity-0 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.65)] transition-[opacity,transform] duration-200 ease-out group-hover/company:translate-y-0 group-hover/company:scale-100 group-hover/company:opacity-100 group-hover/company:delay-75 group-focus-within/company:translate-y-0 group-focus-within/company:scale-100 group-focus-within/company:opacity-100 [@media(pointer:fine)]:block"
      >
        <span className="block aspect-[16/10] overflow-hidden bg-zinc-900">
          {company.preview ? (
            <Image
              src={company.preview}
              alt=""
              width={256}
              height={160}
              className="size-full object-cover object-top"
            />
          ) : (
            <span
              className="flex size-full items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(135deg, ${company.accent[0]}, ${company.accent[1]})`,
              }}
            >
              <span className="text-[30px] font-semibold tracking-tight text-white/95">
                {company.initials}
              </span>
            </span>
          )}
        </span>
        <span className="flex items-center justify-between gap-3 border-t border-zinc-800 px-3 py-2.5 text-xs whitespace-normal">
          <span className="flex flex-col gap-0.5">
            <span className="font-medium text-text-heading">
              {company.domain}
            </span>
            <span className="text-zinc-500">{company.description}</span>
          </span>
          <span className="shrink-0 text-zinc-500">
            <ArrowUpRightIcon />
          </span>
        </span>
      </span>
    </span>
  );
}

interface SocialPillProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
  onClick?: () => void;
}

function SocialPill({
  href,
  label,
  icon,
  external = true,
  onClick,
}: SocialPillProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="group/pill inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/40 px-3 py-1.5 text-[13px] text-zinc-400 transition-colors duration-200 hover:border-zinc-600 hover:bg-zinc-900 hover:text-text-heading focus-visible:border-zinc-500 focus-visible:text-text-heading"
    >
      <span className="text-zinc-500 transition-colors duration-200 group-hover/pill:text-text-heading">
        {icon}
      </span>
      {label}
    </Link>
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
          className="theme-dark-surface group flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white border border-white/5 shadow-sm"
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
          sizes="250px"
          priority
        />
      </div>

      {/* Persistent Nav Menu with Integrated Magnetic Elements */}
      <nav
        ref={navRef}
        onClick={(e) => e.stopPropagation()}
        className="fixed bottom-12 left-1/2 flex items-center justify-center px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg will-change-[transform,opacity]"
      >
        <div className="flex gap-6 py-1 cursor-pointer">
          {[
            {
              key: "github",
              href: SOCIALS.github.url,
              label: "GitHub",
              ariaLabel: `${PROFILE.name} on ${SOCIALS.github.label}`,
              icon: <GitHubIcon size={16} />,
              external: true,
            },
            {
              key: "linkedin",
              href: SOCIALS.linkedin.url,
              label: "LinkedIn",
              ariaLabel: `${PROFILE.name} on ${SOCIALS.linkedin.label}`,
              icon: <LinkedInIcon size={16} />,
              external: true,
            },
            {
              key: "x",
              href: SOCIALS.twitter.url,
              label: "X",
              ariaLabel: `${PROFILE.name} on ${SOCIALS.twitter.label}`,
              icon: <XIcon size={16} />,
              external: true,
            },
            {
              key: "email",
              href: `mailto:${PROFILE.email}`,
              label: "Email",
              ariaLabel: `Email ${PROFILE.name}`,
              icon: <MailIcon size={16} />,
              external: false,
            },
            {
              key: "resume",
              href: PROFILE.resume,
              label: HERO_CTAS.resume,
              ariaLabel: `${PROFILE.name}'s ${HERO_CTAS.resume}`,
              icon: <ResumeIcon size={16} />,
              external: true,
            },
          ].map((link) => (
            <Magnetic key={link.key} strength={0.25}>
              <Link
                href={link.href}
                title={link.label}
                aria-label={link.ariaLabel}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="text-zinc-400 cursor-pointer hover:text-text-normal transition-all duration-300 flex items-center justify-center p-1"
              >
                {link.icon}
              </Link>
            </Magnetic>
          ))}
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
  const [preloadAvatar, setPreloadAvatar] = useState(false);
  const originAvatarRef = useRef<HTMLDivElement>(null);
  const greeting = useTimeGreeting();

  const [showTip, setShowTip] = useState(false);
  const tipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const avatarSrc = PROFILE.avatar;
  const avatarAlt = PROFILE.avatarAlt;

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

  useEffect(() => {
    if (typeof window === "undefined") return;

    type IdleWindow = Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const idleWindow = window as IdleWindow;

    if (idleWindow.requestIdleCallback) {
      const id = idleWindow.requestIdleCallback(() => setPreloadAvatar(true), {
        timeout: 2000,
      });
      return () => idleWindow.cancelIdleCallback?.(id);
    }

    const id = setTimeout(() => setPreloadAvatar(true), 1200);
    return () => clearTimeout(id);
  }, []);

  const handleAvatarClick = () => {
    dismissAvatarTip();
    setPreloadAvatar(true);
    if (originAvatarRef.current) {
      setTriggerRect(originAvatarRef.current.getBoundingClientRect());
    }
    trigger("light");
    setIsOpen(true);
  };

  return (
    <>
      <section>
        <div className="flex w-full flex-col items-start gap-8">
          <AnimatedSection>
            <Magnetic strength={0.1}>
              <div
                ref={originAvatarRef}
                className="relative w-full max-w-[130px] flex-shrink-0 cursor-pointer"
                onClick={handleAvatarClick}
                onPointerEnter={() => setPreloadAvatar(true)}
                onFocus={() => setPreloadAvatar(true)}
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
                    className="aspect-square rounded-full bg-[#dcdcdc] transition-transform duration-500 hover:scale-105 size-[55px] object-cover grayscale"
                    alt={avatarAlt}
                    height={100}
                    width={100}
                    priority
                  />
                </span>
              </div>
            </Magnetic>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="flex flex-col items-start gap-2">
              <h1 className="font-display text-[24px] leading-[1.3] font-semibold tracking-[-0.02em] text-text-heading lg:text-[28px]">
                {PROFILE.greeting}
              </h1>
              <h2 className="text-[15px] leading-[1.4] tracking-[-0.01em] text-zinc-400 lg:text-[16px] font-normal p-0">
                {PROFILE.role}
              </h2>

              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[13px] text-emerald-500 font-medium">
                {PROFILE.availability}
              </span>
                <span className="text-[13px] text-zinc-700">·</span>
                <LiveClock className="text-[13px] text-zinc-500" />
              </div>

              <p className="mt-4 max-w-xl text-sm/6 text-zinc-400 md:text-[15px]/[26px]">
                {PROFILE.tagline}
              </p>

              {/* <p className="mt-3 max-w-xl text-[15px] leading-[1.65] text-zinc-400">
                Right now I&apos;m building mobile features at{" "}
                <CompanyMention company={COMPANIES.current[0]} /> and front-end
                work at <CompanyMention company={COMPANIES.current[1]} />.
                I&apos;ve also shipped storefronts and sites for{" "}
                <CompanyMention company={COMPANIES.past[0]} /> and{" "}
                <CompanyMention company={COMPANIES.past[1]} />.
              </p> */}


              <div className="mt-4 flex flex-wrap items-center gap-2">
                <SocialPill
                  href={SOCIALS.github.url}
                  label={SOCIALS.github.label}
                  icon={<GitHubIcon />}
                  onClick={() => trigger("light")}
                />
                <SocialPill
                  href={SOCIALS.linkedin.url}
                  label={SOCIALS.linkedin.label}
                  icon={<LinkedInIcon />}
                  onClick={() => trigger("light")}
                />
                <SocialPill
                  href={SOCIALS.twitter.url}
                  label="X"
                  icon={<XIcon />}
                  onClick={() => trigger("light")}
                />
                <SocialPill
                  href={`mailto:${PROFILE.email}`}
                  label="Email"
                  icon={<MailIcon />}
                  external={false}
                  onClick={() => trigger("light")}
                />
                <SocialPill
                  href={PROFILE.resume}
                  label="Résumé"
                  icon={<ResumeIcon />}
                  onClick={() => trigger("light")}
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/projects"
                  onClick={() => trigger("light")}
                  className="group inline-flex items-center gap-2 rounded-full bg-text-heading px-5 py-2.5 text-[14px] font-medium text-background transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
                >
                  {HERO_CTAS.primary}
                  <ArrowIcon size={14} />
                </Link>

                {/* <Link
                  href={PROFILE.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trigger("light")}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-5 py-2.5 text-[14px] font-medium text-zinc-300 transition-colors duration-200 hover:border-zinc-500 hover:text-text-heading"
                >
                  {HERO_CTAS.resume}
                </Link> */}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {preloadAvatar && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed top-0 -left-[9999px] h-px w-px overflow-hidden opacity-0"
        >
          <Image
            src={avatarSrc}
            alt=""
            width={250}
            height={250}
            sizes="250px"
            loading="eager"
          />
        </div>
      )}

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
