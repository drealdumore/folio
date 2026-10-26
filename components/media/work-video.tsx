"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { SmartVideo } from "@/components/media/smart-video";

export type WorkVideoProps = {
  webm?: string;
  mp4?: string;
  poster?: string;
  blurDataURL?: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
  alt: string;
  className?: string;
};

export function WorkVideo({
  webm,
  mp4,
  poster,
  blurDataURL,
  width,
  height,
  aspectRatio,
  alt,
  className,
}: WorkVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setActive(true);
        observer.disconnect();
      },
      { rootMargin: "100% 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  if (!webm && !mp4) return null;

  const ratio =
    aspectRatio ??
    (width && height ? `${width} / ${height}` : "16 / 10");

  return (
    <div ref={containerRef} className={cn("bg-image-card p-4 md:p-12", className)}>
      <div
        className="relative mx-auto w-full max-w-3xl rounded-sm after:pointer-events-none after:absolute after:inset-0 after:rounded-sm after:outline after:-outline-offset-1 after:outline-black/5 dark:after:outline-white/15"
        style={{ aspectRatio: ratio }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-sm">
          {blurDataURL ? (
            <Image
              src={blurDataURL}
              alt=""
              aria-hidden="true"
              fill
              sizes="32px"
              unoptimized
              draggable={false}
              className={cn(
                "pointer-events-none scale-110 object-cover blur-2xl transition-opacity duration-500 motion-reduce:transition-none",
                ready ? "opacity-0" : "opacity-100"
              )}
            />
          ) : poster ? (
            <Image
              src={poster}
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 768px) 92vw, 768px"
              draggable={false}
              className={cn(
                "pointer-events-none object-cover transition-opacity duration-500 motion-reduce:transition-none",
                ready ? "opacity-0" : "opacity-100"
              )}
            />
          ) : (
            <div
              className={cn(
                "absolute inset-0 bg-zinc-900 transition-opacity duration-500 motion-reduce:transition-none",
                ready ? "opacity-0" : "opacity-100"
              )}
            />
          )}

          {active && (webm || mp4) ? (
            <SmartVideo
              webm={webm}
              mp4={mp4}
              poster={poster}
              preload="auto"
              aria-label={alt}
              controlsList="nodownload"
              disablePictureInPicture
              onContextMenu={(event) => event.preventDefault()}
              onCanPlay={() => setReady(true)}
              onLoadedData={() => setReady(true)}
              className={cn(
                "absolute inset-0 h-full w-full rounded-sm object-cover transition-opacity duration-300 motion-reduce:transition-none",
                ready ? "opacity-100" : "opacity-0"
              )}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
