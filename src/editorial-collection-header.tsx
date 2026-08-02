"use client";

import { useRef, type ReactNode } from "react";

export type EditorialCollectionView = "list" | "grid";

export type EditorialCollectionHeaderProps = {
  heading?: string;
  countLabel?: string;
  view: EditorialCollectionView;
  onViewChange: (view: EditorialCollectionView) => void;
};

function ListIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h14M5 12h14M5 18h14M3 6h.01M3 12h.01M3 18h.01" /></svg>; }
function GridIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></svg>; }

function ViewButton({ active, label, onPress, children }: { active: boolean; label: string; onPress: () => void; children: ReactNode }) {
  const lastTouchPress = useRef(0);
  return <button
    type="button"
    className={active ? "is-active" : ""}
    aria-pressed={active}
    onTouchEnd={() => {
      lastTouchPress.current = Date.now();
      onPress();
    }}
    onClick={() => {
      if (Date.now() - lastTouchPress.current < 700) return;
      onPress();
    }}
  >{children}<span className="editorial-visually-hidden">{label}</span></button>;
}

/** Molecule: collection heading, count, and list/card view control. */
export function EditorialCollectionHeader({ heading, countLabel, view, onViewChange }: EditorialCollectionHeaderProps) {
  return <header className="editorial-collection-toolbar"><>{heading ? <p className="editorial-collection-heading">{heading}</p> : <span />}</><div className="editorial-collection-actions">{countLabel && <span className="editorial-collection-count">{countLabel}</span>}<div className="editorial-collection-toggle" role="group" aria-label="콘텐츠 보기 방식"><ViewButton active={view === "list"} label="리스트 보기" onPress={() => onViewChange("list")}><ListIcon /></ViewButton><ViewButton active={view === "grid"} label="카드 보기" onPress={() => onViewChange("grid")}><GridIcon /></ViewButton></div></div></header>;
}
