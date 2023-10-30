"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";

interface MotionBoxProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

export const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const StaggerChild: React.FC<MotionBoxProps> = ({ children, ...rest }) => {
  return (
    <motion.div variants={itemVariants} {...rest}>
      {children}
    </motion.div>
  );
};

export default StaggerChild;
