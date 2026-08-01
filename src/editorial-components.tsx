import type { ReactNode } from "react";
import { EditorialMarkdown } from "./editorial-markdown.js";

export type EditorialLink = { href: string; label: string };

export function EditorialNav({ brand, brandHref = "/", links = [], trailing }: { brand: string; brandHref?: string; links?: EditorialLink[]; trailing?: ReactNode }) {
  return <nav className="editorial-nav" aria-label="주요 메뉴">
    <a className="editorial-wordmark" href={brandHref}>{brand}</a>
    <div className="editorial-nav-links">{links.map((link) => <a key={`${link.href}-${link.label}`} href={link.href}>{link.label}</a>)}</div>
    {trailing && <div className="editorial-nav-trailing">{trailing}</div>}
  </nav>;
}

export function EditorialTags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return <div className="editorial-tags" aria-label="태그">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>;
}

export function EditorialArticleHeader({ category, date, title, subtitle, tags = [] }: { category: string; date: string; title: string; subtitle?: string; tags?: string[] }) {
  return <header className="editorial-article-header">
    <p className="editorial-kicker">{category} · {date}</p>
    <h1 className="editorial-title-1">{title}</h1>
    {subtitle && <p className="editorial-subtitle">{subtitle}</p>}
    <EditorialTags tags={tags} />
  </header>;
}

export function EditorialArticle({ category, date, title, subtitle, tags = [], content }: { category: string; date: string; title: string; subtitle?: string; tags?: string[]; content: string }) {
  return <article className="editorial-article">
    <EditorialArticleHeader category={category} date={date} title={title} subtitle={subtitle} tags={tags} />
    <EditorialMarkdown content={content} />
  </article>;
}
