"use client";

import { AnimatedSection } from "@/components/layout/animated-section";
import { SectionHeading } from "@/components/design/SectionHeading";

interface SkillsInterface {
  id: number;
  skill?: string | undefined;
}

const skills: SkillsInterface[] = [
  { id: 3, skill: "JavaScript" },
  { id: 2, skill: "Tailwind CSS" },
  { id: 6, skill: "Angular" },
  { id: 9, skill: "Node Js" },
  { id: 11, skill: "MongoDB" },
  { id: 5, skill: "MySQL" },
  { id: 6, skill: "React Native" },

  { id: 4, skill: "TypeScript" },
  { id: 2, skill: "SCSS" },
  { id: 8, skill: "NextJs" },
  { id: 10, skill: "Express Js" },
  { id: 12, skill: "Postgres" },
  { id: 13, skill: "Git" },
  { id: 14, skill: "GoLang" },
];

const StackTable = () => {
  const half = Math.ceil(skills.length / 2);
  const firstHalf = skills.slice(0, half);
  const secondHalf = skills.slice(half);

  return (
    <section className="flex flex-col">
      <SectionHeading
        title="My Tech Stack"
        subtitle="Learned by coding all night and debugging all day!"
      />

      <AnimatedSection delay={0.2}>
        <div className="mb-5 mt-3 w-full skills rounded-lg flex">
          <div className="border-r-[#404040] border-r basis-[50%]">
            {firstHalf.map((skill, index) => (
              <p
                key={skill.id}
                className={`skill-item ${
                  index !== firstHalf.length - 1
                    ? "border-b-[#404040] border-b"
                    : ""
                }`}
              >
                {skill.skill}
              </p>
            ))}
          </div>
          <div className="basis-[50%]">
            {secondHalf.map((skill, index) => (
              <p
                key={skill.id}
                className={`skill-item ${
                  index !== secondHalf.length - 1
                    ? "border-b-[#404040] border-b"
                    : ""
                }`}
              >
                {skill.skill}
              </p>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default StackTable;
