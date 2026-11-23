import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { EditorialMenuBar, EditorialMenuToggle, EditorialSiteHeader, EDITORIAL_MENU_ID } from "../dist/index.js";

const links = [{ href: "/contents/", label: "Articles" }, { href: "/about/", label: "About" }];

test("menu region is a hidden checkbox state plus the link panel", () => {
  const html = renderToStaticMarkup(createElement(EditorialMenuBar, { links }));
  assert.match(html, new RegExp(`<input class="editorial-menu-check" type="checkbox" id="${EDITORIAL_MENU_ID}"`));
  assert.match(html, /<nav class="editorial-menu-bar" aria-label="주요 메뉴">/);
  assert.match(html, /href="\/contents\/">Articles<\/a>/);
  assert.doesNotMatch(html, /editorial-wordmark/);  // 브랜드는 헤더가 맡는다
});

test("the hamburger toggle lives in the header and points at the menu state", () => {
  const toggle = renderToStaticMarkup(createElement(EditorialMenuToggle, {}));
  assert.match(toggle, new RegExp(`<label class="editorial-menu-toggle" for="${EDITORIAL_MENU_ID}">`));
  assert.match(toggle, /<span class="editorial-visually-hidden">메뉴<\/span>/);  // 아이콘만 보이고 글자는 읽는 용도로 남긴다
  const header = renderToStaticMarkup(createElement(EditorialSiteHeader, { brand: "Notes", leading: createElement(EditorialMenuToggle, {}) }));
  assert.match(header, /<div class="editorial-nav-brand"><label class="editorial-menu-toggle"/);
  assert.ok(header.indexOf("editorial-menu-toggle") < header.indexOf("editorial-wordmark"));  // 버튼은 로고 왼쪽
});
