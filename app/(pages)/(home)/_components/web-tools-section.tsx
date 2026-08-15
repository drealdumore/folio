import React from "react";
import CompactProjectCard from "@/components/cards/compact-project-card";
import { AnimatedSection } from "@/components/layout/animated-section";
import { SectionHeading } from "@/components/design/SectionHeading";
import { WEB_TOOLS } from "@/content/projects";

const WebTools = () => {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <SectionHeading title="Side quests" />
        <p className="text-[15px] font-medium text-text-normal/60">
          Small projects built for speed and utility.
        </p>
      </div>

      <AnimatedSection delay={0.2}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 group/wrapper">
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
    </section>
  );
};

export default WebTools;
