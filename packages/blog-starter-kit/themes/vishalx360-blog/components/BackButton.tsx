"use client";

import { LucideMoveLeft, LucideMoveRight } from "lucide-react";
import MotionBox from "./MotionBox";
import { useRouter } from "next/router";



export default function BackButton({ forwardIcon = false, text, link }: { forwardIcon?: boolean; text?: string; link?: string }) {
  const router = useRouter();

  const handleBack = () => {
    if (link) {
      router.push(link);
      return;
    }
    router.back();
  };
  return (
    <MotionBox layoutId="backbutton">
      <button
        onClick={handleBack}
        className={" gap-2 flex cursor-pointer items-center text-gray-200 hover:text-gray-300"}
      >
        {!forwardIcon && <LucideMoveLeft />}
        <p className="text-sm leading-none">{text ?? "Back"}</p>
        {forwardIcon && <LucideMoveRight />}
      </button>
    </MotionBox>
  );
}
