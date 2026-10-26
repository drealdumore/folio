"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  type Variants,
  motion,
  useAnimate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const SNIP_MS = 220;
const IDLE_SWING = { duration: 1.8, ease: "easeInOut", repeat: Infinity } as const;
const SNIP_SWING = { duration: SNIP_MS / 1000, ease: "easeInOut" } as const;

const SnipContext = createContext<(durationMs?: number) => void>(() => {});

function seeded(index: number, salt: number) {
  const x = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function Blade({
  side,
  stroke,
  strokeWidth,
  reduceMotion,
}: {
  side: "a" | "b";
  stroke: string;
  strokeWidth: number;
  reduceMotion: boolean;
}) {
  const open = side === "a" ? -5 : 5;
  return (
    <motion.g
      className={`scissors-blade scissors-blade-${side}`}
      animate={reduceMotion ? undefined : { rotate: [0, open, 0] }}
      transition={reduceMotion ? undefined : IDLE_SWING}
    >
      <path
        d={
          side === "a"
            ? "M7.6 2.8 L12 13 L13.9 15.7"
            : "M16.4 2.8 L12 13 L10.1 15.7"
        }
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={side === "a" ? 15.4 : 8.6}
        cy={17.8}
        r={2.6}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </motion.g>
  );
}

const cursorStyles = `
html, html * { cursor: none !important; }
.scissors-follower { position: fixed; left: 0; top: 0; z-index: 9999; pointer-events: none; will-change: transform; }
.scissors-follower svg { display: block; transform: translate(-10px, -3px) rotate(-40deg); transform-origin: 10px 3px; }
.scissors-blade { transform-box: view-box; transform-origin: 12px 13px; }
`;

export default function ScissorsCursor({ children }: { children?: ReactNode }) {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduceMotion = useReducedMotion() ?? false;
  const [scope, animate] = useAnimate<SVGSVGElement>();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);

  const snip = useCallback(
    (durationMs = SNIP_MS) => {
      if (reduceMotion || !scope.current) return;
      const repeat = Math.max(0, Math.round(durationMs / SNIP_MS) - 1);
      animate(
        ".scissors-blade-a",
        { rotate: [0, -16, 0] },
        { ...SNIP_SWING, repeat }
      );
      animate(
        ".scissors-blade-b",
        { rotate: [0, 16, 0] },
        { ...SNIP_SWING, repeat }
      ).then(() => {
        animate(".scissors-blade-a", { rotate: [0, -5, 0] }, IDLE_SWING);
        animate(".scissors-blade-b", { rotate: [0, 5, 0] }, IDLE_SWING);
      });
    },
    [animate, reduceMotion, scope]
  );

  useEffect(() => {
    if (!finePointer) return;
    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      opacity.set(1);
    };
    const hide = () => opacity.set(0);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", hide);
    document.documentElement.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", hide);
      document.documentElement.removeEventListener("mouseleave", hide);
    };
  }, [finePointer, x, y, opacity]);

  return (
    <SnipContext.Provider value={snip}>
      {children}
      {finePointer && (
        <>
          <style>{cursorStyles}</style>
          <motion.div
            className="scissors-follower"
            style={{ x, y, opacity }}
            aria-hidden="true"
          >
            <svg
              ref={scope}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <Blade
                side="a"
                stroke="white"
                strokeWidth={4.6}
                reduceMotion={reduceMotion}
              />
              <Blade
                side="b"
                stroke="white"
                strokeWidth={4.6}
                reduceMotion={reduceMotion}
              />
              <Blade
                side="a"
                stroke="black"
                strokeWidth={2}
                reduceMotion={reduceMotion}
              />
              <Blade
                side="b"
                stroke="black"
                strokeWidth={2}
                reduceMotion={reduceMotion}
              />
            </svg>
          </motion.div>
        </>
      )}
    </SnipContext.Provider>
  );
}

const CHAR_STAGGER = 0.03;
const CUT_DURATION = 0.65;
const HOLD = 0.4;
const RETURN_STAGGER = 0.012;
const RETURN_DURATION = 0.35;

type CharMotion = { index: number; dx: number; dy: number; rot: number };

const charVariants: Variants = {
  idle: { x: 0, y: 0, rotate: 0, opacity: 1, transition: { duration: 0 } },
  cut: ({ index, dx, dy, rot }: CharMotion) => ({
    x: [0, dx * 0.12, dx],
    y: [0, -4, dy],
    rotate: [0, rot * 0.2, rot],
    opacity: [1, 1, 0],
    transition: {
      duration: CUT_DURATION,
      delay: index * CHAR_STAGGER,
      times: [0, 0.25, 1],
      ease: ["easeOut", "easeIn"],
    },
  }),
  return: ({ index }: CharMotion) => ({
    x: [0, 0],
    y: [5, 0],
    rotate: [0, 0],
    opacity: [0, 1],
    transition: {
      duration: RETURN_DURATION,
      delay: HOLD + index * RETURN_STAGGER,
      ease: "easeOut",
    },
  }),
};

export function CutText({
  text,
  trigger = "click",
}: {
  text: string;
  trigger?: "click" | "hover";
}) {
  const reducedMotion = useReducedMotion();
  const snip = useContext(SnipContext);
  const [phase, setPhase] = useState<"idle" | "cut" | "return">("idle");

  const lastIndex = text.replace(/ /g, "").length - 1;

  const startCut = () => {
    if (reducedMotion || phase !== "idle") return;
    setPhase("cut");
    snip((lastIndex + 1) * CHAR_STAGGER * 1000);
  };

  const advance = () =>
    setPhase((current) => (current === "cut" ? "return" : "idle"));

  let charIndex = 0;
  return (
    <span
      onPointerEnter={trigger === "hover" ? startCut : undefined}
      onPointerDown={
        trigger === "click" ? (event) => event.stopPropagation() : undefined
      }
      onClick={trigger === "click" ? startCut : undefined}
    >
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex}>
          {wordIndex > 0 && " "}
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((char) => {
              const index = charIndex++;
              return (
                <motion.span
                  key={index}
                  className="inline-block"
                  variants={charVariants}
                  custom={
                    {
                      index,
                      dx: (seeded(index, 1) - 0.5) * 110,
                      dy: 36 + seeded(index, 2) * 70,
                      rot: (seeded(index, 3) - 0.5) * 280,
                    } satisfies CharMotion
                  }
                  initial={false}
                  animate={phase}
                  onAnimationComplete={
                    index === lastIndex ? advance : undefined
                  }
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        </span>
      ))}
    </span>
  );
}
