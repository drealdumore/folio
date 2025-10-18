"use client";

import React from "react";
import { motion, Variants, Transition } from "framer-motion";

export interface SplitTextProps {
  text: string;
  className?: string;
  initialDelay?: number; // in seconds
  staggerDelay?: number; // between characters/words
  duration?: number;     // duration per character/word
  ease?:
    | [number, number, number, number]
    | "linear"
    | "easeIn"
    | "easeOut"
    | "easeInOut"
    | "circIn"
    | "circOut"
    | "circInOut"
    | "backIn"
    | "backOut"
    | "backInOut"
    | "anticipate";
  splitType?: "chars" | "words";
  tag?: keyof JSX.IntrinsicElements;
  textAlign?: React.CSSProperties["textAlign"];
  onAnimationComplete?: () => void;
}

const createContainerVariants = (staggerDelay: number): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

const createItemVariants = (
  duration: number,
  ease: SplitTextProps["ease"]
): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      ease,
    },
  },
});

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  initialDelay = 0,
  staggerDelay = 0.05,
  duration = 0.4,
  ease = [0.4, 0, 0.2, 1],
  splitType = "chars",
  tag = "p",
  textAlign = "center",
  onAnimationComplete,
}) => {
  const splitText = React.useMemo(() => {
    if (splitType === "words") {
      const words = text.split(" ");
      return words.map((word, i) => ({
        text: word + (i !== words.length - 1 ? " " : ""),
        key: `${word}-${i}`,
      }));
    }

    return Array.from(text).map((char, i) => ({
      text: char,
      key: `${char}-${i}`,
    }));
  }, [text, splitType]);

  const Tag = tag as keyof JSX.IntrinsicElements;
  const itemVariants = createItemVariants(duration, ease);

  return (
    <Tag
      className={className}
      style={{ textAlign, overflowWrap: "break-word", display: "inline-block" }}
    >
      <motion.span
        variants={createContainerVariants(staggerDelay)}
        initial="hidden"
        animate="visible"
        transition={{ delay: initialDelay }}
        onAnimationComplete={onAnimationComplete}
        style={{ display: "inline-block", whiteSpace: "pre-wrap" }}
      >
        {splitText.map(({ text: unit, key }) => (
          <motion.span
            key={key}
            variants={itemVariants}
            style={{
              display: "inline-block",
              whiteSpace: "pre-wrap",
            }}
          >
            {unit}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
};

export default SplitText;
