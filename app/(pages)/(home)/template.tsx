"use client";

import Header from "./_components/header";
import Motion from "@/motion/y-motion";

import React from "react";

import Projects from "./_components/projects";
import StackTable from "./_components/techStack";
import Repos from "./_components/repos";
import ContactSection from "@/components/contact-section";
import WorkExperienceSection from "@/components/work-experience-section";
import AboutSection from "@/components/about-section";

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
