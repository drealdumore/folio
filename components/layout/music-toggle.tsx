"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { MUSIC } from "@/content/site";
import { cn } from "@/lib/utils";

const BAR_COUNT = 4;
const VOLUME = 0.7;

// Triangle split down the middle so it shares the same two quad structure as
// the pause bars — that lets the play/pause icon morph instead of hard-swap.
const PLAY_SHAPE = [
  7.7, 5.8, 13, 8.9, 13, 15.1, 7.7, 18.2, 13, 8.9, 18.3, 12, 18.3, 12, 13, 15.1,
];
const PAUSE_SHAPE = [
  8.2, 6.8, 10.9, 6.8, 10.9, 17.2, 8.2, 17.2, 13.1, 6.8, 15.8, 6.8, 15.8, 17.2,
  13.1, 17.2,
];

const toPath = (shape: number[]) => {
  let d = "";
  for (let quad = 0; quad < shape.length; quad += 8) {
    d += `M${shape[quad]} ${shape[quad + 1]}`;
    for (let point = 2; point < 8; point += 2) {
      d += ` L${shape[quad + point]} ${shape[quad + point + 1]}`;
    }
    d += " Z";
  }
  return d;
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const morphShape = (from: number[], to: number[], t: number) =>
  toPath(from.map((value, i) => value + (to[i] - value) * clamp01(t)));

const ICON_PAINT = {
  fill: "currentColor",
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinejoin: "round",
  strokeLinecap: "round",
} as const;

function PlayPauseIcon({ playing }: { playing: boolean }) {
  // 0 = play triangle, 1 = pause bars. Animating this single scalar from
  // wherever it currently sits makes interrupted toggles continue smoothly.
  const progress = useMotionValue(playing ? 1 : 0);
  const d = useTransform(progress, (t) =>
    morphShape(PLAY_SHAPE, PAUSE_SHAPE, t)
  );

  useEffect(() => {
    const controls = animate(progress, playing ? 1 : 0, {
      // A gentle ease-in-out reads smoother than a spring here: no overshoot
      // to clamp, so the path never stalls or snaps at the end.
      duration: 0.42,
      ease: [0.65, 0, 0.35, 1],
    });
    return () => controls.stop();
  }, [playing, progress]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="14"
      height="14"
      aria-hidden="true"
    >
      <motion.path d={d} {...ICON_PAINT} />
    </svg>
  );
}

// Roughly log-spaced frequency bands (bass -> highs) so every bar actually
// moves instead of only the first (bass) one.
const BAR_BANDS = [
  [1, 5], // kick / sub-bass
  [5, 12], // bass
  [12, 30], // mids
  [30, 110], // highs
] as const;

// How far each bar rides the detected beat (bass kick), left to right.
const BEAT_WEIGHTS = [1, 0.6, 0.42, 0.28] as const;

const HEIGHT = 41;
const BARS_WIDTH = 52;
const TITLE_WIDTH_DESKTOP = 244;
const TITLE_WIDTH_MOBILE = 196; 
const VOLUME_WIDTH = 50;
// const EXPANDED_WIDTH = TITLE_WIDTH + BARS_WIDTH + VOLUME_WIDTH;

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
              <div className="flex h-full w-[3.5px] items-center justify-center rounded-full bg-zinc-500/40">
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
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const rafRef = useRef<number>(0);
  const bassAvg = useRef(0);
  const beat = useRef(0);
  const dataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [canHover, setCanHover] = useState(true);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(() => {
    if (typeof window === "undefined") return 0;
    try {
      const saved = window.localStorage.getItem("folio:music-index");
      if (saved !== null) {
        const n = Number(saved);
        if (!Number.isNaN(n) && n >= 0 && n < MUSIC.tracks.length) return n;
      }
    } catch {}
    return 0;
  });
  const [heights, setHeights] = useState<number[]>(() =>
    Array(BAR_COUNT).fill(0.1)
  );

  const track = MUSIC.tracks[index];
  const expanded = canHover ? hovered : open;
const titleWidth = canHover ? TITLE_WIDTH_DESKTOP : TITLE_WIDTH_MOBILE;
const expandedWidth = titleWidth + BARS_WIDTH + VOLUME_WIDTH;

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem("folio:music-index", String(index));
    } catch {}
  }, [index]);

  /**
   * Drives the bars from the real audio signal when the Web Audio API is
   * available, and falls back to a gentle random walk otherwise.
   */
  useEffect(() => {
    if (!isPlaying) {
      cancelAnimationFrame(rafRef.current);
      bassAvg.current = 0;
      beat.current = 0;
      setHeights(Array(BAR_COUNT).fill(0.1));
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    if (!analyserRef.current) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (Ctor) {
        try {
          const ctx = new Ctor();
          const source = ctx.createMediaElementSource(audio);
          const analyser = ctx.createAnalyser();
          analyser.fftSize = 256;
          analyser.smoothingTimeConstant = 0.55;
          analyser.minDecibels = -85;
          analyser.maxDecibels = -15;
          source.connect(analyser);
          analyser.connect(ctx.destination);
          audioCtxRef.current = ctx;
          analyserRef.current = analyser;
          dataRef.current = new Uint8Array(analyser.frequencyBinCount) as Uint8Array<ArrayBuffer>;
          void ctx.resume();
        } catch {}
      }
    }

    const tick = () => {
      const analyser = analyserRef.current;
      const bins = dataRef.current;
      if (analyser && bins) {
        analyser.getByteFrequencyData(bins);

        // Beat detection: watch the bass energy vs its rolling average.
        let bass = 0;
        for (let j = 0; j < 7; j += 1) bass += bins[j] ?? 0;
        bass = bass / 7 / 255;
        bassAvg.current = bassAvg.current * 0.92 + bass * 0.08;
        const spike = bass - bassAvg.current;
        if (bass > 0.22 && spike > 0.05) {
          beat.current = Math.min(1, beat.current + spike * 3.5);
        }
        beat.current *= 0.86;

        const next = BAR_BANDS.map(([from, to], i) => {
          let sum = 0;
          let count = 0;
          for (let j = from; j < to && j < bins.length; j += 1) {
            sum += bins[j] ?? 0;
            count += 1;
          }
          const value = count ? sum / count / 255 : 0;
          const punch = value * 1.3 + beat.current * BEAT_WEIGHTS[i];
          return Math.min(1, Math.max(0.08, punch));
        });
        setHeights(next);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying]);

  useEffect(() => {
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      void audioCtxRef.current.resume();
    }
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : VOLUME;
    }
  }, [muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const play = () => {
      playIntent.current = true;
      if (audioCtxRef.current?.state === "suspended") {
        void audioCtxRef.current.resume();
      }
      void audio.play().catch(() => {
        playIntent.current = false;
        setIsPlaying(false);
      });
    };
    play();
  }, [index]);

  // Preload every track fully (one at a time) so switching never skips.
  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;

    const preloadTrack = (i: number) => {
      if (cancelled || i >= MUSIC.tracks.length) return;
      const track = MUSIC.tracks[i];
      if (!track) return;
      const audio = new Audio();

      const done = () => {
        audio.removeEventListener("canplaythrough", done);
        audio.removeEventListener("error", done);
        audio.removeAttribute("src");
        audio.load();
        if (!cancelled) preloadTrack(i + 1);
      };
      audio.addEventListener("canplaythrough", done, { once: true });
      audio.addEventListener("error", done, { once: true });
      audio.preload = "auto";
      audio.src = track.src;
      audio.load();
    };

    const start = () => preloadTrack(0);
    if (document.readyState === "complete") {
      const schedule =
        typeof window.requestIdleCallback === "function"
          ? (cb: () => void) => window.requestIdleCallback(() => cb())
          : (cb: () => void) => window.setTimeout(cb, 200);
      const idle = schedule(start);
      return () => {
        window.clearTimeout(idle);
        cancelled = true;
      };
    }
    window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      cancelled = true;
    };
  }, []);

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
      cancelAnimationFrame(rafRef.current);
      void audioCtxRef.current?.close().catch(() => {});
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

  const toggle = useCallback(() => {
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
  }, []);

  // Lets the command palette (and anything else) drive playback.
  useEffect(() => {
    const onToggle = () => toggle();
    window.addEventListener("folio:toggle-music", onToggle);
    return () => window.removeEventListener("folio:toggle-music", onToggle);
  }, [toggle]);

  if (!track) return null;

  const next = () => setIndex((i) => (i + 1) % MUSIC.tracks.length);
  const prev = () =>
    setIndex((i) => (i - 1 + MUSIC.tracks.length) % MUSIC.tracks.length);

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
      role="group"
      aria-label={MUSIC.label}
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
  animate={{ width: expanded ? expandedWidth : BARS_WIDTH }}
  transition={{ type: "spring", bounce: 0.16, duration: 0.6 }}
  style={{ height: HEIGHT, borderRadius: 9999 }}
  className="glass-nav relative flex items-center overflow-hidden border border-white/10"
