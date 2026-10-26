"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/design/SectionHeading";
import { MobileRow } from "@/components/design/project-ui";
import { ArrowIcon } from "@/components/design/arrow-icon";
import { BrowserFrame } from "@/components/design/browser-frame";
import { BlurUpImage } from "@/components/media/blur-up-image";
import { WorkVideo } from "@/components/media/work-video";
import { prefetchImage, prefetchImages, prefetchProjectDetail } from "@/lib/prefetch";
import {
  ALLPROJECTS,
  FEATURED_GROUPS,
  SECTIONS,
  type FeaturedProject,
} from "@/content/site";

const ProjectArticle = ({
  project,
  index,
  dimmed = false,
}: {
  project: FeaturedProject;
  index: number;
  dimmed?: boolean;
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

  const { mobileScreens, video } = project;
  const hasVideo = Boolean(video?.webm || video?.mp4);

  const handleHover = () => {
    setHovered(true);
    if (project.href && !project.href.startsWith("http")) {
      prefetchProjectDetail(project.href);
    }
    if (hasVideo && video?.poster) {
      prefetchImage(video.poster);
    }
    if (project.mobileScreens) {
      prefetchImages(project.mobileScreens);
    }
  };

  const showHighlight = inView || hovered;
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
      style={{
        opacity: dimmed ? opacity * 0.4 : opacity,
        transition: "opacity 0.4s ease",
      }}
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
              <h2 className="font-medium text-[16px] pt-0 text-zinc-200 transition-colors duration-150 ease-out hover:text-text-heading">
                {project.name}
              </h2>
            </Link>
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
        {hasVideo && video ? (
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

        {!hasVideo &&
        (!mobileScreens || mobileScreens.length === 0) &&
        project.image ? (
          <Link {...mediaLinkProps} className="group/media w-full block">
            <BrowserFrame url={project.href}>
              <div className="relative w-full overflow-hidden bg-surface">
                <BlurUpImage
                  src={project.image}
                  alt={project.name}
                  width={1200}
                  height={800}
                  wrapperClassName="w-full"
                  className="block w-full object-cover transition-transform duration-700 group-hover/media:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 720px"
                  minBlurMs={320}
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover/media:opacity-100" />
                <span className="pointer-events-none absolute bottom-3 left-3 inline-flex translate-y-1 items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[12px] font-medium text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover/media:translate-y-0 group-hover/media:opacity-100">
                  View project
                  <ArrowIcon size={12} className="-rotate-45" />
                </span>
              </div>
            </BrowserFrame>
          </Link>
        ) : null}
      </article>
    </div>
  );
};

const Projects = () => {
  const [hovered, setHovered] = useState<string | null>(null);
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
                  <div
                    key={project.name}
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse") setHovered(project.name);
                    }}
                    onPointerLeave={(e) => {
                      if (e.pointerType === "mouse") setHovered(null);
                    }}
                  >
                    <ProjectArticle
                      project={project}
                      index={globalIndex}
                      dimmed={hovered !== null && hovered !== project.name}
                    />
                  </div>
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
          See all {ALLPROJECTS.length} projects
          <ArrowIcon size={14} />
        </Link>
      </div>
    </section>
  );
};

export default Projects;
