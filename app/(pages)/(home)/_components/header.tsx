"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";

import { SmallPing } from "@/components/design/ping";
import { AnimatedSection } from "@/components/layout/animated-section";
import SplitText from "./SplitText";

const Header = () => {
  return (
    <section>
      <div className="flex flex-col items-center justify-start md:gap-24 gap-16 w-full lg:pb-8 lg:justify-between lg:flex-row">
        <div className="flex flex-col lg:h-2/6 h-2/5 max-lg:w-full max-lg:flex">
          <AnimatedSection>
            <div className="max-w-[130px] w-full flex-shrink-0 mb-8 ">
              <Image
                src="/avatars/avatar-smile.png"
                className="tw-shadow aspect-square rounded-2xl bg-[#dcdcdc]"
                alt="Samuel Isah's profile photo - smiling portrait"
                height={100}
                width={100}
                priority
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="flex items-center gap-x-3 mb-4">
              <p className="font-semibold items-center gap-2 hidden md:flex text-text-normal">
                Current Status:
              </p>

              <Link
                href="mailto:samuelisah234@gmail.com"
                rel="noopener noreferrer"
                target="_blank"
                className="flex items-center justify-center gap-1.5"
              >
                <SmallPing />

                <div className="relative cursor-pointer overflow-hidden">
                  <p className="group text-text-normal">
                    <span className="group-hover:-translate-y-full font-semibold items-center text-emerald-700 flex flex-col transition-all duration-500 ease-slow">
                      Available for work
                      <span className="invisible h-0">Reach out</span>
                    </span>
                    <span className="group-hover:-translate-y-full absolute top-full flex items-center transition-all duration-500 ease-slow">
                      Reach out
                      <MailIcon />
                    </span>
                  </p>
                </div>
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="max-w-3xl">
              <SplitText
                text={`Hi, I'm Samuel Isah`}
                tag="h1"
                className="text-3xl font-bold mt-6 text-text-heading"
                initialDelay={0.2}
                duration={0.3}
                ease={[0.4, 0, 0.2, 1]}
                splitType="chars"
              />

              <h2 className="text-xl font-semibold mb-4 text-text-heading">
                A coder by day, problem-solver by night!
              </h2>

              <p className="mb-4 text-text-normal" role="text">
                Full-Stack Developer crafting fast, minimal web & mobile
                experiences with care for the tiny details that make big
                differences.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Header;

const MailIcon = () => (
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
    className="ml-1 size-4"
  >
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);
