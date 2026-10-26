"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MobileRow } from "@/components/design/project-ui";
import { BlurUpImage } from "@/components/media/blur-up-image";
import { prefetchImage, prefetchImages, prefetchProjectDetail } from "@/lib/prefetch";

interface ProjectCardProps {
  projectName: string | undefined | null;
  projectLink: string | any;
  projectDescription: string | undefined | null;
  projectType: string | undefined | null;
  projectDate: string | any;
  technologies: string[];
  image?: string;
  mobileScreens?: string[];
  highlight?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  projectName,
  projectLink,
  projectDescription,
  technologies,
  image,
  mobileScreens,
  highlight,
}) => {
  const [opacity, setOpacity] = useState(0.35);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isExternal =
    typeof projectLink === "string" && projectLink.startsWith("http");

  useEffect(() => {
    // Prefetch project detail first image and screens ahead of time
    if (projectLink && !isExternal) {
      prefetchProjectDetail(projectLink);
    }
    if (mobileScreens && mobileScreens.length > 0) {
      prefetchImages(mobileScreens);
    } else if (image) {
      prefetchImage(image);
    }

    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setOpacity(visible ? 1 : 0.35);
        setInView(visible);
        if (visible && projectLink && !isExternal) {
          prefetchProjectDetail(projectLink);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [projectLink, isExternal, mobileScreens, image]);

  const handleHover = () => {
    setHovered(true);
    if (projectLink && !isExternal) {
      prefetchProjectDetail(projectLink);
    }
    if (mobileScreens && mobileScreens.length > 0) {
      prefetchImages(mobileScreens);
    }
  };

  const showHighlight = inView || hovered;

  // Emphasise the main point of the project, not just the first words.
  const description = projectDescription ?? "";
  const highlightIndex =
    highlight && description.includes(highlight)
      ? description.indexOf(highlight)
      : -1;
  const before = highlightIndex >= 0 ? description.slice(0, highlightIndex) : description;
  const matched = highlightIndex >= 0 ? description.slice(highlightIndex, highlightIndex + (highlight?.length ?? 0)) : "";
  const after = highlightIndex >= 0 ? description.slice(highlightIndex + (highlight?.length ?? 0)) : "";

  return (
    <div
      ref={ref}
      style={{ opacity, transition: "opacity 0.4s ease" }}
      onMouseEnter={handleHover}
      onMouseLeave={() => setHovered(false)}
    >
      <article className="flex w-full flex-col items-start gap-[18px]">
        {/* Media: First Mobile Row Preview or Desktop Image */}
        {mobileScreens && mobileScreens.length > 0 ? (
          <div className="w-full block">
            <MobileRow
              images={mobileScreens.slice(0, 3)}
              alt={projectName ?? "Mobile App"}
            />
          </div>
        ) : image ? (
          <Link
            href={projectLink}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="w-full block"
          >
            <div className="w-full overflow-hidden rounded-[8px]">
              <BlurUpImage
                src={image}
                alt={projectName ?? "Project"}
                width={1200}
                height={800}
                wrapperClassName="w-full"
                className="block w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
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
            {before}
            {matched && (
              <span
                className="rounded-[2px] px-[0.15em] text-zinc-300"
                style={{
                  backgroundColor: showHighlight
                    ? "rgba(63, 63, 70, 0.6)"
                    : "transparent",
                  transition: "background-color 0.45s ease",
                  WebkitBoxDecorationBreak: "clone",
                  boxDecorationBreak: "clone",
                }}
              >
                {matched}
              </span>
            )}
            {after}
          </p>
        </header>
      </article>
    </div>
  );
};

export default ProjectCard;
