"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

import Header from "./_components/hero-section";
import AboutSection from "./_components/about-section";
import ContactSection from "./_components/contact-section";
import WorkExperienceSection from "./_components/work-experience-section";
import Projects from "./_components/projects-section";
import WebTools from "./_components/web-tools-section";
import StackTable from "./_components/techStack-section";
import PerformanceSection from "./_components/performance-section";
import OpenToRolesSection from "./_components/open-to-roles-section";
import { Signature } from "@/components/signature";

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        type: "spring",
        stiffness: 240,
        damping: 28,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

const Home = () => {
  return (
    <div className="flex flex-col relative">
      <Reveal delay={0.05}>
        <Header />
      </Reveal>

      <div className="flex flex-col gap-16 mt-14">
        <Reveal><AboutSection /></Reveal>
        <Reveal><Projects /></Reveal>
        <Reveal><WorkExperienceSection /></Reveal>
        <Reveal><OpenToRolesSection /></Reveal>
        <Reveal><StackTable /></Reveal>
        <Reveal><WebTools /></Reveal>
        <Reveal><PerformanceSection /></Reveal>
        <Reveal><ContactSection /></Reveal>

        <Reveal delay={0.1}>
          <Signature
            text="Samuel..."
            fontSize={12}
            color="#555"
            inView
            once={false}
          />
        </Reveal>
      </div>
    </div>
  );
};

export default Home;