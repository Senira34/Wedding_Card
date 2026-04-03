"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      id="scroll-progress-bar"
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[100]"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #c9a96e, #d4788a, #c9a96e)",
      }}
    />
  );
}
