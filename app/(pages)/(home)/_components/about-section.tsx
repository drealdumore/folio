"use client";

import { bioData } from "@/content/bio";
import { SectionHeading } from "@/components/design/SectionHeading";

export default function AboutSection() {
  const paragraphClass = "leading-[1.65] text-zinc-400 text-[15px]";

  return (
    <section className="flex flex-col">
      <SectionHeading title="About" />
      <div className="flex flex-col gap-4 max-w-3xl">
        <p className={paragraphClass}>
          Hey, I&apos;m {bioData.name}. I build web and mobile products
          people can actually use — from thoughtful interfaces to the systems
          behind them.
        </p>

        <p className={paragraphClass}>
          My stack is TypeScript, React, React Native, Next.js, Node.js, and
          Golang. I&apos;ve shipped across e-commerce, SaaS, APIs, mobile
          apps, and AI-powered tools.
        </p>

        <p className={paragraphClass}>
          When I&apos;m not on client work, I&apos;m building something of my
          own — or figuring out how to turn a problem into a useful product.
        </p>
      </div>
    </section>
  );
}
