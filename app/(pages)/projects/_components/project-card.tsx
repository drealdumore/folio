import { LINK } from "@/lib/icons";
import { formatDateDifference } from "@/utils/date";

import React from "react";

import Link from "next/link";

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
    <div className="min-w-[120px] font-sans p-4 gap-y-4 gap-x-4 justify-start items-center border border-[#404040] rounded-lg flex">
      <div className="flex flex-col gap-y-4 w-full">
        <div className="inline-flex w-full justify-between items-center">
          <h3 className="font-medium text-lg tracking-tighter text-text-heading">
            {projectName}
          </h3>
          <div className="space-x-2">
            <Link
              className="inline-flex gap-x-1 items-center hover:underline opacity-50 text-text-normal"
              rel="noopener noreferrer"
              target="_blank"
              href={projectLink}
            >
              <LINK />
              Link
            </Link>
          </div>
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
    </div>
  );
};

export default ProjectCard;
