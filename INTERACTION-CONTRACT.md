# Interaction contract (0.1.66)

`EditorialButton` and `EditorialIconButton` share the same press handling as segmented controls and collection toggles. `EditorialTabs` adds controlled selection, disabled options and roving keyboard focus. Use its option `id`/`panelId` with an application-owned labelled tabpanel.

Native button click remains the action interface, including form submission and caller `preventDefault`. A primary touch pointer cancels its compatibility mouse event on `pointerdown`; a completed gesture calls the button's native `click()` within `pointerup`. Cancelling the compatibility event before a button mutates layout prevents a delayed ghost click from landing on newly reflowed content. `touch-action: manipulation` continues to own native pan and zoom, while pointer movement cancels activation. This avoids React's delegated `touchend` path, which can be passive or omitted during Safari gesture arbitration. It does not claim the resulting click is trusted. Moving more than 10 CSS pixels, secondary pointers and cancelled gestures do not activate the fallback. There is no time-based lockout between distinct taps. Keyboard, pen and mouse keep their native click path. `disabled` is checked at activation time.

Use `unstyled` on EditorialButton to retain an existing application's presentation; it does not remove the coarse-pointer minimum target. React 19 button refs are forwarded. Keep navigation as anchors, not press handlers.

## Async controls

`EditorialButton` and `EditorialIconButton` accept `pending`. This sets native `disabled` and `aria-busy`; clearing pending never overrides an explicit `disabled` prop. Existing native button props and onClick event meaning are unchanged.

`useEditorialAsyncAction({ onError, timeoutMs: 12000, waitForNavigation: false })` owns duplicate in-flight suppression, errors, deadlines, abort signals, and page restoration. Share one hook across mutually exclusive actions (for example three OAuth providers). Call `run(async signal => { ... })` from the normal onClick handler. The callback starts synchronously to preserve user activation. Pass the signal to supported network APIs and check `signal.aborted` before committing late results or navigating. The hook does not know about Supabase, account data, URLs, or application error copy.

For same-page work, resolution clears pending immediately and allows the next independent action. With `waitForNavigation: true`, pending lasts until pagehide/restored pageshow, cancellation, or deadline; a failed navigation cannot lock the control indefinitely. A late response from an abandoned action cannot clear a newer action's lock. Cancellation settles run callers. Unmount aborts and clears timers without state updates.

Page lifecycle resets are shared by ordinary press state and async state through a single subscription. They clear stale gestures and compatibility-click suppression on pagehide and persisted pageshow. Pointer cancellation also cancels the touch fallback. The contract does not attach React touch handlers, so caller touch handlers pass through unchanged. No unconditional reload, broad touch interception, or fixed tap lockout is added. This follows the [documented page restoration events](https://developer.mozilla.org/en-US/docs/Web/API/Window/pageshow_event).

Aborting a client request is **not** rollback of a server mutation. Applications must reconcile an uncertain result before retrying destructive work. Externally controlled loading/disabled state remains the application's responsibility.

## Verification

- `npm run build && npm test`
- `npm run build-storybook`, serve `storybook-static` locally on port 6011.
- `PLAYWRIGHT_MODULE=/path/to/playwright node scripts/interaction-browser.cjs` (or install Playwright in the test environment). Set `STORYBOOK_URL` for another server.
- The browser regression runs on WebKit with an iPhone profile. It is not equivalent to a physical iOS 27.0 Safari check.
- `AsyncRecovery` covers pending groups, rapid actions, throws, rejection/timeouts, pagehide/restored pageshow, icon/keyboard input, and explicit disabled. Pure controller tests also verify stale completions cannot unlock a newer request.
- `docs/interaction-check.yml.example` is ready to install as `.github/workflows/interaction-check.yml` to run these checks on pushes and PRs. Registration is pending: GitHub rejected the workflow push because the current OAuth credential lacks workflow scope. Do not consider CI enabled until a maintainer approves and installs it. Production/publish workflows are unchanged.

This release preserves the site's previously consumed 0.1.63 fluid-root fix. It does not change the supported-browser range or add global touch interception/reload logic.
