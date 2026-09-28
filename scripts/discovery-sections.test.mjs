import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import test from "node:test";
import { EditorialDiscoverySections } from "../dist/editorial-discovery-sections.js";

const topics = [{ href: "/topics/knowledge/", label: "Knowledge systems" }];

test("home topic discovery omits the series section without series data", () => {
  const markup = renderToStaticMarkup(createElement(EditorialDiscoverySections, { topics, interestsHref: "/?account=interests" }));
  assert.match(markup, /Explore topics/);
  assert.doesNotMatch(markup, /Featured series|editorial-discovery-series/);
});

test("article discovery still presents a linked series section", () => {
  const markup = renderToStaticMarkup(createElement(EditorialDiscoverySections, {
    topics,
    interestsHref: "/?account=interests",
    series: [{ href: "/series/ontology/", title: "Ontology", countLabel: "7 notes" }],
    allSeriesHref: "/series/",
  }));
  assert.match(markup, /Featured series/);
  assert.match(markup, /href="\/series\/ontology\/"/);
});
