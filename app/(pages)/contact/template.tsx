"use client";

import { Heading } from "@/components/design/heading";
import Motion from "@/motion/y-motion";

import ContactForm from "./_components/contactForm";

const Contact = () => {
  return (
    <Motion>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-semibold mb-2 text-text-heading">Let's Connect</h1>
          <p className="text-text-normal mb-6">
            Whether you're looking to collaborate on a project, need a solution
            to a challenging problem, or just want to talk tech, feel free to
            reach out. Together, we can turn ideas into reality.
          </p>
        </div>

        <ContactForm />
      </div>
    </Motion>
  );
};

export default Contact;
