"use client";

import { motion } from "framer-motion";
import {
  useScrollAnimation,
  fadeInUp,
  staggerContainer,
} from "@/hooks/useScrollAnimation";
import { bioData } from "@/content/bio";
import { SectionHeading } from "@/components/design/SectionHeading";

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
    I like crafting scalable digital products with clean user experiences,
    blending creativity with problem-solving to build solutions that feel fast,
    intuitive, and impactful.
  </motion.p>

  <motion.p variants={fadeInUp} className={paragraphClass}>
    I&apos;m {bioData.name}, a Nigerian full-stack software engineer with over
    3 years of experience building web and mobile applications across different
    industries. I specialize in modern frontend development, backend systems,
    and creating seamless cross-platform experiences.
  </motion.p>

  <motion.p variants={fadeInUp} className={paragraphClass}>
    My stack includes JavaScript, TypeScript, React, React Native, Next.js,
    Node.js, and Supabase. I enjoy building everything from sleek landing pages
    and e-commerce platforms to scalable APIs and mobile apps that solve
    real-world problems.
  </motion.p>

  <motion.p variants={fadeInUp} className={paragraphClass}>
    Beyond coding, I&apos;m passionate about continuous growth, design, and
    pushing creative boundaries in tech. I enjoy collaborating with people,
    turning ideas into polished products, and constantly learning new ways to
    improve both performance and user experience.
  </motion.p>
</div>
    </motion.section>
  );
}
