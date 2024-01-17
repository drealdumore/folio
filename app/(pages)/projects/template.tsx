"use client";

import { Heading } from "@/components/design/heading";
import Motion from "@/motion/y-motion";

import Projects from "./_components/projects";
import Link from "next/link";

const ProjectsTemplate = () => {
  return (
    <Motion>
      <div className="flex flex-col gap-4">
        <Heading
          title="My Projects"
          sub="From innovative web applications to efficient backend solutions, take a look at my portfolio of work. "
        />

        <Projects />

        <div className="w-full flex justify-end">
          <span className="tag text-text-normal">
            More projects coming soon!
          </span>
        </div>
      </div>
    </Motion>
  );
};

export default ProjectsTemplate;
