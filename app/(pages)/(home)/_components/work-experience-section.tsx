"use client";

import { EXPERIENCE, SECTIONS } from "@/content/site";
import { SectionHeading } from "@/components/design/SectionHeading";

export default function WorkExperienceSection() {
  return (
    <section className="flex flex-col">
      <SectionHeading title={SECTIONS.experience.title} />

      <div className="flex flex-col divide-y divide-zinc-800/60">
        {EXPERIENCE.map((exp, index) => (
          <div key={exp.durationAlt + index} className="py-4 first:pt-0">
            <div className="flex items-baseline justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <p className="text-[15px] font-medium text-zinc-200">
                  {exp.title}
                </p>
                {exp.current && (
                  <span className="text-[11px] font-medium uppercase tracking-wide text-emerald-300 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2 py-0.5">
                    Currently
                  </span>
                )}
              </div>
              <p className="text-[13px] text-zinc-600 shrink-0 tabular-nums">
                {exp.duration}
              </p>
            </div>
            <p className="text-[13px] text-zinc-500 mt-0.5">{exp.company}</p>

            <div className="mt-3 space-y-1.5">
              {exp.description.map((line, i) => (
                <p
                  key={i}
                  className={`text-[13.5px] leading-[1.6] ${
                    i === 0 ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>

            {exp.stack && exp.stack.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {exp.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-[#141414]/40 px-3.5 py-1.5 text-[13px] font-medium text-zinc-300 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-2xl backdrop-saturate-150"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}