import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { EditorialMenuBar } from "../dist/editorial-components.js";

const links = [{ href: "/contents/", label: "Articles" }, { href: "/about/", label: "About" }];
const render = (props) => renderToStaticMarkup(createElement(EditorialMenuBar, props));

test("menu bar is its own navigation region with the primary links", () => {
  const html = render({ links });
  assert.match(html, /^<nav class="editorial-menu-bar" aria-label="주요 메뉴">/);
  assert.match(html, /href="\/contents\/">Articles<\/a>/);
  assert.match(html, /href="\/about\/">About<\/a>/);
  assert.doesNotMatch(html, /editorial-wordmark/);  // 브랜드는 헤더가 맡는다
});

test("menu bar renders no brand or header and accepts a custom label", () => {
  const html = render({ links: [], label: "사이트 메뉴" });
  assert.match(html, /aria-label="사이트 메뉴"/);
  assert.doesNotMatch(html, /<header/);
});
