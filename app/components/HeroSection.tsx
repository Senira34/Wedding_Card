"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: i * 0.18,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 20% 50%, #fce8e8 0%, #fdf8f4 40%, #f5ede3 70%, #fce8e8 100%)",
      }}
    >
      {/* Parallax background elements */}
      <motion.div
        style={{ y: bgY, opacity: contentOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute -top-32 -right-32 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #fce8e8 0%, #e8d5b0 50%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #c9a96e 0%, transparent 70%)" }}
        />
        {/* Floral top-left */}
        <svg viewBox="0 0 300 300" className="absolute top-8 left-4 md:top-10 md:left-10 w-28 h-28 md:w-48 md:h-48 opacity-15" fill="none">
          {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((a) => (
            <ellipse key={a} cx={150 + 80 * Math.cos((a * Math.PI) / 180)} cy={150 + 80 * Math.sin((a * Math.PI) / 180)} rx="22" ry="36"
              transform={`rotate(${a + 90}, ${150 + 80 * Math.cos((a * Math.PI) / 180)}, ${150 + 80 * Math.sin((a * Math.PI) / 180)})`} fill="#f2c4c4" />
          ))}
          <circle cx="150" cy="150" r="20" fill="#c9a96e" opacity="0.6" />
        </svg>
        {/* Floral bottom-right */}
        <svg viewBox="0 0 300 300" className="absolute bottom-8 right-4 md:bottom-10 md:right-10 w-20 h-20 md:w-36 md:h-36 opacity-20" fill="none">
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse key={a} cx={150 + 65 * Math.cos((a * Math.PI) / 180)} cy={150 + 65 * Math.sin((a * Math.PI) / 180)} rx="18" ry="28"
              transform={`rotate(${a + 90}, ${150 + 65 * Math.cos((a * Math.PI) / 180)}, ${150 + 65 * Math.sin((a * Math.PI) / 180)})`} fill="#e8d5b0" />
          ))}
          <circle cx="150" cy="150" r="15" fill="#c9a96e" opacity="0.5" />
        </svg>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-5 w-full max-w-4xl mx-auto">
        {/* Eyebrow */}
        <motion.p custom={0} variants={fadeUp} initial="hidden" animate="visible" className="section-eyebrow mb-4 md:mb-6">
          Together with their families
        </motion.p>

        {/* Decorative line */}
        <motion.div custom={0.5} variants={fadeUp} initial="hidden" animate="visible" className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="h-px w-10 md:w-16" style={{ background: "linear-gradient(90deg, transparent, #c9a96e)" }} />
          <span style={{ color: "#d4788a" }}>♥</span>
          <div className="h-px w-10 md:w-16" style={{ background: "linear-gradient(90deg, #c9a96e, transparent)" }} />
        </motion.div>

        {/* Names */}
        <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="font-playfair font-bold leading-none mb-4"
          style={{ fontSize: "clamp(2.8rem, 9vw, 6.5rem)", color: "#6b4c3b", letterSpacing: "-0.02em" }}
        >
          Aria
          <span className="font-cormorant italic font-light mx-2 md:mx-4 inline-block"
            style={{ fontSize: "clamp(2rem, 6.5vw, 4.5rem)", color: "#d4788a" }}>
            &
          </span>
          Ethan
        </motion.h1>

        {/* Tagline */}
        <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="font-cormorant italic mb-8 md:mb-10 px-4"
          style={{ fontSize: "clamp(1.1rem, 3.5vw, 1.6rem)", color: "#6b4c3b", opacity: 0.75 }}
        >
          request the pleasure of your company
        </motion.p>

        {/* Date & Venue badges — stack on mobile */}
        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full"
        >
          <div className="glass-card px-5 py-3 md:px-8 md:py-4 rounded-2xl flex items-center gap-3 w-full sm:w-auto max-w-xs">
            <Calendar size={16} style={{ color: "#c9a96e", flexShrink: 0 }} />
            <div className="text-left min-w-0">
              <p className="text-xs tracking-widest uppercase opacity-60 font-inter" style={{ color: "#6b4c3b" }}>Date</p>
              <p className="font-playfair font-semibold text-base md:text-lg" style={{ color: "#6b4c3b" }}>October 12, 2026</p>
            </div>
          </div>

          <div className="hidden sm:block w-px h-10 opacity-30" style={{ background: "linear-gradient(to bottom, transparent, #c9a96e, transparent)" }} />

          <div className="glass-card px-5 py-3 md:px-8 md:py-4 rounded-2xl flex items-center gap-3 w-full sm:w-auto max-w-xs">
            <MapPin size={16} style={{ color: "#d4788a", flexShrink: 0 }} />
            <div className="text-left min-w-0">
              <p className="text-xs tracking-widest uppercase opacity-60 font-inter" style={{ color: "#6b4c3b" }}>Venue</p>
              <p className="font-playfair font-semibold text-base md:text-lg" style={{ color: "#6b4c3b" }}>Rosewood Manor</p>
              <p className="text-xs opacity-50 font-inter" style={{ color: "#6b4c3b" }}>Goa, India</p>
            </div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="mt-12 md:mt-16 flex flex-col items-center gap-2">
          <p className="text-xs tracking-widest uppercase opacity-40 font-inter" style={{ color: "#6b4c3b" }}>Scroll to explore</p>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border opacity-40 flex items-start justify-center pt-1.5" style={{ borderColor: "#c9a96e" }}>
            <div className="w-1 h-2 rounded-full" style={{ background: "#c9a96e" }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
