"use client";

// One lifecycle subscription for all mounted controls. No global input interception.
const subscribers = new Set<() => void>();
function resetPage(event: PageTransitionEvent) {
  if (event.type === "pageshow" && !event.persisted) return;
  for (const reset of subscribers) reset();
}
export function subscribeEditorialPageReset(reset: () => void) {
  if (subscribers.size === 0) {
    window.addEventListener("pagehide", resetPage);
    window.addEventListener("pageshow", resetPage);
  }
  subscribers.add(reset);
  return () => {
    subscribers.delete(reset);
    if (subscribers.size === 0) {
      window.removeEventListener("pagehide", resetPage);
      window.removeEventListener("pageshow", resetPage);
    }
  };
}
