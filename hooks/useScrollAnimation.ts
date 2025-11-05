"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimation } from "framer-motion";

export const useScrollAnimation = (
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px"
) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          controls.start("visible");
          setHasAnimated(true);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [controls, threshold, rootMargin, hasAnimated]);

  return { ref, controls };
};

// Buttery smooth easing curves
const butterEase = [0.25, 0.46, 0.45, 0.94] as const;
const butterEaseOut = [0.16, 1, 0.3, 1] as const;
const butterEaseInOut = [0.4, 0, 0.2, 1] as const;

export const fadeInUp = {
  hidden: { opacity: 0, y: 20, scale: 0.99 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: butterEaseOut,
    },
  },
};

export const fadeInUpSmooth = {
  hidden: { opacity: 0, y: 24, scale: 0.99 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: butterEaseOut,
      opacity: { duration: 0.6 },
      y: { duration: 0.9 },
      scale: { duration: 1.1 },
    },
  },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -20, scale: 0.99 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: butterEaseOut,
    },
  },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 20, scale: 0.99 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: butterEaseOut,
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: butterEaseOut,
    },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
      ease: butterEaseOut,
      duration: 0.3,
    },
  },
};

export const staggerContainerSlow = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
      ease: butterEaseOut,
      duration: 0.8,
    },
  },
};

export const tourItemStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
      ease: butterEaseOut,
      duration: 0.7,
    },
  },
};

// Hover animations for buttery interactions
export const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.3, ease: butterEase },
};

export const hoverLift = {
  y: -2,
  scale: 1.01,
  transition: { duration: 0.4, ease: butterEase },
};

// Page transition variants
export const pageTransition = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: butterEaseOut,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.5,
      ease: butterEaseInOut,
    },
  },
};
