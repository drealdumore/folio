"use client";

import { EXPERIENCE } from "@/content/experience";
import { SectionHeading } from "@/components/design/SectionHeading";

export default function WorkExperienceSection() {
  return (
    <section className="flex flex-col">
      <div className="w-full flex flex-col">
        <SectionHeading
          title="Work Experience"
          subtitle="You need it to get the job, but the job’s what gives it!"
        />

        <div className="flex flex-col gap-[30px] w-full">
          {EXPERIENCE.map((exp, index) => (
            <div
              key={exp.durationAlt + index}
              className="flex flex-col md:flex-row gap-[15px] md:gap-0 md:items-center md:justify-between group p-4 -m-4"
            >
              <p className="text-zinc-400 font-medium text-[15px]">
                {exp.duration}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-[16px] text-[#a1a1a1] font-medium">
                  {index === 0
                    ? "I’m currently a "
                    : "Previously, I worked as a "}
                  {exp.title} at{" "}
                  <span
                    className="text-text-heading inline-block relative underline decoration-dotted underline-offset-4 decoration-from-font decoration-[#a1a1a1] transition-all duration-100 hover:decoration-solid
  "
                    style={{
                      transitionTimingFunction: "var(--ease-smooth)",
                    }}
                  >
                    {exp.company}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
