"use client";

import { SectionHeading } from "@/components/design/SectionHeading";

const TEAMS = [
  "Campus Buddy",
  "NodePair",
  "Knowledge Master",
  "Crystalglowxquisite",
];

export default function TrustedBySection() {
  return (
    <section className="flex flex-col">
      <SectionHeading title="Teams & brands I've worked with" />

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
