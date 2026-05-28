import { sharedMetadata } from "@/constants/shared-meta";
import { Metadata } from "next";
import { Heading } from "@/components/design/heading";
import Projects from "./_components/projects";
import ShortProjects from "./_components/short-projects";

export const metadata: Metadata = {
  title: `Portfolio Projects | Samuel Isah`,
  description:
    "A collection of high-performance web and mobile projects by Samuel Isah (drealdumore). Featuring React, Next.js, and React Native applications focused on user experience and technical excellence.",
  keywords:
    "Full-Stack Projects, Web Development Portfolio, React Native Apps, Next.js Applications, Samuel Isah Projects, Software Engineering Showcases",
};

const ProjectsPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <Heading
        title="My Projects"
        sub="A lot of ideas, but some are still under construction!"
      />

      <Projects />
      <ShortProjects />

      <div className="w-full flex justify-end">
        <span className="tag text-text-normal">More projects coming soon!</span>
      </div>
    </div>
  );
};

export default ProjectsPage;
