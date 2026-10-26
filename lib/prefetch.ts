import { MOBILE_APPS } from "@/content/site";

const prefetchedCache = new Set<string>();

/**
 * Prefetch an image URL into browser cache and memory.
 */
export function prefetchImage(src: string | undefined | null) {
  if (!src || typeof window === "undefined") return;
  if (prefetchedCache.has(src)) return;

  prefetchedCache.add(src);

  try {
    const img = new window.Image();
    img.src = src;
    if ("decode" in img) {
      img.decode().catch(() => {
        // Ignore decode errors for non-critical prefetching
      });
    }

    // Also add link prefetch for browser network optimization
    if (document && document.head) {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    }
  } catch (err) {
    // Fail gracefully
    console.debug("Prefetch failed for image:", src, err);
  }
}

/**
 * Build the optimized URL Next.js serves for an image at a given width, so we
 * can warm the exact response the <Image> components will request.
 */
function nextImageUrl(src: string, width: number, quality = 75) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}

/**
 * Prefetch a Next.js <Image> by warming its optimized URL variants. The plain
 * `prefetchImage` only warms the source file, which the browser never requests
 * when optimization is enabled — this covers the real network responses.
 */
export function prefetchNextImage(src: string | undefined | null, widths: number[]) {
  if (!src || typeof window === "undefined") return;

  for (const width of widths) {
    prefetchImage(nextImageUrl(src, width));
  }
}

const NEXT_IMAGE_WIDTHS = [
  16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048,
  3840,
];

/**
 * Pick the width Next.js will request for a CSS slot at the current DPR.
 * Prefetching the wrong width leaves the real request cold.
 */
function nextWidthFor(cssWidth: number) {
  const target = cssWidth * (window.devicePixelRatio || 1);
  return (
    NEXT_IMAGE_WIDTHS.find((width) => width >= target) ??
    NEXT_IMAGE_WIDTHS[NEXT_IMAGE_WIDTHS.length - 1]
  );
}

function mobileRowWidth() {
  return nextWidthFor(window.innerWidth >= 768 ? 260 : window.innerWidth * 0.3);
}

function detailWideWidth() {
  return nextWidthFor(Math.min(720, window.innerWidth - 44));
}

function demoPhoneWidth() {
  return nextWidthFor(218);
}

/**
 * Prefetch the optimized variants for the mobile screen row.
 */
export function prefetchImages(srcs: (string | undefined | null)[]) {
  if (!Array.isArray(srcs) || srcs.length === 0) return;
  if (typeof window === "undefined") return;

  const run = () => {
    const width = mobileRowWidth();
    srcs.forEach((src) => {
      if (!src) return;
      if (src.startsWith("/") && !src.startsWith("/_next/")) {
        prefetchNextImage(src, [width]);
      } else {
        prefetchImage(src);
      }
    });
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(run);
  } else {
    run();
  }
}

/**
 * Prefetch the images the detail page needs immediately: its hero, the
 * mobile screens in the hero row, and the first demo. Prefetching every
 * gallery image here floods the image optimizer and makes the visible
 * images slower.
 */
export function prefetchProjectDetail(projectIdOrHref: string | undefined | null) {
  if (!projectIdOrHref || typeof window === "undefined") return;

  // Extract ID if href is provided (e.g. "/projects/melo" -> "melo")
  const id = projectIdOrHref
    .replace(/^\/?projects\//, "")
    .replace(/\/$/, "")
    .trim()
    .toLowerCase();

  const project = MOBILE_APPS.find(
    (p) => p.id.toLowerCase() === id || p.title.toLowerCase() === id || p.sub.toLowerCase() === id
  );

  if (!project) return;

  const isMobile = /react native|expo|reanimated/i.test(
    (project.technologies ?? []).join(" ")
  );
  const wideWidth = detailWideWidth();
  const phoneWidth = mobileRowWidth();
  const demoWidth = demoPhoneWidth();

  const heroScreens = (project.gallery ?? [])
    .filter((image) => image.src !== project.heroImage)
    .slice(0, 3);

  if (isMobile && heroScreens.length > 0) {
    heroScreens.forEach((image) => {
      prefetchNextImage(image.src, [phoneWidth]);
    });
  } else if (project.heroImage) {
    prefetchNextImage(project.heroImage, [isMobile ? phoneWidth : wideWidth]);
  }

  const firstDemo = project.demos?.[0];
  if (firstDemo) {
    const width = firstDemo.layout === "wide" ? wideWidth : demoWidth;
    firstDemo.screens.slice(0, 3).forEach((screen) => {
      prefetchNextImage(screen.src, [width]);
    });
  }
}
