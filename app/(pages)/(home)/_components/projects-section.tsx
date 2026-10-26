"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/design/SectionHeading";
import { MobileRow } from "@/components/design/project-ui";
import { ArrowIcon } from "@/components/design/arrow-icon";
import { BlurUpImage } from "@/components/media/blur-up-image";
import { WorkVideo } from "@/components/media/work-video";
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
    if (project.video?.poster) {
      prefetchImage(project.video.poster);
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
    if (project.video?.poster) {
      prefetchImage(project.video.poster);
    }
    if (project.mobileScreens) {
      prefetchImages(project.mobileScreens);
    }
  };

  const showHighlight = inView || hovered;
  const { mobileScreens, video } = project;
  const mediaLinkProps = {
    href: project.href,
    target: project.href.startsWith("http") ? "_blank" : undefined,
    rel: project.href.startsWith("http")
      ? "noopener noreferrer"
      : undefined,
  };

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
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={project.href}
              target={project.href.startsWith("http") ? "_blank" : undefined}
              rel={
                project.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              data-cursor={
                project.href.startsWith("http") ? "external" : "project"
              }
            >
              <h2 className="font-medium text-[16px] pt-0 text-zinc-200 transition-colors duration-150 ease-out hover:text-white">
                {project.name}
              </h2>
            </Link>
            {/* {project.status && project.status !== "live" && (
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-400">
                {project.status === "in-development"
                  ? "In development"
                  : project.status}
              </span>
            )} */}
          </div>
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
                {project.highlight}
              </span>
            )}
            {project.descriptionAfter}
          </p>
        </header>

        {/* Media */}
        {video ? (
          <Link {...mediaLinkProps} className="w-full block">
            <WorkVideo {...video} alt={`${project.name} preview`} />
          </Link>
        ) : null}

        {mobileScreens && mobileScreens.length > 0 ? (
          <Link
            {...mediaLinkProps}
            className="w-full block transition-transform duration-500 hover:scale-[1.01]"
          >
            <MobileRow images={mobileScreens} alt={project.name} />
          </Link>
        ) : null}

        {!video &&
        (!mobileScreens || mobileScreens.length === 0) &&
        project.image ? (
          <Link {...mediaLinkProps} className="w-full block">
            <BlurUpImage
              src={project.image}
              alt={project.name}
              width={1200}
              height={800}
              wrapperClassName="w-full rounded-[4px]"
              className="block w-full object-cover"
              sizes="(max-width: 768px) 100vw, 629px"
            />
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
