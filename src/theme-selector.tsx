"use client";

import { useEffect, useState } from "react";
import { EditorialSegmentedControl } from "./editorial-controls.js";

export type EditorialThemePreference = "light" | "dark" | "system";

const themeLabels: Record<EditorialThemePreference, string> = {
  light: "라이트",
  dark: "다크",
  system: "시스템",
};

function applyThemePreference(preference: EditorialThemePreference) {
  const root = document.documentElement;
  if (preference === "system") {
    delete root.dataset.editorialTheme;
    return;
  }
  root.dataset.editorialTheme = preference;
}

export function EditorialThemeSelector({ storageKey = "editorial-theme", label = "테마 선택" }: { storageKey?: string; label?: string }) {
  const [preference, setPreference] = useState<EditorialThemePreference>("system");

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    const initial: EditorialThemePreference = saved === "light" || saved === "dark" || saved === "system" ? saved : "system";
    setPreference(initial);
    applyThemePreference(initial);
  }, [storageKey]);

  function select(next: EditorialThemePreference) {
    setPreference(next);
    window.localStorage.setItem(storageKey, next);
    applyThemePreference(next);
  }

  return <EditorialSegmentedControl className="editorial-theme-selector" label={label} value={preference} onChange={(value) => select(value as EditorialThemePreference)} options={(Object.keys(themeLabels) as EditorialThemePreference[]).map((value) => ({ value, label: themeLabels[value] }))} />;
}
