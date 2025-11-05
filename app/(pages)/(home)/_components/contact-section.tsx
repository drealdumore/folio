"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  useScrollAnimation,
  fadeInUp,
  staggerContainer,
} from "@/hooks/useScrollAnimation";
import { SectionHeading } from "@/components/design/SectionHeading";


export default function ContactSection() {
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={staggerContainer}
      className="flex flex-col"
    >
      <SectionHeading
        title="Let's Connect"
        subtitle="Get in touch before I write another line of code!"
      />

      <motion.p variants={fadeInUp} className="text-text-normal mb-6 text-base">
        Whether you&apos;re looking to collaborate on a project, need a solution
        to a challenging problem, or just want to talk tech, feel free to reach
        out. Together, we can turn ideas into reality.
      </motion.p>

      <motion.form
        variants={fadeInUp}
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4"
      >
        <div className="grid md:flex gap-4 w-full">
          <motion.input
            variants={fadeInUp}
            placeholder="Your Name"
            required
            className="flex-1 bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-6 py-3.5 text-base text-text-normal placeholder-text-normal/50 outline-none focus:ring-2 focus:ring-text-heading/20 focus:border-text-heading/30 transition-all duration-300 backdrop-blur-sm"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <motion.input
            variants={fadeInUp}
            placeholder="Where can I reach you back?"
            required
            className="flex-1 bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-6 py-3.5 text-base text-text-normal placeholder-text-normal/50 outline-none focus:ring-2 focus:ring-text-heading/20 focus:border-text-heading/30 transition-all duration-300 backdrop-blur-sm"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <motion.textarea
          variants={fadeInUp}
          name="message"
          placeholder="Your words, my inbox."
          required
          className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-6 py-3.5 text-base text-text-normal placeholder-text-normal/50 h-36 outline-none focus:ring-2 focus:ring-text-heading/20 focus:border-text-heading/30 transition-all duration-300 resize-none backdrop-blur-sm"
          value={formData.message}
          onChange={handleChange}
        />

        <motion.button
          variants={fadeInUp}
          type="submit"
          disabled={loading}
          className="group relative bg-text-heading text-[#1a1a1a] py-3.5 px-6 rounded-xl text-base font-medium w-full disabled:opacity-70 overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-text-heading/20 focus:ring-offset-2 focus:ring-offset-background"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
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
      </motion.form>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm"
        >
          {error}
        </motion.div>
      )}
    </motion.section>
  );
}
