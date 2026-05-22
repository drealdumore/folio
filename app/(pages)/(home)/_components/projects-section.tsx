import React, { useEffect, useState } from "react";

import Link from "next/link";
import ProjectCard from "@/components/cards/project-card";
import { AnimatedSection } from "@/components/layout/animated-section";
import { SectionHeading } from "@/components/design/SectionHeading";

const fetchProjects = async () => {
  const { ALLPROJECTS } = await import("@/content/projects");
  return ALLPROJECTS.slice(0, 4);
};

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      const projectData = await fetchProjects();
      setProjects(projectData);
    };

    loadProjects();
  }, []);

  return (
    <section className="flex flex-col">
      <SectionHeading
        title="Selected Projects"
        subtitle="A lot of ideas, but some are still under construction!"
      />
      <AnimatedSection delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 group/wrapper">
          {projects.length > 0
            ? projects.map((project, i) => (
                <ProjectCard
                  key={i}
                  image={project.image}
                  name={project.projectName}
                  description={project.projectDescription}
                  href={project.projectLink}
                  tech={project.technologies}
                />
              ))
            : ""}
        </div>
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <div className="col-span-2 w-full">
          <Link prefetch={true} href="/projects">
            <button className="mx-auto mt-8 bg-text-heading/90 hover:bg-text-heading/90 flex items-center rounded-[14px] px-[24px] py-[14px] text-[16px] font-normal text-start no-underline transition-all duration-300 group">
              <span className="flex items-center group-hover:pr-2 font-medium text-[16px] transition-all duration-300">
                View All Projects
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="ml-2 w-5 h-5"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
          </Link>
        </div>
      </AnimatedSection>{" "}
    </section>
  );
};

export default Projects;

export const RightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
  >
    <path d="M18 8L22 12L18 16"></path>
    <path d="M2 12H22"></path>
  </svg>
);
