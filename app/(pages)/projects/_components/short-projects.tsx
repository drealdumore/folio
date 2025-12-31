"use client";

import React, { useEffect, useState } from "react";
import CompactProjectCard from "@/components/cards/compact-project-card";
import { AnimatedSection } from "@/components/layout/animated-section";

const fetchShortProjects = async () => {
  const { WEB_TOOLS } = await import("@/content/projects");
  return WEB_TOOLS;
};

const ShortProjects = () => {
  const [tools, setTools] = useState<any[]>([]);

  useEffect(() => {
    const loadTools = async () => {
      const toolData = await fetchShortProjects();
      setTools(toolData);
    };

    loadTools();
  }, []);

  return (
    <div className="flex flex-col gap-6 mt-12">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-text-heading font-heading">
          Short Projects
        </h2>
        <p className="text-text-normal/60 text-sm">
          A collection of small tools and experiments built for speed and
          utility.
        </p>
      </div>

      <AnimatedSection delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.length > 0 ? (
            tools.map((tool, i) => (
              <CompactProjectCard
                key={i}
                name={tool.projectName}
                description={tool.projectDescription}
                href={tool.projectLink}
              />
            ))
          ) : (
            <p className="text-text-normal/60">Loading...</p>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
};

export default ShortProjects;
