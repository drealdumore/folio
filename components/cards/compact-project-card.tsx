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
      <div className="flex w-full gap-3 rounded-[20px] border border-[#26262a] bg-zinc-900/20 p-2 transition-colors hover:bg-zinc-900/40 group/card flex-col">
        <div className="flex size-[clamp(2rem,5vw,2.25rem)] shrink-0 items-center justify-center text-text-normal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="size-7"
          >
            <path
              fill="#cbd2d8"
              d="m13.844 7.536l-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464"
            />
            <path
              fill="#0a0e11"
              d="M27.354 20.871L32 25.343l-2.74 2.624l-4.613-4.471v-.737l1.947-1.888zm.751-2.023l-.8-.768l-3.953 3.839v1.577L18.706 28L16 25.343l4.612-4.472h1.626l.644-.624l-3.17-3.08h-1.071l-2.32-2.271l2.162-2.096l2.311 2.24v1.048l3.21 3.072l2.194-2.128l-.791-.808l1.072-1.049h-2.196l-.536-.52L26.48 12l.545.527v2.129l1.081-1.057l2.707 2.625a2.22 2.22 0 0 1 0 3.184l-1.627-1.609Z"
            />
          </svg>
        </div>

        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="line-clamp-1 text-start text-base font-medium text-text-heading font-heading">
              {name}
            </h3>
          </div>
          <p className="line-clamp-2 text-start text-[clamp(0.8rem,1vw,0.95rem)] text-text-normal/70 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CompactProjectCard;
