"use client";

import { bioData } from "@/content/bio";
import { SectionHeading } from "@/components/design/SectionHeading";

export default function AboutSection() {
  const paragraphClass = "leading-[30px] text-text-normal text-[15px]";

  return (
    <section className="flex flex-col">
      <div className="flex flex-col gap-6 max-w-3xl">
        <p className={paragraphClass}>
          Hey, I&apos;m {bioData.name}. I&apos;m a full-stack software developer
          who enjoys turning ideas into products people can actually use.
        </p>

        <p className={paragraphClass}>
          I build web and mobile applications with TypeScript, React, React
          Native, Next.js, Node.js, and Golang. I&apos;ve worked across
          everything from e-commerce and SaaS products to APIs, mobile apps, and
          AI-powered tools.
        </p>

        <p className={paragraphClass}>
          Outside of client work, I&apos;m usually building something of my own,
          experimenting with new ideas, or figuring out how to turn a problem
          into a useful product.
        </p>

        <p className={paragraphClass}>
          You can find some of my work here, or connect with me on X, GitHub,
          and LinkedIn.
        </p>
      </div>
    </section>
  );
}
