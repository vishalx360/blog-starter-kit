"use client";

import { LucideArrowUp } from "lucide-react";
import ScrollToTop from "react-scroll-to-top";

export default function ScrollToTopButton() {
  return (
    <ScrollToTop
      component={<CustomButton />}
      smooth
      style={{
        background: "transparent",
        // simple shadow
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        borderRadius: "50%",
        position: "fixed",
        bottom: 40,
        overflow: "visible",
        zIndex: 100,
        right: 20,
      }}
    />
  );
}

function CustomButton() {
  return (
    <div className="group rounded-full bg-[#00a88a] p-2 text-white">
      <LucideArrowUp size="1.5em" />
    </div>
  );
}
