"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CASE_STUDY_LABELS, MOBILE_APPS } from "@/content/site";
import { MobileRow, WideImage } from "@/components/design/project-ui";
import { ArrowIcon } from "@/components/design/arrow-icon";
import { prefetchImage, prefetchImages } from "@/lib/prefetch";
import { cn } from "@/lib/utils";

// Interaction springs — quick, interruptible, slightly bouncy.
const SPRING = { type: "spring", stiffness: 420, damping: 28 } as const;
const SPRING_BOUNCY = { type: "spring", stiffness: 500, damping: 18 } as const;

const MotionLink = motion.create(Link);

const isHttp = (url: string | undefined): url is string =>
  !!url && /^https?:/i.test(url);

// Hosts that point at source code rather than a running app.
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

  // Gather every real, clickable link the project exposes (website + links).
  // Placeholder copy like "Coming Soon" and bare "#" links are ignored, so a
  // button is only ever rendered when its link actually exists.
  const allLinks = [
    ...(isHttp(project.website)
      ? [{ label: project.sub, url: project.website }]
      : []),
    ...project.links.filter((link) => isHttp(link.url)),
  ];
  // A "visit" target is a live app/site; a "code" target is a source host.
  const visitUrl = allLinks.find((link) => !isRepoHost(link.url))?.url;
  const repoUrl = allLinks.find((link) => isRepoHost(link.url))?.url;

  const platform = derivePlatform(project.technologies);
  const isMobile = platform === "iOS & Android";
  const gallery = project.gallery ?? [];
  
  // Mobile projects show phone mockups from the gallery. Non-mobile projects
  // show the wide screenshot instead, so drop any gallery image that is just
  // the hero repeated to avoid rendering it twice.
  const galleryImages = isMobile
    ? gallery
    : gallery.filter((img) => img.src !== project.heroImage);
  const showGallery = galleryImages.length > 0;

  const navItems: { id: string; label: string }[] = [
    { id: "overview", label: CASE_STUDY_LABELS.overview },
    ...(showGallery
      ? [{ id: "gallery", label: CASE_STUDY_LABELS.gallery }]
      : []),
    { id: "challenge", label: CASE_STUDY_LABELS.challenge },
    { id: "result", label: CASE_STUDY_LABELS.result },
    ...(project.technologies && project.technologies.length > 0
      ? [{ id: "stack", label: CASE_STUDY_LABELS.stack }]
      : []),
  ];

  const renderPager = (
    target: (typeof MOBILE_APPS)[number],
    side: "prev" | "next"
  ) => (
    <MotionLink
      href={`/projects/${target.id}`}
      prefetch
      whileHover={reduce ? undefined : { y: -3 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={SPRING}
      className={cn(
        "group flex flex-col gap-1 rounded-xl border border-zinc-800/60 bg-zinc-900/30 px-4 py-3 transition-colors duration-150 hover:border-zinc-700 hover:bg-zinc-900/80",
        side === "next" && "items-end text-right"
      )}
    >
      <span className="flex items-center gap-1.5 text-[12px] tracking-wide text-zinc-500">
        {side === "prev" && <ArrowIcon size={12} className="rotate-180" />}
        {side === "prev"
          ? CASE_STUDY_LABELS.previous
          : CASE_STUDY_LABELS.next}
        {side === "next" && <ArrowIcon size={12} />}
      </span>
      <span className="text-[15px] text-text-heading transition-colors group-hover:text-white">
        {target.sub}
      </span>
    </MotionLink>
  );

  return (
    <>
      <MotionLink
        href="/projects"
        aria-label="Back to projects"
        whileHover={reduce ? undefined : { scale: 1.08 }}
        whileTap={reduce ? undefined : { scale: 0.92 }}
        transition={SPRING_BOUNCY}
        className="group mb-4 flex w-max shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/10 p-2 text-white shadow-sm backdrop-blur-md transition-colors hover:bg-white/20"
      >
        <ArrowIcon size={20} className="rotate-180" />
      </MotionLink>
      <div className="mb-4 flex flex-col gap-2">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 28 }}
          className="w-full text-[20px] font-bold leading-9 text-text-heading"
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
      {/* <article className="pb-16 lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:items-start lg:gap-10"> */}
        {/* Sticky section nav */}
        {/* <aside className="hidden lg:sticky lg:top-24 lg:block lg:h-max">
          <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.08em] text-zinc-500">
            {CASE_STUDY_LABELS.onThisPage}
          </p>
          <nav className="flex flex-col gap-1 border-l border-zinc-800/70">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="-ml-px border-l border-transparent pl-3 text-[13px] text-zinc-500 transition-all duration-200 hover:translate-x-0.5 hover:border-text-heading hover:text-text-heading"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside> */}

        {/* Body */}
        <div className="space-y-12">
          {/* Info Grid */}
          <Reveal
            id="overview"
            className="mb-8 flex scroll-mt-28 flex-col justify-between gap-6"
          >
            <div className="max-w-xl">
              <p className="text-[15px] leading-[20px] text-text-normal">
                {project.intro}
              </p>
            </div>

            <div>
              <table>
                <tbody className="divide-y divide-zinc-700">
                  <tr>
                    <td className="py-2 pr-6 font-medium text-text-heading">
                      {CASE_STUDY_LABELS.year}
                    </td>
                    <td className="text-[15px] leading-[20px] text-text-normal">
                      {project.year}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-6 font-medium text-text-heading">
                      {CASE_STUDY_LABELS.platform}
                    </td>
                    <td className="text-[15px] leading-[20px] text-text-normal">
                      {platform}
                    </td>
                  </tr>
                  {visitUrl && (
                    <tr>
                      <td className="py-2 pr-6 font-medium text-text-heading">
                        {CASE_STUDY_LABELS.link}
                      </td>
                      <td className="text-[15px] leading-[20px] text-text-normal">
                        <a
                          href={visitUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-heading underline underline-offset-4 transition-colors hover:text-white"
                        >
                          {project.sub}
                        </a>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* CTA pair — styled like the mobile nav pill */}
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
              className="inline-flex max-w-full items-center gap-1 self-start rounded-full border border-white/10 bg-[#141414]/40 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-2xl backdrop-saturate-150 glass-nav"
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

          {/* Hero Image */}
          {project.heroImage && (
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.97, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 200, damping: 26 }}
            >
              {isMobile ? (
                <div
                  className="relative w-full overflow-hidden rounded-2xl shadow-md"
                  style={{ height: "400px" }}
                >
                  <Image
                    src={project.heroImage}
                    alt={`${project.sub} Hero`}
                    className="select-none object-cover transition-transform duration-500 ease-out hover:scale-[1.03]"
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    priority
                  />
                </div>
              ) : (
                <WideImage
                  src={project.heroImage}
                  alt={`${project.sub} preview`}
                  priority
                />
              )}
            </motion.div>
          )}

          {/* Intro Text */}
          {project.introText && (
            <Reveal>
              <p className="max-w-3xl text-[15px] leading-[20px] text-text-normal">
                {project.introText}
              </p>
            </Reveal>
          )}

          {/* Stats */}
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
                  className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-4 transition-colors duration-200 hover:border-zinc-700 hover:bg-zinc-900/60"
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

          {/* Gallery */}
          {showGallery && (
            <div id="gallery" className="my-8 scroll-mt-28">
              {isMobile ? (
                <MobileRow
                  images={galleryImages.map((img) => img.src)}
                  labels={galleryImages.map((img) => img.alt)}
                  alt={project.sub}
                />
              ) : (
                <div className="flex flex-col gap-6">
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
                      <WideImage src={img.src} alt={img.alt} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Process Grid */}
          <Reveal
            id="challenge"
            className="relative my-32 grid scroll-mt-28 gap-12"
          >
            <div>
              <h3 className="mb-4 text-xl font-bold text-text-heading">
                {CASE_STUDY_LABELS.challenge}
              </h3>
              <p className="text-[15px] leading-[20px] text-text-normal">
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
                    <p className="text-[15px] leading-[20px] text-text-normal">
                      {action.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </Reveal>

          {/* Result */}
          {project.result && (
            <Reveal id="result" className="scroll-mt-28">
              <h3 className="mb-4 text-xl font-bold text-text-heading">
                {CASE_STUDY_LABELS.result}
              </h3>
              <p className="max-w-3xl text-[15px] leading-[20px] text-text-normal">
                {project.result}
              </p>
            </Reveal>
          )}

          {/* Stack */}
          {project.technologies && project.technologies.length > 0 && (
            <div id="stack" className="scroll-mt-28">
              <h3 className="mb-4 text-xl font-bold text-text-heading">
                {CASE_STUDY_LABELS.stack}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <motion.span
                    key={i}
                    initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 22,
                      delay: i * 0.03,
                    }}
                    whileHover={reduce ? undefined : { y: -2, scale: 1.05 }}
                    className="rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-[13px] text-zinc-300 transition-colors duration-150 hover:border-zinc-600 hover:text-white"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          )}

          {/* Prev / Next */}
          {(prev || next) && (
            <div className="mt-8 grid grid-cols-2 gap-3">
              {prev ? renderPager(prev, "prev") : <div />}
              {next ? renderPager(next, "next") : <div />}
            </div>
          )}
        </div>
      </article>
    </>
  );
};

export default ProjectsDetailTemplate;
