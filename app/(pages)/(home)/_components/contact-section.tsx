"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  useScrollAnimation,
  fadeInUp,
  staggerContainer,
} from "@/hooks/useScrollAnimation";
import { useWebHaptics } from "web-haptics/react";
import { SectionHeading } from "@/components/design/SectionHeading";

export default function ContactSection() {
  const { trigger } = useWebHaptics();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { ref, controls } = useScrollAnimation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          message: formData.message,
          service: "General Inquiry",
          organization: "",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        trigger([{ duration: 30 }, { delay: 60, duration: 40, intensity: 1 }]);
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="flex flex-col">
      <SectionHeading
        title="Let's Connect"
        subtitle="Get in touch before I write another line of code!"
      />

      <p className="text-text-normal mb-6 text-[15px]">
        Whether you&apos;re looking to collaborate on a project, need a solution
        to a challenging problem, or just want to talk tech, feel free to reach
        out. Together, we can turn ideas into reality.
      </p>

      <form
        onSubmit={handleSubmit}
        suppressHydrationWarning
        className="w-full flex flex-col gap-4"
      >
        <div className="grid md:flex gap-4 w-full">
          <div className="flex-1 flex flex-col gap-2">
            <label htmlFor="name" className="sr-only">Your Name</label>
            <input
              id="name"
              placeholder="Your Name"
              required
              suppressHydrationWarning
              className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-6 py-3.5 text-[15px] text-text-normal placeholder-text-normal/50 outline-none focus:ring-2 focus:ring-text-heading/20 focus:border-text-heading/30 transition-all duration-300 backdrop-blur-sm"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label htmlFor="email" className="sr-only">Email Address</label>
            <input
              id="email"
              placeholder="Where can I reach you back?"
              required
              suppressHydrationWarning
              className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-6 py-3.5 text-[15px] text-text-normal placeholder-text-normal/50 outline-none focus:ring-2 focus:ring-text-heading/20 focus:border-text-heading/30 transition-all duration-300 backdrop-blur-sm"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="sr-only">Your Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Your words, my inbox."
            required
            suppressHydrationWarning
            className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-6 py-3.5 text-[15px] text-text-normal placeholder-text-normal/50 h-36 outline-none focus:ring-2 focus:ring-text-heading/20 focus:border-text-heading/30 transition-all duration-300 resize-none backdrop-blur-sm"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          className="group relative bg-text-heading text-[#1a1a1a] py-3.5 px-6 rounded-xl text-[14px] font-medium w-full disabled:opacity-70 overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-text-heading/20 focus:ring-offset-2 focus:ring-offset-background"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => trigger([{ duration: 35 }], { intensity: 1 })}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-text-heading/90 to-text-heading opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full"
                />
                Sending...
              </>
            ) : success ? (
              <>
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
                Message Sent!
              </>
            ) : (
              <>Send Message</>
            )}
          </span>
        </motion.button>
      </form>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm"
        >
          {error}
        </motion.div>
      )}
    </section>
  );
}
