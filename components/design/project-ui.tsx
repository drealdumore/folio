import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useWebHaptics } from "web-haptics/react";
import { cn } from "@/lib/utils";
import { prefetchImage, prefetchImages } from "@/lib/prefetch";

// Curves from easing.dev
const OUT_QUINT = [0.23, 1, 0.32, 1] as const; // fades, quick responses
const IN_OUT_QUART = [0.77, 0, 0.175, 1] as const; // on-screen movement

// Hover motion only on real hover devices (touch fires false hovers on tap).
const HOVER = "[@media(hover:hover)_and_(pointer:fine)]";

const btnBase =
  "absolute z-30 flex items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/15 shadow-xl cursor-pointer " +
  "transition-[background-color,scale,opacity] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] " +
  "disabled:opacity-0 disabled:pointer-events-none " +
  `${HOVER}:hover:bg-white/20`;

type Haptic = (type: "light" | "selection") => void;

function Lightbox({
  images,
  alt,
  index,
  setIndex,
  onClose,
  haptic,
}: {
  images: string[];
  alt: string;
  index: number;
  setIndex: (i: number) => void;
  onClose: () => void;
  haptic: Haptic;
}) {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);
  const dragged = useRef(false);
  const indexRef = useRef(index);
  indexRef.current = index;
  const last = images.length - 1;

  // Measure the stage and park the track on the opened image before paint.
  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      setWidth(w);
      x.set(-indexRef.current * w);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [x]);

  const slideTo = (
    i: number,
    transition: Parameters<typeof animate>[2] = {
      duration: 0.4,
      ease: IN_OUT_QUART,
    }
  ) => {
    if (!width) return;
    const target = -i * width;
    if (reduce) x.set(target);
    else animate(x, target, transition);
  };

  const go = (i: number, transition?: Parameters<typeof animate>[2]) => {
    const next = Math.max(0, Math.min(last, i));
    if (next === index) return;
    haptic("selection");
    setIndex(next);
    slideTo(next, transition);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Out-quint on keys: stays responsive when the key is held / repeated.
      if (e.key === "ArrowLeft")
        go(index - 1, { duration: 0.35, ease: OUT_QUINT });
      if (e.key === "ArrowRight")
        go(index + 1, { duration: 0.35, ease: OUT_QUINT });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.22, ease: OUT_QUINT } }}
      exit={{ opacity: 0, transition: { duration: 0.15, ease: OUT_QUINT } }}
      className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md select-none"
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className={cn(btnBase, "top-4 right-4 size-10")}
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

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            className={cn(
              btnBase,
              "left-3 md:left-8 top-1/2 -translate-y-1/2 size-11"
            )}
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
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={index === last}
            className={cn(
              btnBase,
              "right-3 md:right-8 top-1/2 -translate-y-1/2 size-11"
            )}
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
        </>
      )}

      {/* Stage: scales/fades in once. The track inside slides. */}
      <motion.div
        ref={stageRef}
        initial={{
          opacity: 0,
          transform: reduce ? "scale(1)" : "scale(0.96)",
        }}
        animate={{
          opacity: 1,
          transform: "scale(1)",
          transition: { duration: 0.25, ease: OUT_QUINT },
        }}
        exit={{
          opacity: 0,
          transform: reduce ? "scale(1)" : "scale(0.97)",
          transition: { duration: 0.15, ease: OUT_QUINT },
        }}
        className="absolute inset-0 overflow-hidden"
      >
        {/* Track: every image has its own full-width slot, so nothing reflows. */}
        <motion.div
          drag={images.length > 1 ? "x" : false}
          style={{ x }}
          dragConstraints={{ left: -last * width, right: 0 }}
          dragElastic={0.12}
          dragMomentum={false}
          onDragStart={() => {
            dragged.current = true;
          }}
          onDragEnd={(_, info) => {
            const { offset, velocity } = info;
            const threshold = width * 0.2;
            let next = index;
            if (offset.x < -threshold || velocity.x < -500) next = index + 1;
            else if (offset.x > threshold || velocity.x > 500) next = index - 1;
            next = Math.max(0, Math.min(last, next));
            if (next !== index) {
              haptic("selection");
              setIndex(next);
            }
            // Spring carries the release velocity into the settle.
            slideTo(next, {
              type: "spring",
              duration: 0.45,
              bounce: 0,
              velocity: velocity.x,
            });
            // Swallow the click that follows a drag so it doesn't close.
            setTimeout(() => {
              dragged.current = false;
            }, 0);
          }}
          className="flex h-full touch-pan-y"
        >
          {images.map((src, i) => (
            <div
              key={src + i}
              onClick={() => {
                if (!dragged.current) onClose();
              }}
              className="flex h-full w-full shrink-0 items-center justify-center p-4 cursor-zoom-out"
            >
              {/* Only mount the current image and its neighbours */}
              {Math.abs(i - index) <= 1 && (
                <img
                  src={src}
                  alt={`${alt} preview ${i + 1}`}
                  draggable={false}
                  onClick={(e) => e.stopPropagation()}
                  className="max-h-[82vh] w-auto max-w-[88vw] rounded-[24px] border border-white/20 object-contain shadow-2xl select-none cursor-default"
                />
              )}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {images.length > 1 && (
        <div className="pointer-events-none absolute bottom-4 left-1/2 z-30 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[12px] font-medium text-zinc-300 border border-white/10 backdrop-blur-md tabular-nums">
          <span>{index + 1}</span>
          <span className="text-zinc-600">/</span>
          <span>{images.length}</span>
        </div>
      )}
    </motion.div>
  );
}

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

  const haptic: Haptic = (type) => {
    try {
      trigger(type);
    } catch {}
  };

  useEffect(() => {
    setMounted(true);
    prefetchImages(images);
  }, [images]);

  useEffect(() => {
    if (selectedIndex === null || images.length <= 1) return;
    prefetchImage(images[Math.min(selectedIndex + 1, images.length - 1)]);
    prefetchImage(images[Math.max(selectedIndex - 1, 0)]);
  }, [selectedIndex, images]);

  const closeLightbox = () => {
    haptic("light");
    setSelectedIndex(null);
  };

  const chunks: string[][] = [];
  for (let i = 0; i < images.length; i += 3) {
    chunks.push(images.slice(i, i + 3));
  }

  if (chunks.length === 0) return null;

  return (
    <>
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedIndex !== null && (
              <Lightbox
                key="lightbox"
                images={images}
                alt={alt}
                index={selectedIndex}
                setIndex={setSelectedIndex}
                onClose={closeLightbox}
                haptic={haptic}
              />
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
                      onMouseEnter={() => prefetchImages(images)}
                      onTouchStart={() => prefetchImages(images)}
                      onClick={(e) => {
                        // Prevent navigation if inside a Link
                        e.preventDefault();
                        e.stopPropagation();
                        haptic("selection");
                        setSelectedIndex(globalIndex);
                      }}
                      className={cn(
                        "group/screen relative aspect-[9/19] w-full overflow-hidden rounded-[16cqi] shadow-md outline -outline-offset-1 outline-black/10 dark:outline-white/15 bg-zinc-950/60 cursor-pointer",
                        "transition-[scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98]"
                      )}
                    >
                      <Image
                        src={src}
                        alt={`${alt} screen ${globalIndex + 1}`}
                        fill
                        priority={priority && globalIndex === 0}
                        draggable={false}
                        sizes="(min-width: 768px) 260px, 30vw"
                        className={cn(
                          "object-cover select-none",
                          "transition-[scale] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
                          `${HOVER}:group-hover/screen:scale-[1.03]`,
                          "motion-reduce:transition-none motion-reduce:group-hover/screen:scale-100"
                        )}
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