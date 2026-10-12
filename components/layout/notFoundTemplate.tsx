"use client";

import React from "react";


import Motion from "@/motion/y-motion";
import { NOT_FOUND } from "@/content/site";

const NotFoundTemplate = () => {
  return (
    <>
      <Motion>
        <div className="mx-auto">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="font-heading text-text-heading">{NOT_FOUND.heading}</h2>
              <p className="text-text-normal">{NOT_FOUND.line1}</p>
              <p className="text-text-normal">{NOT_FOUND.line2}</p>
            </div>
          </div>
        </div>
      </Motion>
    </>
  );
};

export default NotFoundTemplate;
