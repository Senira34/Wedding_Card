"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const WEDDING_DATE = new Date("2026-10-12T11:00:00");

interface TimeUnit { label: string; value: number; }

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([
    { label: "Days", value: 0 },
    { label: "Hours", value: 0 },
    { label: "Minutes", value: 0 },
    { label: "Seconds", value: 0 },
  ]);

  useEffect(() => {
    const compute = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft([
        { label: "Days",    value: Math.floor(diff / 86400000) },
        { label: "Hours",   value: Math.floor((diff % 86400000) / 3600000) },
        { label: "Minutes", value: Math.floor((diff % 3600000) / 60000) },
        { label: "Seconds", value: Math.floor((diff % 60000) / 1000) },
      ]);
    };
    compute();
    const id = setInterval(compute, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

export default function CountdownTimer() {
  const timeLeft = useCountdown(WEDDING_DATE);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section
      id="countdown"
      className="py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #6b4c3b 0%, #8b5e4b 30%, #6b4c3b 60%, #5a3d30 100%)" }}
    >
      {/* Ambient overlays */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #c9a96e 0%, transparent 50%), radial-gradient(circle at 80% 50%, #f2c4c4 0%, transparent 50%)" }} />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-10 md:mb-16">
          <p className="font-inter text-xs tracking-[0.4em] uppercase mb-3 md:mb-4" style={{ color: "#e8d5b0" }}>The Big Day</p>
          <h2 className="font-playfair font-bold" style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", color: "#fdf8f4", letterSpacing: "-0.02em" }}>
            Counting Down
          </h2>
          <p className="font-cormorant italic text-lg md:text-xl mt-2 md:mt-3" style={{ color: "#e8d5b0", opacity: 0.8 }}>
            October 12, 2026 · Goa, India
          </p>
        </motion.div>

        {/* Timer grid */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 lg:gap-6">
          {timeLeft.map((unit, i) => (
            <motion.div
              key={unit.label}
              id={`countdown-${unit.label.toLowerCase()}`}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="flex flex-col items-center justify-center py-6 md:py-8 px-3 md:px-4 rounded-2xl md:rounded-3xl relative overflow-hidden"
              style={{
                background: "rgba(253, 248, 244, 0.08)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(201, 169, 110, 0.3)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <div className="absolute inset-0 opacity-10 rounded-2xl md:rounded-3xl"
                style={{ background: i % 2 === 0 ? "radial-gradient(circle at 50% 0%, #c9a96e, transparent 60%)" : "radial-gradient(circle at 50% 0%, #f2c4c4, transparent 60%)" }} />

              <motion.span
                key={unit.value}
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="font-playfair font-bold relative z-10 tabular-nums"
                style={{ fontSize: "clamp(2rem, 8vw, 3.8rem)", color: "#fdf8f4", lineHeight: 1, textShadow: "0 2px 20px rgba(201,169,110,0.4)" }}
              >
                {String(unit.value).padStart(2, "0")}
              </motion.span>

              <div className="w-6 h-px my-2 md:my-3 opacity-50"
                style={{ background: "linear-gradient(90deg, transparent, #c9a96e, transparent)" }} />

              <span className="font-inter text-xs tracking-[0.2em] uppercase" style={{ color: "#e8d5b0", opacity: 0.8 }}>
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-8 md:mt-10 font-cormorant italic text-base md:text-lg" style={{ color: "#e8d5b0", opacity: 0.6 }}
        >
          Every second brings us closer to forever ♥
        </motion.p>
      </div>
    </section>
  );
}
