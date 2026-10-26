"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type BaseProps = {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  blurDataURL?: string;
};

type FillProps = BaseProps & {
  fill: true;
  width?: never;
  height?: never;
};

type FixedProps = BaseProps & {
  fill?: false;
  width: number;
  height: number;
};

export type BlurUpImageProps = FillProps | FixedProps;

const UNDERLAY =
  "pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover blur-2xl transition-opacity duration-500 motion-reduce:transition-none";

export function BlurUpImage(props: BlurUpImageProps) {
  const {
    src,
    alt,
    className,
    wrapperClassName,
    sizes,
    quality,
    priority,
    blurDataURL,
  } = props;
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const hasBlur = Boolean(blurDataURL);

  useEffect(() => {
    if (imageRef.current?.complete) setLoaded(true);
  }, []);

  const imageClassName = cn(
    "transition-opacity duration-500 motion-reduce:transition-none",
    hasBlur ? "opacity-100" : loaded ? "opacity-100" : "opacity-0",
    className
  );

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>
      {!hasBlur && (
        <Image
          src={src}
          alt=""
          aria-hidden="true"
          fill
          sizes="32px"
          quality={30}
          draggable={false}
          className={cn(
            UNDERLAY,
            loaded ? "opacity-0" : "opacity-100"
          )}
        />
      )}

      {props.fill ? (
        <Image
          ref={imageRef}
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality}
          priority={priority}
          draggable={false}
          placeholder={hasBlur ? "blur" : "empty"}
          blurDataURL={blurDataURL}
          onLoad={() => setLoaded(true)}
          className={imageClassName}
        />
      ) : (
        <Image
          ref={imageRef}
          src={src}
          alt={alt}
          width={props.width}
          height={props.height}
          sizes={sizes}
          quality={quality}
          priority={priority}
          draggable={false}
          placeholder={hasBlur ? "blur" : "empty"}
          blurDataURL={blurDataURL}
          onLoad={() => setLoaded(true)}
          className={imageClassName}
        />
      )}
    </div>
  );
}
