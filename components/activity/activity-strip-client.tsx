"use client";

import { useRef, useState, useLayoutEffect, type KeyboardEvent } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import "./activity-strip.css";

export type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const DEFAULT_TEXT = "A little progress, every day.";
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const EASE: [number,number,number,number] = [0.22, 1, 0.36, 1];

// Sweep timing, matched to the sleek reveal: each column lands a beat after the
// last, and the month labels resolve by blur only once the sweep has passed.
const COLUMN_STAGGER = 0.012;
const CELL_FADE = 0.2;
const LABEL_BLUR = 6;
const LABEL_REVEAL = { duration: 0.45, ease: EASE } as const;

function ordinal(n: number) {
  const v = n % 100;
  if (v > 10 && v < 14) return `${n}th`;
  return `${n}${(["th","st","nd","rd"] as const)[n % 10] ?? "th"}`;
}

function describe(day: Day) {
  const d = new Date(`${day.date}T00:00:00Z`);
  const f = (o: Intl.DateTimeFormatOptions) =>
    d.toLocaleDateString("en-US", { ...o, timeZone: "UTC" });
  const when = `${f({ weekday: "long" })}, ${f({ month: "long" })} ${ordinal(d.getUTCDate())} ${d.getUTCFullYear()}`;
  const what = day.count === 0
    ? "no activity"
    : `${day.count} ${day.count === 1 ? "contribution" : "contributions"}`;
  return `${when} — ${what}`;
}

interface Props {
  days: Day[];
  inline?: boolean;
}

export default function ActivityStripClient({ days, inline = false }: Props) {
  const reduceMotion = useReducedMotion();
  const pad = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const cells: (Day | null)[] = [...Array<null>(pad).fill(null), ...days];
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  const total = days.reduce((s, d) => s + d.count, 0);

  const [locked, setLocked] = useState<string | null>(null);
  const [cap, setCap] = useState<{ on: 0|1; text: [string,string] }>({
    on: 0,
    text: [DEFAULT_TEXT, ""],
  });
  const [tab, setTab] = useState(cells.length - 1);

  // The ring is driven by motion values written straight to the DOM, so moving
  // between days never triggers a React re-render — it tracks the pointer at
  // full speed instead of gliding behind it.
  const ringX = useMotionValue(0);
  const ringY = useMotionValue(0);
  const ringW = useMotionValue(0);
  const ringH = useMotionValue(0);
  const ringOpacity = useMotionValue(0);
  const ringAnimatedOpacity = useSpring(ringOpacity, {
    stiffness: 900,
    damping: 60,
  });

  const gridRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to show most recent weeks on mount
  useLayoutEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
  }, []);

  // Snap the ring onto a cell immediately (no spring, no re-render). Only the
  // position jumps; opacity eases in so the ring doesn't pop.
  const moveRing = (el: HTMLElement) => {
    const grid = gridRef.current;
    if (!grid) return;
    const gr = grid.getBoundingClientRect();
    const cr = el.getBoundingClientRect();
    ringX.set(cr.left - gr.left);
    ringY.set(cr.top - gr.top);
    ringW.set(cr.width);
    ringH.set(cr.height);
    ringOpacity.set(1);
  };

  const show = (text: string) =>
    setCap((c) => {
      const next = (1 - c.on) as 0|1;
      const t = [...c.text] as [string, string];
      t[next] = text;
      return { on: next, text: t };
    });

  const onEnter = (day: Day, el: HTMLElement) => {
    moveRing(el);
    if (!locked) show(describe(day));
  };

  const onLeave = () => {
    ringOpacity.set(0);
    if (locked) {
      const ld = days.find(d => d.date === locked);
      if (ld) show(describe(ld));
    } else {
      show(DEFAULT_TEXT);
    }
  };

  const onClick = (day: Day) => {
    if (locked === day.date) {
      setLocked(null);
      show(DEFAULT_TEXT);
    } else {
      setLocked(day.date);
      show(describe(day));
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const step = { ArrowUp: -1, ArrowDown: 1, ArrowLeft: -7, ArrowRight: 7 }[e.key];
    const from = Number((document.activeElement as HTMLElement)?.dataset.i);
    if (!step || Number.isNaN(from)) return;
    const el = gridRef.current?.querySelector<HTMLButtonElement>(`[data-i="${from + step}"]`);
    if (el) { e.preventDefault(); el.focus(); }
  };

  return (
    <div className={`as-card${inline ? " as-card--inline" : ""}`}>
      <div role="group" aria-label="GitHub activity, last year">
        <div className="as-scroll" ref={scrollRef}>

          {/* Month labels */}
          <motion.div
            className="as-months"
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0, filter: `blur(${LABEL_BLUR}px)` }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{
              ...LABEL_REVEAL,
              delay: reduceMotion ? 0 : (weeks.length - 1) * COLUMN_STAGGER + CELL_FADE,
            }}
          >
            {weeks.map((w, i) => {
              const first = w.find(d => d && d.date.endsWith("-01"));
              return (
                <div key={i} className={i < weeks.length - 26 ? "as-old" : undefined}>
                  {first && <span>{MONTHS[Number(first.date.slice(5, 7)) - 1]}</span>}
                </div>
              );
            })}
          </motion.div>

          {/* Cell grid with animated hover ring */}
          <div className="as-grid" ref={gridRef} onKeyDown={onKeyDown}>
            <motion.span
              className="as-hover-ring"
              aria-hidden="true"
              style={{
                x: ringX,
                y: ringY,
                width: ringW,
                height: ringH,
                opacity: ringAnimatedOpacity,
              }}
            />

            {weeks.map((w, wi) => (
              <div key={wi} className={`as-week${wi < weeks.length - 26 ? " as-old" : ""}`}>
                {Array.from({ length: 7 }, (_, r) => {
                  const day = w[r];
                  const i = wi * 7 + r;
                  if (!day) return <span key={r} className="as-void" />;
                  return (
                    <motion.span
                      key={r}
                      className="as-cell-wrap"
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: CELL_FADE,
                        ease: EASE,
                        delay: reduceMotion ? 0 : wi * COLUMN_STAGGER,
                      }}
                    >
                      <button
                        type="button"
                        data-i={i}
                        className={`as-cell level-${day.level}`}
                        aria-pressed={locked === day.date}
                        aria-label={describe(day)}
                        tabIndex={i === tab ? 0 : -1}
                        onFocus={(e) => { setTab(i); onEnter(day, e.currentTarget); }}
                        onBlur={onLeave}
                        onMouseEnter={(e) => onEnter(day, e.currentTarget)}
                        onMouseLeave={onLeave}
                        onClick={() => onClick(day)}
                      />
                    </motion.span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="as-foot">
        <p className="as-cap" aria-live="polite" style={{ margin: 0 }}>
          {([0, 1] as const).map((n) => (
            <span
              key={n}
              data-on={cap.on === n ? "" : undefined}
              aria-hidden={cap.on !== n}
            >
              {cap.text[n]}
            </span>
          ))}
        </p>
        <span className="as-total">{total.toLocaleString()} contributions this year</span>
      </div>
    </div>
  );
}