>
  <motion.div
    initial={false}
    animate={{ width: expanded ? titleWidth : 0, opacity: expanded ? 1 : 0, paddingLeft: expanded ? "12px" : 0 }}
    transition={{ type: "spring", bounce: 0.16, duration: 0.6 }}
    className={cn(
      "flex h-full shrink-0 items-center overflow-hidden pl-3",
      canHover ? "gap-1.5" : "gap-0.5"
    )}
  >
          <motion.button
            type="button"
            onClick={() => { toggle(); armClose(); }}
            aria-label={isPlaying ? "Pause the music" : "Play the music"}
            whileTap={{ scale: 0.9 }}
            className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/10 text-zinc-100 transition-colors hover:bg-white/20"
          >
            <PlayPauseIcon playing={isPlaying} />
          </motion.button>
          <button
            type="button"
            onClick={() => { prev(); armClose(); }}
            aria-label="Previous track"
            className="group/prev flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="currentColor" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M8.06492 12.6258C8.31931 13.8374 9.67295 14.7077 12.3802 16.4481C15.3247 18.3411 16.797 19.2876 17.9895 18.9229C18.3934 18.7994 18.7654 18.5823 19.0777 18.2876C20 17.4178 20 15.6118 20 12C20 8.38816 20 6.58224 19.0777 5.71235C18.7654 5.41773 18.3934 5.20057 17.9895 5.07707C16.797 4.71243 15.3247 5.6589 12.3802 7.55186C9.67295 9.29233 8.31931 10.1626 8.06492 11.3742C7.97836 11.7865 7.97836 12.2135 8.06492 12.6258Z" strokeLinejoin="round"></path>
              <path d="M4 4L4 20" strokeLinecap="round"></path>
            </svg>
          </button>
          <span
  className={cn(
    "min-w-0 flex-1 truncate text-center font-medium text-zinc-100",
    canHover ? "text-[13px]" : "px-0.5 text-[12px]"
  )}
>
  {track.title}
</span>
          <button
            type="button"
            onClick={() => { next(); armClose(); }}
            aria-label="Next track"
            className="group/skip flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="currentColor" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M15.9351 12.6258C15.6807 13.8374 14.327 14.7077 11.6198 16.4481C8.67528 18.3411 7.20303 19.2876 6.01052 18.9229C5.60662 18.7994 5.23463 18.5823 4.92227 18.2876C4 17.4178 4 15.6118 4 12C4 8.38816 4 6.58224 4.92227 5.71235C5.23463 5.41773 5.60662 5.20057 6.01052 5.07707C7.20304 4.71243 8.67528 5.6589 11.6198 7.55186C14.327 9.29233 15.6807 10.1626 15.9351 11.3742C16.0216 11.7865 16.0216 12.2135 15.9351 12.6258Z" strokeLinejoin="round"></path>
              <path d="M20 5V19" strokeLinecap="round"></path>
            </svg>
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
        preload="auto"
        onPlay={() => {
          if (audioCtxRef.current?.state === "suspended") {
            void audioCtxRef.current.resume();
          }
          setIsPlaying(true);
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={next}
      />
    </div>
  );
}
