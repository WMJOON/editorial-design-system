"use client";

import { useId, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import type { EditorialControlSize } from "./editorial-actions.js";

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

export type EditorialInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "children" | "size"> & {
  label: string;
  size?: EditorialControlSize;
};

export function EditorialInput({ className, id, label, size = "md", type = "text", ...props }: EditorialInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return <label className="editorial-input-field" htmlFor={inputId}>
    <span>{label}</span>
    <input {...props} id={inputId} type={type} className={["editorial-input", `editorial-input--${size}`, className].filter(Boolean).join(" ")} />
  </label>;
}

export type EditorialTextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "children"> & {
  label: string;
  size?: EditorialControlSize;
  labelHidden?: boolean;
};

export function EditorialTextArea({ className, id, label, size = "md", labelHidden = false, ...props }: EditorialTextAreaProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return <label className="editorial-input-field" htmlFor={inputId}>
    <span className={labelHidden ? "editorial-visually-hidden" : undefined}>{label}</span>
    <textarea {...props} id={inputId} className={["editorial-textarea", `editorial-input--${size}`, className].filter(Boolean).join(" ")} />
  </label>;
}

export type EditorialCheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "children" | "type"> & { label: string };

export function EditorialCheckbox({ className, id, label, ...props }: EditorialCheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return <label className="editorial-checkbox" htmlFor={inputId}>
    <input {...props} id={inputId} type="checkbox" className={className} />
    <span>{label}</span>
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

/** A visible, touch-safe choice for a small fixed option set. */
export function EditorialSegmentedControl({ label, options, value, onChange, size = "md", className }: EditorialSegmentedControlProps) {
  return <div className={["editorial-segmented-control", `editorial-segmented-control--${size}`, className].filter(Boolean).join(" ")} role="group" aria-label={label}>
    {options.map((option) => <button key={option.value} type="button" className={`editorial-segmented-option${option.value === value ? " is-active" : ""}`} aria-pressed={option.value === value} onClick={() => onChange(option.value)}>{option.label}</button>)}
  </div>;
}
