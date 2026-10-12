import ProjectCard from "./project-card";
import { ALLPROJECTS, type ProjectCardProps } from "@/content/site";

const Projects = ({ projects = ALLPROJECTS }: { projects?: ProjectCardProps[] }) => {
  return (
    <div className="flex flex-col gap-[30px] md:gap-[50px]">
      {projects.map((project, i) => (
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
