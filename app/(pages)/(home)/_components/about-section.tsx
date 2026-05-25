"use client";

import { bioData } from "@/content/bio";
import { SectionHeading } from "@/components/design/SectionHeading";

export default function AboutSection() {
  const paragraphClass = "leading-[30px] text-text-normal text-[15px]";

  return (
    <section className="flex flex-col">
      <SectionHeading
        title="About"
        subtitle="More than just a title—let&rsquo;s dive deeper!"
      />

      <div className="flex flex-col gap-6 max-w-3xl">
        <p className={paragraphClass}>
          I&apos;m {bioData.name}, a full-stack software developer who builds web
          and mobile applications across different industries. I specialize in
          modern frontend development, backend systems, and creating seamless
          cross-platform experiences.
        </p>

        <p className={paragraphClass}>
          I enjoy crafting scalable digital products with clean user
          experiences, blending creativity with problem-solving to build
          solutions that feel fast, intuitive, and impactful.
        </p>

        <p className={paragraphClass}>
          My stack includes JavaScript, TypeScript, React, React Native,
          Next.js, Node.js, and Supabase. I enjoy building everything from sleek
          landing pages and e-commerce platforms to scalable APIs and mobile
          apps that solve real-world problems.
        </p>

        <p className={paragraphClass}>
          Beyond coding, I&apos;m also interested in continuous growth, design,
          and pushing creative boundaries in tech. I enjoy collaborating with
          people, turning ideas into polished products, and constantly learning
          new ways to improve both performance and user experience.
        </p>
      </div>
    </section>
  );
}
