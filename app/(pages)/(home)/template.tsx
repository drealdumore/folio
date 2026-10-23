"use client";

import React from "react";

import Header from "./_components/hero-section";
import AboutSection from "./_components/about-section";
import ContactSection from "./_components/contact-section";
import WorkExperienceSection from "./_components/work-experience-section";
import Projects from "./_components/projects-section";
import WebTools from "./_components/web-tools-section";
import StackTable from "./_components/techStack-section";
import PerformanceSection from "./_components/performance-section";
import OpenToRolesSection from "./_components/open-to-roles-section";
import { Reveal } from "@/components/reveal";
import { Signature } from "@/components/signature";

const Home = () => {
  return (
    <div className="flex flex-col relative">
      <Reveal delay={0.1} y={16}>
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

        <Reveal delay={0.1} y={8}>
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