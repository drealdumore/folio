import React from "react";
import { REPOS } from "@/content/repos";
import { AnimatedSection } from "@/components/layout/animated-section";
import { SectionHeading } from "@/components/design/SectionHeading";
import Link from "next/link";

const Repos = () => {
  return (
    <section className="flex flex-col">
      <SectionHeading
        title="Highlighted Repos"
        subtitle="A curated list of notable repositories"
      />

      <AnimatedSection delay={0.2}>
        <div className="py-2 flex flex-col gap-5">
          {REPOS.map((repo) => (
            <div key={repo.name} className="group relative">
              {repo.url ? (
                <Link
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-max text-text-heading flex items-center gap-[0.15rem] relative text-lg font-semibold"
                >
                  {repo.name}
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-current origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ease-in-out" />
                </Link>
              ) : (
                <div
                  className="w-max text-text-muted flex items-center gap-[0.15rem] relative text-lg font-semibold"
                  aria-disabled
                >
                  {repo.name}
                </div>
              )}
              <p className="xl:leading-[30px] sm:leading-[27px] mt-2 xl:text-[1.07rem] sm:text-[14px] text-text-normal mb-2 ">
                {repo.desc}
              </p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <div className="w-full flex justify-end">
          <span className="tag text-text-normal">
            Stay tuned for more stuff!
          </span>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default Repos;
