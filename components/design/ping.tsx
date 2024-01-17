export const SmallPing = ({ className }: { className?: string }) => (
  <div className={`flex items-center gap-1 shrink-0 size-[1.1em] ${className}`}>
    <div className="relative size-[.9em]">
      <div className="absolute inset-0 animate-ping rounded-full bg-emerald-700/30"></div>
      <div className="absolute inset-0 animate-pulse rounded-full bg-emerald-700/30"></div>
      <div className="absolute inset-[3px] rounded-full bg-emerald-700"></div>
    </div>
  </div>
);

export const BigPing = () => (
  <span className="relative flex h-3 w-3">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-700 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-auto w-7 bg-emerald-700"></span>
  </span>
);

export const RadarPing = ({ className }: { className?: string }) => (
  <div className={`flex items-center justify-center gap-1 ${className}`}>
    <div className="relative size-[.9em]">
      <div className="absolute w-[5.8rem]">
        <span className="absolute flex items-center justify-center">
          <span className="z-10 size-2.5 bg-emerald-700 rounded-full border  "></span>
          <span className="absolute size-2.5 bg-emerald-700/30 rounded-full animate-radar radar1"></span>
          <span className="absolute size-2.5 bg-emerald-700/30 rounded-full animate-radar radar2"></span>
        </span>
      </div>
    </div>
  </div>
);
