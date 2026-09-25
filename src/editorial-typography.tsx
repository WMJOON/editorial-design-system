import type { ReactNode } from "react";

export type EditorialTypographyProps = {
  as?: "span" | "p" | "h2" | "h3";
  variant: "meta" | "body" | "body-sm" | "title-3" | "title-5";
  children: ReactNode;
  className?: string;
};

const variantClass: Record<EditorialTypographyProps["variant"], string> = {
  meta: "editorial-type-meta",
  body: "editorial-type-body",
  "body-sm": "editorial-type-body-sm",
  "title-3": "editorial-title-3",
  "title-5": "editorial-title-5",
};

export function EditorialTypography({ as: Tag = "span", variant, children, className }: EditorialTypographyProps) {
  return <Tag className={[variantClass[variant], className].filter(Boolean).join(" ")}>{children}</Tag>;
}
