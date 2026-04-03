"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// Static imports for critical components
import EnvelopeLanding from "./components/EnvelopeLanding";

// Dynamic imports for heavy sections (code splitting)
const ScrollProgress = dynamic(() => import("./components/ScrollProgress"), { ssr: false });
const MusicToggle = dynamic(() => import("./components/MusicToggle"), { ssr: false });
const HeroSection = dynamic(() => import("./components/HeroSection"));
const AnimatedDivider = dynamic(() => import("./components/AnimatedDivider"));
const EventDetails = dynamic(() => import("./components/EventDetails"));
const CountdownTimer = dynamic(() => import("./components/CountdownTimer"));
const GallerySection = dynamic(() => import("./components/GallerySection"));
const LoveStorySection = dynamic(() => import("./components/LoveStorySection"));
const RSVPSection = dynamic(() => import("./components/RSVPSection"));
const Footer = dynamic(() => import("./components/Footer"));

export default function Home() {
  const [showInvitation, setShowInvitation] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {!showInvitation && (
          <EnvelopeLanding key="envelope" onOpen={() => setShowInvitation(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showInvitation && (
          <motion.div
            key="invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {/* Fixed UI overlays */}
            <ScrollProgress />
            <MusicToggle />

            {/* Navigation dots */}
            <nav
              className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3"
              aria-label="Page sections"
            >
              {[
                { id: "hero", label: "Home" },
                { id: "events", label: "Events" },
                { id: "countdown", label: "Countdown" },
                { id: "gallery", label: "Gallery" },
                { id: "love-story", label: "Story" },
                { id: "rsvp", label: "RSVP" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-label={item.label}
                  className="group flex items-center gap-2 justify-end"
                >
                  <span
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs font-inter pointer-events-none"
                    style={{ color: "#c9a96e" }}
                  >
                    {item.label}
                  </span>
                  <div
                    className="w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-150"
                    style={{
                      background: "#c9a96e",
                      opacity: 0.5,
                    }}
                  />
                </a>
              ))}
            </nav>

            {/* Main content */}
            <main>
              <HeroSection />
              <AnimatedDivider />
              <EventDetails />
              <AnimatedDivider />
              <CountdownTimer />
              <AnimatedDivider />
              <GallerySection />
              <AnimatedDivider />
              <LoveStorySection />
              <AnimatedDivider />
              <RSVPSection />
              <Footer />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
