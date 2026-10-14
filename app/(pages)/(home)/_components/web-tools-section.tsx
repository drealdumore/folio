"use client";

import React from "react";
import Link from "next/link";
import { SectionHeading } from "../../../../components/design/SectionHeading";
import { ArrowIcon } from "@/components/design/arrow-icon";
import { SECTIONS, SIDE_PROJECTS } from "@/content/site";

export default function WebTools() {
  return (
    <section className="flex flex-col">
      <SectionHeading title={SECTIONS.sideProjects.title} />

      <div className="flex flex-col">
        {SIDE_PROJECTS.map((project, i) => {
          const isLive = !!project.href;
          const isExternal = isLive && project.href!.startsWith("http");

          const row = (
            <div className="group flex items-center justify-between gap-4 border-t border-zinc-800/70 py-[14px]">
              <span
                className={`text-[15px] leading-[1.5] transition-colors duration-150 ${
                  isLive
                    ? "text-zinc-200 group-hover:text-white"
                    : "text-zinc-600"
                }`}
              >
                {project.name}
              </span>
              {isLive && (
                <ArrowIcon
                  size={14}
                  className="shrink-0 text-zinc-600 opacity-0 transition-all duration-150 group-hover:opacity-100 group-hover:text-zinc-300"
                />
              )}
            </div>
          );

          return isLive ? (
            <Link
              key={i}
              href={project.href!}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="block"
            >
              {row}
            </Link>
          ) : (
            <div key={i}>{row}</div>
          );
        })}
        {/* closing bottom border */}
        <div className="border-t border-zinc-800/70" />
      </div>
    </section>
  );
}
