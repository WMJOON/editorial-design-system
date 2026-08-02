import type { ButtonHTMLAttributes, ReactNode } from "react";

export type EditorialButtonVariant = "primary" | "secondary" | "quiet";
export type EditorialControlSize = "sm" | "md" | "lg";

export type EditorialButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: EditorialButtonVariant;
  size?: EditorialControlSize;
};

/** A labelled action. Use a native button so form, keyboard, and disabled behaviour remain intact. */
export function EditorialButton({ className, children, variant = "secondary", size = "md", type = "button", ...props }: EditorialButtonProps) {
  return <button {...props} type={type} className={["editorial-button", `editorial-button--${variant}`, `editorial-button--${size}`, className].filter(Boolean).join(" ")}>{children}</button>;
}

export type EditorialIconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  children: ReactNode;
  label: string;
  variant?: EditorialButtonVariant;
  size?: EditorialControlSize;
};

/** An icon-only action with an explicit accessible name. */
export function EditorialIconButton({ className, children, label, variant = "secondary", size = "md", type = "button", ...props }: EditorialIconButtonProps) {
  return <button {...props} type={type} aria-label={label} title={label} className={["editorial-icon-button", `editorial-icon-button--${variant}`, `editorial-icon-button--${size}`, className].filter(Boolean).join(" ")}>{children}</button>;
}
