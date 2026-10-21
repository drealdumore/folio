"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MUSIC } from "@/content/site";
import { cn } from "@/lib/utils";

const BAR_COUNT = 5;
const VOLUME = 0.8;

const HEIGHT = 41;
const BARS_WIDTH = 52;
const TITLE_WIDTH = 190;
const VOLUME_WIDTH = 50;
const EXPANDED_WIDTH = TITLE_WIDTH + BARS_WIDTH + VOLUME_WIDTH;

const randomHeights = () =>
  Array.from({ length: BAR_COUNT }, () => Math.random() * 0.8 + 0.2);

function VolumeIcon({ muted, onToggle }: { muted: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={muted ? "Unmute" : "Mute"}
      aria-pressed={muted}
      className="group flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
    >
      <motion.div
        initial={false}
        className="relative flex size-5 items-center justify-center"
        animate={{ rotate: muted ? [0, -15, 5, -2, 0] : 0 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-5">
          <path
            fill="currentColor"
            d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
          />
          <g>
            <path
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
              d="M16 9a5 5 0 0 1 0 6"
            />
            <path
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
              d="M19.364 18.364a9 9 0 0 0 0-12.728"
            />
          </g>
        </svg>
        {/* Drawn-on slash that masks the waves */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rotate-[-40deg] overflow-hidden">
            <motion.div
              animate={{ scaleY: muted ? 1 : 0 }}
              transition={{
                ease: "easeInOut",
                duration: muted ? 0.125 : 0.05,
                delay: muted ? 0.15 : 0,
              }}
              style={{ transformOrigin: "top" }}
              className="h-[18px] w-fit rounded-full"
            >
              <div className="flex h-full w-[3.5px] items-center justify-center rounded-full bg-[#181818]">
                <div className="h-full w-[1.5px] rounded-full bg-current" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </button>
  );
}

const AUTO_CLOSE_MS = 4000;

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playIntent = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [canHover, setCanHover] = useState(true);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [heights, setHeights] = useState<number[]>(() =>
    Array(BAR_COUNT).fill(0.1)
  );

  const track = MUSIC.tracks[index];
  const expanded = canHover ? hovered : open;

  useEffect(() => {
    if (!isPlaying) {
      setHeights(Array(BAR_COUNT).fill(0.1));
      return;
    }
    setHeights(randomHeights());
    const id = setInterval(() => setHeights(randomHeights()), 100);
    return () => clearInterval(id);
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = muted ? 0 : VOLUME;
  }, [muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && playIntent.current) void audio.play().catch(() => {});
  }, [index]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    if (canHover || !open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [canHover, open]);

  if (!track) return null;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      playIntent.current = true;
      void audio.play().catch(() => {
        playIntent.current = false;
        setIsPlaying(false);
      });
    } else {
      playIntent.current = false;
      audio.pause();
    }
  };

  const next = () => setIndex((i) => (i + 1) % MUSIC.tracks.length);

  const armClose = () => {
    if (canHover) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), AUTO_CLOSE_MS);
  };

  const handleWaveform = () => {
    if (!canHover && !open) {
      setOpen(true);
      armClose();
      return;
    }
    toggle();
    armClose();
  };

  return (
    <div
      ref={containerRef}
      className="fixed left-3 bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] z-40"
    >
    {/* <div
      ref={containerRef}
      className="fixed left-3 bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] z-40 md:left-5 md:bottom-auto md:top-1/2 md:-translate-y-1/2"
    > */}
      {/* Hint — fades out once playback starts */}
      {/* <motion.span
        initial={false}
        animate={{ opacity: isPlaying ? 0 : 1, y: isPlaying ? -4 : 0 }}
        transition={{ duration: 0.25 }}
        className="mb-2 hidden text-center text-[10px] uppercase leading-tight tracking-wider text-zinc-500 select-none lg:block"
      >
        {MUSIC.label}
      </motion.span> */}

      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        initial={false}
        animate={{ width: expanded ? EXPANDED_WIDTH : BARS_WIDTH }}
        transition={{ type: "spring", bounce: 0.16, duration: 0.6 }}
        style={{ height: HEIGHT, borderRadius: 9999 }}
        className="relative flex items-center overflow-hidden border border-white/10 bg-[#141414]/40 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl backdrop-saturate-150"
      >
        {/* Reveal: play/pause + now playing (tap title to skip) */}
        <motion.div
          initial={false}
          animate={{ width: expanded ? TITLE_WIDTH : 0, opacity: expanded ? 1 : 0, paddingLeft: expanded ? "12px" : 0 }}
          transition={{ type: "spring", bounce: 0.16, duration: 0.6 }}
          className="flex h-full shrink-0 items-center gap-2.5 overflow-hidden pl-3"
        >
          <button
            type="button"
            onClick={() => {
              toggle();
              armClose();
            }}
            aria-label={isPlaying ? "Pause the music" : "Play the music"}
            className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-zinc-200 transition-colors hover:bg-white/5"
          >
            {isPlaying ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="translate-x-px" aria-hidden="true">
                <path d="M8 5.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 8 5.5z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              next();
              armClose();
            }}
            aria-label="Next track"
            className="group/skip min-w-0 flex-1 cursor-pointer text-left"
          >
            <span className="flex w-full items-center gap-1">
              <span className="block truncate text-[13px] font-medium text-zinc-100">
                {track.title}
              </span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="shrink-0 text-zinc-600 transition-colors group-hover/skip:text-zinc-300"
              >
                <path d="m9 6 6 6-6 6" />
              </svg>
            </span>
            <span className="block truncate text-[11px] text-zinc-500">
              {isPlaying ? "Playing" : "Paused"}
            </span>
          </button>
        </motion.div>

        {/* Waveform — always present, taps toggle playback */}
        <button
          type="button"
          onClick={handleWaveform}
          tabIndex={expanded ? -1 : 0}
          aria-hidden={expanded || undefined}
          aria-label={
            !expanded && !canHover
              ? "Open player"
              : isPlaying
                ? "Pause the music"
                : "Play the music"
          }
          className={cn(
            "flex h-full shrink-0 cursor-pointer items-center justify-center gap-1 transition-colors duration-300",
            expanded ? "border-l border-white/5" : ""
          )}
          style={{ width: BARS_WIDTH }}
        >
          {heights.map((height, index) => (
            <motion.span
              key={index}
              initial={{ height: 4 }}
              animate={{ height: Math.max(4, height * 14) }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className={cn(
                "w-[2px] rounded-full transition-colors duration-300",
                isPlaying ? "bg-emerald-400" : "bg-zinc-500"
              )}
            />
          ))}
        </button>

        {/* Reveal: volume */}
        <motion.div
          initial={false}
          animate={{ width: expanded ? VOLUME_WIDTH : 0, opacity: expanded ? 1 : 0 }}
          transition={{ type: "spring", bounce: 0.16, duration: 0.6 }}
          className="flex h-full shrink-0 items-center justify-center overflow-hidden"
        >
          <VolumeIcon
            muted={muted}
            onToggle={() => {
              setMuted((m) => !m);
              armClose();
            }}
          />
        </motion.div>
      </motion.div>

      <audio
        ref={audioRef}
        src={track.src}
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={next}
      />
    </div>
  );
}
