import { MOBILE_APPS } from "@/content/projects";

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
 * Prefetch an array of image URLs.
 */
export function prefetchImages(srcs: (string | undefined | null)[]) {
  if (!Array.isArray(srcs) || srcs.length === 0) return;

  // Use requestIdleCallback if available to avoid blocking main thread
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    window.requestIdleCallback(() => {
      srcs.forEach((src) => {
        if (src) prefetchImage(src);
      });
    });
  } else {
    srcs.forEach((src) => {
      if (src) prefetchImage(src);
    });
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

  const imagesToPrefetch: string[] = [];

  // Hero image (project detail first image)
  if (project.heroImage) {
    imagesToPrefetch.push(project.heroImage);
  }

  // Gallery first few images or all gallery images
  if (project.gallery && Array.isArray(project.gallery)) {
    project.gallery.forEach((g) => {
      if (g.src) imagesToPrefetch.push(g.src);
    });
  }

  prefetchImages(imagesToPrefetch);
}
