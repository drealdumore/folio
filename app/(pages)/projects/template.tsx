"use client";

import { Heading } from "@/components/design/heading";
import Motion from "@/motion/y-motion";

import Projects from "./_components/projects";
import Link from "next/link";

const ProjectsTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <Motion>
      {children}
    </Motion>
  );
};

export default ProjectsTemplate;
