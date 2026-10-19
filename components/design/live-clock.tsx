"use client";

import { useEffect, useState } from "react";

const TIME_ZONE = "Africa/Lagos";
const LABEL = "Kaduna, Nigeria";

const formatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: TIME_ZONE,
});

interface LiveClockProps {
  className?: string;
  withLabel?: boolean;
}

export function LiveClock({ className = "", withLabel = true }: LiveClockProps) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));
    update();
    const id = window.setInterval(update, 15000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span
      className={className}
      title={`Local time in ${LABEL}`}
      suppressHydrationWarning
    >
      {/* {withLabel ? `${LABEL.split(",")[0]} · ` : ""} */}
      <span className="tabular-nums">{time ?? "--:--"}</span>
    </span>
  );
}
