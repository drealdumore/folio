import { Metadata } from "next";

import { NAVLINKS } from "@/constants/links";

import React from "react";

import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

const NotFound = () => {
  return (
    <>
      <div className="mx-auto">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-text-heading">404—Not found</h2>
            <p className="text-text-normal">
              You just hit a route that doesn’t exist.
            </p>
            <p className="text-text-normal">
              Another thing not found anymore is HTML comments. Websites are
              smaller, at what cost? A discarded thought, an unfinished design,
              an alternate phrasing, a note to self.
            </p>
          </div>
          <ul className="mt-3 flex flex-col gap-2">
            {NAVLINKS.map((link, index) => (
              <li key={index}>
                <Link
                  prefetch={true}
                  className="link text-text-normal hover:text-text-heading transition-all"
                  href={link.href}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NotFound;
