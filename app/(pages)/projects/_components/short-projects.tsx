"use client";

import Link from "next/link";
import { SECTIONS, WEB_TOOLS } from "@/content/site";
import { ArrowIcon } from "@/components/design/arrow-icon";

const ShortProjects = ({ tools = WEB_TOOLS }: { tools?: typeof WEB_TOOLS }) => {
  return (
    <div className="flex flex-col mt-16">
      <h2 className="text-[13px] font-medium tracking-[0.08em] uppercase text-zinc-500 mb-4">
        {SECTIONS.sideProjects.title}
      </h2>

      <div className="flex flex-col">
        {tools.map((tool, i) => {
          const isExternal = tool.projectLink.startsWith("http");
          const isLive = !!tool.projectLink;

          const row = (
            <div className="group flex items-center justify-between gap-4 border-t border-zinc-800/70 py-[14px]">
              <span
                className={`text-[15px] leading-[1.5] transition-colors duration-150 ${
                  isLive
                    ? "text-zinc-200 group-hover:text-white"
                    : "text-zinc-600"
                }`}
              >
                {tool.projectName}
                {tool.projectDescription && (
                  <span className="ml-2 text-zinc-600 text-[13px]">
                    — {tool.projectDescription}
                  </span>
                )}
              </span>
              {isLive && (
                <ArrowIcon
                  size={14}
                  className="shrink-0 -rotate-45 text-zinc-600 opacity-0 transition-all duration-150 group-hover:opacity-100 group-hover:text-zinc-300"
                />
              )}
            </div>
          );

          return isLive ? (
            <Link
              key={i}
              href={tool.projectLink}
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
        <div className="border-t border-zinc-800/70" />
      </div>
    </div>
  );
};

export default ShortProjects;
