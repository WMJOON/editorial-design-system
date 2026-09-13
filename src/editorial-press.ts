"use client";

import { useEffect, useRef, type ButtonHTMLAttributes, type MouseEventHandler } from "react";
import { subscribeEditorialPageReset } from "./editorial-page-lifecycle.js";

/**
 * Pointer fallback scoped to one button. iOS Safari exposes pointer events more
 * consistently than React's delegated touchend path. Native click remains the
 * action interface so form, caller cancellation and keyboard semantics survive.
 */
export function useEditorialPress(onPress?: MouseEventHandler<HTMLButtonElement>, props: ButtonHTMLAttributes<HTMLButtonElement> = {}) {
  const gesture = useRef<{ id: number; x: number; y: number; cancelled: boolean } | null>(null);
  const compatibilityClick = useRef(false);
  useEffect(() => subscribeEditorialPageReset(() => {
    gesture.current = null;
    compatibilityClick.current = false;
  }), []);
  return {
    onPointerDown(event: React.PointerEvent<HTMLButtonElement>) {
      compatibilityClick.current = false;
      props.onPointerDown?.(event);
      if (event.pointerType !== "touch" || !event.isPrimary || props.disabled || event.currentTarget.disabled || event.defaultPrevented) {
        gesture.current = null;
        return;
      }
      // Cancelling pointerdown suppresses the later compatibility mouse event.
      // Touch-action still owns native pan/zoom, so a move can cancel activation
      // without leaving a delayed click to hit reflowed content underneath.
      event.preventDefault();
      gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, cancelled: false };
    },
    onPointerMove(event: React.PointerEvent<HTMLButtonElement>) {
      const start = gesture.current;
      if (start && (event.pointerId !== start.id || !event.isPrimary || Math.hypot(event.clientX - start.x, event.clientY - start.y) > 10)) start.cancelled = true;
      props.onPointerMove?.(event);
      if (event.defaultPrevented && start) start.cancelled = true;
    },
    onPointerCancel(event: React.PointerEvent<HTMLButtonElement>) {
      gesture.current = null;
      compatibilityClick.current = false;
      props.onPointerCancel?.(event);
    },
    onPointerUp(event: React.PointerEvent<HTMLButtonElement>) {
      props.onPointerUp?.(event);
      const start = gesture.current;
      gesture.current = null;
      if (props.disabled || event.currentTarget.disabled || event.defaultPrevented || event.pointerType !== "touch" || !event.isPrimary || !start || start.cancelled || event.pointerId !== start.id || Math.hypot(event.clientX - start.x, event.clientY - start.y) > 10) return;
      event.preventDefault();
      compatibilityClick.current = true;
      event.currentTarget.click();
    },
    onClick(event: React.MouseEvent<HTMLButtonElement>) {
      if (props.disabled || event.currentTarget.disabled) return;
      if (compatibilityClick.current && event.nativeEvent.isTrusted && event.detail > 0) {
        compatibilityClick.current = false;
        event.preventDefault();
        return;
      }
      onPress?.(event);
    },
  };
}
