import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";
import { EditorialIconButton } from "./editorial-actions.js";

export type EditorialModalSize = "sm" | "md" | "lg";

export type EditorialModalProps = {
  /** Controls whether the overlay is mounted. */
  open: boolean;
  /** Called for the close button, Escape, and a backdrop click. */
  onClose: () => void;
  title: ReactNode;
  eyebrow?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: EditorialModalSize;
  closeLabel?: string;
  className?: string;
  bodyClassName?: string;
};

/**
 * A controlled modal pattern for focused, short-lived work such as editing a
 * content file. It owns the backdrop, initial focus, and Escape handling;
 * callers own open state and the primary/secondary actions.
 */
export function EditorialModal({
  open,
  onClose,
  title,
  eyebrow,
  children,
  footer,
  size = "md",
  closeLabel = "닫기",
  className,
  bodyClassName,
}: EditorialModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", closeOnEscape);
    requestAnimationFrame(() => dialogRef.current?.focus());

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      if (previouslyFocused?.isConnected) previouslyFocused.focus();
    };
  }, [onClose, open]);

  if (!open) return null;

  return <div className="editorial-modal-backdrop" role="presentation" onMouseDown={(event) => {
    if (event.target === event.currentTarget) onClose();
  }}>
    <section ref={dialogRef} className={["editorial-modal", `editorial-modal--${size}`, className].filter(Boolean).join(" ")} role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1}>
      <header className="editorial-modal-header">
        <div>
          {eyebrow && <p className="editorial-modal-eyebrow">{eyebrow}</p>}
          <h2 id={titleId} className="editorial-modal-title">{title}</h2>
        </div>
        <EditorialIconButton label={closeLabel} variant="quiet" size="sm" onClick={onClose}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
        </EditorialIconButton>
      </header>
      <div className={["editorial-modal-body", bodyClassName].filter(Boolean).join(" ")}>{children}</div>
      {footer && <footer className="editorial-modal-footer">{footer}</footer>}
    </section>
  </div>;
}
