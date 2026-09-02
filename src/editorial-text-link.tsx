import type { ReactNode } from "react";

export type EditorialTextLinkProps = {
  href: string;
  children: ReactNode;
  arrow?: ReactNode;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  className?: string;
  analyticsEvent?: string;
  analyticsName?: string;
  analyticsLocation?: string;
};

export function EditorialTextLink({ href, children, arrow = "→", target, rel, className, analyticsEvent = "cta_click", analyticsName, analyticsLocation }: EditorialTextLinkProps) {
  const inferredName = typeof children === "string" ? children : undefined;
  return <a
    className={["editorial-text-link", className].filter(Boolean).join(" ")}
    href={href}
    target={target}
    rel={rel}
    data-analytics-event={analyticsEvent}
    data-analytics-cta-name={analyticsName ?? inferredName}
    data-analytics-link-location={analyticsLocation}
  >
    <span className="editorial-text-link__label">{children}</span>
    {arrow != null && <span className="editorial-text-link__arrow" aria-hidden="true">{arrow}</span>}
  </a>;
}
