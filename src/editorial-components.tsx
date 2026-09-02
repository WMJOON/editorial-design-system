import type { ReactNode } from "react";
import { EditorialMarkdown } from "./editorial-markdown.js";
import { EditorialSocialLinks, type EditorialSocialLinkItem } from "./editorial-social-links.js";
import { EditorialWordWrap } from "./editorial-word-wrap.js";

export type EditorialLink = { href: string; label: string };

export type EditorialNavProps = { brand: string; brandHref?: string; links?: EditorialLink[]; trailing?: ReactNode };

export type EditorialSiteIntroLink = EditorialSocialLinkItem;

export type EditorialSiteIntroProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  socialLinks?: EditorialSiteIntroLink[];
  socialLabel?: string;
  className?: string;
};

/**
 * The navigation molecule. Use EditorialSiteHeader for a complete page shell
 * when the navigation needs its own responsive, centred content boundary.
 */
export function EditorialNav({ brand, brandHref = "/", links = [], trailing }: EditorialNavProps) {
  return <nav className="editorial-nav" aria-label="주요 메뉴">
    <a className="editorial-wordmark" href={brandHref}>{brand}</a>
    <div className="editorial-nav-links">{links.map((link) => <a key={`${link.href}-${link.label}`} href={link.href}>{link.label}</a>)}</div>
    {trailing && <div className="editorial-nav-trailing">{trailing}</div>}
  </nav>;
}

/**
 * The shared page header. Keeping the content width and responsive navigation
 * in the design system prevents each consumer from rebuilding a fragile shell.
 */
export function EditorialSiteHeader({ className, ...nav }: EditorialNavProps & { className?: string }) {
  return <header className={["editorial-site-header", className].filter(Boolean).join(" ")}>
    <div className="editorial-site-header__inner"><EditorialNav {...nav} /></div>
  </header>;
}

/**
 * A resilient landing-page introduction. It owns its content boundary and
 * Korean line-breaking rules so consumers do not need page-specific hero CSS.
 */
export function EditorialSiteIntro({ eyebrow, title, lede, socialLinks = [], socialLabel = "소셜 링크", className }: EditorialSiteIntroProps) {
  return <header className={["editorial-site-intro", className].filter(Boolean).join(" ")}>
    <div className="editorial-site-intro__inner">
      {eyebrow && <p className="editorial-site-intro__eyebrow">{eyebrow}</p>}
      <h1 className="editorial-display editorial-site-intro__title"><EditorialWordWrap>{title}</EditorialWordWrap></h1>
      <EditorialSocialLinks links={socialLinks} label={socialLabel} />
      {lede && <p className="editorial-site-intro__lede">{lede}</p>}
    </div>
  </header>;
}

export function EditorialTags({ tags, className, size = "md" }: { tags: string[]; className?: string; size?: EditorialMetadataSize }) {
  if (tags.length === 0) return null;
  return <div className={["editorial-tags", className].filter(Boolean).join(" ")} aria-label="태그">{tags.map((tag) => <EditorialTag key={tag} size={size}>{tag}</EditorialTag>)}</div>;
}

export type EditorialMetadataSize = "sm" | "md" | "lg";

export function EditorialTag({ children, size = "md" }: { children: ReactNode; size?: EditorialMetadataSize }) {
  return <span className={`editorial-tag editorial-tag--${size}`}>{children}</span>;
}

export function EditorialBadge({ children, size = "md" }: { children: ReactNode; size?: EditorialMetadataSize }) {
  return <span className={`editorial-badge editorial-badge--${size}`}>{children}</span>;
}

export function EditorialArticleHeader({ category, date, title, subtitle, tags = [] }: { category: string; date: string; title: string; subtitle?: string; tags?: string[] }) {
  return <header className="editorial-article-header">
    <p className="editorial-kicker">{category} · {date}</p>
    <h1 className="editorial-title-1"><EditorialWordWrap>{title}</EditorialWordWrap></h1>
    {subtitle && <p className="editorial-subtitle">{subtitle}</p>}
    <EditorialTags tags={tags} size="sm" />
  </header>;
}

export function EditorialArticle({ category, date, title, subtitle, tags = [], content }: { category: string; date: string; title: string; subtitle?: string; tags?: string[]; content: string }) {
  return <article className="editorial-article">
    <EditorialArticleHeader category={category} date={date} title={title} subtitle={subtitle} tags={tags} />
    <EditorialMarkdown content={content} />
  </article>;
}
