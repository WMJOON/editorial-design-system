"use client";

import { useRef, type MouseEventHandler, type PointerEventHandler, type TouchEventHandler } from "react";

/**
 * Normalises a press across mouse, keyboard, Pointer Events, and older iOS
 * touch events. Pointer/touch presses are handled directly because Safari can
 * omit the synthetic click after history restoration. The timestamp prevents
 * the follow-up compatibility events from invoking the action twice.
 */
export function useEditorialPress(onPress: () => void): {
  onPointerUp: PointerEventHandler<HTMLButtonElement>;
  onTouchEnd: TouchEventHandler<HTMLButtonElement>;
  onClick: MouseEventHandler<HTMLButtonElement>;
} {
  const lastDirectPress = useRef(0);

  function directPress() {
    const now = Date.now();
    if (now - lastDirectPress.current < 700) return;
    lastDirectPress.current = now;
    onPress();
  }

  return {
    onPointerUp(event) {
      if (event.pointerType === "touch" || event.pointerType === "pen") directPress();
    },
    onTouchEnd() {
      directPress();
    },
    onClick() {
      if (Date.now() - lastDirectPress.current < 700) return;
      onPress();
    },
  };
}
