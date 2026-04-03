"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Heart } from "lucide-react";

interface EnvelopeLandingProps {
  onOpen: () => void;
}

// Pre-computed stable values — avoids Math.random() during render (hydration mismatch)
const PETALS = [
  { left: "5%",  delay: 0,   duration: "13.2s", fontSize: "1.05rem", icon: "🌸" },
  { left: "15%", delay: 1.5, duration: "10.8s", fontSize: "0.92rem", icon: "🌹" },
  { left: "25%", delay: 0.8, duration: "12.4s", fontSize: "1.18rem", icon: "✿" },
  { left: "35%", delay: 2.2, duration: "9.6s",  fontSize: "0.85rem", icon: "❀" },
  { left: "45%", delay: 0.3, duration: "11.5s", fontSize: "1.32rem", icon: "🌺" },
  { left: "55%", delay: 1.8, duration: "14.1s", fontSize: "0.98rem", icon: "🌸" },
  { left: "65%", delay: 0.6, duration: "10.2s", fontSize: "1.12rem", icon: "🌹" },
  { left: "75%", delay: 2.5, duration: "12.8s", fontSize: "0.88rem", icon: "✿" },
  { left: "85%", delay: 1.1, duration: "11.0s", fontSize: "1.25rem", icon: "❀" },
  { left: "92%", delay: 0.4, duration: "13.6s", fontSize: "1.02rem", icon: "🌺" },
];

const FloatingPetal = ({
  left, delay, duration, fontSize, icon,
}: typeof PETALS[0]) => (
  <div
    className="petal"
    style={{
      left,
      top: "-20px",
      animationDuration: duration,
      animationDelay: `${delay}s`,
      fontSize,
    }}
  >
    {icon}
  </div>
);

