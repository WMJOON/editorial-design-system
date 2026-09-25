import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { EditorialSeriesNext } from "../dist/editorial-series-navigation.js";

const previous = { href: "/writing/previous/", title: "이전 글", position: 1, total: 3 };
const next = { href: "/writing/next/", title: "다음 글", position: 3, total: 3 };
const render = (props) => renderToStaticMarkup(createElement(EditorialSeriesNext, { seriesHref: "/series/example/", ...props }));

test("series footer presents previous, next, and all episodes", () => {
  const html = render({ previous, next });
  assert.match(html, /href="\/writing\/previous\/"/);
  assert.match(html, /href="\/writing\/next\/"/);
  assert.match(html, /href="\/series\/example\/"/);
  assert.match(html, /이전 편 · 1 \/ 3/);
  assert.match(html, /다음 편 · 3 \/ 3/);
});

test("first and last episodes keep three visible destinations without dead links", () => {
  const first = render({ next });
  const last = render({ previous });
  assert.match(first, /첫 번째 글입니다/);
  assert.doesNotMatch(first, /href="\/writing\/previous\/"/);
  assert.match(last, /마지막 글입니다/);
  assert.doesNotMatch(last, /href="\/writing\/next\/"/);
  assert.match(first, /시리즈 전체 보기/);
  assert.match(last, /시리즈 전체 보기/);
});
