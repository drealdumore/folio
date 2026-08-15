import ProjectCard from "./project-card";
import { ALLPROJECTS } from "@/content/projects";

const Projects = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-8">
        {ALLPROJECTS.map((project, i) => (
          <ProjectCard
            key={i}
            image={project.image}
            projectName={project.projectName}
            projectLink={project.projectLink}
            projectDescription={project.projectDescription}
            projectType={project.projectType}
            projectDate={project.projectDate}
            technologies={project.technologies}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
