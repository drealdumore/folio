"use client";

import Motion from "@/motion/y-motion";

const ProjectsTemplate = ({ children }: { children: React.ReactNode }) => {
  return <Motion>{children}</Motion>;
};

export default ProjectsTemplate;
