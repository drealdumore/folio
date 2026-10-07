"use client";

import React from "react";
import { AnimatedSection } from "../layout/animated-section";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  className = "",
}) => {
  return (
    <AnimatedSection>
      <div className={`mb-5 ${className}`}>
        <h2
          className="uppercase mb-1 text-xl leading-[1.3] tracking-[-0.02em] text-white/70 lg:text-[26px] font-medium"
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-[13px] text-zinc-600">{subtitle}</p>
        )}
      </div>
    </AnimatedSection>
  );
};