export default function EnvelopeLanding({ onOpen }: EnvelopeLandingProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(onOpen, 1200);
  };

  return (
    <AnimatePresence>
      {!isOpening ? (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.08,
            filter: "blur(8px)",
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
          className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at 30% 30%, #fce8e8 0%, #fdf8f4 35%, #f5ede3 65%, #fce8e8 100%)",
          }}
        >
          {/* Ambient floral background SVG */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
            <svg
              viewBox="0 0 800 800"
              className="absolute -top-20 -left-20 w-[500px] h-[500px] text-blush"
              fill="none"
            >
              <circle cx="200" cy="200" r="180" stroke="#f2c4c4" strokeWidth="1" opacity="0.5" />
              <circle cx="200" cy="200" r="140" stroke="#c9a96e" strokeWidth="0.5" opacity="0.4" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <ellipse
                  key={angle}
                  cx={200 + 120 * Math.cos((angle * Math.PI) / 180)}
                  cy={200 + 120 * Math.sin((angle * Math.PI) / 180)}
                  rx="35"
                  ry="55"
                  transform={`rotate(${angle + 90}, ${200 + 120 * Math.cos((angle * Math.PI) / 180)}, ${200 + 120 * Math.sin((angle * Math.PI) / 180)})`}
                  fill="#f2c4c4"
                  opacity="0.4"
                />
              ))}
              <circle cx="200" cy="200" r="25" fill="#c9a96e" opacity="0.3" />
            </svg>
            <svg
              viewBox="0 0 800 800"
              className="absolute -bottom-20 -right-20 w-[400px] h-[400px]"
              fill="none"
            >
              <circle cx="600" cy="600" r="150" stroke="#c9a96e" strokeWidth="0.8" opacity="0.4" />
              {[0, 60, 120, 180, 240, 300].map((angle) => (
                <ellipse
                  key={angle}
                  cx={600 + 100 * Math.cos((angle * Math.PI) / 180)}
                  cy={600 + 100 * Math.sin((angle * Math.PI) / 180)}
                  rx="28"
                  ry="45"
                  transform={`rotate(${angle + 90}, ${600 + 100 * Math.cos((angle * Math.PI) / 180)}, ${600 + 100 * Math.sin((angle * Math.PI) / 180)})`}
                  fill="#e8d5b0"
                  opacity="0.5"
                />
              ))}
            </svg>
          </div>

          {/* Falling petals */}
          {PETALS.map((petal, i) => (
            <FloatingPetal key={i} {...petal} />
          ))}

          {/* Envelope container */}
          <div className="animate-float relative">
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center"
            >
              {/* Top text */}
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="section-eyebrow mb-6"
              >
                You are cordially invited
              </motion.p>

              {/* Envelope SVG */}
              <div
                className="relative"
                style={{
                  width: "clamp(280px, 40vw, 480px)",
                  height: "clamp(180px, 26vw, 320px)",
                }}
              >
                {/* Envelope body */}
                <div
                  className="absolute inset-0 rounded-2xl shadow-2xl overflow-hidden"
                  style={{
                    background: "linear-gradient(145deg, #fffff8 0%, #fdf8f4 40%, #f5ede3 100%)",
                    boxShadow:
                      "0 25px 60px rgba(107, 76, 59, 0.15), 0 8px 24px rgba(201, 169, 110, 0.2), inset 0 1px 0 rgba(255,255,255,0.9)",
                  }}
                >
                  {/* Gold border */}
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      border: "1.5px solid",
                      borderImageSource:
                        "linear-gradient(135deg, #c9a96e, #e8d5b0, #c9a96e)",
                      borderImageSlice: 1,
                    }}
                  />

                  {/* Interior lines suggesting folded letter */}
                  <div className="absolute inset-6 flex flex-col justify-center items-center gap-2">
                    <Heart
                      className="mb-2"
                      style={{ color: "#d4788a", fill: "#d4788a" }}
                      size={32}
                    />
                    <div
                      className="w-full h-px opacity-30"
                      style={{ background: "linear-gradient(90deg, transparent, #c9a96e, transparent)" }}
                    />
                    <p
                      className="font-playfair text-lg italic text-center opacity-60"
                      style={{ color: "#c9a96e" }}
                    >
                      Pabasara & Malki
                    </p>
                    <div
                      className="w-3/4 h-px opacity-20"
                      style={{ background: "linear-gradient(90deg, transparent, #c9a96e, transparent)" }}
                    />
                    <p className="text-xs tracking-widest uppercase opacity-40" style={{ color: "#6b4c3b" }}>
                      October 12, 2026
                    </p>
                  </div>

                  {/* Envelope flap (top triangle) */}
                  <div
                    className="absolute top-0 left-0 right-0"
                    style={{
                      height: "50%",
                      clipPath: "polygon(0 0, 100% 0, 50% 62%)",
                      background: "linear-gradient(160deg, #f5ede3 0%, #fce8e8 50%, #f5ede3 100%)",
                      borderBottom: "1px solid rgba(201, 169, 110, 0.3)",
                    }}
                  />

                  {/* Wax seal */}
                  <div
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full flex items-center justify-center z-10 shadow-lg"
                    style={{
                      background: "radial-gradient(circle at 35% 35%, #e8a4a4, #d4788a, #b05870)",
                      boxShadow: "0 4px 12px rgba(212, 120, 138, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
                    }}
                  >
                    <span className="text-white text-xl font-playfair italic font-bold">A</span>
                  </div>
                </div>
              </div>

              {/* Bottom text & CTA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="mt-14 flex flex-col items-center gap-6"
              >
                <p className="font-cormorant text-xl italic text-center" style={{ color: "#6b4c3b", opacity: 0.8 }}>
                  A love story worth celebrating
                </p>

                <motion.button
                  id="open-invitation-btn"
                  onClick={handleOpen}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative px-10 py-4 rounded-full font-inter text-sm font-medium tracking-widest uppercase overflow-hidden group cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #c9a96e, #a07840)",
                    color: "#fff",
                    boxShadow: "0 8px 24px rgba(201, 169, 110, 0.4), 0 2px 8px rgba(160, 120, 64, 0.3)",
                  }}
                >
                  <span className="relative z-10">Open Invitation</span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(135deg, #e8c080, #c9a96e)",
                    }}
                  />
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)" }}
                  />
                </motion.button>

                <p className="text-xs tracking-wider opacity-40 font-inter" style={{ color: "#6b4c3b" }}>
                  ✦ Click to reveal your invitation ✦
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="opening"
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "radial-gradient(ellipse at center, #fce8e8 0%, #fdf8f4 60%, #f5ede3 100%)" }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.div
            initial={{ scale: 1, rotate: 0 }}
            animate={{ scale: 3, rotate: 5, opacity: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-8xl"
          >
            💌
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
