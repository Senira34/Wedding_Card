"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const photos = [
  { src: "/gallery/photo1.jpg", alt: "Golden sunset walk", caption: "Golden Hour" },
  { src: "/gallery/photo2.jpg", alt: "Bridal bouquet", caption: "In Bloom" },
  { src: "/gallery/photo3.jpg", alt: "First dance", caption: "First Dance" },
  { src: "/gallery/photo4.jpg", alt: "Garden laughter", caption: "Pure Joy" },
  { src: "/gallery/photo5.jpg", alt: "Table setting", caption: "For the Feast" },
  { src: "/gallery/photo6.jpg", alt: "Sunset silhouette", caption: "Forever Begins" },
];

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const open  = useCallback((i: number) => setActiveIndex(i), []);
  const close = useCallback(() => setActiveIndex(null), []);
  const prev  = useCallback(() => setActiveIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : 0)), []);
  const next  = useCallback(() => setActiveIndex((i) => (i !== null ? (i + 1) % photos.length : 0)), []);

  return (
    <section
      id="gallery"
      className="py-16 md:py-24 px-4 sm:px-6"
      style={{ background: "linear-gradient(180deg, #fdf8f4 0%, #fce8e8 40%, #fdf8f4 100%)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-10 md:mb-14">
          <p className="section-eyebrow mb-3 md:mb-4">Our Story in Pictures</p>
          <h2 className="section-title">Gallery</h2>
          <p className="font-cormorant italic text-lg md:text-xl mt-3 opacity-70" style={{ color: "#6b4c3b" }}>
            Moments that took our breath away
          </p>
        </motion.div>

        {/* Grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.src}
              id={`gallery-photo-${i + 1}`}
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
              onClick={() => open(i)}
              className="group relative aspect-square overflow-hidden rounded-xl md:rounded-2xl cursor-zoom-in"
              style={{ boxShadow: "0 4px 20px rgba(107,76,59,0.1)" }}
            >
              <Image src={photo.src} alt={photo.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />

              {/* Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end pb-6"
                style={{ background: "linear-gradient(to top, rgba(107,76,59,0.68) 0%, rgba(107,76,59,0.15) 55%, transparent 100%)" }}>
                <div className="flex flex-col items-center gap-1.5">
                  <ZoomIn size={20} color="white" opacity={0.9} />
                  <p className="font-playfair italic text-base font-semibold" style={{ color: "#fdf8f4" }}>{photo.caption}</p>
                </div>
              </div>

              <div className="absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ border: "1.5px solid rgba(201,169,110,0.5)" }} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: "rgba(6, 3, 2, 0.92)", backdropFilter: "blur(12px)" }}
            onClick={close}
          >
            {/* Close */}
            <button id="lightbox-close-btn" onClick={close}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center z-10 cursor-pointer"
              style={{ background: "rgba(253,248,244,0.12)", border: "1px solid rgba(201,169,110,0.3)" }}>
              <X size={18} color="#fdf8f4" />
            </button>

            {/* Image */}
            <motion.div
              key={activeIndex}
              initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
              className="relative w-full h-full max-w-4xl max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={photos[activeIndex].src} alt={photos[activeIndex].alt} fill
                className="object-contain rounded-xl md:rounded-2xl" sizes="90vw" priority />
              <div className="absolute bottom-0 left-0 right-0 text-center pb-2">
                <p className="font-playfair italic text-lg font-semibold" style={{ color: "#fdf8f4" }}>{photos[activeIndex].caption}</p>
                <p className="font-inter text-xs tracking-wider opacity-50 mt-0.5" style={{ color: "#e8d5b0" }}>
                  {activeIndex + 1} / {photos.length}
                </p>
              </div>
            </motion.div>

            {/* Prev */}
            <button id="lightbox-prev-btn" onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 md:left-6 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center cursor-pointer top-1/2 -translate-y-1/2"
              style={{ background: "rgba(253,248,244,0.12)", border: "1px solid rgba(201,169,110,0.3)" }}>
              <ChevronLeft size={20} color="#fdf8f4" />
            </button>

            {/* Next */}
            <button id="lightbox-next-btn" onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center cursor-pointer top-1/2 -translate-y-1/2"
              style={{ background: "rgba(253,248,244,0.12)", border: "1px solid rgba(201,169,110,0.3)" }}>
              <ChevronRight size={20} color="#fdf8f4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
