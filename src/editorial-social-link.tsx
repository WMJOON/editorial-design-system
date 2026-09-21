import type { ReactNode } from "react";

export type EditorialSocialLinkProps = {
  href: string;
  label: string;
  icon: ReactNode;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  className?: string;
};

export function EditorialSocialLink({ href, label, icon, target, rel, className }: EditorialSocialLinkProps) {
  return <a
    className={["editorial-social-link", className].filter(Boolean).join(" ")}
    href={href}
    target={target}
    rel={rel}
    aria-label={label}
    data-analytics-event="social_click"
    data-analytics-link-name={label}
    data-analytics-link-location="social_links"
  >{icon}</a>;
}
