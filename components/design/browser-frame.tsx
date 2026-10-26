import { cn } from "@/lib/utils";

type BrowserFrameProps = {
  url?: string;
  label?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

const getHost = (url?: string) => {
  if (!url) return undefined;

  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
};

export function BrowserFrame({
  url,
  label,
  children,
  className,
  contentClassName,
}: BrowserFrameProps) {
  const address = label ?? getHost(url) ?? "Preview";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[14px] border border-zinc-800/80 bg-surface",
        className
      )}
    >
      <div className="flex h-9 items-center gap-3 border-b border-zinc-800/80 bg-zinc-900/60 px-3">
        <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-zinc-600" />
          <span className="size-2 rounded-full bg-zinc-700" />
          <span className="size-2 rounded-full bg-zinc-800" />
        </div>

        <div className="mx-auto flex min-w-0 max-w-[70%] items-center gap-1.5 rounded-md border border-zinc-800/80 bg-zinc-950/50 px-2.5 py-1">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-2.5 shrink-0 text-zinc-600"
            aria-hidden="true"
          >
            <rect x="5" y="10" width="14" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
          <span className="truncate text-[10.5px] leading-none text-zinc-500">
            {address}
          </span>
        </div>

        <span className="w-9 shrink-0" aria-hidden="true" />
      </div>

      <div className={cn("relative", contentClassName)}>{children}</div>
    </div>
  );
}
