"use client";

import { useLayoutEffect, useState } from "react";
import { motion, Variants, Target, TargetAndTransition } from "framer-motion";
import {
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  scaleIn,
  staggerContainer,
  useScrollAnimation,
} from "@/hooks/useScrollAnimation";

import { containerVariants } from "../../variants/textVariants";

interface AnimatedSectionProps {
  children: React.ReactNode;
  variant?: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "scaleIn" | "stagger";
  className?: string;
  delay?: number;
  isContainer?: boolean;
}

const variants: Record<string, Variants> = {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  stagger: staggerContainer,
};

export const AnimatedSection = ({
  children,
  variant = "fadeInUp",
  className = "",
  delay = 0,
  isContainer = false,
}: AnimatedSectionProps) => {
  const { ref, controls } = useScrollAnimation();

  // Render fully visible on the server and first paint so content never flashes
  // blank while JS hydrates. The hidden -> visible entrance only engages once
  // we're mounted on the client.
  const [mounted, setMounted] = useState(false);
  useLayoutEffect(() => setMounted(true), []);

  const selectedVariant = isContainer
    ? containerVariants
    : variants[variant] || variants.fadeInUp;

  const DELAY_MULTIPLIER = 0.5;

  // Safe way to apply delay only if 'visible' is a plain object (not a function)
  const visible = selectedVariant.visible;

  let variantWithDelay: Variants = selectedVariant;

  if (
    delay > 0 &&
    visible &&
    typeof visible === "object" &&
    !Array.isArray(visible)
  ) {
    const visibleWithTransition = visible as TargetAndTransition;

    variantWithDelay = {
      ...selectedVariant,
      visible: {
        ...visibleWithTransition,
        transition: {
          ...visibleWithTransition.transition,
          delay:
            (visibleWithTransition.transition?.delay ?? 0) +
            delay * DELAY_MULTIPLIER,
        },
      },
    };
  }

  return (
    <div className={className} ref={ref}>
      {mounted ? (
        <motion.div
          initial="hidden"
          animate={controls}
          variants={variantWithDelay}
        >
          {children}
        </motion.div>
      ) : (
        // Server + first paint: plain, fully visible, no entrance applied yet.
        <div>{children}</div>
      )}
    </div>
  );
};
