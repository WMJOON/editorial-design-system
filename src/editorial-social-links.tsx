import { EditorialSocialLink, type EditorialSocialLinkProps } from "./editorial-social-link.js";

export type EditorialSocialLinkItem = Omit<EditorialSocialLinkProps, "className">;
export { EditorialSocialLink } from "./editorial-social-link.js";

export function EditorialSocialLinks({ links, label = "소셜 링크", className }: { links: EditorialSocialLinkItem[]; label?: string; className?: string }) {
  if (links.length === 0) return null;
  return <nav className={["editorial-social-links", className].filter(Boolean).join(" ")} aria-label={label}>
    {links.map((link) => <EditorialSocialLink {...link} key={`${link.href}-${link.label}`} />)}
  </nav>;
}
