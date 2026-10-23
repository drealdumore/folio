"use client"

import React, { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

// Curves from easing.dev (standard values, pick one per use)
export const easings = {
  outExpo: "cubic-bezier(0.16, 1, 0.3, 1)", // fast start, very soft landing (default)
  outQuart: "cubic-bezier(0.25, 1, 0.5, 1)", // a bit more gentle
  inOutCubic: "cubic-bezier(0.65, 0, 0.35, 1)", // symmetrical
} as const

interface RevealProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  /** seconds to wait before animating */
  delay?: number
  /** seconds */
  duration?: number
  /** starting offset in px (positive = rises up into place) */
  y?: number
  /** starting offset in px on the x axis */
  x?: number
  /** starting scale, 1 = none */
  scale?: number
  easing?: string
  /** animate only the first time it enters the viewport */
  once?: boolean
  /** 0-1, how much must be visible before it triggers */
  threshold?: number
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  duration = 0.9,
  y = 24,
  x = 0,
  scale = 1,
  easing = easings.outExpo,
  once = true,
  threshold = 0.15,
}) => {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setShown(false)
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [once, threshold])

  return (
    <Tag
      ref={ref}
      className={cn(className)}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown
          ? "none"
          : `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        transition: `opacity ${duration}s ${easing} ${delay}s, transform ${duration}s ${easing} ${delay}s`,
        willChange: shown ? "auto" : "opacity, transform",
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