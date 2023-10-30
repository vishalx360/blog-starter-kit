"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";

interface MotionBoxProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

const MotionBox: React.FC<MotionBoxProps> = ({ children, ...rest }) => {
  return <motion.div {...rest}>{children}</motion.div>;
};

export default MotionBox;
