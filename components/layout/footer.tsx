"use client";

import { NAVLINKS } from "@/constants/links";
import { CONTACTS } from "@/constants/social-profiles";

import React, { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RadarPing } from "@/components/design/ping";
import { LOCATION } from "@/content/bio";

const AppFooter = () => {
  const pathName = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);

  return (
    <footer className="py-7 border-t border-t-zinc-800">
      <div className="max-w-screen-lx mx-auto md:px-10 px-6 grid lg:grid-cols-6 gap-8">
        <div className="lg:col-span-3 xs:col-span-2 max-w-md">
          <h3 className="font-semibold mb-2 text-text-heading">Samuel's personal site</h3>
          <div className="flex items-center gap-1">
            <div className="flex items-center text-text-normal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
                height={24}
                color={"#000000"}
                fill={"none"}
                className="size-4 text-zinc-500"
              >
                <path
                  d="M15 9.5C15 11.1569 13.6569 12.5 12 12.5C10.3431 12.5 9 11.1569 9 9.5C9 7.84315 10.3431 6.5 12 6.5C13.6569 6.5 15 7.84315 15 9.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 2C16.0588 2 19.5 5.42803 19.5 9.5869C19.5 13.812 16.0028 16.777 12.7725 18.7932C12.5371 18.9287 12.2709 19 12 19C11.7291 19 11.4629 18.9287 11.2275 18.7932C8.00325 16.7573 4.5 13.8266 4.5 9.5869C4.5 5.42803 7.9412 2 12 2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M18 20C18 21.1046 15.3137 22 12 22C8.68629 22 6 21.1046 6 20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <h3 className="text-sm font-firacode capitalize text-text-normal">{LOCATION}</h3>
            </div>
            <RadarPing className="w-4 h-4" />
          </div>
        </div>

        <div className="footer-items">
          {/* <div className="xl:place-self-end"> */}
          <div>
            <h4 className="font-semibold mb-3 text-text-heading">Pages</h4>
            <ul className="space-y-2 w-max">
              {NAVLINKS.map((link, index) => (
                <li key={index} className="link-footer">
                  <Link href={link.href}>
                    <span
                      className={`link ${
                        pathName === link.href
                          ? "underline underline-offset-2 text-text-heading font-medium hover:translate-x-6"
                          : "text-text-normal no-underline"
                      }`}
                    >
                      {link.text}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* <div className="xl:place-self-end"> */}
          <div>
            <h4 className="font-semibold mb-3 text-text-heading">Connect</h4>
            <ul className="space-y-2">
              {CONTACTS.map((link, index) => {
                return (
                  <li
                    key={index}
                    className="flex relative flex-row-reverse gap-3 items-center justify-end"
                  >
                    <span
                      style={{
                        backgroundColor: link.bg,
                        rotate: link.tilt,
                      }}
                      className={`transition-all absolute left-16 bottom-1 ${link.bg} duration-300 ${
                        hoveredIndex !== index
                          ? "opacity-0 translate-y-1"
                          : "opacity-100 translate-y-0"
                      }  ease-in-out text-white p-3 rounded-[10px] bx-shadow text-[1.2rem]`}
                    >
                      {link.icon}
                    </span>

                    <Link
                      className={`${
                        hoveredIndex !== null && hoveredIndex !== index
                          ? "opacity-30"
                          : ""
                      } transition-all duration-300 relative ease-in-out`}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      href={link.href}
                      target="_blank"
                    >
                      {link.text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-6 xs:col-span-4">
          <p className="text-sm text-center text-text-normal font-firacode">
            &copy; {new Date().getFullYear()} Samuel's personal site.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
