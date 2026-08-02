import type { EditorialCollectionItem } from "./editorial-collection.js";

/** Molecule: one content item in a chronological editorial list. */
export type EditorialCollectionListItemProps = Pick<EditorialCollectionItem, "href" | "title" | "category" | "date" | "excerpt"> & { showExcerpt?: boolean };

export function EditorialCollectionListItem({ href, title, category, date, excerpt, showExcerpt = false }: EditorialCollectionListItemProps) {
  return <a href={href} className="editorial-collection-list-item"><time className="editorial-type-meta">{date}</time><div>{category && <p className="editorial-collection-meta editorial-type-meta">{category}</p>}<h2 className="editorial-title-2">{title}</h2>{showExcerpt && excerpt && <p className="editorial-collection-excerpt editorial-type-body-sm">{excerpt}</p>}</div><span className="editorial-collection-arrow" aria-hidden="true">→</span></a>;
}

/** Molecule: a chronological list whose only display variable is the excerpt. */
export function EditorialCollectionList({ items, showExcerpt = false }: { items: EditorialCollectionItem[]; showExcerpt?: boolean }) {
  return <div className="editorial-collection-list">{items.map(({ id, ...item }) => <EditorialCollectionListItem {...item} key={id} showExcerpt={showExcerpt} />)}</div>;
}

/** Molecule: one content item in a visual cover-card collection. */
export type EditorialCollectionCardProps = Pick<EditorialCollectionItem, "href" | "title" | "category" | "date" | "cover">;

export function EditorialCollectionCard({ href, title, category, date, cover }: EditorialCollectionCardProps) {
  return <a href={href} className="editorial-collection-card"><div className="editorial-collection-card-media">{cover ? <img src={cover} alt="" /> : <div className="editorial-collection-card-fallback" aria-hidden="true"><span>{category}</span></div>}</div><div className="editorial-collection-card-body"><p className="editorial-collection-meta editorial-type-meta">{[category, date].filter(Boolean).join(" · ")}</p><h2 className="editorial-title-3">{title}</h2><span className="editorial-collection-card-arrow" aria-hidden="true">↗</span></div></a>;
}

/** Molecule: responsive visual-card grid for editorial collections. */
export function EditorialCollectionCardGrid({ items }: { items: EditorialCollectionItem[] }) {
  return <div className="editorial-collection-grid">{items.map(({ id, ...item }) => <EditorialCollectionCard {...item} key={id} />)}</div>;
}
