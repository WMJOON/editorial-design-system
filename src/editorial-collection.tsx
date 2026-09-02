"use client";

import { useState } from "react";
import { EditorialCollectionCardGrid, EditorialCollectionList } from "./editorial-collection-items.js";
import { EditorialCollectionHeader, type EditorialCollectionView } from "./editorial-collection-header.js";
import { EditorialTextLink } from "./editorial-text-link.js";

export type EditorialCollectionItem = { id: string; href: string; title: string; category?: string; date?: string; excerpt?: string; cover?: string };
export type EditorialCollectionProps = { items: EditorialCollectionItem[]; heading?: string; countLabel?: string; className?: string; defaultView?: EditorialCollectionView; showExcerpt?: boolean; loadMoreHref?: string; loadMoreLabel?: string };

/** A reusable list/card collection for a home feed, archive, or topic page. */
export function EditorialCollection({ items, heading, countLabel, className, defaultView = "list", showExcerpt = false, loadMoreHref, loadMoreLabel = "All notes" }: EditorialCollectionProps) {
  const [view, setView] = useState<EditorialCollectionView>(defaultView);
  const classes = ["editorial-collection", className].filter(Boolean).join(" ");
  return <section className={classes} aria-label={heading ?? "콘텐츠 목록"}>
    <EditorialCollectionHeader heading={heading} countLabel={countLabel} view={view} onViewChange={setView} />
    {view === "list" ? <EditorialCollectionList items={items} showExcerpt={showExcerpt} /> : <EditorialCollectionCardGrid items={items} showExcerpt={showExcerpt} />}
    {loadMoreHref && <EditorialTextLink className="editorial-collection-more" href={loadMoreHref} analyticsName={loadMoreLabel} analyticsLocation="collection_footer">{loadMoreLabel}</EditorialTextLink>}
  </section>;
}
