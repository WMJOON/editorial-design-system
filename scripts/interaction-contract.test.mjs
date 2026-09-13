import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = name => readFileSync(new URL(`../src/${name}`, import.meta.url), 'utf8');
test('all shared button variants use the same press contract', () => {
  assert.match(read('editorial-actions.tsx'), /^"use client"/);
  assert.equal((read('editorial-actions.tsx').match(/useEditorialPress\(props.onClick, props\)/g) || []).length, 2);
  assert.match(read('editorial-controls.tsx'), /useEditorialPress/);
  assert.match(read('editorial-tabs.tsx'), /EditorialButton/);
});
test('pointer fallback retains native activation and avoids delegated touch interception', () => {
  const source = read('editorial-press.ts');
  assert.doesNotMatch(source, /Date.now|700|setTimeout/);
  assert.match(source, /event.currentTarget.click\(\)/);
  assert.match(source, /event.currentTarget.disabled/);
  assert.match(source, /onPointerUp/);
  assert.match(source, /onPointerCancel/);
  assert.match(source, /Math.hypot/);
  assert.match(source, /event\.isPrimary/);
  assert.match(source, /onPointerDown[\s\S]*?event\.preventDefault\(\)/);
  assert.doesNotMatch(source, /onTouchStart|onTouchMove|onTouchEnd/);
});
