"use client";

import { motion, useReducedMotion } from "framer-motion";

const ProjectsTemplate = ({ children }: { children: React.ReactNode }) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};

export default ProjectsTemplate;
