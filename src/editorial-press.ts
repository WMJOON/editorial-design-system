"use client";

import { useCallback, useEffect, useRef, type ButtonHTMLAttributes, type MouseEventHandler, type Ref } from "react";
import { subscribeEditorialPageReset } from "./editorial-page-lifecycle.js";

type Gesture = { id: number; x: number; y: number; cancelled: boolean };
type PendingActivation = {
  cancelled: boolean;
  fallbackDispatched: boolean;
  nativeClickObserved: boolean;
  touchEnd: TouchEvent;
};

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") ref(value);
  else if (ref) ref.current = value;
}

/**
 * A native touch fallback scoped to one button. Mobile Safari can lose React's
 * delegated pointer/click delivery after restore or hydration. Listening on the
 * button itself preserves activation without a document-wide touch interceptor.
 * Native click remains authoritative when Safari emits it; the fallback click is
 * used only when that click is absent and its compatibility click is deduplicated
 * within the same gesture.
 */
export function useEditorialPress(
  onPress?: MouseEventHandler<HTMLButtonElement>,
  props: ButtonHTMLAttributes<HTMLButtonElement> = {},
  forwardedRef?: Ref<HTMLButtonElement>,
) {
  const gesture = useRef<Gesture | null>(null);
  const pendingActivation = useRef<PendingActivation | null>(null);
  const pointerCancelled = useRef(false);
  const cleanupNode = useRef<(() => void) | null>(null);
  const onPressRef = useRef(onPress);
  const propsRef = useRef(props);
  const forwardedRefRef = useRef(forwardedRef);
  onPressRef.current = onPress;
  propsRef.current = props;
  forwardedRefRef.current = forwardedRef;

  const reset = useCallback(() => {
    gesture.current = null;
    pendingActivation.current = null;
    pointerCancelled.current = false;
  }, []);

  useEffect(() => subscribeEditorialPageReset(reset), [reset]);
  useEffect(() => () => cleanupNode.current?.(), []);

  const ref = useCallback((node: HTMLButtonElement | null) => {
    cleanupNode.current?.();
    cleanupNode.current = null;
    assignRef(forwardedRefRef.current, node);
    if (!node) return;

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "touch" && event.isPrimary && !node.disabled && event.cancelable) event.preventDefault();
    };
    const onTouchStart = (event: TouchEvent) => {
      pendingActivation.current = null;
      const touch = event.touches[0];
      gesture.current = !node.disabled && !event.defaultPrevented && event.touches.length === 1 && touch
        ? { id: touch.identifier, x: touch.clientX, y: touch.clientY, cancelled: pointerCancelled.current }
        : null;
      pointerCancelled.current = false;
    };
    const onTouchMove = (event: TouchEvent) => {
      const start = gesture.current;
      const touch = event.touches[0];
      if (start && (event.defaultPrevented || event.touches.length !== 1 || !touch || touch.identifier !== start.id || Math.hypot(touch.clientX - start.x, touch.clientY - start.y) > 10)) start.cancelled = true;
    };
    const onTouchCancel = () => reset();
    const onTouchEnd = (event: TouchEvent) => {
      const start = gesture.current;
      gesture.current = null;
      const touch = event.changedTouches[0];
      if (node.disabled || !start || start.cancelled || event.touches.length || !touch || touch.identifier !== start.id || Math.hypot(touch.clientX - start.x, touch.clientY - start.y) > 10) {
        if (start && event.cancelable) event.preventDefault();
        pendingActivation.current = start
          ? { cancelled: true, fallbackDispatched: false, nativeClickObserved: false, touchEnd: event }
          : null;
        return;
      }
      const activation: PendingActivation = { cancelled: event.defaultPrevented, fallbackDispatched: false, nativeClickObserved: false, touchEnd: event };
      pendingActivation.current = activation;
      if (event.cancelable) event.preventDefault();
      queueMicrotask(() => {
        if (pendingActivation.current !== activation || activation.cancelled || activation.nativeClickObserved || node.disabled) {
          if (pendingActivation.current === activation) pendingActivation.current = null;
          return;
        }
        activation.fallbackDispatched = true;
        node.click();
      });
    };

    node.addEventListener("pointerdown", onPointerDown, { passive: false });
    node.addEventListener("touchstart", onTouchStart, { passive: true });
    node.addEventListener("touchmove", onTouchMove, { passive: true });
    node.addEventListener("touchcancel", onTouchCancel, { passive: true });
    node.addEventListener("touchend", onTouchEnd, { passive: false });
    cleanupNode.current = () => {
      node.removeEventListener("pointerdown", onPointerDown);
      node.removeEventListener("touchstart", onTouchStart);
      node.removeEventListener("touchmove", onTouchMove);
      node.removeEventListener("touchcancel", onTouchCancel);
      node.removeEventListener("touchend", onTouchEnd);
      assignRef(forwardedRefRef.current, null);
    };
  }, [reset]);

  return {
    ref,
    onTouchStart(event: React.TouchEvent<HTMLButtonElement>) {
      propsRef.current.onTouchStart?.(event);
      if (event.defaultPrevented && gesture.current) gesture.current.cancelled = true;
    },
    onTouchMove(event: React.TouchEvent<HTMLButtonElement>) {
      propsRef.current.onTouchMove?.(event);
      if (event.defaultPrevented && gesture.current) gesture.current.cancelled = true;
    },
    onTouchCancel(event: React.TouchEvent<HTMLButtonElement>) {
      propsRef.current.onTouchCancel?.(event);
      reset();
    },
    onTouchEndCapture(event: React.TouchEvent<HTMLButtonElement>) {
      propsRef.current.onTouchEndCapture?.(event);
      propsRef.current.onTouchEnd?.(event);
      if (event.defaultPrevented && gesture.current) gesture.current.cancelled = true;
    },
    // The caller's bubble callback is invoked during React capture above so it
    // can cancel before the native target listener suppresses compatibility click.
    onTouchEnd: undefined,
    onPointerDownCapture(event: React.PointerEvent<HTMLButtonElement>) {
      if (event.pointerType === "touch") pointerCancelled.current = false;
      else pendingActivation.current = null;
      propsRef.current.onPointerDownCapture?.(event);
      propsRef.current.onPointerDown?.(event);
      if (event.pointerType === "touch" && event.defaultPrevented) pointerCancelled.current = true;
    },
    onPointerDown: undefined,
    onPointerMove(event: React.PointerEvent<HTMLButtonElement>) {
      propsRef.current.onPointerMove?.(event);
      if (event.defaultPrevented && gesture.current) gesture.current.cancelled = true;
    },
    onPointerCancel(event: React.PointerEvent<HTMLButtonElement>) {
      propsRef.current.onPointerCancel?.(event);
      reset();
    },
    onPointerUp(event: React.PointerEvent<HTMLButtonElement>) {
      propsRef.current.onPointerUp?.(event);
      if (event.defaultPrevented && gesture.current) gesture.current.cancelled = true;
    },
    onClick(event: React.MouseEvent<HTMLButtonElement>) {
      if (propsRef.current.disabled || event.currentTarget.disabled) return;
      const activation = pendingActivation.current;
      if (event.nativeEvent.isTrusted && event.detail > 0 && activation) {
        if (activation.cancelled || activation.fallbackDispatched) {
          pendingActivation.current = null;
          event.preventDefault();
          return;
        }
        activation.nativeClickObserved = true;
      }
      onPressRef.current?.(event);
    },
  };
}
