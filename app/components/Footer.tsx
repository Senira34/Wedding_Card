"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Heart } from "lucide-react";

const PETALS_BG = [
  { left: "5%", delay: 0, duration: "13.2s", fontSize: "1.05rem", icon: "🌸" },
  { left: "15%", delay: 1.5, duration: "10.8s", fontSize: "0.92rem", icon: "🌹" },
  { left: "25%", delay: 0.8, duration: "12.4s", fontSize: "1.18rem", icon: "✿" },
  { left: "45%", delay: 0.3, duration: "11.5s", fontSize: "1.32rem", icon: "🌺" },
  { left: "75%", delay: 2.5, duration: "12.8s", fontSize: "0.88rem", icon: "✿" },
  { left: "92%", delay: 0.4, duration: "13.6s", fontSize: "1.02rem", icon: "🌺" },
];

interface SocialLink { id: string; href: string; label: string; color: string; svgPath: string; }

const socialLinks: SocialLink[] = [
  { id: "instagram", href: "https://instagram.com", label: "Instagram", color: "#E1306C",
    svgPath: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
  { id: "facebook", href: "https://facebook.com", label: "Facebook", color: "#1877F2",
    svgPath: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { id: "whatsapp", href: "https://wa.me", label: "WhatsApp", color: "#25D366",
    svgPath: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" },
];

export default function Footer() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <footer
      id="footer"
      className="relative overflow-hidden py-16 md:py-20 px-4 sm:px-6"
      style={{ background: "linear-gradient(180deg, #fdf8f4 0%, #fce8e8 30%, #f5ede3 60%, #fdf8f4 100%)" }}
    >
      {/* Top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 md:w-48 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #c9a96e, transparent)" }} />

      {/* SVG flowers (desktop only to avoid clutter on mobile) */}
      <div className="hidden md:block absolute bottom-0 left-0 w-44 h-44 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <ellipse key={a} cx={100 + 65 * Math.cos((a * Math.PI) / 180)} cy={100 + 65 * Math.sin((a * Math.PI) / 180)}
              rx="20" ry="32" transform={`rotate(${a + 90}, ${100 + 65 * Math.cos((a * Math.PI) / 180)}, ${100 + 65 * Math.sin((a * Math.PI) / 180)})`} fill="#f2c4c4" />
          ))}
          <circle cx="100" cy="100" r="15" fill="#c9a96e" opacity="0.6" />
        </svg>
      </div>
      <div className="hidden md:block absolute bottom-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none">
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse key={a} cx={100 + 55 * Math.cos((a * Math.PI) / 180)} cy={100 + 55 * Math.sin((a * Math.PI) / 180)}
              rx="16" ry="28" transform={`rotate(${a + 90}, ${100 + 55 * Math.cos((a * Math.PI) / 180)}, ${100 + 55 * Math.sin((a * Math.PI) / 180)})`} fill="#e8d5b0" />
          ))}
          <circle cx="100" cy="100" r="12" fill="#c9a96e" opacity="0.5" />
        </svg>
      </div>

      <div ref={ref} className="max-w-lg mx-auto text-center relative z-10">
        {/* Animated heart */}
        <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="inline-block mb-6 md:mb-8">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto"
            style={{ background: "linear-gradient(135deg, #d4788a, #e8a4a4)", boxShadow: "0 10px 28px rgba(212,120,138,0.35)" }}>
            <Heart size={24} fill="white" color="white" />
          </div>
        </motion.div>

        {/* Names */}
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          className="font-playfair font-bold mb-1.5" style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", color: "#6b4c3b" }}>
          Aria & Ethan
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.12 }}
          className="font-inter text-xs tracking-widest uppercase mb-6 md:mb-8 opacity-50" style={{ color: "#6b4c3b" }}>
          October 12, 2026 · Goa, India
        </motion.p>

        {/* Quote */}
        <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.22 }}
          className="font-cormorant italic leading-relaxed mb-8 md:mb-10 px-2"
          style={{ fontSize: "clamp(1.05rem, 3.5vw, 1.35rem)", color: "#6b4c3b", opacity: 0.72 }}>
          &ldquo;Thank you for being part of our story. Your presence makes this day infinitely more beautiful.&rdquo;
        </motion.p>

        {/* Ornament */}
        <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={inView ? { opacity: 1, scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.32 }}
          className="flex items-center gap-3 justify-center mb-8 md:mb-10">
          <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #c9a96e)" }} />
          <span className="text-base" style={{ color: "#c9a96e" }}>✦</span>
          <div className="h-px w-16" style={{ background: "linear-gradient(90deg, #c9a96e, transparent)" }} />
        </motion.div>

        {/* Social icons */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.42 }}
          className="flex items-center justify-center gap-4 mb-8 md:mb-12">
          {socialLinks.map((social) => (
            <motion.a key={social.id} id={`footer-social-${social.id}`} href={social.href}
              target="_blank" rel="noopener noreferrer" aria-label={social.label}
              whileHover={{ scale: 1.15, y: -3 }} whileTap={{ scale: 0.93 }}
              className="w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center"
              style={{ background: "rgba(253,248,244,0.85)", backdropFilter: "blur(8px)",
                border: "1.5px solid rgba(201,169,110,0.3)", boxShadow: "0 4px 12px rgba(107,76,59,0.08)", transition: "all 0.3s ease" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = `${social.color}18`;
                el.style.borderColor = `${social.color}60`;
                el.style.boxShadow = `0 8px 24px ${social.color}30`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(253,248,244,0.85)";
                el.style.borderColor = "rgba(201,169,110,0.3)";
                el.style.boxShadow = "0 4px 12px rgba(107,76,59,0.08)";
              }}
            >
              <svg viewBox="0 0 24 24" width="17" height="17" fill={social.color}>
                <path d={social.svgPath} />
              </svg>
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright */}
        <p className="font-inter text-xs opacity-30" style={{ color: "#6b4c3b" }}>
          Made with ♥ for Aria & Ethan · 2026
        </p>
      </div>

      {/* Subtle petal accents */}
      {PETALS_BG.map((p, i) => (
        <div key={i} className="petal hidden md:block" style={{ left: p.left, top: "-20px", animationDuration: p.duration, animationDelay: `${p.delay}s`, fontSize: p.fontSize, opacity: 0.25 }}>
          {p.icon}
        </div>
      ))}
    </footer>
  );
}
