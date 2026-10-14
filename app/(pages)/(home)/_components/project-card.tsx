import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp } from "@/hooks/useScrollAnimation";
import { ArrowIcon } from "@/components/design/arrow-icon";

type ProjectType = {
  name: string;
  description?: string | null;
  href: string;
  tech?: string[];
};

import { useWebHaptics } from "web-haptics/react";

const ProjectCard = ({ name, description, href, tech }: ProjectType) => {
  const { trigger } = useWebHaptics();
  const isExternalLink = href.startsWith("http");

  return (
    <motion.div
      variants={fadeInUp}
      className="w-full group/project lg:group-hover/wrapper:opacity-25 lg:hover:!opacity-100 transition-opacity"
    >
      <div className="border border-zinc-700 p-6 bg-zinc-900/20 hover:bg-zinc-900/40 transition-all duration-300 group/card skills rounded-lg">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-medium text-text-heading group-hover/card:text-text-normal transition-colors">
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
              {...(isExternalLink && {
                target: "_blank",
                rel: "noopener noreferrer",
              })}
              onClick={() => trigger([{ duration: 40 }])}
              className="inline-flex items-center gap-2 text-[12px] font-medium text-text-normal hover:text-text-heading transition-all group/button"
            >
              View Project
              <ArrowIcon size={16} />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
