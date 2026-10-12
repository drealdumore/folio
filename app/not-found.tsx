import { Metadata } from "next";


import React from "react";

import Link from "next/link";

import { Morph } from "@/components/morph";
import { NOT_FOUND } from "@/content/site";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

const NotFound = () => {
  return (
    <>
      <div className="mx-auto h-[50vh]">
        <Morph delay={0.15}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="font-heading text-text-heading">{NOT_FOUND.heading}</h2>
              <p className="text-text-normal">{NOT_FOUND.line1}</p>
              <p className="text-text-normal">{NOT_FOUND.line2}</p>
            </div>
          </div>
        </Morph>
      </div>
    </>
  );
};

export default NotFound;
