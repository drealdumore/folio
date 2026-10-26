"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const VIEW_W = 1000;
const VIEW_H = 220;
const BASELINE = 178;
const FONT_SIZE = 200;
const TARGET_PITCH = 5;

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const lineVariants: Variants = {
  hidden: { y1: 0, y2: 0, transition: { duration: 0 } },
  visible: (delay: number) => ({
    y1: 0,
    y2: VIEW_H,
    transition: { delay, duration: 0.45, ease: "easeOut" },
  }),
};

function useColumnCount(
  ref: React.RefObject<HTMLDivElement | null>,
  frozen: boolean
) {
  const [columns, setColumns] = useState(120);
  const frozenRef = useRef(frozen);
  frozenRef.current = frozen;

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const measure = () => {
      if (frozenRef.current) return;
      const width = element.clientWidth;
      if (!width) return;
      const count = Math.round(width / TARGET_PITCH);
      setColumns(Math.min(Math.max(count, 80), 260));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return columns;
}

export function WordmarkLines({
  text = "SAMUEL",
  className,
}: {
  text?: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: false, amount: 0.35 });
  const columns = useColumnCount(containerRef, inView);
  const maskId = `wordmark-${useId().replace(/:/g, "")}`;

  const lines = useMemo(
    () =>
      Array.from({ length: columns }, (_, index) => {
        const progress = (index + 0.5) / columns;
        return {
          x: progress * VIEW_W,
          delay: progress * 0.7,
        };
      }),
    [columns]
  );

  const gridStep = Math.max(1, Math.round(columns / 42));
  const gridLines = useMemo(
    () => lines.filter((_, index) => index % gridStep === 0),
    [gridStep, lines]
  );

  return (
    <div ref={containerRef} className={cn("w-full", className)}>
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="block h-auto w-full overflow-visible"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={text}
      >
        <defs>
          <mask
            id={maskId}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={VIEW_W}
            height={VIEW_H}
          >
            <rect width={VIEW_W} height={VIEW_H} fill="black" />
            <text
              x={VIEW_W / 2}
              y={BASELINE}
              textAnchor="middle"
              fill="white"
              fontFamily='"Plus Jakarta Sans", "Geist", sans-serif'
              fontSize={FONT_SIZE}
              fontWeight={800}
              textLength={VIEW_W * 0.94}
              lengthAdjust="spacing"
            >
              {text}
            </text>
          </mask>
        </defs>

        <g
          className="stroke-zinc-800/50"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          aria-hidden="true"
        >
          {gridLines.map((line) => (
            <line
              key={line.x}
              x1={line.x}
              x2={line.x}
              y1={0}
              y2={VIEW_H}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>

        <g
          mask={`url(#${maskId})`}
          className="stroke-zinc-400/80"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <motion.g
            initial={reduceMotion ? false : "hidden"}
            animate={reduceMotion ? undefined : inView ? "visible" : "hidden"}
          >
            {lines.map((line) => (
              <motion.line
                key={line.x}
                x1={line.x}
                x2={line.x}
                y1={0}
                y2={0}
                custom={line.delay}
                variants={reduceMotion ? undefined : lineVariants}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </motion.g>
        </g>
      </svg>
    </div>
  );
}
