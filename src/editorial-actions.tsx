"use client";
import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import { useEditorialPress } from "./editorial-press.js";

export type EditorialButtonVariant = "primary" | "secondary" | "quiet";
export type EditorialControlSize = "sm" | "md" | "lg";

export type EditorialButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: EditorialButtonVariant;
  size?: EditorialControlSize;
  unstyled?: boolean;
  /** Async pending is additive: never overrides an explicit disabled state. */
  pending?: boolean;
  ref?: Ref<HTMLButtonElement>;
};

/** A labelled action. Use a native button so form, keyboard, and disabled behaviour remain intact. */
export function EditorialButton({ className, children, variant = "secondary", size = "md", type = "button", unstyled = false, pending = false, ref, ...attributes }: EditorialButtonProps) {
  const props = { ...attributes, disabled: attributes.disabled || pending };
  const press = useEditorialPress(props.onClick, props);
  return <button {...props} {...press} ref={ref} type={type} aria-busy={pending || attributes["aria-busy"]} data-editorial-control="button" className={[!unstyled && "editorial-button", !unstyled && `editorial-button--${variant}`, !unstyled && `editorial-button--${size}`, className].filter(Boolean).join(" ")}>{children}</button>;
}

export type EditorialIconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  children: ReactNode;
  label: string;
  variant?: EditorialButtonVariant;
  size?: EditorialControlSize;
  pending?: boolean;
};

/** An icon-only action with an explicit accessible name. */
export function EditorialIconButton({ className, children, label, variant = "secondary", size = "md", type = "button", pending = false, ...attributes }: EditorialIconButtonProps) {
  const props = { ...attributes, disabled: attributes.disabled || pending };
  const press = useEditorialPress(props.onClick, props);
  return <button {...props} {...press} type={type} aria-busy={pending || attributes["aria-busy"]} data-editorial-control="button" aria-label={label} title={label} className={["editorial-icon-button", `editorial-icon-button--${variant}`, `editorial-icon-button--${size}`, className].filter(Boolean).join(" ")}>{children}</button>;
}
