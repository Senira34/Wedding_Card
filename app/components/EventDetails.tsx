"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Clock, MapPin, Church, Utensils } from "lucide-react";

const events = [
  {
    id: "ceremony",
    icon: Church,
    accentIcon: "⛪",
    title: "Wedding Ceremony",
    time: "11:00 AM",
    venue: "St. Thomas Chapel",
    address: "Rosewood Manor, Goa, India",
    description: "Join us as we exchange our vows and begin our journey together as husband and wife.",
    color: "#d4788a",
  },
  {
    id: "reception",
    icon: Utensils,
    accentIcon: "🥂",
    title: "Wedding Reception",
    time: "7:00 PM",
    venue: "The Grand Ballroom",
    address: "Rosewood Manor, Goa, India",
    description: "Celebrate with us over dinner, dancing, and memories that will last a lifetime.",
    color: "#c9a96e",
  },
];

export default function EventDetails() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="events"
      className="py-16 md:py-24 px-4 sm:px-6"
      style={{ background: "linear-gradient(180deg, #fdf8f4 0%, #fce8e8 50%, #fdf8f4 100%)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-10 md:mb-16">
          <p className="section-eyebrow mb-3 md:mb-4">Join Us</p>
          <h2 className="section-title">Event Details</h2>
          <p className="font-cormorant italic text-lg md:text-xl mt-3 md:mt-4 opacity-70" style={{ color: "#6b4c3b" }}>
            Two celebrations, one beautiful day
          </p>
        </motion.div>

        {/* Cards */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
          {events.map((event, i) => {
            const Icon = event.icon;
            return (
              <motion.div
                key={event.id}
                id={`event-card-${event.id}`}
                initial={{ opacity: 0, y: 50, scale: 0.97 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-2xl md:rounded-3xl"
                style={{
                  background: "rgba(253, 248, 244, 0.8)",
                  backdropFilter: "blur(20px)",
                  border: `1px solid ${event.color}40`,
                  boxShadow: `0 8px 32px ${event.color}15, 0 2px 8px rgba(107,76,59,0.06), inset 0 1px 0 rgba(255,255,255,0.9)`,
                }}
              >
                {/* Top gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${event.color}, transparent)` }} />

                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-36 h-36 rounded-full opacity-5 -translate-y-10 translate-x-10"
                  style={{ background: event.color }} />

                <div className="p-6 md:p-8 lg:p-10">
                  {/* Icon & title row */}
                  <div className="flex items-start gap-4 mb-5 md:mb-6">
                    <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${event.color}20, ${event.color}10)`, border: `1px solid ${event.color}30` }}>
                      <Icon size={22} style={{ color: event.color }} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-playfair font-bold text-xl md:text-2xl leading-tight" style={{ color: "#6b4c3b" }}>
                        {event.title}
                      </h3>
                      <p className="font-cormorant italic text-sm md:text-base mt-0.5 opacity-60" style={{ color: "#6b4c3b" }}>
                        {event.accentIcon} October 12, 2026
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px mb-5 md:mb-6 opacity-25"
                    style={{ background: `linear-gradient(90deg, ${event.color}, transparent)` }} />

                  {/* Time & Venue */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock size={15} style={{ color: event.color, flexShrink: 0 }} />
                      <div>
                        <p className="text-xs font-inter tracking-widest uppercase opacity-50 mb-0.5" style={{ color: "#6b4c3b" }}>Time</p>
                        <p className="font-playfair font-semibold text-lg" style={{ color: "#6b4c3b" }}>{event.time}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={15} style={{ color: event.color, flexShrink: 0, marginTop: "2px" }} />
                      <div>
                        <p className="text-xs font-inter tracking-widest uppercase opacity-50 mb-0.5" style={{ color: "#6b4c3b" }}>Venue</p>
                        <p className="font-playfair font-semibold text-lg leading-tight" style={{ color: "#6b4c3b" }}>{event.venue}</p>
                        <p className="font-inter text-sm opacity-60 mt-0.5" style={{ color: "#6b4c3b" }}>{event.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-5 font-cormorant italic text-base leading-relaxed opacity-65 border-t pt-4"
                    style={{ color: "#6b4c3b", borderColor: `${event.color}20` }}>
                    &ldquo;{event.description}&rdquo;
                  </p>

                  {/* Map link */}
                  <a
                    href={`https://maps.google.com?q=${encodeURIComponent(event.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-inter font-medium"
                    style={{ color: event.color }}
                  >
                    <MapPin size={13} />
                    View on Map →
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
