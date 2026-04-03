"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, VolumeX } from "lucide-react";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Show button after 2 seconds
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/audio/romantic.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay blocked — silent fail
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <motion.button
            id="music-toggle-btn"
            onClick={toggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.93 }}
            className="relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer"
            style={{
              background: isPlaying
                ? "linear-gradient(135deg, #d4788a, #c9a96e)"
                : "rgba(253, 248, 244, 0.85)",
              backdropFilter: "blur(12px)",
              border: `1.5px solid ${isPlaying ? "#d4788a" : "#c9a96e"}`,
              boxShadow: isPlaying
                ? "0 8px 24px rgba(212,120,138,0.35)"
                : "0 8px 24px rgba(201,169,110,0.2)",
            }}
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {/* Pulse rings when playing */}
            {isPlaying && (
              <>
                <motion.span
                  className="absolute inset-0 rounded-full"
                  animate={{ scale: [1, 1.5, 1.5], opacity: [0.6, 0, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  style={{ border: "1.5px solid #d4788a" }}
                />
                <motion.span
                  className="absolute inset-0 rounded-full"
                  animate={{ scale: [1, 1.8, 1.8], opacity: [0.4, 0, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                  style={{ border: "1px solid #c9a96e" }}
                />
              </>
            )}
            {isPlaying ? (
              <Music size={20} color="#fff" />
            ) : (
              <VolumeX size={20} color="#c9a96e" />
            )}
          </motion.button>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-inter pointer-events-none"
            style={{
              background: "rgba(253,248,244,0.9)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(201,169,110,0.3)",
              color: "#6b4c3b",
              boxShadow: "0 4px 12px rgba(107,76,59,0.1)",
            }}
          >
            {isPlaying ? "♪ Playing..." : "♪ Music"}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
