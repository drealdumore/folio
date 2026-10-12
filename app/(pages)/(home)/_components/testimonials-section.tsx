"use client";

import { SECTIONS, TESTIMONIALS } from "@/content/site";
import { SectionHeading } from "@/components/design/SectionHeading";

export default function TestimonialsSection() {
  return (
    <section className="flex flex-col">
      <SectionHeading title={SECTIONS.testimonials.title} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="flex flex-col justify-between gap-5 rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-5"
          >
            <blockquote className="text-[14px] leading-[1.6] text-zinc-300">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="text-[13px] text-zinc-500">
              <span className="font-medium text-zinc-300">
                {testimonial.name}
              </span>
              {" · "}
              {testimonial.role}
              {testimonial.company ? `, ${testimonial.company}` : ""}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
