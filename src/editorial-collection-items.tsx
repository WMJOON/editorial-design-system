import type { EditorialCollectionItem } from "./editorial-collection.js";
import { EditorialWordWrap } from "./editorial-word-wrap.js";
import { EditorialTypography } from "./editorial-typography.js";

/** Molecule: one content item in a chronological editorial list. */
export type EditorialCollectionListItemProps = Pick<EditorialCollectionItem, "href" | "title" | "category" | "date" | "excerpt"> & { id?: string; showExcerpt?: boolean; titleVariant?: "title-2" | "title-5" };

export function EditorialCollectionListItem({ id, href, title, category, date, excerpt, showExcerpt = false, titleVariant = "title-2" }: EditorialCollectionListItemProps) {
  return <a href={href} className="editorial-collection-list-item" data-analytics-event="select_content" data-analytics-content-type="article" data-analytics-content-id={id ?? href} data-analytics-content-name={title} data-analytics-content-category={category} data-analytics-link-location="collection_list"><time className="editorial-type-meta">{date}</time><div>{category && <p className="editorial-collection-meta editorial-type-meta">{category}</p>}<EditorialTypography as="h2" variant={titleVariant}><EditorialWordWrap>{title}</EditorialWordWrap></EditorialTypography>{showExcerpt && excerpt && <p className="editorial-collection-excerpt editorial-type-body-sm">{excerpt}</p>}</div><span className="editorial-collection-arrow" aria-hidden="true">→</span></a>;
}

/** Molecule: a chronological list whose only display variable is the excerpt. */
export function EditorialCollectionList({ items, showExcerpt = false, titleVariant = "title-2" }: { items: EditorialCollectionItem[]; showExcerpt?: boolean; titleVariant?: "title-2" | "title-5" }) {
  return <div className="editorial-collection-list">{items.map(({ id, ...item }) => <EditorialCollectionListItem {...item} id={id} key={id} showExcerpt={showExcerpt} titleVariant={titleVariant} />)}</div>;
}

/** Molecule: one content item in a visual cover-card collection. */
export type EditorialCollectionCardProps = Pick<EditorialCollectionItem, "href" | "title" | "category" | "date" | "excerpt" | "cover"> & { id?: string; showExcerpt?: boolean; titleSize?: "default" | "small"; context?: string; analyticsLocation?: string };

export function EditorialCollectionCard({ id, href, title, category, date, excerpt, cover, showExcerpt = false, titleSize = "small", context, analyticsLocation = "collection_grid" }: EditorialCollectionCardProps) {
  const hasExcerpt = showExcerpt && Boolean(excerpt);
  return <a href={href} className={`editorial-collection-card${hasExcerpt ? " editorial-collection-card--with-excerpt" : ""}`} data-analytics-event="select_content" data-analytics-content-type="article" data-analytics-content-id={id ?? href} data-analytics-content-name={title} data-analytics-content-category={category} data-analytics-link-location={analyticsLocation}><div className="editorial-collection-card-media">{cover ? <img src={cover} alt="" /> : <div className="editorial-collection-card-fallback" aria-hidden="true"><span>{category}</span></div>}</div><div className="editorial-collection-card-body"><p className="editorial-collection-meta editorial-type-meta" title={[category, date].filter(Boolean).join(" · ")}>{[category, date].filter(Boolean).join(" · ")}</p>{context && <p className="editorial-collection-card-context editorial-type-meta" title={context}>{context}</p>}<EditorialTypography as="h2" variant="title-3" className={titleSize === "small" ? "editorial-collection-card-title--small" : undefined}><EditorialWordWrap>{title}</EditorialWordWrap></EditorialTypography>{hasExcerpt && <p className="editorial-collection-card-excerpt editorial-type-body-sm">{excerpt}</p>}</div></a>;
}

/** Molecule: responsive visual-card grid for editorial collections. */
export function EditorialCollectionCardGrid({ items, showExcerpt = false, sizing = "default", titleSize = "small" }: { items: EditorialCollectionItem[]; showExcerpt?: boolean; sizing?: "default" | "compact"; titleSize?: "default" | "small" }) {
  return <div className={`editorial-collection-grid${sizing === "compact" ? " editorial-collection-grid--compact" : ""}`}>{items.map(({ id, ...item }) => <EditorialCollectionCard {...item} id={id} key={id} showExcerpt={showExcerpt} titleSize={titleSize} />)}</div>;
}
