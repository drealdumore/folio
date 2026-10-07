import Image from "next/image";
import { cn } from "@/lib/utils";

export function MobileRow({
  images,
  alt,
  priority,
  className,
}: {
  images: string[];
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  // Chunk images into groups of at most 3 per row
  const chunks: string[][] = [];
  for (let i = 0; i < images.length; i += 3) {
    chunks.push(images.slice(i, i + 3));
  }

  if (chunks.length === 0) return null;

  return (
    <div className="flex w-full flex-col gap-4 md:gap-6">
      {chunks.map((chunk, chunkIndex) => (
        <div
          key={chunkIndex}
          className={cn(
            "w-full rounded-[8px] bg-[#141414] p-3 py-5 sm:p-6 sm:py-8 md:p-8 md:py-10 shadow-sm",
            className
          )}
        >
          <div className="mx-auto flex max-w-2xl items-center justify-center gap-3 sm:gap-4 md:gap-5">
            {chunk.map((src, index) => {
              const globalIndex = chunkIndex * 3 + index;
              return (
                <div
                  key={src + globalIndex}
                  className="min-w-0 flex-1 max-w-[240px] [container-type:inline-size]"
                >
                  <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[16cqi] shadow-md outline -outline-offset-1 outline-black/10 dark:outline-white/15 bg-zinc-950/60">
                    <Image
                      src={src}
                      alt={`${alt} screen ${globalIndex + 1}`}
                      fill
                      priority={priority && globalIndex === 0}
                      draggable={false}
                      sizes="(min-width: 768px) 260px, 30vw"
                      className="object-cover select-none transition-transform duration-500 hover:scale-[1.03]"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export function WideImage({
  src,
  alt,
  priority,
  className,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-4 md:p-8 shadow-sm",
        className
      )}
    >
      <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-xl outline -outline-offset-1 outline-black/10 dark:outline-white/15">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          priority={priority}
          draggable={false}
          sizes="(min-width: 1600px) 768px, (min-width: 768px) 55vw, 92vw"
          className="h-auto w-full object-cover select-none"
        />
      </div>
    </div>
  );
}

export default MobileRow;