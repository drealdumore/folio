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
      <div>
        <h2
          className="text-text-heading leading-[50px]"
          style={{ fontFamily: "Gabarito" }}
        >
          {title}
        </h2>
        {/* {subtitle && (
          <p className="text-base font-bold text-text-heading">{subtitle}</p>
        )} */}
      </div>
    </AnimatedSection>
  );
};
