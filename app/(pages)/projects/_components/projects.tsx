"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ProjectCard from "./project-card";
import { ALLPROJECTS, type ProjectCardProps } from "@/content/site";

// Curves from easing.dev
const OUT_QUINT = [0.23, 1, 0.32, 1] as const; // enters & fades
const IN_OUT_QUART = [0.77, 0, 0.175, 1] as const; // exits & on-screen movement

const Projects = ({ projects = ALLPROJECTS }: { projects?: ProjectCardProps[] }) => {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <motion.div layout className="flex flex-col gap-[30px] md:gap-[50px]">
      <AnimatePresence mode="popLayout" initial={false}>
        {projects.map((project) => {
          const key = project.projectName ?? project.projectLink;
          return (
          <motion.div
            key={key}
            layout
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.98 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: reduce ? 0.2 : 0.55,
                ease: OUT_QUINT,
              },
            }}
            exit={{
              opacity: 0,
              y: reduce ? 0 : -16,
              scale: reduce ? 1 : 0.98,
              transition: {
                duration: reduce ? 0.15 : 0.3,
                ease: IN_OUT_QUART,
              },
            }}
            transition={{
              layout: {
                duration: reduce ? 0 : 0.55,
                ease: OUT_QUINT,
              },
            }}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") setHovered(key);
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === "mouse") setHovered(null);
            }}
          >
            <ProjectCard
              image={project.image}
              mobileScreens={project.mobileScreens}
              projectName={project.projectName}
              projectLink={project.projectLink}
              projectDescription={project.projectDescription}
              projectType={project.projectType}
              projectDate={project.projectDate}
              technologies={project.technologies}
              highlight={project.highlight}
              dimmed={hovered !== null && hovered !== key}
            />
          </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};

export default Projects;
