import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = name => readFileSync(new URL(`../src/${name}`, import.meta.url), 'utf8');
test('all shared button variants use the same press contract', () => {
  assert.match(read('editorial-actions.tsx'), /^"use client"/);
  assert.equal((read('editorial-actions.tsx').match(/useEditorialPress\(props.onClick, props(?:, ref)?\)/g) || []).length, 2);
  assert.match(read('editorial-controls.tsx'), /useEditorialPress/);
  assert.match(read('editorial-tabs.tsx'), /EditorialButton/);
});
test('button-scoped native touch fallback retains activation without document interception', () => {
  const source = read('editorial-press.ts');
  assert.doesNotMatch(source, /Date.now|700|setTimeout/);
  assert.match(source, /node\.addEventListener\("touchstart"/);
  assert.match(source, /node\.addEventListener\("touchend"/);
  assert.match(source, /node\.addEventListener\("pointerdown", onPointerDown, \{ passive: false \}\)/);
  assert.match(source, /node\.addEventListener\("touchend", onTouchEnd, \{ passive: false \}\)/);
  assert.match(source, /node\.click\(\)/);
  assert.match(source, /node\.disabled/);
  assert.match(source, /onPointerUp/);
  assert.match(source, /onPointerCancel/);
  assert.match(source, /Math.hypot/);
  assert.match(source, /nativeClickObserved/);
  assert.match(source, /fallbackDispatched/);
  assert.doesNotMatch(source, /document\.addEventListener/);
});
