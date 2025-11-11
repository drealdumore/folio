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
      <div className={`pt-8 mb-4 ${className}`}>
        <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-text-heading  font-mono">
          {title}
        </h2>
        {subtitle && (
          <p className="text-base font-bold text-text-heading">{subtitle}</p>
        )}
      </div>
    </AnimatedSection>
  );
};
