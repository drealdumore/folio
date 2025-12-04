
import { sharedMetadata } from "@/constants/shared-meta";
import { Metadata } from "next";
import { Heading } from "@/components/design/heading";
import Projects from "./_components/projects";

export const metadata: Metadata = {
  title: `My Projects`,
  description:
    "Explore a diverse range of projects I have worked on, including innovative web applications, backend solutions, and open-source contributions. Discover how I solve real-world problems through technology.",
  keywords:
    "software development, web applications, backend solutions, open-source, full-stack projects, portfolio, developer projects",
};

const ProjectsPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <Heading
        title="My Projects"
        sub="A lot of ideas, but some are still under construction!"
      />

      <Projects />

      <div className="w-full flex justify-end">
        <span className="tag text-text-normal">
          More projects coming soon!
        </span>
      </div>
    </div>
  );
};

export default ProjectsPage;