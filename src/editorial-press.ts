"use client";

import { useRef, type ButtonHTMLAttributes, type MouseEventHandler } from "react";

/**
 * Touch fallback scoped to one button. Native click retains form behavior,
 * caller cancellation and keyboard semantics. A new gesture resets deduplication.
 */
export function useEditorialPress(onPress?: MouseEventHandler<HTMLButtonElement>, props: ButtonHTMLAttributes<HTMLButtonElement> = {}) {
  const gesture = useRef<{ id: number; x: number; y: number; cancelled: boolean } | null>(null);
  const compatibilityClick = useRef(false);
  return {
    onTouchStart(event: React.TouchEvent<HTMLButtonElement>) {
      props.onTouchStart?.(event);
      compatibilityClick.current = false;
      const touch = event.touches[0];
      gesture.current = !props.disabled && !event.defaultPrevented && event.touches.length === 1
        ? { id: touch.identifier, x: touch.clientX, y: touch.clientY, cancelled: false } : null;
    },
    onTouchMove(event: React.TouchEvent<HTMLButtonElement>) {
      props.onTouchMove?.(event);
      const start = gesture.current;
      const touch = event.touches[0];
      if (start && (event.defaultPrevented || event.touches.length !== 1 || !touch || touch.identifier !== start.id || Math.hypot(touch.clientX - start.x, touch.clientY - start.y) > 10)) start.cancelled = true;
    },
    onTouchCancel(event: React.TouchEvent<HTMLButtonElement>) {
      gesture.current = null;
      props.onTouchCancel?.(event);
    },
    onTouchEnd(event: React.TouchEvent<HTMLButtonElement>) {
      props.onTouchEnd?.(event);
      const start = gesture.current;
      gesture.current = null;
      const touch = event.changedTouches[0];
      if (props.disabled || event.currentTarget.disabled || event.defaultPrevented || !event.cancelable || !start || start.cancelled || event.touches.length || !touch || touch.identifier !== start.id || Math.hypot(touch.clientX - start.x, touch.clientY - start.y) > 10) return;
      event.preventDefault();
      compatibilityClick.current = true;
      event.currentTarget.click();
    },
    onPointerDown(event: React.PointerEvent<HTMLButtonElement>) {
      if (event.pointerType !== "touch") compatibilityClick.current = false;
      props.onPointerDown?.(event);
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
