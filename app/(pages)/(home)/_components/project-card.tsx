import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp } from "@/hooks/useScrollAnimation";

type ProjectType = {
  name: string;
  description?: string | null;
  href: string;
  tech?: string[];
};

const ProjectCard = ({ name, description, href, tech }: ProjectType) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="w-full group/project lg:group-hover/wrapper:opacity-25 lg:hover:!opacity-100 transition-opacity"
    >
      <div className="border border-zinc-700 p-6 bg-zinc-900/20 hover:bg-zinc-900/40 transition-all duration-300 group/card skills rounded-lg">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-semibold text-text-heading group-hover/card:text-text-normal transition-colors">
              {name}
            </h3>
          </div>

          {description && (
            <p className="text-text-normal text-sm leading-relaxed">
              {description}
            </p>
          )}

          {tech && tech.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tech.map((technology, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-zinc-800 text-text-normal rounded border border-zinc-600"
                >
                  {technology}
                </span>
              ))}
            </div>
          )}

          {href && (
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[12px] font-medium text-text-normal hover:text-text-heading transition-all group/button"
            >
              View Project
              <svg
                className="w-4 h-4 transition-transform group-hover/button:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
