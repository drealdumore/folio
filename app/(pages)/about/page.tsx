import { sharedMetadata } from "@/constants/shared-meta";

import { Metadata } from "next";

import About from "./template";

export const metadata: Metadata = {
  title: `About me`,
};

const page = () => {
  return (
    <>
      <About />
    </>
  );
};

export default page;
