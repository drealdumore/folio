"use client";

import React, { useEffect, useState } from "react";

import ProjectCard from "./project-card";

const fetchProjects = async () => {
  const { ALLPROJECTS } = await import("@/content/projects");
  return ALLPROJECTS;
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
    <div className="flex flex-col gap-8">
      {projects.length > 0 ? (
        <div className="flex flex-col gap-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={i}
              projectName={project.projectName}
              projectLink={project.projectLink}
              projectDescription={project.projectDescription}
              projectType={project.projectType}
              projectDate={project.projectDate}
              technologies={project.technologies}
            />
          ))}
        </div>
      ) : (
        <p className="text-text-normal">Loading projects...</p>
      )}
    </div>
  );
};

export default Projects;


