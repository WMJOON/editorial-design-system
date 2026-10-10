import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import test from "node:test";
import { EditorialCollectionList, EditorialCollectionCard, EditorialCollectionCardGrid } from "../dist/editorial-collection-items.js";

const items = [{ id: "article", href: "/writing/article/", title: "추천 글", category: "개념 해설", date: "2026-09-29" }];

test("collection list can use the same title typography as featured series", () => {
  const regular = renderToStaticMarkup(createElement(EditorialCollectionList, { items }));
  const rail = renderToStaticMarkup(createElement(EditorialCollectionList, { items, titleVariant: "title-5" }));
  assert.match(regular, /<h2 class="editorial-title-2"/);
  assert.match(rail, /<h2 class="editorial-title-5"/);
});


test("cover cards omit summaries by default and keep explicit excerpt opt-in", () => {
  const item = {...items[0], excerpt: "Summary supplied by CMS"};
  for (const [Component, props] of [[EditorialCollectionCard, item], [EditorialCollectionCardGrid, {items: [item]}]]) {
    const compact = renderToStaticMarkup(createElement(Component, props));
    const expanded = renderToStaticMarkup(createElement(Component, {...props, showExcerpt: true}));
    assert.doesNotMatch(compact, /Summary supplied by CMS|editorial-collection-card--with-excerpt/);
    assert.match(expanded, /Summary supplied by CMS/);
    assert.match(expanded, /editorial-collection-card--with-excerpt/);
  }
});
