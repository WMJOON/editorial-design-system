"use client";

import { useId, type SelectHTMLAttributes } from "react";
import type { EditorialControlSize } from "./editorial-actions.js";
import { useEditorialPress } from "./editorial-press.js";

export type EditorialSelectOption = { value: string; label: string };

export type EditorialSelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "children" | "size"> & {
  label: string;
  options: EditorialSelectOption[];
  size?: EditorialControlSize;
};

/** A labelled native select for long or mutually exclusive option sets. */
export function EditorialSelect({ className, id, label, options, size = "md", ...props }: EditorialSelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  return <label className="editorial-select" htmlFor={selectId}>
    <span>{label}</span>
    <select {...props} id={selectId} className={[`editorial-input--${size}`, className].filter(Boolean).join(" ")}>
      {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
  </label>;
}

export type EditorialSegmentedOption = { value: string; label: string };

export type EditorialSegmentedControlProps = {
  label: string;
  options: EditorialSegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  size?: EditorialControlSize;
  className?: string;
};

type PressableOptionProps = {
  active: boolean;
  label: string;
  value: string;
  onChange: (value: string) => void;
};

/** Keep every segmented option on the shared native-click press contract. */
function PressableOption({ active, label, value, onChange }: PressableOptionProps) {
  const pressHandlers = useEditorialPress(() => onChange(value));

  return <button
    {...pressHandlers}
    type="button"
    className={`editorial-segmented-option${active ? " is-active" : ""}`}
    data-editorial-value={value}
    aria-pressed={active}
  >{label}</button>;
}

/** A visible, touch-safe choice for a small fixed option set. */
export function EditorialSegmentedControl({ label, options, value, onChange, size = "md", className }: EditorialSegmentedControlProps) {
  return <div className={["editorial-segmented-control", `editorial-segmented-control--${size}`, className].filter(Boolean).join(" ")} role="group" aria-label={label}>
    {options.map((option) => <PressableOption key={option.value} value={option.value} label={option.label} active={option.value === value} onChange={onChange} />)}
  </div>;
}
