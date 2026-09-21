import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Exercise the shipped hook's native listeners without a React root listener.
// Hook primitives are isolated here; this is not a browser/device simulation.
const source = readFileSync(new URL('../dist/editorial-press.js', import.meta.url), 'utf8')
  .replace(/import .* from "react";/, 'const useRef = current => ({current}); const useCallback = fn => fn; const useEffect = () => {};')
  .replace(/import .* from "\.\/editorial-page-lifecycle.js";/, 'const subscribeEditorialPageReset = () => () => {};');
const {useEditorialPress} = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));

class Button extends EventTarget {
  disabled = false;
  click() { if (!this.disabled) this.dispatchEvent(new Event('click', {cancelable:true})); }
}
function fixture(props = {}) {
  const calls = [];
  const button = new Button();
  const handlers = useEditorialPress(event => calls.push(event), props);
  handlers.ref(button);
  return {button, handlers, calls};
}
async function touch(button, move = false) {
  const point = {identifier:1, clientX:20, clientY:20};
  function send(type, touches, changedTouches) {
    const event = new Event(type, {cancelable:true});
    Object.assign(event, {touches, changedTouches});
    button.dispatchEvent(event);
  }
  send('touchstart', [point], [point]);
  if (move) send('touchmove', [{...point, clientY:60}], [point]);
  send('touchend', [], [point]);
  await Promise.resolve();
}
test('touch fallback reaches the action without React delegated click delivery', async () => {
  const {button, calls} = fixture();
  await touch(button);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].currentTarget, button);
});
test('native mouse/keyboard click and React delivery activate exactly once', () => {
  const {button, handlers, calls} = fixture();
  const event = new Event('click', {cancelable:true});
  button.dispatchEvent(event);
  assert.equal(calls.length, 1, 'native delivery must not depend on React');
  handlers.onClick({nativeEvent:event, currentTarget:button, detail:0});
  assert.equal(calls.length, 1);
});
test('native callbacks preserve preventDefault and stopPropagation', () => {
  const button = new Button();
  const handlers = useEditorialPress(event => {
    assert.equal(event.currentTarget, button);
    assert.equal(event.nativeEvent.type, 'click');
    event.preventDefault();
    event.stopPropagation();
    assert.equal(event.isDefaultPrevented(), true);
    assert.equal(event.isPropagationStopped(), true);
  });
  handlers.ref(button);
  const event = new Event('click', {cancelable:true});
  assert.equal(button.dispatchEvent(event), false);
  assert.equal(event.defaultPrevented, true);
});
test('rapid separate touches are not suppressed', async () => {
  const {button, calls} = fixture();
  await touch(button);
  await touch(button);
  await touch(button);
  assert.equal(calls.length, 3);
});
test('scroll cancellation and disabled controls do not activate', async () => {
  const {button, calls} = fixture();
  await touch(button, true);
  assert.equal(calls.length, 0);
  button.disabled = true;
  await touch(button);
  button.click();
  assert.equal(calls.length, 0);
});
test('ref detachment removes native listeners', () => {
  const {button, handlers, calls} = fixture();
  handlers.ref(null);
  button.click();
  assert.equal(calls.length, 0);
});
