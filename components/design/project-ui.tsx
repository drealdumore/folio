import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useWebHaptics } from "web-haptics/react";
import { cn } from "@/lib/utils";

export function MobileRow({
  images,
  alt,
  priority,
  className,
}: {
  images: string[];
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  const { trigger } = useWebHaptics();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeLightbox = () => {
    try {
      trigger("light");
    } catch {}
    setSelectedIndex(null);
  };

  const goToPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null || images.length <= 1) return;
    try {
      trigger("selection");
    } catch {}
    setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : images.length - 1));
  };

  const goToNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null || images.length <= 1) return;
    try {
      trigger("selection");
    } catch {}
    setSelectedIndex((prev) => (prev! < images.length - 1 ? prev! + 1 : 0));
  };

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, images.length]);

  // Chunk images into groups of at most 3 per row
  const chunks: string[][] = [];
  for (let i = 0; i < images.length; i += 3) {
    chunks.push(images.slice(i, i + 3));
  }

  if (chunks.length === 0) return null;

  return (
    <>
      {/* Interactive Full-screen Screenshot Lightbox rendered at document body */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedIndex !== null && images[selectedIndex] && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={closeLightbox}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md cursor-zoom-out select-none"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeLightbox();
                  }}
                  className="absolute top-4 right-4 z-30 flex size-10 items-center justify-center rounded-full  text-white backdrop-blur-md hover:bg-white/20 transition-colors cursor-pointer border border-white/15"
                  aria-label="Close image preview"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>

                {/* Previous Button */}
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={goToPrev}
                    className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-30 flex size-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:scale-110 active:scale-95 transition-all cursor-pointer border border-white/15 shadow-xl"
                    aria-label="Previous image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                )}

                {/* Next Button */}
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={goToNext}
                    className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-30 flex size-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:scale-110 active:scale-95 transition-all cursor-pointer border border-white/15 shadow-xl"
                    aria-label="Next image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                )}

                {/* Image Container with swipe support */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative flex flex-col items-center justify-center cursor-default max-h-[88vh]"
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedIndex}
                      src={images[selectedIndex]}
                      alt={`${alt} preview ${selectedIndex + 1}`}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(_, info) => {
                        if (info.offset.x > 80) goToPrev();
                        else if (info.offset.x < -80) goToNext();
                      }}
                      className="max-h-[82vh] w-auto max-w-[88vw] rounded-[24px] border border-white/20 object-contain shadow-2xl select-none"
                    />
                  </AnimatePresence>

                  {/* Image Counter & Pagination */}
                  {images.length > 1 && (
                    <div className="mt-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[12px] font-medium text-zinc-300 border border-white/10 backdrop-blur-md">
                      <span>{selectedIndex + 1}</span>
                      <span className="text-zinc-600">/</span>
                      <span>{images.length}</span>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      <div className="flex w-full flex-col gap-4 md:gap-6">
        {chunks.map((chunk, chunkIndex) => (
          <div
            key={chunkIndex}
            className={cn(
              "w-full rounded-[8px] bg-[#141414] p-3 py-5 sm:p-6 sm:py-8 md:p-8 md:py-10 shadow-sm",
              className
            )}
          >
            <div className="mx-auto flex max-w-2xl items-center justify-center gap-3 sm:gap-4 md:gap-5">
              {chunk.map((src, index) => {
                const globalIndex = chunkIndex * 3 + index;
                return (
                  <div
                    key={src + globalIndex}
                    className="min-w-0 flex-1 max-w-[240px] [container-type:inline-size]"
                  >
                    <div
                      onClick={(e) => {
                        // Prevent navigation if inside a Link
                        e.preventDefault();
                        e.stopPropagation();
                        try {
                          trigger("selection");
                        } catch {}
                        setSelectedIndex(globalIndex);
                      }}
                      className="group/screen relative aspect-[9/19] w-full overflow-hidden rounded-[16cqi] shadow-md outline -outline-offset-1 outline-black/10 dark:outline-white/15 bg-zinc-950/60 cursor-pointer"
                    >
                      <Image
                        src={src}
                        alt={`${alt} screen ${globalIndex + 1}`}
                        fill
                        priority={priority && globalIndex === 0}
                        draggable={false}
                        sizes="(min-width: 768px) 260px, 30vw"
                        className="object-cover select-none transition-transform duration-500 group-hover/screen:scale-[1.04]"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export function WideImage({
  src,
  alt,
  priority,
  className,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-4 md:p-8 shadow-sm",
        className
      )}
    >
      <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-xl outline -outline-offset-1 outline-black/10 dark:outline-white/15">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          priority={priority}
          draggable={false}
          sizes="(min-width: 1600px) 768px, (min-width: 768px) 55vw, 92vw"
          className="h-auto w-full object-cover select-none"
        />
      </div>
    </div>
  );
}

export default MobileRow;