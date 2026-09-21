import { EditorialWordWrap } from "./editorial-word-wrap.js";

export type EditorialIndexHeaderProps = {
  kicker: string;
  title: string;
  description?: string;
  className?: string;
};

/** Organism: shared introduction for topic, archive, and collection indexes. */
export function EditorialIndexHeader({ kicker, title, description, className }: EditorialIndexHeaderProps) {
  return <header className={["editorial-index-header", className].filter(Boolean).join(" ")}>
    <p className="editorial-kicker">{kicker}</p>
    <h1 className="editorial-index-header__title"><EditorialWordWrap>{title}</EditorialWordWrap></h1>
    {description && <p className="editorial-index-header__description">{description}</p>}
  </header>;
}
