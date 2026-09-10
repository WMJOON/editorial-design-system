"use client";
import { useRef } from "react";
import { EditorialButton } from "./editorial-actions.js";
export type EditorialTabsProps = {
  label: string; value: string; onChange: (value: string) => void;
  options: { value: string; label: string; id: string; panelId: string; disabled?: boolean }[];
  className?: string;
};
export function EditorialTabs({ label, value, onChange, options, className }: EditorialTabsProps) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  return <div role="tablist" aria-label={label} className={className}>
    {options.map((option, index) => <EditorialButton unstyled key={option.value} ref={node => { buttons.current[index] = node; }} role="tab" id={option.id} aria-controls={option.panelId} aria-selected={value === option.value} tabIndex={value === option.value ? 0 : -1} disabled={option.disabled} onClick={() => onChange(option.value)} onKeyDown={event => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const enabled = options.map((item, i) => item.disabled ? -1 : i).filter(i => i >= 0);
      const position = enabled.indexOf(index);
      const next = event.key === "Home" ? enabled[0] : event.key === "End" ? enabled.at(-1) : enabled[(position + (event.key === "ArrowLeft" ? -1 : 1) + enabled.length) % enabled.length];
      if (next === undefined) return;
      onChange(options[next].value); buttons.current[next]?.focus();
    }}>{option.label}</EditorialButton>)}
  </div>;
}
