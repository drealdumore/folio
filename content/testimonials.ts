export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Samuel owned our mobile feature set end-to-end and shipped polished work every cycle. He thinks about offline reliability and performance without being asked — a genuinely dependable engineer.",
    name: "Adaeze O.",
    role: "Engineering Lead",
    company: "Campus Buddy",
  },
  {
    quote:
      "He moves fast without cutting corners. Our front-end architecture and component system got noticeably cleaner and more consistent while he was on the team.",
    name: "Tunde A.",
    role: "Product Manager",
    company: "NodePair",
  },
  {
    quote:
      "Samuel delivered a production API and an e-commerce build we could actually scale. Clear communication from kickoff to handoff.",
    name: "Chris M.",
    role: "Founder",
    company: "Knowledge Master",
  },
];
