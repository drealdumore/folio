let initialized = false;

type HighlightLike = {
  add: (range: Range) => void;
  size: number;
};

type HighlightConstructor = new () => HighlightLike;

type HighlightsRegistry = {
  set: (name: string, highlight: HighlightLike) => void;
  delete: (name: string) => void;
};

export function initSelectionDots() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  const HighlightClass = (globalThis as { Highlight?: HighlightConstructor })
    .Highlight;
  const highlights = (CSS as unknown as { highlights?: HighlightsRegistry })
    .highlights;

  if (!HighlightClass || !highlights) return;

  let frame = 0;

  const mirror = () => {
    frame = 0;
    const selection = document.getSelection();
    const highlight = new HighlightClass();

    for (let index = 0; index < (selection?.rangeCount ?? 0); index++) {
      const range = selection!.getRangeAt(index);
      if (!range.collapsed) highlight.add(range.cloneRange());
    }

    if (highlight.size > 0) {
      highlights.delete("selection-dots");
      highlights.set("selection-dots", highlight);
    } else {
      highlights.delete("selection-dots");
    }
  };

  document.addEventListener("selectionchange", () => {
    if (!frame) frame = requestAnimationFrame(mirror);
  });
}
