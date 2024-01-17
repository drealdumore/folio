import { sharedMetadata } from "@/constants/shared-meta";

import { Metadata } from "next";

import Contact from "./template";

export const metadata: Metadata = {
  title: `Contact me`,
};

const page = () => {
  return (
    <>
      <Contact />
    </>
  );
};

export default page;
