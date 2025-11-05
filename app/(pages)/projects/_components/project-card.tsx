import { formatDateDifference } from "@/utils/date";

import React from "react";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp } from "@/hooks/useScrollAnimation";

interface ProjectCardProps {
  projectName: string | undefined | null;
  projectLink: string | any;
  projectDescription: string | undefined | null;
  projectType: string | undefined | null;
  projectDate: string | any;
  technologies: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  projectName,
  projectLink,
  projectDescription,
  projectType,
  projectDate,
  technologies,
}) => {
  const formattedDate = new Date(projectDate);

  return (
    <motion.div
      variants={fadeInUp}
      className="min-w-[120px] font-sans p-4 gap-y-4 gap-x-4 justify-start items-center border border-[#404040] rounded-lg flex group"
    >
      <div className="flex flex-col gap-y-4 w-full">
        <div className="inline-flex w-full justify-between items-center group relative">
          <Link
          // TODO: add the feature so that if link starts with https it is an external link and target blank else no.
            href={projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-lg tracking-tighter text-text-heading gap-[0.15rem] w-max flex items-center relative"
          >
            {projectName}
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-current origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ease-in-out" />
          </Link>
        </div>
        <div className="flex items-center w-full -mt-4">
          <span className="text-xs opacity-50 text-text-normal">
            {projectType}
          </span>
        </div>
        <p className="text-text-normal">{projectDescription}</p>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="p-1 inline-flex text-xs text-text-normal border bg-zinc-800 max-w-max border-[#404040] rounded"
            >
              {tech}
            </div>
          ))}
        </div>
        <span className="text-[10px] text-text-normal">
          {formatDateDifference(formattedDate)}
        </span>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
