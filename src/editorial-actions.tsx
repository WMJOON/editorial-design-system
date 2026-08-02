import type { ButtonHTMLAttributes, ReactNode } from "react";

export type EditorialButtonVariant = "primary" | "secondary" | "quiet";

export type EditorialButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: EditorialButtonVariant;
};

/** A labelled action. Use a native button so form, keyboard, and disabled behaviour remain intact. */
export function EditorialButton({ className, children, variant = "secondary", type = "button", ...props }: EditorialButtonProps) {
  return <button {...props} type={type} className={["editorial-button", `editorial-button--${variant}`, className].filter(Boolean).join(" ")}>{children}</button>;
}

export type EditorialIconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  children: ReactNode;
  label: string;
  variant?: EditorialButtonVariant;
};

/** An icon-only action with an explicit accessible name. */
export function EditorialIconButton({ className, children, label, variant = "secondary", type = "button", ...props }: EditorialIconButtonProps) {
  return <button {...props} type={type} aria-label={label} title={label} className={["editorial-icon-button", `editorial-icon-button--${variant}`, className].filter(Boolean).join(" ")}>{children}</button>;
}
