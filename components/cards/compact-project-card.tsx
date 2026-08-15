import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CompactProjectCardProps {
  name: string;
  description: string;
  href: string;
  image?: string;
  tech?: string[];
}

const CompactProjectCard = ({
  name,
  description,
  href,
  image,
  tech,
}: CompactProjectCardProps) => {
  const isExternalLink = href.startsWith("http");

  return (
    <div className="w-full transition-opacity lg:group-hover/wrapper:opacity-25 lg:hover:!opacity-100">
      <Link
        href={href}
        {...(isExternalLink && {
          target: "_blank",
          rel: "noopener noreferrer",
        })}
        className="group flex h-full flex-col gap-4 rounded-[16px] border border-zinc-700/60 bg-zinc-900/20 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-600 hover:bg-zinc-900/40"
      >
        <div className="flex items-start justify-between gap-3">
          {image ? (
            <Image
              src={image}
              alt=""
              width={44}
              height={44}
              className="size-11 shrink-0 rounded-[10px] border border-zinc-700/60 object-cover"
            />
          ) : (
            <span className="flex size-11 shrink-0 items-center justify-center rounded-[10px] border border-zinc-700/60 bg-zinc-800/60 text-text-normal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
                aria-hidden="true"
              >
                <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
              </svg>
            </span>
          )}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 shrink-0 text-text-normal/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text-heading"
            aria-hidden="true"
          >
            <path d="M7 17 17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </div>

        <div className="flex flex-col gap-1.5">
          <h3 className="line-clamp-1 text-start font-medium text-text-heading font-heading">
            {name}
          </h3>
          <p className="line-clamp-2 text-start text-[14px] leading-relaxed text-text-normal/70">
            {description}
          </p>
        </div>

        {tech && tech.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {tech.map((technology) => (
              <span
                key={technology}
                className="rounded-md border border-zinc-700/60 bg-zinc-800/40 px-2 py-0.5 text-[11px] text-text-normal/60"
              >
                {technology}
              </span>
            ))}
          </div>
        )}
      </Link>
    </div>
  );
};

export default CompactProjectCard;
