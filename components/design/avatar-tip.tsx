interface AvatarTipProps {
  show: boolean;
  label?: string;
}

export const AvatarTip = ({
  show,
  label = "Press down avatar",
}: AvatarTipProps) => {
  return (
    <div
      className={`avatar-tip-anchor ${show ? "is-visible" : ""}`}
      role="note"
      aria-live="polite"
      aria-hidden={!show}
    >
      <div className="avatar-tip-stem" aria-hidden="true">
        <span className="avatar-tip-dot" />
        <span className="avatar-tip-line" />
      </div>
      <div className="avatar-tip-bubble">
        <span className="avatar-tip-shimmer" aria-hidden="true" />
        <svg
          className="size-4 shrink-0"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <g id="IconPointer">
            <path
              id="Vector"
              d="M7.48519 6.08287H10.7579C12.3645 6.08287 13.667 7.39125 13.667 9.00525V9.42838C13.667 12.3218 11.3321 14.6673 8.45186 14.6673C6.51563 14.6673 4.73875 13.5896 3.83694 11.8684L1.66699 7.72665L2.21289 7.04118C2.71472 6.41104 3.63006 6.30886 4.25735 6.81298L4.93972 7.36138V2.61252C4.93972 1.9064 5.50954 1.33398 6.21245 1.33398C6.91533 1.33398 7.48519 1.9064 7.48519 2.61252V6.08287Z"
              fill="currentColor"
            />
          </g>
        </svg>
        <span className="avatar-tip-label">{label}</span>
      </div>
    </div>
  );
};
