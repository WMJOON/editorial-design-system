"use client";

import { useEffect, useRef, useState } from "react";
import { createEditorialActionController, type EditorialAction, type EditorialActionOptions } from "./editorial-action-controller.js";
import { subscribeEditorialPageReset } from "./editorial-page-lifecycle.js";

export type EditorialAsyncActionOptions = EditorialActionOptions & { onError: (error: unknown) => void };

/** Share one action across a button group. Caller owns API calls and error copy. */
export function useEditorialAsyncAction(options: EditorialAsyncActionOptions) {
  const [pending, setPending] = useState(false);
  const latest = useRef(options);
  const mounted = useRef(false);
  const controller = useRef<ReturnType<typeof createEditorialActionController> | null>(null);
  if (!controller.current) controller.current = createEditorialActionController(
    value => { if (mounted.current) setPending(value); },
    error => { if (mounted.current) latest.current.onError(error); },
  );
  useEffect(() => { latest.current = options; });
  useEffect(() => {
    mounted.current = true;
    const reset = () => { controller.current!.cancel(); setPending(false); };
    const unsubscribe = subscribeEditorialPageReset(reset);
    return () => { mounted.current = false; unsubscribe(); controller.current!.cancel(); };
  }, []);
  return {
    pending,
    run: (action: EditorialAction) => controller.current!.run(action, latest.current),
    cancel: () => controller.current!.cancel(),
  };
}
