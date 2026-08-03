import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
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
 * content file. It owns the backdrop and Escape handling; callers retain the
 * focus of the control that opened it or the field the user selects.
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
  const onCloseRef = useRef(onClose);

  // Consumers commonly create `onClose` inline. Keep the latest callback
  // without treating that identity change as a modal lifecycle change: doing
  // so would run the focus-restoration cleanup on every editor keystroke.
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(<div className="editorial-modal-backdrop" role="presentation" onMouseDown={(event) => {
    if (event.target === event.currentTarget) onClose();
  }}>
    <section className={["editorial-modal", `editorial-modal--${size}`, className].filter(Boolean).join(" ")} role="dialog" aria-modal="true" aria-labelledby={titleId}>
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
  </div>, document.body);
}
