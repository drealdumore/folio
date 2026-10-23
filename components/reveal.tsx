"use client"

import React, { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

// Curves from easing.dev
export const easings = {
  outExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
  outQuart: "cubic-bezier(0.25, 1, 0.5, 1)",
  inOutCubic: "cubic-bezier(0.65, 0, 0.35, 1)",
} as const

type RevealState = "hidden" | "shown" | "instant"

interface RevealProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  /** seconds to wait before animating in */
  delay?: number
  /** seconds */
  duration?: number
  /** starting offset in px (positive = rises into place) */
  y?: number
  x?: number
  scale?: number
  easing?: string
  /** true = animate once, false = replay when re-entering */
  once?: boolean
  /** how far below the screen (in %) to start animating early */
  lead?: number
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  duration = 0.8,
  y = 20,
  x = 0,
  scale = 1,
  easing = easings.outExpo,
  once = true,
  lead = 15,
}) => {
  const ref = useRef<HTMLElement>(null)
  const [state, setState] = useState<RevealState>("hidden")

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // No observer support or reduced motion: just show everything
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setState("instant")
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // On screen (or just about to be): animate in
          setState("shown")
          if (once) observer.disconnect()
        } else if (entry.boundingClientRect.bottom <= 0) {
          // Already scrolled PAST it (fast scroll, anchor jump, refresh mid-page):
          // show it with no animation so you never land on blank space
          setState("instant")
          if (once) observer.disconnect()
        } else if (!once) {
          // Below the screen again: reset so it can replay
          setState("hidden")
        }
      },
      {
        threshold: 0, // first pixel triggers it, so tall sections are fine
        rootMargin: `0px 0px ${lead}% 0px`, // start before it enters the screen
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once, lead])

  const visible = state !== "hidden"

  return (
    <Tag
      ref={ref}
      className={cn(className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "none"
          : `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        transition:
          state === "instant"
            ? "none"
            : `opacity ${duration}s ${easing} ${state === "shown" ? delay : 0}s, transform ${duration}s ${easing} ${state === "shown" ? delay : 0}s`,
        willChange: visible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </Tag>
  )
}

/** Staggers its direct children automatically */
export const RevealGroup: React.FC<
  Omit<RevealProps, "delay" | "as"> & { stagger?: number; baseDelay?: number }
> = ({ children, stagger = 0.08, baseDelay = 0, className, ...rest }) => (
  <div className={className}>
    {React.Children.toArray(children).map((child, i) => (
      <Reveal key={i} delay={baseDelay + i * stagger} {...rest}>
        {child}
      </Reveal>
    ))}
  </div>
)