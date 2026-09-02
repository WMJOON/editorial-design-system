import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(new URL("../editorial.css", import.meta.url), "utf8");

test("body and title typography use bounded fluid tokens", () => {
  assert.match(css, /--editorial-type-body-size:\s*clamp\(0\.9375rem,\s*0\.85rem \+ 0\.43vw,\s*1\.125rem\)/);
  assert.match(css, /--editorial-type-title-1-size:\s*clamp\(1\.75rem,\s*1\.25rem \+ 2\.75vw,\s*3rem\)/);
  assert.match(css, /\.editorial-content\s*\{[^}]*var\(--editorial-type-body-size\)\/var\(--editorial-type-body-line-height\)/s);
  assert.doesNotMatch(css, /\.editorial-content\s*\{[^}]*font:\s*16px/s);
});

test("long-form reading measure locks at 720px while gutters remain fluid", () => {
  assert.match(css, /--editorial-reading-measure:\s*45rem/);
  assert.match(css, /--editorial-space-inline-gutter:\s*clamp\(/);
  assert.match(css, /\.editorial-article\s*\{[^}]*var\(--editorial-reading-measure\)[^}]*var\(--editorial-space-inline-gutter\)/s);
});

test("borders and control targets remain fixed geometry", () => {
  assert.match(css, /--editorial-border-width:\s*1px/);
  assert.match(css, /--editorial-size-control-md:\s*44px/);
  assert.match(css, /--editorial-size-control-lg:\s*52px/);
  assert.doesNotMatch(css, /--editorial-(?:border-width|size-control-md|size-control-lg):\s*clamp\(/);
});

test("mobile rules do not replace the shared body or title scale", () => {
  const mobile = css.match(/@media \(max-width: 720px\) \{([\s\S]*?)\n\}/)?.[1] ?? "";
  assert.doesNotMatch(mobile, /editorial-type-body-size|editorial-type-title-1-size/);
  assert.doesNotMatch(mobile, /\.editorial-title-1[^{}]*\{[^}]*font-size/);
});
