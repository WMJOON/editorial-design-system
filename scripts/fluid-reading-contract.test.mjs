import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(new URL("../editorial.css", import.meta.url), "utf8");

test("one bounded root drives body and title typography", () => {
  assert.match(css, /--editorial-root-font-size:\s*clamp\(0\.9375rem,\s*0\.85rem \+ 0\.43vw,\s*1\.125rem\)/);
  assert.match(css, /html\s*\{\s*font-size:\s*var\(--editorial-root-font-size\);\s*\}/);
  assert.match(css, /--editorial-type-body-size:\s*1rem/);
  assert.match(css, /--editorial-type-title-1-size:\s*2\.5rem/);
  assert.doesNotMatch(css, /--editorial-type-(?:body|title-[123]|display|subtitle)-size:\s*clamp\(/);
  assert.match(css, /\.editorial-content\s*\{[^}]*var\(--editorial-type-body-size\)\/var\(--editorial-type-body-line-height\)/s);
  assert.doesNotMatch(css, /\.editorial-content\s*\{[^}]*font:\s*16px/s);
});

test("reading measure locks at 720px while rhythm follows the root", () => {
  assert.match(css, /--editorial-reading-measure:\s*720px/);
  assert.match(css, /--editorial-space-inline-gutter:\s*1\.25rem/);
  assert.doesNotMatch(css, /--editorial-space-(?:inline-gutter|content-block|section|article-block|card-gap|list-gap):\s*clamp\(/);
  assert.match(css, /\.editorial-article\s*\{[^}]*var\(--editorial-reading-measure\)[^}]*var\(--editorial-space-inline-gutter\)/s);
});

test("borders and control targets remain fixed geometry", () => {
  assert.match(css, /--editorial-border-width:\s*1px/);
  assert.match(css, /--editorial-size-control-md:\s*44px/);
  assert.match(css, /--editorial-size-control-lg:\s*52px/);
  assert.doesNotMatch(css, /--editorial-(?:border-width|size-control-md|size-control-lg):\s*clamp\(/);
});

test("card geometry scales in rem while Mermaid keeps its fixed minimum", () => {
  assert.match(css, /\.editorial-collection-grid\s*\{[^}]*minmax\(20rem,1fr\)/s);
  assert.match(css, /\.editorial-collection-card-body\s*\{[^}]*min-height:9\.0625rem;[^}]*padding:1\.0625rem 2\.625rem 1\.25rem 1\.0625rem/s);
  assert.match(css, /--editorial-mermaid-min-inline-size:\s*640px/);
  assert.doesNotMatch(css, /--editorial-mermaid-min-inline-size:\s*40rem/);
});

test("thumbnail media uses one 16 by 9 frame contract", () => {
  assert.match(css, /--editorial-thumbnail-ratio:\s*16 \/ 9/);
  assert.match(css, /\.editorial-article-cover\s*\{[^}]*aspect-ratio:\s*var\(--editorial-thumbnail-ratio\)/s);
  assert.match(css, /\.editorial-collection-card-media\s*\{[^}]*aspect-ratio:var\(--editorial-thumbnail-ratio\)/s);
  assert.match(css, /\.editorial-collection-card-media img\s*\{[^}]*object-fit:cover/s);
  assert.doesNotMatch(css, /\.editorial-(?:article-cover|collection-card-media)[^{]*\{[^}]*aspect-ratio:\s*(?:1\.5|1\.55|1\.78)/s);
});

test("mobile rules do not replace the shared body or title scale", () => {
  const mobile = css.match(/@media \(max-width: 720px\) \{([\s\S]*?)\n\}/)?.[1] ?? "";
  assert.doesNotMatch(mobile, /editorial-type-body-size|editorial-type-title-1-size/);
  assert.doesNotMatch(mobile, /\.editorial-title-1[^{}]*\{[^}]*font-size/);
});
