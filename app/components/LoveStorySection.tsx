"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Heart } from "lucide-react";

const milestones = [
  {
    id: 1,
    date: "March 2020",
    title: "The First Meeting",
    description:
      "At a rainy bookshop in Mumbai, Aria reached for the same novel — and Ethan refused to let go. A friendly argument turned into coffee that lasted five hours.",
    emoji: "📚",
    side: "left",
  },
  {
    id: 2,
    date: "December 2020",
    title: "Our First Date",
    description:
      "A picnic under the stars at Marine Drive. Ethan strummed his guitar while Aria sang along, hopelessly out of tune. They both knew this was something rare.",
    emoji: "🎸",
    side: "right",
  },
  {
    id: 3,
    date: "July 2023",
    title: "He Proposed",
    description:
      "Atop the hills of Coorg at sunrise, with trembling hands and a ring hidden in a bouquet of her favourite peonies, Ethan asked the only question that ever mattered.",
    emoji: "💍",
    side: "left",
  },
  {
    id: 4,
    date: "October 2026",
    title: "Forever Begins",
    description:
      "Now we invite you — our family and dearest friends — to stand with us as we begin the greatest chapter of our love story. Thank you for being part of this journey.",
    emoji: "💒",
    side: "right",
  },
];

interface MilestoneProps {
  milestone: (typeof milestones)[0];
  index: number;
}

function Milestone({ milestone, index }: MilestoneProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const isLeft = milestone.side === "left";

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-center gap-0 md:gap-8 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="w-full md:w-[calc(50%-2.5rem)] group"
      >
        <div
          className="glass-card p-5 md:p-7 rounded-2xl relative overflow-hidden"
          style={{
            borderColor: index % 2 === 0 ? "rgba(212,120,138,0.25)" : "rgba(201,169,110,0.25)",
          }}
        >
          {/* Accent top border */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background:
                index % 2 === 0
                  ? "linear-gradient(90deg, transparent, #d4788a, transparent)"
                  : "linear-gradient(90deg, transparent, #c9a96e, transparent)",
            }}
          />

          {/* Background glow */}
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 -translate-y-8 translate-x-8"
            style={{
              background: index % 2 === 0 ? "#d4788a" : "#c9a96e",
            }}
          />

          <div className="relative z-10">
            <span className="text-2xl md:text-3xl mb-3 md:mb-4 block">{milestone.emoji}</span>
            <p
              className="font-inter text-xs tracking-[0.25em] uppercase mb-2 font-medium"
              style={{ color: index % 2 === 0 ? "#d4788a" : "#c9a96e" }}
            >
              {milestone.date}
            </p>
            <h3
              className="font-playfair font-bold text-xl md:text-2xl mb-3 leading-tight"
              style={{ color: "#6b4c3b" }}
            >
              {milestone.title}
            </h3>
            <p
              className="font-cormorant italic text-lg leading-relaxed opacity-75"
              style={{ color: "#6b4c3b" }}
            >
              {milestone.description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Center dot (hidden on mobile via absolute + z) */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full items-center justify-center z-10"
        style={{
          background:
            index % 2 === 0
              ? "linear-gradient(135deg, #d4788a, #e8a4a4)"
              : "linear-gradient(135deg, #c9a96e, #e8d5b0)",
          boxShadow:
            index % 2 === 0
              ? "0 0 0 4px rgba(212,120,138,0.2), 0 4px 16px rgba(212,120,138,0.3)"
              : "0 0 0 4px rgba(201,169,110,0.2), 0 4px 16px rgba(201,169,110,0.3)",
        }}
      >
        <Heart size={16} fill="white" color="white" />
      </motion.div>

      {/* Empty half for layout */}
      <div className="hidden md:block w-[calc(50%-2.5rem)]" />
    </div>
  );
}

export default function LoveStorySection() {
  return (
    <section
      id="love-story"
      className="py-16 md:py-24 px-4 sm:px-6 relative"
      style={{
        background: "linear-gradient(180deg, #fdf8f4 0%, #f5ede3 50%, #fdf8f4 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <p className="section-eyebrow mb-4">How It All Began</p>
          <h2 className="section-title">Our Love Story</h2>
          <p
            className="font-cormorant italic text-xl mt-4 max-w-lg mx-auto opacity-70"
            style={{ color: "#6b4c3b" }}
          >
            A journey of two hearts, guided by fate and bound by love
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line (desktop) */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 timeline-line"
          />

          {/* Milestones */}
          <div className="flex flex-col gap-8 md:gap-14">
            {milestones.map((milestone, i) => (
              <Milestone key={milestone.id} milestone={milestone} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
