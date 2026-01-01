import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp } from "@/hooks/useScrollAnimation";

type ProjectType = {
  name: string;
  description?: string | null;
  href: string;
  tech?: string[];
  image?: string;
};

const ProjectCard = ({ name, description, href, tech, image }: ProjectType) => {
  const isExternalLink = href.startsWith("http");

  return (
    <motion.div
      variants={fadeInUp}
      className="w-full group/project lg:group-hover/wrapper:opacity-25 lg:hover:!opacity-100 transition-opacity"
    >
      <Link
        href={href}
        {...(isExternalLink && {
          target: "_blank",
          rel: "noopener noreferrer",
        })}
        className="w-full rounded-[20px] overflow-hidden border border-zinc-700/50 relative transition-all block bg-zinc-900/20 hover:bg-zinc-900/40"
      >
        <div className="px-5 pt-5 pb-4 rounded-[20px] group">
          <div className="relative w-full h-[200px] rounded-[20px] overflow-hidden">
            {image ? (
              <Image
                alt={name}
                src={image}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-[#19191999] flex items-center  justify-center">
                <span className="text-text-normal text-lg font-medium font-mono">
                  {name}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="px-7 pb-7">
          <h3 className="text-2xl font-semibold mb-2 text-text-heading font-mono">
            {name}
          </h3>
          {description && (
            <p className="text-text-normal/70 text-base line-clamp-2 mb-4">
              {description}
            </p>
          )}
          {tech && tech.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tech.map((technology, index) => (
                <span
                  key={index}
                  className="bg-text-heading/10 text-text-heading px-3 py-1 rounded-full text-sm"
                >
                  {technology}
                </span>
              ))}
            </div>
          )}
          <button className="mt-1 bg-text-heading/70 hover:bg-text-heading/90 flex items-center rounded-xl px-4 py-2.5 text-base font-medium transition-all duration-300 group">
            <span className="flex items-center group-hover:pr-2 transition-all duration-300">
              View Project
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>{" "}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
