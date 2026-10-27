"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CASE_STUDY_LABELS, MOBILE_APPS } from "@/content/site";
import { MobileRow, WideImage } from "@/components/design/project-ui";
import { NextProjectCard } from "@/components/design/next-project-card";
import { ArrowIcon } from "@/components/design/arrow-icon";
import { BlurUpImage } from "@/components/media/blur-up-image";
import { prefetchProjectDetail } from "@/lib/prefetch";

const SPRING = { type: "spring", stiffness: 420, damping: 28 } as const;
const SPRING_BOUNCY = { type: "spring", stiffness: 500, damping: 18 } as const;

const MotionLink = motion.create(Link);

const isHttp = (url: string | undefined): url is string =>
  !!url && /^https?:/i.test(url);

const isRepoHost = (url: string) =>
  /(?:github\.com|gitlab\.com|bitbucket\.org|codeberg\.org|sourcehut\.org)/i.test(
    url
  );

const derivePlatform = (techs: string[] | undefined): string => {
  const joined = (techs ?? []).join(" ").toLowerCase();
  if (/react native|expo|reanimated/i.test(joined)) return "iOS & Android";
  if (/express|node\.js|redis/i.test(joined) && !/next\.js|react/i.test(joined))
    return "Backend API";
  return "Web";
};

