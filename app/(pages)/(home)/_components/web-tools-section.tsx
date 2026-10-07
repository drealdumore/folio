"use client";

import React from "react";
import Link from "next/link";
import { SectionHeading } from "../../../../components/design/SectionHeading";

interface SideProject {
  name: string;
  href?: string;
}

const SIDE_PROJECTS: SideProject[] = [
  { name: "Deps Janitor: Find and remove unused npm dependencies", href: "https://deps-janitor.vercel.app/" },
  { name: "Peekr: Responsive website snapshot generator", href: "https://peekrr.vercel.app/" },
  { name: "MetaScraper: Extract metadata from any URL", href: "https://meta-scrapper.vercel.app/" },
  { name: "VaultX: Share text and links across devices with expiry", href: "https://github.com/drealdumore/vaultx/" },
  { name: "Falso API: TypeScript mock data generator from interfaces", href: "https://github.com/drealdumore/falso-api/" },
  { name: "Split cost: Split costs in real time" },
  { name: "Writing Pad: Minimal distraction-free writing space" },
  { name: "Olamide Tour: Concert landing page clone", href: "https://olamide-tour.vercel.app/" },
];

export default function WebTools() {
  return (
    <section className="flex flex-col">
      <SectionHeading title="Side Projects" />

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
                 
<svg className=" shrink-0 text-zinc-600 opacity-0 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-300" width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
    <g id="arrow-right" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
        <g id="Group" transform="translate(3, 6)" stroke="currentColor">
            <path d="M12,12 L14.6059,9.3941 C15.7939,8.2061 16.388,7.612 16.6105,6.9271 C16.8063,6.3245 16.8063,5.6755 16.6105,5.0729 C16.388,4.388 15.7939,3.79394 14.6059,2.60589 L12,0" id="Path" stroke-width="1.5"></path>
            <line x1="0" y1="6" x2="16.5" y2="6" id="Path" stroke-width="1.5"></line>
        </g>
    </g>
</svg>
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
