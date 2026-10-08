"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MobileRow } from "@/components/design/project-ui";

interface ProjectCardProps {
  projectName: string | undefined | null;
  projectLink: string | any;
  projectDescription: string | undefined | null;
  projectType: string | undefined | null;
  projectDate: string | any;
  technologies: string[];
  image?: string;
  mobileScreens?: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  projectName,
  projectLink,
  projectDescription,
  technologies,
  image,
  mobileScreens,
}) => {
  const [opacity, setOpacity] = useState(0.35);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setOpacity(visible ? 1 : 0.35);
        setInView(visible);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isExternal =
    typeof projectLink === "string" && projectLink.startsWith("http");

  const showHighlight = inView || hovered;

  // Use first two words of description as the "highlight" stat
  const words = (projectDescription ?? "").split(" ");
  const highlight = words.slice(0, 4).join(" ");
  const rest = words.slice(4).join(" ");

  return (
    <div
      ref={ref}
      style={{ opacity, transition: "opacity 0.4s ease" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <article className="flex w-full flex-col items-start gap-[18px]">
        {/* Media: First Mobile Row Preview or Desktop Image */}
        {mobileScreens && mobileScreens.length > 0 ? (
          <Link
            href={projectLink}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="w-full block transition-transform duration-500 hover:scale-[1.01]"
          >
            <MobileRow
              images={mobileScreens.slice(0, 3)}
              alt={projectName ?? "Mobile App"}
            />
          </Link>
        ) : image ? (
          <Link
            href={projectLink}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="w-full block"
          >
            <div className="w-full overflow-hidden rounded-[8px]">
              <Image
                src={image}
                alt={projectName ?? "Project"}
                width={1200}
                height={800}
                className="w-full object-cover block transition-transform duration-700 hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 629px"
              />
            </div>
          </Link>
        ) : null}

        {/* Header / Text */}
        <header className="flex flex-col items-start gap-[3px] text-[18px] leading-[24px] lg:text-[21px] lg:leading-[28px]">
          <Link
            href={projectLink}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
          >
            <h2 className="font-medium text-[16px] pt-0 text-zinc-200 transition-colors duration-150 ease-out hover:text-white">
              {projectName}
            </h2>
          </Link>
          <p className="text-[15px] leading-[1.65] text-zinc-400">
            <span className="relative inline-block px-[0.15em]">
              <span
                aria-hidden="true"
                className="absolute inset-y-[-0.04em] left-0 right-0 rounded-[2px] bg-zinc-700/60"
                style={{
                  transformOrigin: "0% 50%",
                  opacity: showHighlight ? 1 : 0,
                  transform: showHighlight ? "scaleX(1)" : "scaleX(0)",
                  transition:
                    "opacity 0.45s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
              <span className="relative text-zinc-300">{highlight}</span>
            </span>
            {rest ? ` ${rest}` : ""}
          </p>
        </header>
      </article>
    </div>
  );
};

export default ProjectCard;
