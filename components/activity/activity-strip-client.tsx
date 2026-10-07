"use client";

import { useRef, useState, useLayoutEffect, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./activity-strip.css";

export type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const DEFAULT_TEXT = "A little progress, every day.";
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const EASE: [number,number,number,number] = [0.22, 1, 0.36, 1];

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
  const pad = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const cells: (Day | null)[] = [...Array<null>(pad).fill(null), ...days];
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  const total = days.reduce((s, d) => s + d.count, 0);

  const [locked, setLocked] = useState<string | null>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [cap, setCap] = useState<{ on: 0|1; text: [string,string] }>({
    on: 0,
    text: [DEFAULT_TEXT, ""],
  });
  const [tab, setTab] = useState(cells.length - 1);
  const [ringPos, setRingPos] = useState<{ left: number; top: number; width: number; height: number } | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to show most recent weeks on mount
  useLayoutEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
  }, []);

  // Update ring position when active cell changes
  useLayoutEffect(() => {
    if (activeIdx === null || !gridRef.current) return;
    const cell = gridRef.current.querySelector<HTMLElement>(`[data-i="${activeIdx}"]`);
    if (!cell) return;
    const gr = gridRef.current.getBoundingClientRect();
    const cr = cell.getBoundingClientRect();
    setRingPos({ left: cr.left - gr.left, top: cr.top - gr.top, width: cr.width, height: cr.height });
  }, [activeIdx]);

  const show = (text: string) =>
    setCap((c) => {
      const next = (1 - c.on) as 0|1;
      const t = [...c.text] as [string, string];
      t[next] = text;
      return { on: next, text: t };
    });

  const onEnter = (day: Day, idx: number) => {
    setActiveIdx(idx);
    if (!locked) show(describe(day));
  };

  const onLeave = () => {
    setActiveIdx(null);
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
          <div className="as-months" aria-hidden="true">
            {weeks.map((w, i) => {
              const first = w.find(d => d && d.date.endsWith("-01"));
              return (
                <div key={i} className={i < weeks.length - 26 ? "as-old" : undefined}>
                  {first && <span>{MONTHS[Number(first.date.slice(5, 7)) - 1]}</span>}
                </div>
              );
            })}
          </div>

          {/* Cell grid with animated hover ring */}
          <div className="as-grid" ref={gridRef} onKeyDown={onKeyDown}>
            <AnimatePresence initial={false}>
              {activeIdx !== null && ringPos && (
                <motion.span
                  className="as-hover-ring"
                  aria-hidden="true"
                  initial={false}
                  animate={{ left: ringPos.left, top: ringPos.top, width: ringPos.width, height: ringPos.height, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    left: { type: "spring", stiffness: 700, damping: 40 },
                    top: { type: "spring", stiffness: 700, damping: 40 },
                    width: { duration: 0.08 },
                    height: { duration: 0.08 },
                    opacity: { duration: 0.1 },
                  }}
                />
              )}
            </AnimatePresence>

            {weeks.map((w, wi) => (
              <div key={wi} className={`as-week${wi < weeks.length - 26 ? " as-old" : ""}`}>
                {Array.from({ length: 7 }, (_, r) => {
                  const day = w[r];
                  const i = wi * 7 + r;
                  if (!day) return <span key={r} className="as-void" />;
                  return (
                    <button
                      key={r}
                      type="button"
                      data-i={i}
                      className={`as-cell level-${day.level}`}
                      aria-pressed={locked === day.date}
                      aria-label={describe(day)}
                      tabIndex={i === tab ? 0 : -1}
                      onFocus={() => { setTab(i); onEnter(day, i); }}
                      onBlur={onLeave}
                      onMouseEnter={() => onEnter(day, i)}
                      onMouseLeave={onLeave}
                      onClick={() => onClick(day)}
                    />
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
