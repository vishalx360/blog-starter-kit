"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";

export const containerVariants = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0,
      duration: 0.2,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

interface MotionBoxProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

const StaggerParent: React.FC<MotionBoxProps> = ({ children, ...rest }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ staggerChildren: 1 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default StaggerParent;
