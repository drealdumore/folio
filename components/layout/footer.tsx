"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { Morph } from "@/components/morph";

const AppFooter = () => {
  return (
    <footer className="py-7 border-t border-t-zinc-800">
      <Morph delay={0.25}>
        <div className="max-w-screen-lx mx-auto md:px-10 px-6 flex gap-6 flex-col">
          <>
            <p className="text-sm text-center text-text-normal">
              &copy; {toRoman(new Date().getFullYear())} · Samuel&apos;s personal
              site.
            </p>
          </>

          <div className="w-full max-w-[53rem] py-[20px] flex flex-col items-center gap-[16px] ">
            <div className="flex gap-6 py-1 cursor-pointer">
              <Link
                target="_blank"
                className="text-zinc-400 cursor-pointer hover:text-text-normal transition-all duration-300"
                href="https://twitter.com/drealdumore"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                </svg>
              </Link>
              <Link
                target="_blank"
                className="text-zinc-400 cursor-pointer hover:text-text-normal transition-all duration-300"
                href="https://www.linkedin.com/in/samuel-isah"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2a2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6M2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </g>
                </svg>
              </Link>
              <Link
                target="_blank"
                className="text-zinc-400 cursor-pointer hover:text-text-normal transition-all duration-300"
                href="https://github.com/drealdumore"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-github"
                  aria-hidden="true"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </Link>
              <Link
                target="_blank"
                className="text-zinc-400 cursor-pointer hover:text-text-normal transition-all duration-300"
                href="mailto:samuelisah234@gmail.com"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-mail"
                  aria-hidden="true"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </Link>
            </div>
          </div>
          <div className="w-full max-w-[53rem] flex flex-col items-center gap-[16px] justify-center size-9">
            <Clock />
          </div>
        </div>
      </Morph>
    </footer>
  );
};

export default AppFooter;

const toRoman = (num: number) => {
  const romanNumerals: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let result = "";

  for (const [value, numeral] of romanNumerals) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }

  return result;
};

const Clock = () => {
  const [time, setTime] = useState<Date>(() => new Date());

  useEffect(() => {
    const updateClock = () => {
      setTime(new Date());
    };

    const now = new Date();
    const delay = 1000 - now.getMilliseconds();

    const timeout = setTimeout(() => {
      updateClock();

      const interval = setInterval(updateClock, 1000);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  const degrees = (unit: number, max: number): number => (unit / max) * 360;

  const hours = degrees(time.getHours() % 12, 12) + time.getMinutes() * 0.5;
  const minutes = degrees(time.getMinutes(), 60);
  const seconds = degrees(time.getSeconds(), 60);

  const formatTime = (time: Date): string => {
    const padZero = (num: number): string => (num < 10 ? `0${num}` : `${num}`);
    const hours = padZero(time.getHours());
    const minutes = padZero(time.getMinutes());
    return `${hours}:${minutes}`;
  };

  return (
    <div className="w-full h-full max-w-sm mx-auto" title={formatTime(time)}>
      <svg viewBox="0 0 100 100" className="w-full h-full max-w-sm mx-auto">
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="transparent"
          stroke="#a1a1a1"
          strokeWidth="2"
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="30"
          stroke="#a1a1a1"
          strokeWidth="4"
          strokeLinecap="round"
          transform={`rotate(${hours} 50 50)`}
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="20"
          stroke="#a1a1a1"
          strokeWidth="3"
          strokeLinecap="round"
          transform={`rotate(${minutes} 50 50)`}
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="12"
          stroke="red"
          strokeWidth="2"
          strokeLinecap="round"
          transform={`rotate(${seconds} 50 50)`}
        />
        <circle cx="50" cy="50" r="2" fill="#f0f0f0" />
      </svg>
    </div>
  );
};
