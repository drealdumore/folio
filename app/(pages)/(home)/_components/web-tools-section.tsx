import React, { useEffect, useState } from "react";
import CompactProjectCard from "@/components/cards/compact-project-card";
import { AnimatedSection } from "@/components/layout/animated-section";
import { SectionHeading } from "@/components/design/SectionHeading";

const fetchWebTools = async () => {
  const { WEB_TOOLS } = await import("@/content/projects");
  return WEB_TOOLS;
};

const WebTools = () => {
  const [tools, setTools] = useState<any[]>([]);

  useEffect(() => {
    const loadTools = async () => {
      const toolData = await fetchWebTools();
      setTools(toolData);
    };

    loadTools();
  }, []);

  return (
    <section className="flex flex-col">
      <SectionHeading
        title="Short Projects"
        subtitle="Small projects built for speed and utility"
      />
      {/* <SectionHeading
        title="Utility Web Tools"
        subtitle="Small projects built for speed and utility"
      /> */}
      <AnimatedSection delay={0.2}>
        <div className="grid grid-cols-1  gap-4 group/wrapper">
          {tools.length > 0
            ? tools.map((tool, i) => (
                <CompactProjectCard
                  key={i}
                  name={tool.projectName}
                  description={tool.projectDescription}
                  href={tool.projectLink}
                />
              ))
            : ""}
        </div>
      </AnimatedSection>
    </section>
  );
};

export default WebTools;
