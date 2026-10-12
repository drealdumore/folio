"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CASE_STUDY_LABELS, MOBILE_APPS } from "@/content/site";
import { MobileRow } from "@/components/design/project-ui";
import { prefetchImage, prefetchImages } from "@/lib/prefetch";

const isHttp = (url: string | undefined): url is string =>
  !!url && /^https?:/i.test(url);

const derivePlatform = (techs: string[] | undefined): string => {
  const joined = (techs ?? []).join(" ").toLowerCase();
  if (/react native|expo|reanimated/i.test(joined)) return "iOS & Android";
  if (/express|node\.js|redis/i.test(joined) && !/next\.js|react/i.test(joined))
    return "Backend API";
  return "Web";
};

const ProjectsDetailTemplate = ({ id }: { id: string }) => {
  const index = MOBILE_APPS.findIndex((p) => p.id === id);
  const project = index >= 0 ? MOBILE_APPS[index] : undefined;
  const prev = index > 0 ? MOBILE_APPS[index - 1] : undefined;
  const next =
    index >= 0 && index < MOBILE_APPS.length - 1
      ? MOBILE_APPS[index + 1]
      : undefined;

  useEffect(() => {
    if (!project) return;
    if (project.heroImage) {
      prefetchImage(project.heroImage);
    }
    if (project.gallery && project.gallery.length > 0) {
      prefetchImages(project.gallery.map((img) => img.src));
    }
  }, [project]);

  if (!project) {
    return <p className="text-text-normal">{CASE_STUDY_LABELS.notFound}</p>;
  }

  const visitUrl = isHttp(project.website) ? project.website : undefined;
  const repoLink = project.links.find((link) => {
    const hay = `${link.label} ${link.url}`;
    return (
      /github\.com|view code|source|repo/i.test(hay) &&
      (visitUrl ? link.url !== visitUrl : true)
    );
  });
  const repoUrl = repoLink ? repoLink.url : undefined;

  const navItems: { id: string; label: string }[] = [
    { id: "overview", label: CASE_STUDY_LABELS.overview },
    ...(project.gallery && project.gallery.length > 0
      ? [{ id: "gallery", label: CASE_STUDY_LABELS.gallery }]
      : []),
    { id: "challenge", label: CASE_STUDY_LABELS.challenge },
    { id: "result", label: CASE_STUDY_LABELS.result },
    ...(project.technologies && project.technologies.length > 0
      ? [{ id: "stack", label: CASE_STUDY_LABELS.stack }]
      : []),
  ];

  const PagerLink = ({
    target,
    side,
  }: {
    target: (typeof MOBILE_APPS)[number];
    side: "prev" | "next";
  }) => (
    <Link
      href={`/projects/${target.id}`}
      prefetch
      className={`group flex flex-col gap-1 rounded-xl border border-zinc-800/60 bg-zinc-900/30 px-4 py-3 transition-colors duration-150 hover:bg-zinc-900/80 ${
        side === "next" ? "text-right" : ""
      }`}
    >
      <span className="text-[12px] tracking-wide text-zinc-500">
        {side === "prev"
          ? CASE_STUDY_LABELS.previous
          : CASE_STUDY_LABELS.next}
      </span>
      <span className="text-[15px] text-text-heading group-hover:text-white">
        {target.sub}
      </span>
    </Link>
  );

  return (
    <>
      <Link
        href="/projects"
        className="flex p-2 items-center w-max justify-center bg-white/10 border border-white/15 backdrop-blur-md transition-all hover:bg-white/25 hover:scale-110 group duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90 text-[#ccc] mb-4 shrink-0 rounded-sm"
        aria-label="Previous"
      >
        <svg
          className="size-5 text-white"
          aria-hidden="true"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.74992 5L3.10348 8.64645C2.90822 8.84171 2.90822 9.15829 3.10348 9.35355L6.74992 13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M4 9H19C20.1046 9 21 9.89543 21 11V16C21 17.1046 20.1046 18 19 18H12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </Link>
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="w-full font-bold leading-9 text-[20px] text-text-heading">
          {project.sub}
        </h1>
      </div>

      <article className="pb-16 lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:items-start lg:gap-10">
        {/* Sticky section nav */}
        <aside className="hidden lg:sticky lg:top-24 lg:block lg:h-max">
          <p className="mb-3 text-[12px] font-medium tracking-[0.08em] uppercase text-zinc-500">
            {CASE_STUDY_LABELS.onThisPage}
          </p>
          <nav className="flex flex-col gap-1 border-l border-zinc-800/70">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="-ml-px border-l border-transparent pl-3 text-[13px] text-zinc-500 transition-colors duration-150 hover:border-text-heading hover:text-text-heading"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Body */}
        <div className="space-y-12">
          {/* Info Grid */}
          <div
            id="overview"
            className="flex flex-col justify-between gap-6 mb-8 scroll-mt-28"
          >
            <div className="max-w-xl">
              <p className="text-text-normal leading-[20px] text-[15px]">
                {project.intro}
              </p>
            </div>

            <div>
              <table>
                <tbody className="divide-y divide-zinc-700">
                  <tr>
                    <td className="pr-6 py-2 font-medium text-text-heading">
                      {CASE_STUDY_LABELS.year}
                    </td>
                    <td className="text-text-normal leading-[20px] text-[15px]">
                      {project.year}
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-6 py-2 font-medium text-text-heading">
                      {CASE_STUDY_LABELS.platform}
                    </td>
                    <td className="text-text-normal leading-[20px] text-[15px]">
                      {derivePlatform(project.technologies)}
                    </td>
                  </tr>
                  {visitUrl && (
                    <tr>
                      <td className="pr-6 py-2 font-medium text-text-heading">
                        {CASE_STUDY_LABELS.link}
                      </td>
                      <td className="text-text-normal leading-[20px] text-[15px]">
                        <a
                          href={visitUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-heading underline underline-offset-4 hover:text-white"
                        >
                          {project.sub}
                        </a>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA pair */}
          {(visitUrl || repoUrl) && (
            <div className="flex flex-wrap gap-3">
              {visitUrl && (
                <a
                  href={visitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-text-heading px-5 py-2.5 text-[14px] font-medium text-background transition hover:bg-text-normal"
                >
                  {CASE_STUDY_LABELS.visitSite}
                </a>
              )}
              {repoUrl && (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-text-heading px-5 py-2.5 text-[14px] font-medium text-text-heading transition hover:bg-zinc-800"
                >
                  {CASE_STUDY_LABELS.viewCode}
                </a>
              )}
            </div>
          )}

          {/* Hero Image */}
          {project.heroImage && (
            <div
              className="w-full overflow-hidden rounded-2xl shadow-md relative"
              style={{ height: "400px" }}
            >
              <Image
                src={project.heroImage}
                alt={`${project.sub} Hero`}
                className="object-cover select-none transition-transform duration-500 hover:scale-[1.03]"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </div>
          )}

          {/* Intro Text */}
          {project.introText && (
            <p className="max-w-3xl leading-[20px] text-[15px] text-text-normal">
              {project.introText}
            </p>
          )}

          {/* Stats */}
          {project.stats && project.stats.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {project.stats.map((stat, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-4"
                >
                  <p className="text-[20px] font-semibold text-text-heading">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[13px] leading-snug text-zinc-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div id="gallery" className="my-8 scroll-mt-28">
              <MobileRow
                images={project.gallery.map((img) => img.src)}
                labels={project.gallery.map((img) => img.alt)}
                alt={project.sub}
              />
            </div>
          )}

          {/* Process Grid */}
          <div id="challenge" className="grid gap-12 my-32 relative scroll-mt-28">
            <div>
              <h3 className="text-xl font-bold text-text-heading mb-4">
                {CASE_STUDY_LABELS.challenge}
              </h3>
              <p className="text-text-normal leading-[20px] text-[15px]">
                {project.challenge}
              </p>
            </div>

            {project.actions?.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-text-heading">
                  {CASE_STUDY_LABELS.action}
                </h3>
                {project.actions.map((action, i) => (
                  <div key={i}>
                    <h4 className="font-bold text-text-heading leading-6">
                      {action.title}
                    </h4>
                    <p className="text-text-normal leading-[20px] text-[15px]">
                      {action.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Result */}
          {project.result && (
            <div id="result" className="scroll-mt-28">
              <h3 className="text-xl font-bold text-text-heading mb-4">
                {CASE_STUDY_LABELS.result}
              </h3>
              <p className="max-w-3xl text-text-normal leading-[20px] text-[15px]">
                {project.result}
              </p>
            </div>
          )}

          {/* Stack */}
          {project.technologies && project.technologies.length > 0 && (
            <div id="stack" className="scroll-mt-28">
              <h3 className="text-xl font-bold text-text-heading mb-4">
                {CASE_STUDY_LABELS.stack}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="rounded-md border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-[13px] text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Prev / Next */}
          {(prev || next) && (
            <div className="mt-8 grid grid-cols-2 gap-3">
              {prev ? (
                <PagerLink target={prev} side="prev" />
              ) : (
                <div />
              )}
              {next ? (
                <PagerLink target={next} side="next" />
              ) : (
                <div />
              )}
            </div>
          )}
        </div>
      </article>
    </>
  );
};

export default ProjectsDetailTemplate;

export const MobileBackIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
    className={className}
    focusable="false"
  >
    <path
      fillRule="evenodd"
      d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export const BackIcon = (props?: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#000000"}
    fill={"none"}
    {...props}
  >
    <path
      d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);