function Reveal({
  children,
  className,
  id,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      id={id}
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        type: "spring",
        stiffness: 240,
        damping: 28,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

const ProjectsDetailTemplate = ({ id }: { id: string }) => {
  const reduce = useReducedMotion();
  const index = MOBILE_APPS.findIndex((p) => p.id === id);
  const project = index >= 0 ? MOBILE_APPS[index] : undefined;
  const prev = index > 0 ? MOBILE_APPS[index - 1] : undefined;
  const next =
    index >= 0 && index < MOBILE_APPS.length - 1
      ? MOBILE_APPS[index + 1]
      : undefined;

  useEffect(() => {
    if (!project) return;
    prefetchProjectDetail(project.id);
  }, [project]);

  if (!project) {
    return <p className="text-text-normal">{CASE_STUDY_LABELS.notFound}</p>;
  }

  const allLinks = [
    ...(isHttp(project.website)
      ? [{ label: project.sub, url: project.website }]
      : []),
    ...project.links.filter((link) => isHttp(link.url)),
  ];
  const visitUrl = allLinks.find((link) => !isRepoHost(link.url))?.url;
  const repoUrl = allLinks.find((link) => isRepoHost(link.url))?.url;

  const platform = derivePlatform(project.technologies);
  const isMobile = platform === "iOS & Android";
  const gallery = project.gallery ?? [];
  const galleryImages = isMobile
    ? gallery
    : gallery.filter((img) => img.src !== project.heroImage);
  const showGallery = galleryImages.length > 0;

  return (
    <>
      <MotionLink
        href="/projects"
        aria-label="Back to projects"
        whileHover={reduce ? undefined : { scale: 1.08 }}
        whileTap={reduce ? undefined : { scale: 0.92 }}
        transition={SPRING_BOUNCY}
        className="theme-dark-surface group mb-4 flex w-max shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/10 p-2 text-white shadow-sm backdrop-blur-md transition-colors hover:bg-white/20"
      >
        <ArrowIcon size={20} className="rotate-180" />
      </MotionLink>

      <div className="mb-5 flex flex-col gap-2">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 28 }}
          className="w-full text-[24px] font-bold leading-9 tracking-[-0.02em] text-text-heading lg:text-[28px]"
        >
          {project.sub}
        </motion.h1>
        {project.oneLiner && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 28,
              delay: 0.05,
            }}
            className="max-w-xl text-[15px] leading-relaxed text-zinc-500"
          >
            {project.oneLiner}
          </motion.p>
        )}
      </div>

      <article className="pb-16">
        <div className="space-y-12">
          <Reveal
            id="overview"
            className="flex scroll-mt-28 flex-col justify-between gap-8"
          >
            <div className="max-w-xl">
              <p className="text-[15px] leading-[1.7] text-text-normal">
                {project.intro}
              </p>

              {project.story && (
                <div className="mt-5">
                  <p className="mb-1 text-[10px] uppercase tracking-[0.16em] text-zinc-600">
                    {CASE_STUDY_LABELS.why}
                  </p>
                  <p className="text-[15px] leading-[1.7] text-zinc-300">
                    {project.story}
                  </p>
                </div>
              )}
            </div>

            <table className="w-full">
              <tbody className="divide-y divide-zinc-800/70">
                <tr>
                  <td className="w-[110px] py-2 pr-6 align-top text-[13px] font-medium text-zinc-500">
                    {CASE_STUDY_LABELS.year}
                  </td>
                  <td className="py-2 text-[15px] leading-[20px] text-text-normal">
                    {project.year}
                  </td>
                </tr>
                {project.type && (
                  <tr>
                    <td className="py-2 pr-6 align-top text-[13px] font-medium text-zinc-500">
                      {CASE_STUDY_LABELS.type}
                    </td>
                    <td className="py-2 text-[15px] leading-[20px] text-text-normal">
                      {project.type}
                    </td>
                  </tr>
                )}
                {project.client && (
                  <tr>
                    <td className="py-2 pr-6 align-top text-[13px] font-medium text-zinc-500">
                      {CASE_STUDY_LABELS.client}
                    </td>
                    <td className="py-2 text-[15px] leading-[20px] text-text-normal">
                      {project.client}
                    </td>
                  </tr>
                )}
                {project.role && (
                  <tr>
                    <td className="py-2 pr-6 align-top text-[13px] font-medium text-zinc-500">
                      {CASE_STUDY_LABELS.role}
                    </td>
                    <td className="py-2 text-[15px] leading-[20px] text-text-normal">
                      {project.role}
                    </td>
                  </tr>
                )}
                <tr>
                  <td className="py-2 pr-6 align-top text-[13px] font-medium text-zinc-500">
                    {CASE_STUDY_LABELS.platform}
                  </td>
                  <td className="py-2 text-[15px] leading-[20px] text-text-normal">
                    {platform}
                  </td>
                </tr>
                {project.technologies && project.technologies.length > 0 && (
                  <tr>
                    <td className="py-2 pr-6 align-top text-[13px] font-medium text-zinc-500">
                      {CASE_STUDY_LABELS.stack}
                    </td>
                    <td className="py-2 text-[15px] leading-[20px] text-text-normal">
                      {project.technologies.join(", ")}
                    </td>
                  </tr>
                )}
                {visitUrl && (
                  <tr>
                    <td className="py-2 pr-6 align-top text-[13px] font-medium text-zinc-500">
                      {CASE_STUDY_LABELS.link}
                    </td>
                    <td className="py-2 text-[15px] leading-[20px] text-text-normal">
                      <a
                        href={visitUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all text-text-heading underline underline-offset-4 transition-colors hover:text-zinc-300"
                      >
                        {visitUrl}
                      </a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Reveal>

          {(visitUrl || repoUrl) && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 26,
                delay: 0.08,
              }}
              className="glass-nav inline-flex max-w-full items-center gap-1 self-start rounded-full border border-white/10 p-1.5"
            >
              {visitUrl && (
                <motion.a
                  href={visitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={reduce ? undefined : { scale: 1.04 }}
                  whileTap={reduce ? undefined : { scale: 0.96 }}
                  transition={SPRING}
                  className="relative rounded-full px-3.5 py-1.5 text-[13px] font-medium text-zinc-300 transition-colors duration-200 select-none hover:bg-white/10 hover:text-white"
                >
                  {CASE_STUDY_LABELS.visitSite}
                </motion.a>
              )}
              {repoUrl && (
                <motion.a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={reduce ? undefined : { scale: 1.04 }}
                  whileTap={reduce ? undefined : { scale: 0.96 }}
                  transition={SPRING}
                  className="relative rounded-full px-3.5 py-1.5 text-[13px] font-medium text-zinc-300 transition-colors duration-200 select-none hover:bg-white/10 hover:text-white"
                >
                  {CASE_STUDY_LABELS.viewCode}
                </motion.a>
              )}
            </motion.div>
          )}

          {project.heroImage && (
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.97, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 200, damping: 26 }}
            >
              {isMobile ? (
                <BlurUpImage
                  src={project.heroImage}
                  alt={`${project.sub} Hero`}
                  fill
                  wrapperClassName="h-[400px] w-full rounded-2xl shadow-md"
                  className="select-none object-cover transition-transform duration-500 ease-out hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
              ) : (
                <WideImage
                  src={project.heroImage}
                  alt={`${project.sub} preview`}
                  priority
                />
              )}
            </motion.div>
          )}

          {project.introText && (
            <Reveal>
              <p className="max-w-3xl text-[15px] leading-[1.7] text-text-normal">
                {project.introText}
              </p>
            </Reveal>
          )}

          {project.outcome && (
            <Reveal>
              <div className="relative overflow-hidden rounded-[16px] border border-zinc-800/70 bg-zinc-900/30 p-6 sm:p-8">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-16 size-40 rounded-full bg-white/[0.035] blur-3xl"
                />

                <p className="relative text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                  {CASE_STUDY_LABELS.outcome}
                </p>

                <div className="relative mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
                  <p className="text-[22px] font-semibold leading-none tracking-[-0.03em] text-text-heading sm:text-[40px]">
                    {project.outcome.value}
                  </p>
                  <p className="max-w-sm text-[14px] leading-[1.65] text-zinc-400 sm:text-right">
                    {project.outcome.label}
                  </p>
                </div>
              </div>
            </Reveal>
          )}

          {project.stats && project.stats.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {project.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={reduce ? false : { opacity: 0, y: 18, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 26,
                    delay: i * 0.06,
                  }}
                  whileHover={reduce ? undefined : { y: -4 }}
                  className="rounded-[14px] border border-zinc-800/60 bg-zinc-900/30 p-4 transition-colors duration-200 hover:border-zinc-700 hover:bg-zinc-900/60"
                >
                  <p className="text-[20px] font-semibold text-text-heading">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[13px] leading-snug text-zinc-500">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          )}

          {showGallery && (
            <div id="gallery" className="scroll-mt-28">
              {isMobile ? (
                <MobileRow
                  images={galleryImages.map((img) => img.src)}
                  labels={galleryImages.map((img) => img.alt)}
                  alt={project.sub}
                />
              ) : (
                <div className="flex flex-col gap-5">
                  {galleryImages.map((img) => (
                    <motion.div
                      key={img.src}
                      initial={reduce ? false : { opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 26,
                      }}
                    >
                      <div className="relative overflow-hidden rounded-[14px] border border-zinc-800/70 bg-image-card">
                        <BlurUpImage
                          src={img.src}
                          alt={img.alt}
                          width={1200}
                          height={800}
                          sizes="(max-width: 768px) 100vw, 720px"
                          className="h-auto w-full object-contain"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          <Reveal
            id="challenge"
            className="relative my-6 grid scroll-mt-28 gap-10"
          >
            <div>
              <h3 className="mb-3 text-xl font-bold text-text-heading">
                {CASE_STUDY_LABELS.challenge}
              </h3>
              <p className="text-[15px] leading-[1.7] text-text-normal">
                {project.challenge}
              </p>
            </div>

            {project.actions?.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-text-heading">
                  {CASE_STUDY_LABELS.action}
                </h3>
                {project.actions.map((action, i) => (
                  <motion.div
                    key={i}
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      type: "spring",
                      stiffness: 240,
                      damping: 26,
                      delay: i * 0.05,
                    }}
                  >
                    <h4 className="font-bold leading-6 text-text-heading">
                      {action.title}
                    </h4>
                    <p className="text-[15px] leading-[1.7] text-text-normal">
                      {action.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </Reveal>

          {project.result && (
            <Reveal id="result" className="scroll-mt-28">
              <h3 className="mb-3 text-xl font-bold text-text-heading">
                {CASE_STUDY_LABELS.result}
              </h3>
              <p className="max-w-3xl text-[15px] leading-[1.7] text-text-normal">
                {project.result}
              </p>
            </Reveal>
          )}

          <div className="mt-6 border-t border-zinc-800/70 pt-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-[13px]">
              {prev ? (
                <Link
                  href={`/projects/${prev.id}`}
                  className="group inline-flex items-center gap-1.5 text-zinc-500 transition-colors hover:text-text-heading"
                >
                  <ArrowIcon
                    size={12}
                    className="rotate-180 transition-transform group-hover:-translate-x-0.5"
                  />
                  {CASE_STUDY_LABELS.previous}: {prev.sub}
                </Link>
              ) : (
                <span />
              )}
              <Link
                href="/projects"
                className="text-zinc-500 transition-colors hover:text-text-heading"
              >
                {CASE_STUDY_LABELS.allProjects}
              </Link>
            </div>

            {next ? (
              <NextProjectCard project={next} />
            ) : (
              <Link
                href="/projects"
                className="group flex items-center justify-between rounded-[14px] border border-zinc-800/70 bg-zinc-900/20 p-5 text-[15px] text-zinc-300 transition-colors hover:border-zinc-700 hover:text-text-heading"
              >
                {CASE_STUDY_LABELS.allProjects}
                <ArrowIcon
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            )}
          </div>
        </div>
      </article>
    </>
  );
};

export default ProjectsDetailTemplate;
