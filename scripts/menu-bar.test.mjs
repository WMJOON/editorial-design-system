import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { EditorialMenuBar } from "../dist/editorial-components.js";

const links = [{ href: "/contents/", label: "Articles" }, { href: "/about/", label: "About" }];
const render = (props) => renderToStaticMarkup(createElement(EditorialMenuBar, props));

test("menu is a hamburger toggle that reveals the primary links", () => {
  const html = render({ links });
  assert.match(html, /^<details class="editorial-menu-bar">/);
  assert.match(html, /<summary class="editorial-menu-toggle">/);
  assert.match(html, /<span>메뉴<\/span>/);
  assert.match(html, /<nav class="editorial-menu-panel" aria-label="주요 메뉴">/);
  assert.match(html, /href="\/contents\/">Articles<\/a>/);
  assert.doesNotMatch(html, /editorial-wordmark/);  // 브랜드는 헤더가 맡는다
  assert.doesNotMatch(html, /\sopen/);              // 기본은 닫힌 상태
});

test("menu renders no header and accepts custom labels", () => {
  const html = render({ links: [], label: "사이트 메뉴", toggleLabel: "목차" });
  assert.match(html, /aria-label="사이트 메뉴"/);
  assert.match(html, /<span>목차<\/span>/);
  assert.doesNotMatch(html, /<header/);
});
