# Interaction contract (0.1.64)

`EditorialButton` and `EditorialIconButton` share the same press handling as segmented controls and collection toggles. `EditorialTabs` adds controlled selection, disabled options and roving keyboard focus. Use its option `id`/`panelId` with an application-owned labelled tabpanel.

Native button click remains the action interface, including form submission and caller `preventDefault`. A completed single-finger tap calls the button's native `click()` within touchend, after cancelling the compatibility click. It does not claim the resulting click is trusted. Moving more than 10 CSS pixels, multi-touch and cancelled gestures do not activate the fallback. There is no time-based lockout between distinct taps. Keyboard and pen/mouse keep their native click path. `disabled` is checked at activation time.

Use `unstyled` on EditorialButton to retain an existing application's presentation; it does not remove the coarse-pointer minimum target. React 19 button refs are forwarded. Keep navigation as anchors, not press handlers.

## Verification

- `npm run build && npm test`
- `npm run build-storybook`, serve `storybook-static` locally on port 6011.
- `PLAYWRIGHT_MODULE=/path/to/playwright node scripts/interaction-browser.cjs` (or install Playwright in the test environment). Set `STORYBOOK_URL` for another server.
- The browser regression runs on WebKit with an iPhone profile. It is not equivalent to a physical iOS 27.0 Safari check.

This release preserves the site's previously consumed 0.1.63 fluid-root fix. It does not change the supported-browser range or add global touch interception/reload logic.
