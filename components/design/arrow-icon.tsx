import { cn } from "@/lib/utils";

type ArrowIconProps = {
  className?: string;
  size?: number;
  strokeWidth?: number;
};

const VIEW = 24;

export function ArrowIcon({
  className,
  size = 16,
  strokeWidth = 2,
}: ArrowIconProps) {
  return (
    <div
      className={cn(
        "group flex cursor-pointer items-center justify-center",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <div
        className="relative grid cursor-pointer items-center justify-center"
        style={{ transform: `scale(${size / VIEW})` }}
      >
        <svg
          width={VIEW}
          height={VIEW}
          viewBox={`0 0 ${VIEW} ${VIEW}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="transition-transform duration-500 ease-out group-hover:translate-x-0.5"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
        <div className="absolute right-[9px] h-[2px] w-3 origin-right scale-x-0 rounded-[1px] bg-current transition-all duration-300 ease-out group-hover:right-[7px] group-hover:scale-x-100" />
      </div>
    </div>
  );
}

export default ArrowIcon;
