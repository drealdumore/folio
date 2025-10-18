"use client";

import { motion } from "framer-motion";
import {
  useScrollAnimation,
  fadeInUp,
  staggerContainer,
} from "@/hooks/useScrollAnimation";
import { bioData } from "@/content/bio";
import { SectionHeading } from "./design/SectionHeading";

export default function AboutSection() {
  const { ref, controls } = useScrollAnimation();

  const paragraphClass =
    "text-base font-normal md:tracking-tight md:leading-7 text-text-normal";

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={staggerContainer}
      className="flex flex-col"
    >
      <SectionHeading
        title="About"
        subtitle="More than just a title—let&rsquo;s dive deeper!"
      />

      <div className="flex flex-col gap-6 max-w-3xl">
        <motion.p variants={fadeInUp} className={paragraphClass}>
          I&apos;m {bioData.name}, a full-stack developer turning ideas into
          smooth digital experiences. For over 3 years, I&rsquo;ve built
          everything from sleek landing pages to enterprise platforms across
          Africa.
        </motion.p>

        <motion.p variants={fadeInUp} className={paragraphClass}>
          I work with JavaScript, TypeScript, React Native, Next.js, and Node.js
          — building fast, reliable web and mobile apps. I prototype quickly,
          iterate fast, and obsess over the small details that matter.
        </motion.p>

        <motion.p variants={fadeInUp} className={paragraphClass}>
          Problem-solving is my thing — whether it&rsquo;s fixing bugs or
          speeding up slow apps, I dive deep and get it done. I love
          collaborating with teams to turn ideas into polished products (with a
          few jokes along the way).
        </motion.p>

        <motion.p variants={fadeInUp} className={paragraphClass}>
          Outside work, I run, swim, and read — it keeps me sharp. Tech evolves
          fast, and for me, growth isn&rsquo;t optional — it&rsquo;s part of the
          job.
        </motion.p>
      </div>
    </motion.section>
  );
}
