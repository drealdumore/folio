"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Projects from "./projects";
import ShortProjects from "./short-projects";
import {
  PROJECT_FILTERS,
  filterProjects,
  type ProjectFilterKey,
} from "./project-filters";
import { ALLPROJECTS, WEB_TOOLS } from "@/content/site";

const ProjectExplorer = () => {
  const [active, setActive] = useState<ProjectFilterKey>("all");

  return (
    <div className="flex flex-col gap-16">
      <div className="inline-flex max-w-full items-center gap-1 self-start rounded-full border border-white/10 bg-[#141414]/40 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-2xl backdrop-saturate-150">
        {PROJECT_FILTERS.map((filter) => {
          const activeTab = active === filter.key;
          return (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActive(filter.key)}
              className={`relative shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200 select-none ${
                activeTab ? "text-white" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {activeTab && (
                <motion.span
                  layoutId="project-filter-active-pill"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 38,
                    mass: 0.8,
                  }}
                  className="absolute inset-0 rounded-full bg-white/15 shadow-inner"
                />
              )}
              <span className="relative z-10">{filter.label}</span>
            </button>
          );
        })}
      </div>

      <Projects projects={filterProjects(ALLPROJECTS, active)} />
      <ShortProjects tools={WEB_TOOLS} />
    </div>
  );
};

export default ProjectExplorer;