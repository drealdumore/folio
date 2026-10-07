"use client";

import Image from "next/image";
import Motion from "@/motion/y-motion";
import { MOBILE_APPS } from "@/content/projects";
import Link from "next/link";
import { MobileRow } from "@/components/design/project-ui";

const ProjectsDetailTemplate = ({ id }: { id: string }) => {
  const project = MOBILE_APPS.find((p) => p.id === id);

  if (!project) {
    return <p className="text-text-normal">Project not found</p>;
  }

  return (
    <Motion>
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

      <article className="pb-16 space-y-12">
        {/* Info Grid */}
        <div className="flex flex-col justify-between gap-6 mb-8">
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
                    Year
                  </td>
                  <td className="text-text-normal leading-[20px] text-[15px]">
                    {project.year}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Hero Image */}
        {project.heroImage && (
          <div
            className="w-full overflow-hidden rounded-2xl shadow-md relative"
            style={{ height: "400px" }}
          >
            <Image
              src={project.heroImage}
              alt={`${project.sub} Hero`}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              priority={true}
            />
          </div>
        )}

        {/* Intro Text */}
        {project.introText && (
          <p className="max-w-3xl leading-[20px] text-[15px] text-text-normal">
            {project.introText}
          </p>
        )}

        {/* Gallery */}
        {project.gallery?.length > 0 && (
          <div className="my-8">
            <MobileRow
              images={project.gallery.map((img) => img.src)}
              alt={project.sub}
            />
          </div>
        )}

        {/* Process Grid */}
        <div className="grid gap-12 my-32 relative">
          <div>
            <h3 className="text-xl font-bold text-text-heading mb-4">
              Challenge
            </h3>
            <p className="text-text-normal leading-[20px] text-[15px]">
              {project.challenge}
            </p>
          </div>

          {project.actions?.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-text-heading">Action</h3>
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
          <div>
            <h3 className="text-xl font-bold text-text-heading mb-4">Result</h3>
            <p className="max-w-3xl text-text-normal leading-[20px] text-[15px]">
              {project.result}
            </p>
          </div>
        )}

        {/* Project Links */}
        {/* {project.links?.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-8">
            {project.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 rounded-lg transition ${
                  i === 0
                    ? "bg-text-heading text-background hover:bg-text-normal"
                    : "border border-text-heading text-text-heading hover:bg-zinc-800"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )} */}
      </article>
    </Motion>
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
