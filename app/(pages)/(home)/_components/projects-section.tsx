"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/design/SectionHeading";
import { MobileRow } from "@/components/design/project-ui";
import { ArrowIcon } from "@/components/design/arrow-icon";
import { prefetchImage, prefetchImages, prefetchProjectDetail } from "@/lib/prefetch";
import { FEATURED_GROUPS, SECTIONS, type FeaturedProject } from "@/content/site";

const ProjectArticle = ({
  project,
  index,
}: {
  project: FeaturedProject;
  index: number;
}) => {
  const [opacity, setOpacity] = useState(index === 0 ? 1 : 0.35);
  const [inView, setInView] = useState(index === 0);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prefetch project detail first image and gallery images ahead of time
    if (project.href && !project.href.startsWith("http")) {
      prefetchProjectDetail(project.href);
    }
    if (project.mobileScreens) {
      prefetchImages(project.mobileScreens);
    } else if (project.image) {
      prefetchImage(project.image);
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setOpacity(visible ? 1 : 0.35);
        setInView(visible);
        if (visible && project.href && !project.href.startsWith("http")) {
          prefetchProjectDetail(project.href);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [project]);

  const handleHover = () => {
    setHovered(true);
    if (project.href && !project.href.startsWith("http")) {
      prefetchProjectDetail(project.href);
    }
    if (project.mobileScreens) {
      prefetchImages(project.mobileScreens);
    }
  };

  const showHighlight = inView || hovered;
  const { mobileScreens } = project;

  return (
    <div
      ref={ref}
      style={{ opacity, transition: "opacity 0.4s ease" }}
      onMouseEnter={handleHover}
      onMouseLeave={() => setHovered(false)}
    >
      <article className="flex w-full flex-col items-start gap-[25px]">
        {/* Header */}
        <header className="flex flex-col items-start gap-[3px] text-[18px] leading-[24px] lg:text-[21px] lg:leading-[28px]">
          <Link
            href={project.href}
            target={project.href.startsWith("http") ? "_blank" : undefined}
            rel={
              project.href.startsWith("http") ? "noopener noreferrer" : undefined
            }
          >
            <h2 className="font-medium text-[16px] pt-0 text-zinc-200 transition-colors duration-150 ease-out hover:text-white">
              {project.name}
            </h2>
          </Link>
          {(project.tags?.length || project.year) && (
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-zinc-500">
              {project.tags?.map((tag, i) => (
                <span key={tag} className="flex items-center gap-2">
                  {i > 0 && <span className="text-zinc-700">·</span>}
                  {tag}
                </span>
              ))}
              {project.year && (
                <span className="flex items-center gap-2">
                  {project.tags?.length ? (
                    <span className="text-zinc-700">·</span>
                  ) : null}
                  <span className="tabular-nums">{project.year}</span>
                </span>
              )}
            </div>
          )}
          <p className="text-[15px] leading-[1.65] text-zinc-400">
            {project.descriptionBefore}
            {project.highlight && (
              <span className="relative inline-block px-[0.15em]">
                <span
                  aria-hidden="true"
                  className="absolute inset-y-[-0.04em] left-0 right-0 rounded-[2px] bg-zinc-700/60"
                  style={{
                    transformOrigin: "0% 50%",
                    opacity: showHighlight ? 1 : 0,
                    transform: showHighlight ? "scaleX(1)" : "scaleX(0)",
                    transition: "opacity 0.45s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
                <span className="relative text-zinc-300">{project.highlight}</span>
              </span>
            )}
            {project.descriptionAfter}
          </p>
        </header>

        {/* Media */}
        {mobileScreens && mobileScreens.length > 0 ? (
          <Link
            href={project.href}
            target={project.href.startsWith("http") ? "_blank" : undefined}
            rel={project.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="w-full block transition-transform duration-500 hover:scale-[1.01]"
          >
            <MobileRow images={mobileScreens} alt={project.name} />
          </Link>
        ) : project.image ? (
          <Link
            href={project.href}
            target={project.href.startsWith("http") ? "_blank" : undefined}
            rel={
              project.href.startsWith("http") ? "noopener noreferrer" : undefined
            }
            className="w-full block"
          >
            <div className="w-full overflow-hidden rounded-[4px]">
              <Image
                src={project.image}
                alt={project.name}
                width={1200}
                height={800}
                className="w-full object-cover block"
                sizes="(max-width: 768px) 100vw, 629px"
              />
            </div>
          </Link>
        ) : null}
      </article>
    </div>
  );
};

const Projects = () => {
  let globalIndex = -1;

  return (
    <section className="flex flex-col">
      <SectionHeading title={SECTIONS.projects.title} />

      <div className="flex flex-col gap-12 md:gap-16">
        {FEATURED_GROUPS.map((group) => (
          <div key={group.label} className="flex flex-col">
            <h3 className="mb-6 text-[13px] font-medium uppercase tracking-[0.08em] text-zinc-500">
              {group.label}
            </h3>
            <div className="flex flex-col gap-[30px] md:gap-[50px]">
              {group.projects.map((project) => {
                globalIndex += 1;
                return (
                  <ProjectArticle
                    key={project.name}
                    project={project}
                    index={globalIndex}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <Link
          href="/projects"
          className="text-[13px] text-zinc-500 hover:text-zinc-300 transition-all duration-300 flex items-center gap-1.5 group"
        >
          {SECTIONS.projects.viewAll}
          <ArrowIcon size={14} />
        </Link>
      </div>
    </section>
  );
};

export default Projects;
