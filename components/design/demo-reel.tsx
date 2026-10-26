"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BlurUpImage } from "@/components/media/blur-up-image";
import { SmartVideo } from "@/components/media/smart-video";
import { BrowserFrame } from "@/components/design/browser-frame";
import { cn } from "@/lib/utils";
import type { CaseStudyDemo } from "@/content/site";

const CYCLE_MS = 2600;

const clamp = (value: number, max: number) => Math.max(0, Math.min(value, max));

export function DemoReel({
  demo,
  index,
  url,
  className,
}: {
  demo: CaseStudyDemo;
  index: number;
  url?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const screens = demo.screens;
  const last = Math.max(0, screens.length - 1);
  const hasVideo = Boolean(demo.video?.webm || demo.video?.mp4);
  const isWide = demo.layout === "wide" || hasVideo;
  const showDots = screens.length > 1 && !hasVideo;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || paused || !inView || screens.length < 2 || hasVideo) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current >= last ? 0 : current + 1));
    }, CYCLE_MS);

    return () => window.clearInterval(timer);
  }, [hasVideo, inView, last, paused, reduce, screens.length]);

  useEffect(() => {
    setActive(0);
  }, [demo]);

  if (screens.length === 0 && !hasVideo) return null;

  const currentScreen = screens[active];
  const video = demo.video;

  return (
    <figure
      ref={ref}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      className={cn(
        "overflow-hidden rounded-[14px] border border-zinc-800/70 bg-zinc-900/20",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-zinc-800/70 px-4 py-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-600">
          Demo {String(index + 1).padStart(2, "0")}
        </span>
        <span className="truncate text-[12px] text-zinc-500">{demo.title}</span>
      </div>

      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden",
          isWide
            ? "bg-surface p-3 sm:p-4"
            : "bg-[radial-gradient(circle_at_50%_25%,rgb(var(--zinc-800)/0.45),transparent_65%)] px-5 py-7 sm:py-9"
        )}
      >
        {hasVideo ? (
          <BrowserFrame url={url} className="w-full">
            <div className="relative aspect-[16/10] w-full bg-zinc-950">
              <SmartVideo
                webm={video?.webm}
                mp4={video?.mp4}
                poster={video?.poster}
                preload="metadata"
                aria-label={`${demo.title} demo`}
                controlsList="nodownload"
                disablePictureInPicture
                onContextMenu={(event) => event.preventDefault()}
                className="h-full w-full object-cover"
              />
            </div>
          </BrowserFrame>
        ) : isWide ? (
          <BrowserFrame url={url} className="w-full">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={currentScreen?.src}
                  initial={reduce ? false : { opacity: 0, scale: 1.015 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.45, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <BlurUpImage
                    src={currentScreen.src}
                    alt={currentScreen.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover object-top"
                    priority={index === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </BrowserFrame>
        ) : (
          <div className="flex flex-col items-center">
            <div className="relative aspect-[9/19] w-[190px] overflow-hidden rounded-[28px] border border-zinc-700/80 bg-zinc-950 p-1.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] sm:w-[218px]">
              <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-zinc-900">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.div
                    key={currentScreen?.src}
                    initial={reduce ? false : { opacity: 0, scale: 1.015 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{
                      duration: reduce ? 0 : 0.45,
                      ease: "easeOut",
                    }}
                    className="absolute inset-0"
                  >
                    <BlurUpImage
                      src={currentScreen.src}
                      alt={currentScreen.alt}
                      fill
                      sizes="218px"
                      className="object-cover"
                      priority={index === 0}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {showDots && (
              <div
                className="mt-4 flex items-center gap-1.5"
                aria-label={`${demo.title} screens`}
              >
                {screens.map((screen, i) => (
                  <button
                    key={screen.src}
                    type="button"
                    onClick={() => setActive(clamp(i, last))}
                    aria-label={`Show ${screen.alt}`}
                    aria-current={active === i}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      active === i
                        ? "w-5 bg-zinc-300"
                        : "w-1.5 bg-zinc-700 hover:bg-zinc-500"
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <figcaption className="border-t border-zinc-800/70 px-4 py-3 text-[13px] leading-[1.6] text-zinc-500">
        {demo.caption}
      </figcaption>
    </figure>
  );
}
