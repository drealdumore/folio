"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";

import { SmallPing } from "@/components/design/ping";

const Header = () => {
  return (
    <section className="animate-in fade-in duration-300">
      <div className="flex flex-col items-center justify-start md:gap-24 gap-16 w-full lg:pb-8 lg:justify-between lg:flex-row">
        <div className="flex flex-col lg:h-2/6 h-2/5 max-lg:w-full max-lg:flex">
          <div className="max-w-[130px] w-full flex-shrink-0 mb-8 ">
            <Image
              src="/avatars/avatar-smile.png"
              className="tw-shadow aspect-square rounded-[28px] bg-[#dcdcdc]"
              alt="Samuel Isah's profile photo - smiling portrait"
              height={100}
              width={100}
              priority
            />
          </div>
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

          <div className="max-w-3xl">
            <h1 className="lg:text-[32px] font-semibold w-full font-cal text-2xl mb-1 leading-9 text-text-heading">
              Hi, I'm Samuel
              <span className="ml-1 inline-block origin-bottom-right animate-wave cursor-pointer">
                <Image
                  src="/icons/wave.svg"
                  alt="Waving hand emoji"
                  width={25}
                  height={25}
                />
              </span>
            </h1>

            <p className="mb-4 text-text-normal" role="text">
              Full-Stack Web and Mobile Developer. I blend design sense with
              solid engineering to build fast, friendly apps on web and mobile.
              I work with modern JavaScript tools, and I’m always exploring new
              ideas, especially around AI and machine learning. I love learning,
              building, and figuring things out one curious step at a time.
            </p>
          </div>
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
