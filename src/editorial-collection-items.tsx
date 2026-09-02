import type { EditorialCollectionItem } from "./editorial-collection.js";
import { EditorialWordWrap } from "./editorial-word-wrap.js";

/** Molecule: one content item in a chronological editorial list. */
export type EditorialCollectionListItemProps = Pick<EditorialCollectionItem, "href" | "title" | "category" | "date" | "excerpt"> & { id?: string; showExcerpt?: boolean };

export function EditorialCollectionListItem({ id, href, title, category, date, excerpt, showExcerpt = false }: EditorialCollectionListItemProps) {
  return <a href={href} className="editorial-collection-list-item" data-analytics-event="select_content" data-analytics-content-type="article" data-analytics-content-id={id ?? href} data-analytics-content-name={title} data-analytics-content-category={category} data-analytics-link-location="collection_list"><time className="editorial-type-meta">{date}</time><div>{category && <p className="editorial-collection-meta editorial-type-meta">{category}</p>}<h2 className="editorial-title-2"><EditorialWordWrap>{title}</EditorialWordWrap></h2>{showExcerpt && excerpt && <p className="editorial-collection-excerpt editorial-type-body-sm">{excerpt}</p>}</div><span className="editorial-collection-arrow" aria-hidden="true">→</span></a>;
}

/** Molecule: a chronological list whose only display variable is the excerpt. */
export function EditorialCollectionList({ items, showExcerpt = false }: { items: EditorialCollectionItem[]; showExcerpt?: boolean }) {
  return <div className="editorial-collection-list">{items.map(({ id, ...item }) => <EditorialCollectionListItem {...item} id={id} key={id} showExcerpt={showExcerpt} />)}</div>;
}

/** Molecule: one content item in a visual cover-card collection. */
export type EditorialCollectionCardProps = Pick<EditorialCollectionItem, "href" | "title" | "category" | "date" | "excerpt" | "cover"> & { id?: string; showExcerpt?: boolean };

export function EditorialCollectionCard({ id, href, title, category, date, excerpt, cover, showExcerpt = true }: EditorialCollectionCardProps) {
  const hasExcerpt = showExcerpt && Boolean(excerpt);
  return <a href={href} className={`editorial-collection-card${hasExcerpt ? " editorial-collection-card--with-excerpt" : ""}`} data-analytics-event="select_content" data-analytics-content-type="article" data-analytics-content-id={id ?? href} data-analytics-content-name={title} data-analytics-content-category={category} data-analytics-link-location="collection_grid"><div className="editorial-collection-card-media">{cover ? <img src={cover} alt="" /> : <div className="editorial-collection-card-fallback" aria-hidden="true"><span>{category}</span></div>}</div><div className="editorial-collection-card-body"><p className="editorial-collection-meta editorial-type-meta" title={[category, date].filter(Boolean).join(" · ")}>{[category, date].filter(Boolean).join(" · ")}</p><h2 className="editorial-title-3"><EditorialWordWrap>{title}</EditorialWordWrap></h2>{hasExcerpt && <p className="editorial-collection-card-excerpt editorial-type-body-sm">{excerpt}</p>}</div></a>;
}

/** Molecule: responsive visual-card grid for editorial collections. */
export function EditorialCollectionCardGrid({ items, showExcerpt = true }: { items: EditorialCollectionItem[]; showExcerpt?: boolean }) {
  return <div className="editorial-collection-grid">{items.map(({ id, ...item }) => <EditorialCollectionCard {...item} id={id} key={id} showExcerpt={showExcerpt} />)}</div>;
}
