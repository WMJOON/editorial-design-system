"use client";

import type { SelectHTMLAttributes } from "react";

export type EditorialSelectOption = { value: string; label: string };

export type EditorialSelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> & {
  label: string;
  options: EditorialSelectOption[];
};

/** A labelled native select for long or mutually exclusive option sets. */
export function EditorialSelect({ className, id, label, options, ...props }: EditorialSelectProps) {
  const selectId = id ?? `editorial-select-${label.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
  return <label className="editorial-select" htmlFor={selectId}>
    <span>{label}</span>
    <select {...props} id={selectId} className={className}>
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
};

/** A compact, visible choice for a small fixed option set. */
export function EditorialSegmentedControl({ label, options, value, onChange }: EditorialSegmentedControlProps) {
  return <div className="editorial-segmented-control" role="group" aria-label={label}>
    {options.map((option) => <button key={option.value} type="button" className={option.value === value ? "is-active" : undefined} aria-pressed={option.value === value} onClick={() => onChange(option.value)}>{option.label}</button>)}
  </div>;
}
