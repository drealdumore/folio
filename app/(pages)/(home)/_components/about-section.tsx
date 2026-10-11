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
          I’m a self-taught full-stack and mobile developer based in Nigeria with 4+ years of experience building and shipping products end-to-end.
        </p>

        <p className={paragraphClass}>
          My strongest work sits at the intersection of mobile (React Native + Expo), modern web (Next.js + TypeScript), and backend systems (Node.js, Supabase, PostgreSQL, Redis). I enjoy solving practical problems — real-time communication, offline-first experiences, developer tooling, and automation.
        </p>

        <p className={paragraphClass}>
          I move quickly from idea to working product, then iterate based on real constraints (rate limits, flaky networks, free-tier limitations, etc.). Outside client and freelance work, I continuously ship side projects and build in public.
        </p>

        <p className={paragraphClass}>
          I’m currently seeking mid-level full-stack or mobile engineering roles, preferably with teams that value ownership and are open to visa sponsorship + relocation.
        </p>
      </div>
    </section>
  );
}
