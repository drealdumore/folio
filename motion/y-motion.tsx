import React from "react";
import { AnimatedSection } from "../components/layout/animated-section";

const Motion = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <AnimatedSection isContainer>{children}</AnimatedSection>
    </>
  );
};

export default Motion;
