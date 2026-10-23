import { FEATURED_GROUPS, MOBILE_APPS } from "@/content/site";

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
  // Also warm the original so the source is cached as a fallback.
  prefetchImage(src);
}

const GRID_WIDTHS = [384, 640, 1080, 1200];

/**
 * Prefetch an array of image URLs. Local paths (served through Next.js image
 * optimization) are warmed as their optimized variants so the browser doesn't
 * have to fetch them cold on first render.
 */
export function prefetchImages(srcs: (string | undefined | null)[]) {
  if (!Array.isArray(srcs) || srcs.length === 0) return;

  const run = () => {
    srcs.forEach((src) => {
      if (!src) return;
      if (src.startsWith("/") && !src.startsWith("/_next/")) {
        prefetchNextImage(src, GRID_WIDTHS);
      } else {
        prefetchImage(src);
      }
    });
  };

  // Use requestIdleCallback if available to avoid blocking main thread
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    window.requestIdleCallback(run);
  } else {
    run();
  }
}

/**
 * Prefetch project detail first image (heroImage) and gallery images
 * before the user navigates to the project detail page.
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

  const heroWidths = [640, 1080, 1200];

  // Hero image (project detail first image)
  if (project.heroImage) {
    prefetchNextImage(project.heroImage, heroWidths);
  }

  // Gallery images
  if (project.gallery && Array.isArray(project.gallery)) {
    project.gallery.forEach((g) => {
      if (g.src) prefetchNextImage(g.src, heroWidths);
    });
  }
}

/**
 * Preload every app image (hero + gallery) from the case studies, plus the
 * featured projects shown on the home page, so all imagery is already in the
 * browser cache when users browse around. Warms the optimized Next.js URLs that
 * the <Image> components actually request, not just the source files.
 */
export function preloadAppImages() {
  if (typeof window === "undefined") return;

  // Widths chosen to cover the slots these images render into:
  // - featured `image`           -> ~260px  (384, 640)
  // - featured `mobileScreens`   -> 30vw-88vw / detail 1200 (384, 640, 1080, 1200)
  // - case study hero + gallery  -> full width (640, 1080, 1200)
  const heroWidths = [640, 1080, 1200];
  const thumbWidths = [384, 640];
  const screenWidths = [384, 640, 1080, 1200];

  MOBILE_APPS.forEach((app) => {
    if (app.heroImage) prefetchNextImage(app.heroImage, heroWidths);
    app.gallery?.forEach((g) => {
      if (g.src) prefetchNextImage(g.src, heroWidths);
    });
  });

  FEATURED_GROUPS.forEach((group) => {
    group.projects.forEach((project) => {
      if (project.image) prefetchNextImage(project.image, thumbWidths);
      project.mobileScreens?.forEach((src) => {
        if (src) prefetchNextImage(src, screenWidths);
      });
    });
  });
}
