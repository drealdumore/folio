"use client";

import { OPEN_TO_ROLES, OPEN_TO_ROLES_INTRO, SECTIONS } from "@/content/site";
import { SectionHeading } from "@/components/design/SectionHeading";

export default function OpenToRolesSection() {
  return (
    <section className="flex flex-col">
      <SectionHeading title={SECTIONS.roles.title} />

      <p className="mb-2 max-w-3xl text-[15px] leading-[1.65] text-zinc-400">
        {OPEN_TO_ROLES_INTRO}
      </p>

      <div className="flex flex-col divide-y divide-zinc-800/60">
        {OPEN_TO_ROLES.map((role) => (
          <div
            key={role.title}
            className="flex flex-col md:flex-row items-start gap-1 md:gap-8 py-[14px] md:items-center"
          >
            <h3 className="text-[15px] font-medium text-zinc-200 md:w-40 shrink-0">
              {role.title}
            </h3>
            <p className="text-[13.5px] leading-[1.6] text-zinc-500">
              {role.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}