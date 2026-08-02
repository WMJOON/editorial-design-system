"use client";

import { useState } from "react";

export type EditorialCollectionItem = { id: string; href: string; title: string; category?: string; date?: string; excerpt?: string; cover?: string };
export type EditorialCollectionProps = { items: EditorialCollectionItem[]; heading?: string; countLabel?: string; className?: string; defaultView?: "list" | "grid"; showExcerpt?: boolean; loadMoreHref?: string; loadMoreLabel?: string };

function ListIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h14M5 12h14M5 18h14M3 6h.01M3 12h.01M3 18h.01" /></svg>; }
function GridIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></svg>; }

/** A reusable list/card collection for a home feed, archive, or topic page. */
export function EditorialCollection({ items, heading, countLabel, className, defaultView = "list", showExcerpt = false, loadMoreHref, loadMoreLabel = "All notes" }: EditorialCollectionProps) {
  const [view, setView] = useState<"list" | "grid">(defaultView);
  const classes = ["editorial-collection", className].filter(Boolean).join(" ");
  return <section className={classes} aria-label={heading ?? "콘텐츠 목록"}>
    <header className="editorial-collection-toolbar"><>{heading ? <p className="editorial-collection-heading">{heading}</p> : <span />}</><div className="editorial-collection-actions">{countLabel && <span className="editorial-collection-count">{countLabel}</span>}<div className="editorial-collection-toggle" role="group" aria-label="콘텐츠 보기 방식"><button type="button" className={view === "list" ? "is-active" : ""} aria-pressed={view === "list"} onClick={() => setView("list")}><ListIcon /><span className="editorial-visually-hidden">리스트 보기</span></button><button type="button" className={view === "grid" ? "is-active" : ""} aria-pressed={view === "grid"} onClick={() => setView("grid")}><GridIcon /><span className="editorial-visually-hidden">카드 보기</span></button></div></div></header>
    {view === "list" ? <div className="editorial-collection-list">{items.map((item) => <a href={item.href} key={item.id} className="editorial-collection-list-item"><time>{item.date}</time><div>{item.category && <p className="editorial-collection-meta">{item.category}</p>}<h2 className="editorial-title-2">{item.title}</h2>{showExcerpt && item.excerpt && <p className="editorial-collection-excerpt">{item.excerpt}</p>}</div><span className="editorial-collection-arrow" aria-hidden="true">→</span></a>)}</div> : <div className="editorial-collection-grid">{items.map((item) => <a href={item.href} key={item.id} className="editorial-collection-card"><div className="editorial-collection-card-media">{item.cover ? <img src={item.cover} alt="" /> : <div className="editorial-collection-card-fallback" aria-hidden="true"><span>{item.category}</span></div>}</div><div className="editorial-collection-card-body"><p className="editorial-collection-meta">{[item.category, item.date].filter(Boolean).join(" · ")}</p><h2 className="editorial-title-3">{item.title}</h2><span className="editorial-collection-card-arrow" aria-hidden="true">↗</span></div></a>)}</div>}
    {loadMoreHref && <a className="editorial-collection-more" href={loadMoreHref}>{loadMoreLabel} <span aria-hidden="true">→</span></a>}
  </section>;
}
