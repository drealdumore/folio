"use client";

import Header from "./_components/hero-section";

import React from "react";

import AboutSection from "./_components/about-section";
import ContactSection from "./_components/contact-section";
import WorkExperienceSection from "./_components/work-experience-section";
import Projects from "./_components/projects-section";
import WebTools from "./_components/web-tools-section";
import StackTable from "./_components/techStack-section";
import PerformanceSection from "./_components/performance-section";
import OpenToRolesSection from "./_components/open-to-roles-section";
import { Morph } from "@/components/morph";
import { Signature } from "@/components/signature";

const Home = () => {
  return (
    <>
      <div className="flex flex-col relative">
        <Morph delay={0.1}>
          <Header />
        </Morph>
        <div className="flex flex-col gap-16 mt-14">
          <Morph>
            <AboutSection />
          </Morph>
          <Morph>
            <Projects />
          </Morph>
          <Morph>
            <WorkExperienceSection />
          </Morph>
          <Morph>
            <OpenToRolesSection />
          </Morph>
          <Morph>
            <StackTable />
          </Morph>
          <Morph>
            <WebTools />
          </Morph>
          <Morph>
            <PerformanceSection />
          </Morph>
          <Morph>
            <ContactSection />
          </Morph>
          <Morph delay={0.1}>
            <Signature
              text="Samuel..."
              fontSize={12}
              color="#555"
              inView
              once={false}
            />
          </Morph>
        </div>
      </div>
    </>
  );
};

export default Home;

{
  /* <hr className="border-t border-dotted border-black border-opacity-40 relative w-[40rem] left-[50%] right-[50%] -translate-x-[50%]" />; */
}
