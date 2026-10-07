"use client";

import { EXPERIENCE } from "@/content/experience";
import { SectionHeading } from "@/components/design/SectionHeading";

export default function WorkExperienceSection() {
  return (
    <section className="flex flex-col">
      <SectionHeading title="Experience" />

      <div className="flex flex-col divide-y divide-zinc-800/60">
        {EXPERIENCE.map((exp, index) => (
          <div
            key={exp.durationAlt + index}
            className="py-4 first:pt-0"
          >
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <p className="text-[15px] font-medium text-zinc-200">
                  {exp.title}
                </p>
                <p className="text-[13px] text-zinc-500 mt-0.5">
                  {exp.company}
                </p>
              </div>
              <p className="text-[13px] text-zinc-600 shrink-0 tabular-nums">
                {exp.duration}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
