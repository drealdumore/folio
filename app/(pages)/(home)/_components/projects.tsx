import React, { useEffect, useState } from "react";

import Link from "next/link";
import ProjectCard from "@/components/cards/project-card";
import { SmallSpinner } from "@/components/design/loaders";

const fetchProjects = async () => {
  const { PROJECTS } = await import("@/content/projects");
  return PROJECTS;
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
    <section className="flex flex-col gap-3 mb-4">
      <h2 className="md:text-2xl text-xl font-bold text-text-heading">Selected Projects</h2>

      <div className="grid grid-cols-1  gap-6 group/wrapper">
        {projects.length > 0 ? (
          projects.map((project, i) => (
            <ProjectCard
              key={i}
              name={project.name}
              description={project.description}
              href={project.href}
              tech={project.tech}
            />
          ))
        ) : (
          <SmallSpinner/>
        )}
      </div>

      <Link
        prefetch={true}
        className="mt-4 font-semibold transition-colors flex items-center gap-1 text-text-normal hover:text-text-heading hover:underline underline-offset-2"
        href="/projects"
      >
        More projects
        <RightIcon />
      </Link>
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
