"use client"

import React, { useEffect, useId, useMemo, useRef } from "react"
import { cn } from "@/lib/utils"

const morphTime = 1.1
const cooldownTime = 1.4

interface MorphProps {
  children: React.ReactNode
  className?: string
  duration?: number
  cooldown?: number
  delay?: number
}

// easeInOutCubic, same curve as cubic-bezier(0.65, 0, 0.35, 1) on easing.dev
const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

// val: 0 = hidden, 1 = fully visible
const applyLayer = (el: HTMLDivElement | null, val: number) => {
  if (!el) return
  if (val <= 0.001) {
    el.style.visibility = "hidden"
    el.style.opacity = "0"
    el.style.filter = ""
  } else if (val >= 0.999) {
    el.style.visibility = "visible"
    el.style.opacity = "1"
    el.style.filter = ""
  } else {
    el.style.visibility = "visible"
    el.style.opacity = String(Math.pow(val, 0.4))
    el.style.filter = `blur(${Math.min(8 / val - 8, 100)}px)`
  }
}

export const Morph: React.FC<MorphProps> = ({
  children,
  className,
  duration = morphTime,
  cooldown = cooldownTime,
  delay = 0,
}) => {
  const childrenArray = useMemo(() => React.Children.toArray(children), [children])
  const count = childrenArray.length

  const containerRef = useRef<HTMLDivElement>(null)
  const gooRef = useRef<HTMLDivElement>(null)
  const layerRefs = useRef<(HTMLDivElement | null)[]>([])
  const filterId = `threshold-${useId().replace(/:/g, "")}`

  useEffect(() => {
    if (count === 0) return

    const layers = layerRefs.current
    const goo = gooRef.current
    layers.forEach((el) => applyLayer(el, 0))

    // Multiple words: show the first one right away, crisp
    if (count > 1) applyLayer(layers[0], 1)

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      applyLayer(layers[0], 1)
      return
    }

    let rafId = 0
    let timeoutId: ReturnType<typeof setTimeout> | undefined
    let gooOn = false

    // Threshold filter only while morphing -> resting text is never filtered
    const setGoo = (on: boolean) => {
      if (!goo || on === gooOn) return
      gooOn = on
      goo.style.filter = on ? `url(#${filterId})` : "none"
    }

    const start = () => {
      const startTime = performance.now()

      const tick = (now: number) => {
        const elapsed = (now - startTime) / 1000

        if (count === 1) {
          const f = Math.min(elapsed / duration, 1)
          setGoo(f < 1)
          applyLayer(layers[0], ease(f))
          if (f < 1) rafId = requestAnimationFrame(tick)
          return
        }

        const cycle = duration + cooldown
        const t = elapsed % cycle
        const idx = Math.floor(elapsed / cycle) % count
        const nextIdx = (idx + 1) % count
        const morphing = t < duration
        const f = morphing ? ease(t / duration) : 1

        setGoo(morphing)

        for (let i = 0; i < count; i++) {
          if (i === idx) applyLayer(layers[i], 1 - f)
          else if (i === nextIdx) applyLayer(layers[i], f)
          else applyLayer(layers[i], 0)
        }

        rafId = requestAnimationFrame(tick)
      }

      rafId = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        timeoutId = setTimeout(start, delay * 1000)
      },
      { threshold: 0.1 }
    )
    if (containerRef.current) observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
      if (timeoutId) clearTimeout(timeoutId)
      cancelAnimationFrame(rafId)
    }
  }, [count, duration, cooldown, delay, filterId])

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div ref={gooRef} className="relative grid w-full">
        {childrenArray.map((child, i) => (
          <div
            key={i}
            ref={(el) => {
              layerRefs.current[i] = el
            }}
            className="col-start-1 row-start-1 w-full"
            style={{ visibility: "hidden", opacity: 0 }}
          >
            {child}
          </div>
        ))}
      </div>

      <svg
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none absolute h-0 w-0"
      >
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -100"
            />
          </filter>
        </defs>
      </svg>
    </div>
  )
}
