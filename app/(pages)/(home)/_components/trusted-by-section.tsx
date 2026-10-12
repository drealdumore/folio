"use client";

import { SECTIONS, TEAMS } from "@/content/site";
import { SectionHeading } from "@/components/design/SectionHeading";

export default function TrustedBySection() {
  return (
    <section className="flex flex-col">
      <SectionHeading title={SECTIONS.teams.title} />

      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        {TEAMS.map((name) => (
          <span
            key={name}
            className="text-[15px] font-medium text-zinc-500 transition-colors duration-200 hover:text-zinc-300"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
