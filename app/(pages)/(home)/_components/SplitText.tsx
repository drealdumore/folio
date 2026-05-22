"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
  initialDelay?: number;
  duration?: number;
  stagger?: number;
  ease?: number[] | string;
}

export default function SplitText({
  text,
  className = "",
  tag = "h1",
  initialDelay = 0,
  duration = 0.8,
  stagger = 0.02,
  ease = [0.19, 1, 0.22, 1], // Lochie Axon's favorite "swift" ease
}: SplitTextProps) {
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: initialDelay,
      },
    },
  };

  const childVariants: Variants = {
    hidden: {
      y: "100%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: duration,
        ease: ease as any,
      },
    },
  };

  const Tag = tag;

  return (
    <Tag className={`${className} overflow-hidden flex flex-wrap`}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-wrap"
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em] py-[0.1em]">
            <motion.span
              variants={childVariants}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
