"use client";

import { PROFILE, SECTIONS } from "@/content/site";
import { SectionHeading } from "@/components/design/SectionHeading";

export default function AboutSection() {
  const paragraphClass = "leading-[1.65] text-zinc-400 text-[15px]";

  return (
    <section className="flex flex-col">
      <SectionHeading title={SECTIONS.about.title} />
      <div className="flex flex-col gap-4 max-w-3xl">
        {PROFILE.about.map((paragraph) => (
          <p key={paragraph} className={paragraphClass}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
