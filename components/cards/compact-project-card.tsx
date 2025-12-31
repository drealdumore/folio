import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface CompactProjectCardProps {
  name: string;
  description: string;
  href: string;
  github?: string;
  tech?: string[];
}

const CompactProjectCard = ({
  name,
  description,
  href,
  github,
}: CompactProjectCardProps) => {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="flex w-full items-center gap-3 rounded-lg border border-[#26262a] bg-zinc-900/20 p-2 transition-colors hover:bg-zinc-900/40 group/card"
      >
        <div className="flex size-[clamp(2rem,5vw,2.25rem)] shrink-0 items-center justify-center rounded-lg bg-zinc-800/50 text-text-normal">
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
            className="size-6 text-text-normal/80"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M10 4v4" />
            <path d="M2 8h20" />
            <path d="M6 4v4" />
          </svg>

          
        </div>

        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="line-clamp-1 text-start text-base font-semibold text-text-heading font-heading">
              {name}
            </h3>
          </div>
          <p className="line-clamp-2 text-start text-[clamp(0.8rem,1vw,0.95rem)] text-text-normal/70 leading-relaxed">
            {description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default CompactProjectCard;
