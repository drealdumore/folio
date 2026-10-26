import { Metadata } from "next";
import Link from "next/link";

import { Morph } from "@/components/morph";
import ScissorsCursor, { CutText } from "@/components/design/scissors-cursor";
import { ArrowIcon } from "@/components/design/arrow-icon";
import { NOT_FOUND } from "@/content/site";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

const NotFound = () => {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col justify-center">
      <ScissorsCursor>
        <Morph delay={0.15}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="font-heading text-xl text-text-heading">
                <CutText text={NOT_FOUND.heading} />
              </h1>
              <p className="text-text-normal">
                <CutText text={NOT_FOUND.line1} />
              </p>
              <p className="text-text-normal">
                <CutText text={NOT_FOUND.line2} />
              </p>
            </div>
            <Link
              href="/"
              className="hit-area-6 mt-2 inline-flex w-fit items-center gap-1.5 text-[13px] text-zinc-400 transition-colors duration-200 hover:text-zinc-100"
            >
              Back home
              <ArrowIcon size={14} />
            </Link>
          </div>
        </Morph>
      </ScissorsCursor>
    </div>
  );
};

export default NotFound;
