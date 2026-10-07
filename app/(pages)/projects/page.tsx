import { Metadata } from "next";
import Projects from "./_components/projects";
import ShortProjects from "./_components/short-projects";

export const metadata: Metadata = {
  title: "Projects — Samuel Isah",
  description:
    "A collection of web and mobile projects by Samuel Isah. React, Next.js, and React Native applications focused on user experience and technical craft.",
};

const ProjectsPage = () => {
  return (
    <div className="flex flex-col gap-16">
      {/* Page heading */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[22px] font-semibold leading-[1.3] tracking-[-0.02em] text-white lg:text-[28px]">
          Projects
        </h1>
        <p className="text-[15px] text-zinc-500 leading-relaxed">
          Things I&apos;ve built — web apps, mobile apps, and everything in
          between.
        </p>
      </div>

      <Projects />
      <ShortProjects />
    </div>
  );
};

export default ProjectsPage;
