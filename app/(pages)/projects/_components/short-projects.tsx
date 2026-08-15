import React from "react";
import CompactProjectCard from "@/components/cards/compact-project-card";
import { AnimatedSection } from "@/components/layout/animated-section";
import { WEB_TOOLS } from "@/content/projects";

const ShortProjects = () => {
  return (
    <div className="flex flex-col gap-6 mt-12">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-text-heading font-heading">
          Side quests
        </h2>
        <p className="text-text-normal/60 text-sm">
          A collection of small tools and experiments built for speed and
          utility.
        </p>
      </div>

      <AnimatedSection delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {WEB_TOOLS.map((tool, i) => (
            <CompactProjectCard
              key={i}
              name={tool.projectName}
              description={tool.projectDescription}
              href={tool.projectLink}
              image={tool.image}
              tech={tool.technologies}
            />
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
};

export default ShortProjects;
