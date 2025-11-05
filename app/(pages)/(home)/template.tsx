"use client";

import Header from "./_components/hero-section";
import Motion from "@/motion/y-motion";

import React from "react";

import AboutSection from "./_components/about-section";
import ContactSection from "./_components/contact-section";
import WorkExperienceSection from "./_components/work-experience-section";
import Projects from "./_components/projects-section";
import Repos from "./_components/repos-section";
import StackTable from "./_components/techStack-section";

const Home = () => {
  return (
    <Motion>
      <div className="flex flex-col gap-4 relative">
        <Header />
        <AboutSection />
        <StackTable />
        <Projects />
        <Repos />
        <WorkExperienceSection />
        <ContactSection />
      </div>
    </Motion>
  );
};

export default Home;

{
  /* <hr className="border-t border-dotted border-black border-opacity-40 relative w-[40rem] left-[50%] right-[50%] -translate-x-[50%]" />; */
}
