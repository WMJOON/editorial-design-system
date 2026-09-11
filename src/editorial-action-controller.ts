export type EditorialAction = (signal: AbortSignal) => void | PromiseLike<void>;
export type EditorialActionOptions = { timeoutMs?: number; waitForNavigation?: boolean };
export type EditorialActionResult = "completed" | "cancelled" | "failed" | "ignored";

export class EditorialActionTimeoutError extends Error {
  constructor() { super("The action did not complete before its deadline."); this.name = "EditorialActionTimeoutError"; }
}

/** Internal, framework-independent state machine; no authentication or navigation policy. */
export function createEditorialActionController(onPending: (pending: boolean) => void, onError: (error: unknown) => void) {
  type Operation = { abort: AbortController; timer?: ReturnType<typeof setTimeout>; finish: (result: EditorialActionResult) => void };
  let current: Operation | undefined;
  function finish(operation: Operation, result: EditorialActionResult) {
    if (current !== operation) return;
    clearTimeout(operation.timer);
    current = undefined;
    if (result !== "completed") operation.abort.abort();
    onPending(false);
    operation.finish(result);
  }
  return {
    cancel() { if (current) finish(current, "cancelled"); },
    run(action: EditorialAction, options: EditorialActionOptions = {}): Promise<EditorialActionResult> {
      if (current) return Promise.resolve("ignored");
      const timeoutMs = Number.isFinite(options.timeoutMs) && options.timeoutMs! > 0 ? options.timeoutMs! : 12000;
      return new Promise(resolve => {
        const operation: Operation = { abort: new AbortController(), finish: resolve };
        current = operation;
        onPending(true);
        operation.timer = setTimeout(() => {
          if (current !== operation) return;
          finish(operation, "failed");
          onError(new EditorialActionTimeoutError());
        }, timeoutMs);
        // Invoke synchronously to retain the click's user-activation context.
        try {
          Promise.resolve(action(operation.abort.signal)).then(() => {
            // Redirect actions remain guarded until pagehide/restore or the deadline.
            if (!options.waitForNavigation) finish(operation, "completed");
          }, error => {
            if (current !== operation) return;
            finish(operation, "failed");
            onError(error);
          });
        } catch (error) {
          if (current !== operation) return;
          finish(operation, "failed");
          onError(error);
        }
      });
    },
  };
}
