import ProjectCard from "./project-card";
import { ALLPROJECTS } from "@/content/projects";

const Projects = () => {
  return (
    <div className="flex flex-col gap-[30px] md:gap-[50px]">
      {ALLPROJECTS.map((project, i) => (
        <ProjectCard
          key={i}
          image={project.image}
          mobileScreens={project.mobileScreens}
          projectName={project.projectName}
          projectLink={project.projectLink}
          projectDescription={project.projectDescription}
          projectType={project.projectType}
          projectDate={project.projectDate}
          technologies={project.technologies}
        />
      ))}
    </div>
  );
};

export default Projects;
