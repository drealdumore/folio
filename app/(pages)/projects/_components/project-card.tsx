import { formatDateDifference } from "@/utils/date";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp } from "@/hooks/useScrollAnimation";

interface ProjectCardProps {
  projectName: string | undefined | null;
  projectLink: string | any;
  projectDescription: string | undefined | null;
  projectType: string | undefined | null;
  projectDate: string | any;
  technologies: string[];
  image?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  projectName,
  projectLink,
  projectDescription,
  projectType,
  projectDate,
  technologies,
  image,
}) => {
  const isExternalLink =
    typeof projectLink === "string" && projectLink.startsWith("http");
  return (
    <motion.div
      variants={fadeInUp}
      className="w-full group/project lg:group-hover/wrapper:opacity-25 lg:hover:!opacity-100 transition-opacity"
    >
      <Link
        href={projectLink}
        {...(isExternalLink && {
          target: "_blank",
          rel: "noopener noreferrer",
        })}
        className="w-full rounded-[20px] overflow-hidden border border-zinc-700/50 relative transition-all block"
      >
        <div className="px-5 pt-5 pb-4 rounded-[20px] group">
          <div className="relative w-full h-[200px] rounded-[20px] overflow-hidden">
            {image ? (
              <Image
                alt={projectName || "Project"}
                src={image}
                fill
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-[#191919]/60 flex items-center  justify-center">
                <span className="text-text-normal text-lg font-medium font-mono">
                  {projectName}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="px-7 pb-7">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-semibold text-text-heading font-mono">
              {projectName}
            </h3>
          </div>
          {projectDescription && (
            <p className="text-text-normal/70 text-base line-clamp-2 mb-4">
              {projectDescription}
            </p>
          )}
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-text-heading/10 text-text-heading px-3 py-1 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
