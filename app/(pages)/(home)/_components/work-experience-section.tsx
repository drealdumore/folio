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
              <div className="text-zinc-400 font-medium text-[15px]">
                {exp.duration}
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[16px] text-[#a1a1a1] font-medium">
                  {exp.title} at
                </div>
                <div className="flex items-center gap-1 bg-zinc-800/50 text-text-heading px-3 py-1 rounded-[14px] border border-zinc-700/50 backdrop-blur-sm group-hover:bg-zinc-700/50 transition-all duration-300">
                  <div className="w-2 h-2 rounded-full bg-text-heading flex items-center justify-center">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 0L9.33013 2.5V7.5L5 10L0.669873 7.5V2.5L5 0Z"
                        fill="white"
                      ></path>
                    </svg>
                  </div>
                  <span>{exp.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
