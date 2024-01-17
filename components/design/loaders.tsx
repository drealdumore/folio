export const ButtonLoaderWithBg = () => {
  return (
    <div className="flex items-center justify-center rounded-full bg-white/5 transition-opacity duration-300 h-6 w-6">
      <svg
        className="h-6 w-6 animate-spin text-white"
        fill="none"
        viewBox="-4 -4 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="stroke-current opacity-25"
          cx="12"
          cy="12"
          r="10"
          strokeWidth="4"
        ></circle>
        <path
          className="fill-current opacity-75"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};

export const ButtonLoader = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6 animate-spin"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
    </svg>
  );
};

export const ButtonLoaderWithShape = () => {
  return (
    <div className="w-4 h-4 border-2 border-white rounded-full animate-spin relative ml-2">
      <div className="w-3 h-3 absolute bg-neutral-900 transition-colors group-hover:bg-zinc-800 z-10 top-1 left-1"></div>
    </div>
  );
};

export const SmallSpinner = ({ className }: { className?: string }) => {
  return (
    <>
      <div className="flex items-center h-full outline-none">
        <span className="sr-only">Loading</span>
        <svg
          className={`w-6 h-6 text-black stroke-current animate-spin ${className}`}
          viewBox="0 0 24 24"
        >
          <g
            strokeLinecap="round"
            strokeWidth="2"
            fill="red"
            strokeLinejoin="round"
          >
            <path d="M8.56 3.69l0-.01c-1.1.45-2.09 1.11-2.93 1.94"></path>
            <path d="M3.69 8.56l-.01 0c-.46 1.09-.69 2.25-.69 3.43"></path>
            <path d="M3.69 15.44l0 0c.45 1.09 1.11 2.08 1.95 2.92"></path>
            <path d="M8.56 20.31l0 0c1.09.45 2.25.68 3.43.68"></path>
            <path d="M15.44 20.31l-.01 0c1.09-.46 2.08-1.12 2.92-1.95"></path>
            <path d="M20.31 15.44l-.01 0c.45-1.1.68-2.26.69-3.44"></path>
            <path d="M20.31 8.56l0 0c-.46-1.1-1.12-2.09-1.95-2.92"></path>
            <path d="M15.44 3.69l-.01-.01c-1.1-.46-2.26-.69-3.44-.69"></path>
          </g>
        </svg>
      </div>
    </>
  );
};

export const PageSpinner = () => {
  return (
    <>
      <div>
        <div className="relative isolate  [--spinner-thumb-animation-duration:1s] [--spinner-stroke:1] [--spinner-dots-stroke-dasharray:0_3.315] size-20">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              className="motion-safe:origin-[--spinner-origin] motion-safe:will-change-transform motion-safe:animate-spin motion-safe:[animation-direction:reverse] motion-safe:[animation-duration:12s]"
              fill="currentColor"
              opacity="0.5"
            >
              <circle cx="8" cy="2.75" r="0.5"></circle>
              <circle cx="8" cy="13.25" r="0.5"></circle>
              <circle cx="3.01001" cy="6.35999" r="0.5"></circle>
              <circle cx="12.98" cy="6.35999" r="0.5"></circle>
              <circle cx="3.01001" cy="9.62" r="0.5"></circle>
              <circle cx="12.99" cy="9.62" r="0.5"></circle>
              <circle cx="4.91998" cy="3.75" r="0.5"></circle>
              <circle cx="11.08" cy="3.75" r="0.5"></circle>
              <circle cx="4.91998" cy="12.25" r="0.5"></circle>
              <circle cx="11.08" cy="12.25" r="0.5"></circle>
            </g>
            <circle
              className="motion-safe:origin-[--spinner-origin] motion-safe:will-change-transform motion-safe:animate-spin motion-safe:[animation-duration:--spinner-thumb-animation-duration]"
              cx="8"
              cy="8"
              r="5.25"
              pathLength="360"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke-dashoffset="100"
              stroke-dasharray="90 270"
              strokeWidth="var(--spinner-stroke,1.5)"
            ></circle>
          </svg>
        </div>
      </div>
    </>
  );
};
