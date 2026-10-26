import React from "react";

type SmartVideoProps = Omit<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  "children"
> & {
  webm?: string;
  mp4?: string;
};

export function SmartVideo({
  webm,
  mp4,
  muted = true,
  loop = true,
  autoPlay = true,
  playsInline = true,
  preload = "metadata",
  ...videoProps
}: SmartVideoProps) {
  return (
    <video
      {...videoProps}
      muted={muted}
      loop={loop}
      autoPlay={autoPlay}
      playsInline={playsInline}
      preload={preload}
    >
      {webm ? <source src={webm} type="video/webm" /> : null}
      {mp4 ? <source src={mp4} type="video/mp4" /> : null}
    </video>
  );
}
