"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/design/SectionHeading";
import { MobileRow } from "@/components/design/project-ui";

interface Project {
  name: string;
  highlight?: string;
  highlightLabel?: string;
  image?: string;
  mobileScreens?: string[];
  href: string;
  descriptionBefore?: string;
  descriptionAfter?: string;
}

const FEATURED_PROJECTS: Project[] = [
  {
    name: "Crystalglowxquisite",
    descriptionBefore: "Premium skincare boutique — built a full e-commerce storefront with ",
    highlight: "custom checkout and analytics",
    descriptionAfter: " from the ground up.",
    image: "/projects/crystalglowxquisite.png",
    href: "https://crystalglowxquisite.com/",
  },
  {
    name: "The SupaDevs",
    descriptionBefore: "A curated library of developer tools, UI components, APIs and resources — designed to help developers find quality assets without searching ",
    highlight: "all over the web",
    descriptionAfter: ".",
    image: "/projects/thesupadevs.png",
    href: "https://thesupadevs.vercel.app/",
  },
  {
    name: "MELO",
    descriptionBefore: "A private two-person chat that ",
    highlight: "translates every message before delivery",
    descriptionAfter: " — you write in your language, they read in theirs.",
    mobileScreens: [
      "/projects/melo-onboarding.png",
      "/projects/melo-chat.png",
      "/projects/melo-id.png",
    ],
    href: "/projects/melo",
  },
  {
    name: "Isami Technologies",
    descriptionBefore: "Corporate website for a Nigerian digital agency offering web development, AI chatbots, and SEO — built with ",
    highlight: "AI-powered features",
    descriptionAfter: " integrated throughout.",
    image: "/projects/isamitechnologies.png",
    href: "https://isamitechnologies.com.ng/",
  },
  {
    name: "Rivr",
    descriptionBefore: "Brand collaboration platform connecting companies with trusted creators to ",
    highlight: "amplify reach and drive results",
    descriptionAfter: ".",
    image: "/projects/rivr-app.png",
    href: "https://rivr-mu.vercel.app/",
  },
  {
    name: "Cleanup",
    descriptionBefore: "Professional cleaning services website for a Kaduna-based company — ",
    highlight: "booking, service listings, and 24/7 support",
    descriptionAfter: " in one place.",
    image: "/projects/cleanup.png",
    href: "https://cleanup.com.ng/",
  },
];

const ProjectArticle = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const [opacity, setOpacity] = useState(index === 0 ? 1 : 0.35);
  const [inView, setInView] = useState(index === 0);
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
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const showHighlight = inView || hovered;
  const { mobileScreens } = project;

  return (
    <div
      ref={ref}
      style={{ opacity, transition: "opacity 0.4s ease" }}
      onMouseEnter={() => setHovered(true)}
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
  return (
    <section className="flex flex-col">
      <SectionHeading title="Projects" />

      <div className="flex flex-col gap-[30px] md:gap-[50px]">
        {FEATURED_PROJECTS.map((project, i) => (
          <ProjectArticle key={project.name} project={project} index={i} />
        ))}
      </div>

      <div className="mt-14">
        <Link
          href="/projects"
          className="text-[13px] text-zinc-500 hover:text-zinc-300 transition-all duration-300 flex items-center gap-1.5 group"
        >
          View all projects
          
<svg className="transition-transform duration-200 group-hover:translate-x-0.5" width="14"
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
        </Link>
      </div>
    </section>
  );
};

export default Projects;
