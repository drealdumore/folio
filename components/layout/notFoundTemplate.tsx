"use client";

import React from "react";


import Motion from "@/motion/y-motion";

const NotFoundTemplate = () => {
  return (
    <>
      <Motion>
        <div className="mx-auto">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="font-heading text-text-heading">404—Not found</h2>
              <p className="text-text-normal">
                You just hit a route that doesn’t exist.
              </p>
              <p className="text-text-normal">
                Another thing not found anymore is HTML comments. Websites are
                smaller, at what cost? A discarded thought, an unfinished
                design, an alternate phrasing, a note to self.
              </p>
            </div>
          </div>
        </div>
      </Motion>
    </>
  );
};

export default NotFoundTemplate;
