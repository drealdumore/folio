import { Metadata } from "next";
import ProjectExplorer from "./_components/project-explorer";
import { SECTIONS } from "@/content/site";

export const metadata: Metadata = {
  title: SECTIONS.projectsPage.title,
  description: SECTIONS.projectsPage.description,
};

const ProjectsPage = () => {
  return (
    <div className="flex flex-col gap-16">
      {/* Page heading */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[22px] font-semibold leading-[1.3] tracking-[-0.02em] text-white lg:text-[28px]">
          {SECTIONS.projectsPage.title}
        </h1>
        <p className="text-[15px] text-zinc-500 leading-relaxed">
          {SECTIONS.projectsPage.subtitle}
        </p>
      </div>

      <ProjectExplorer />
    </div>
  );
};

export default ProjectsPage;
