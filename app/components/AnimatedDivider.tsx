"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function AnimatedDivider() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div
      ref={ref}
      className="relative py-6 md:py-12 flex flex-col items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #fdf8f4, #fce8e8, #fdf8f4)" }}
    >
      {/* Main ornamental SVG */}
      <svg
        viewBox="0 0 800 120"
        className="w-full max-w-3xl px-6"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        {/* Left vine line */}
        <motion.path
          d="M 0 60 Q 50 20 100 60 Q 150 100 200 60 Q 250 20 300 60"
          stroke="#c9a96e"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
        {/* Right vine line */}
        <motion.path
          d="M 500 60 Q 550 20 600 60 Q 650 100 700 60 Q 750 20 800 60"
          stroke="#c9a96e"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
        />

        {/* Left small flourish */}
        <motion.path
          d="M 260 60 Q 280 30 300 60 Q 310 75 330 60"
          stroke="#d4788a"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.7 } : {}}
          transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
        />

        {/* Right small flourish */}
        <motion.path
          d="M 470 60 Q 490 30 510 60 Q 520 75 540 60"
          stroke="#d4788a"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.7 } : {}}
          transition={{ duration: 1, ease: "easeInOut", delay: 1.2 }}
        />

        {/* Center heart + diamond */}
        <motion.g
          initial={{ opacity: 0, scale: 0.3 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Diamond */}
          <polygon
            points="400,35 415,60 400,85 385,60"
            fill="none"
            stroke="#c9a96e"
            strokeWidth="1.5"
          />
          {/* Inner diamond */}
          <polygon
            points="400,45 409,60 400,75 391,60"
            fill="#e8d5b0"
            opacity="0.6"
            stroke="#c9a96e"
            strokeWidth="0.5"
          />
          {/* Stars / dots */}
          {[340, 360, 440, 460].map((x) => (
            <motion.circle
              key={x}
              cx={x}
              cy={60}
              r={2}
              fill="#c9a96e"
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 0.8, scale: 1 } : {}}
              transition={{ delay: 1.8 + (x - 340) * 0.05 }}
            />
          ))}
        </motion.g>
      </svg>

      {/* Elegant text label */}
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 2, duration: 0.6 }}
        className="font-cormorant italic text-lg mt-1"
        style={{ color: "#c9a96e", letterSpacing: "0.15em" }}
      >
        ❦ with love ❦
      </motion.p>
    </div>
  );
}
