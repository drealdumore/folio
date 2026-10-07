"use client";

import Link from "next/link";
import { WEB_TOOLS } from "@/content/projects";

const ShortProjects = () => {
  return (
    <div className="flex flex-col mt-16">
      <h2 className="text-[13px] font-medium tracking-[0.08em] uppercase text-zinc-500 mb-4">
        Side projects
      </h2>

      <div className="flex flex-col">
        {WEB_TOOLS.map((tool, i) => {
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 text-zinc-600 opacity-0 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-300"
                  aria-hidden="true"
                >
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
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
