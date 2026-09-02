import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (relativePath) => readFile(new URL(`../${relativePath}`, import.meta.url), "utf8");

test("the site-shell and analytics API from 0.1.58 remains exported", async () => {
  const [index, collection, header] = await Promise.all([
    read("src/index.ts"),
    read("src/editorial-collection-items.tsx"),
    read("src/editorial-collection-header.tsx"),
  ]);

  assert.match(index, /EditorialSiteIntro/);
  assert.match(index, /EditorialTopicBar/);
  assert.match(index, /EditorialTextLink/);
  assert.match(collection, /data-analytics-event="select_content"/);
  assert.match(collection, /showExcerpt/);
  assert.match(collection, /EditorialCollectionCardGrid\(\{ items, showExcerpt = true \}/);
  assert.match(collection, /showExcerpt=\{showExcerpt\}/);
  assert.match(collection, /EditorialWordWrap/);
  assert.match(header, /data-analytics-event="change_content_view"/);
});

test("article covers and per-instance section labels remain public contracts", async () => {
  const [components, sections, css] = await Promise.all([
    read("src/editorial-components.tsx"),
    read("src/editorial-site-sections.tsx"),
    read("editorial.css"),
  ]);

  assert.match(components, /content, cover/);
  assert.match(components, /cover && <div className="editorial-article-cover">/);
  assert.match(sections, /import \{ useId \} from "react"/);
  assert.match(sections, /aria-labelledby=\{headingId\}/);
  assert.match(css, /\.editorial-word \{ white-space:normal; overflow-wrap:anywhere; \}/);
});

test("responsive collection safeguards survive the fluid typography release", async () => {
  const css = await read("editorial.css");

  assert.match(css, /\.editorial-collection-grid\s*\{\s*display:grid;\s*grid-template-columns:repeat\(auto-fit,minmax\(20rem,1fr\)\)/);
  assert.match(css, /@media \(max-width:720px\) \{[\s\S]*?\.editorial-collection-list-item \{ grid-template-columns:minmax\(0,1fr\) 1\.125rem;/);
  assert.match(css, /\.editorial-collection-list-item \.editorial-word \{ white-space:normal; overflow-wrap:anywhere;/);
  assert.match(css, /\.editorial-collection-card \{ display:grid; grid-template-columns:minmax\(0,1fr\)/);
  assert.doesNotMatch(css, /\.editorial-collection-card \.editorial-collection-card-body \{[^}]*min-height:12\.8125rem/);
  assert.match(css, /@media \(min-width:721px\) \{ \.editorial-collection-card--with-excerpt \.editorial-collection-card-body \{ min-height:12\.8125rem;/);
});

test("Mermaid keeps the released mobile scroll contract", async () => {
  const css = await read("editorial.css");

  assert.match(css, /\.editorial-mermaid-diagram \{[^}]*overflow-x: auto;[^}]*overscroll-behavior-x: contain;/s);
  assert.match(css, /\.editorial-mermaid-diagram svg \{[^}]*min-width: var\(--editorial-mermaid-min-inline-size\);[^}]*aspect-ratio: var\(--editorial-mermaid-frame-ratio\);/s);
});
