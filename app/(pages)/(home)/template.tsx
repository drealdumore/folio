"use client";

import Header from "./_components/hero-section";

import React from "react";

import AboutSection from "./_components/about-section";
import ContactSection from "./_components/contact-section";
import WorkExperienceSection from "./_components/work-experience-section";
import Projects from "./_components/projects-section";
import WebTools from "./_components/web-tools-section";
import StackTable from "./_components/techStack-section";
import { Morph } from "@/components/morph";

const Home = () => {
  return (
    <>
      <div className="flex flex-col gap-4 relative">
        <Morph delay={0.1}>
          <Header />
        </Morph>
        <Morph delay={0.2}>
          <AboutSection />
        </Morph>
        <Morph delay={0.4}>
          <StackTable />
        </Morph>
        <Morph delay={0.6}>
          <Projects />
        </Morph>
        <Morph delay={0.8}>
          <WebTools />
        </Morph>
        <Morph delay={1.0}>
          <WorkExperienceSection />
        </Morph>
        <Morph delay={1.2}>
          <ContactSection />
        </Morph>
      </div>
    </>
  );
};

export default Home;

{
  /* <hr className="border-t border-dotted border-black border-opacity-40 relative w-[40rem] left-[50%] right-[50%] -translate-x-[50%]" />; */
}
