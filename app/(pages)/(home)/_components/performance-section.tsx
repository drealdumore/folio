"use client";

import { useEffect, useState } from "react";
import ActivityStripClient, { type Day } from "@/components/activity/activity-strip-client";
import { SectionHeading } from "../../../../components/design/SectionHeading";

// Seeded hash — same output every render for a given date string
function seedHash(seed: string): number {
  let h = 0x811c9dc5;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 0x1000193);
  h ^= h >>> 16;
  h = Math.imul(h, 0x7feb352d);
  return ((h ^ (h >>> 15)) >>> 0) / 0x100000000;
}

// Build a year of deterministic fallback data — runs synchronously, zero delay
function buildFallback(): Day[] {
  const days: Day[] = [];
  const today = new Date();
  const start = new Date(today);
  start.setFullYear(start.getFullYear() - 1);
  start.setDate(start.getDate() + 1);

  for (let i = 0; i < 365; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const date = d.toISOString().split("T")[0];
    const t = seedHash(`drealdumore:${date}`);

    let count = 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (t > 0.45) { count = 1 + Math.floor((t - 0.45) / 0.32 * 4); level = 1; }
    if (t > 0.77) { count = 5 + Math.floor((t - 0.77) / 0.11 * 5); level = 2; }
    if (t > 0.88) { count = 10 + Math.floor((t - 0.88) / 0.08 * 8); level = 3; }
    if (t > 0.96) { count = 18 + Math.floor((t - 0.96) / 0.04 * 10); level = 4; }

    days.push({ date, count, level });
  }
  return days;
}

async function fetchGitHub(username: string): Promise<Day[] | null> {
  try {
    const res = await fetch(`/api/github-contributions?username=${username}`);
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data.contributions) ? data.contributions : null;
  } catch {
    return null;
  }
}

// Build once at module level so the initial render is instant
const FALLBACK_DAYS = buildFallback();

export default function PerformanceSection() {
  const [days, setDays] = useState<Day[]>(FALLBACK_DAYS);

  useEffect(() => {
    // Fetch real data in the background; swap when ready
    fetchGitHub("drealdumore").then((real) => {
      if (real && real.length > 0) setDays(real);
    });
  }, []);

  return (
    <section className="flex flex-col gap-4">
      <SectionHeading title="Performance" />
      
      <ActivityStripClient days={days} inline />
    </section>
  );
}
