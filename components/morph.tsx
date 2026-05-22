"use client"

import React, { useEffect, useState, useRef, useMemo } from "react"
import { cn } from "@/lib/utils"

const morphTime = 0.5
const cooldownTime = 0.5

interface MorphProps {
  children: React.ReactNode
  className?: string
  duration?: number
  cooldown?: number
  delay?: number
}

export const Morph: React.FC<MorphProps> = ({
  children,
  className,
  duration = morphTime,
  cooldown = cooldownTime,
  delay = 0,
}) => {
  const childrenArray = useMemo(() => React.Children.toArray(children), [children])
  const [index, setIndex] = useState(0)
  const [fraction, setFraction] = useState(0)
  const [isStarted, setIsStarted] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef(0)

  const isEntrance = childrenArray.length === 1

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView) return
    const timer = setTimeout(() => {
      setIsStarted(true)
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [isInView, delay])

  useEffect(() => {
    if (!isStarted || childrenArray.length === 0) return

    let animationFrameId: number
    let startTime = performance.now()

    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000

      if (isEntrance) {
        const f = Math.min(elapsed / duration, 1)
        setFraction(f)
        if (f < 1) {
          animationFrameId = requestAnimationFrame(animate)
        }
      } else {
        const totalCycle = duration + cooldown
        const cycleElapsed = elapsed % totalCycle

        if (cycleElapsed < duration) {
          setFraction(cycleElapsed / duration)
        } else {
          setFraction(1)
        }

        const newIndex = Math.floor(elapsed / totalCycle) % childrenArray.length
        if (newIndex !== indexRef.current) {
          indexRef.current = newIndex
          setIndex(newIndex)
        }
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isStarted, isEntrance, childrenArray.length, duration, cooldown])

  const nextIndex = (index + 1) % childrenArray.length

  const getStyles = (f: number, isCurrent: boolean) => {
    const val = isCurrent ? 1 - f : f
    const opacity = Math.pow(val, 0.4)
    const blur = Math.min(8 / val - 8, 100)
    return {
      opacity: isStarted ? `${opacity * 100}%` : "0%",
      filter: isStarted ? `blur(${blur}px)` : "blur(100px)",
    }
  }

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div className="filter-[url(#threshold)_blur(0.6px)] relative w-full">
        {isEntrance ? (
          <div
            className="w-full"
            style={getStyles(fraction, false)} // Use the "fading in" style
          >
            {childrenArray[0]}
          </div>
        ) : (
          <>
            <div
              className="relative w-full"
              style={getStyles(fraction, true)}
            >
              {childrenArray[index]}
            </div>
            <div
              className="absolute inset-0 w-full"
              style={getStyles(fraction, false)}
            >
              {childrenArray[nextIndex]}
            </div>
          </>
        )}
      </div>
      <SvgFilters />
    </div>
  )
}

const SvgFilters: React.FC = () => (
  <svg
    id="filters"
    className="fixed h-0 w-0 pointer-events-none"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <filter id="threshold">
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
)


export interface MorphingTextProps {
  className?: string
  texts: string[]
}

export const MorphingText: React.FC<MorphingTextProps> = ({
  texts,
  className,
}) => (
  <div className="relative">
    <Morph
      className={cn(
        "mx-auto h-16 w-full max-w-3xl text-center font-sans text-[40pt] leading-none font-bold md:h-24 lg:text-[6rem]",
        className
      )}
    >
      {texts.map((text, i) => (
        <span key={i} className="inline-block w-full">
          {text}
        </span>
      ))}
    </Morph>
  </div>
)


